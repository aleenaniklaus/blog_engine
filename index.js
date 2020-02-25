require('dotenv').config({ path: process.cwd() + '/environment' })
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')
const Sequelize = require('sequelize')
const app = express()
const port = 3000
const okta = require('@okta/okta-sdk-nodejs')

// session support is required to use ExpressOIDC
app.use(session({
    secret: process.env.RANDOM_SECRET_WORD,
    resave: true,
    saveUninitialized: false
}))

const client = new okta.Client({
    orgUrl: process.env.OKTA_ORG_URL,
    token: process.env.OKTA_TOKEN
})

const oidc = new ExpressOIDC({
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    client_id: process.env.OKTA_CLIENT_ID,
    client_secret: process.env.OKTA_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URL,
    scope: 'openid profile',
    routes: {
        callback: {
            path: '/authorization-code/callback',
            defaultRedirect: '/admin'
        }
    }
})

app.use(oidc.router)
app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/landing-page.html'))
})

app.get('/home', (req, res) => {
   res.sendFile(path.join(__dirname, './public/home.html'))
})

app.get('/admin', oidc.ensureAuthenticated(), (req, res) => {
    // console.log(req.userContext.userinfo.sub)
    res.sendFile(path.join(__dirname, './public/admin.html'))
})

app.get('/admin/:blogId', oidc.ensureAuthenticated(), (req, res) => {
    res.sendFile(path.join(__dirname, './public/blog-posts.html'));
})

app.get('/logout', (req, res) => {
    if (req.userContext) {
      const idToken = req.userContext.tokens.id_token
      const to = encodeURI(process.env.HOST_URL)
      const params = `id_token_hint=${idToken}&post_logout_redirect_uri=${to}`
      req.logout()
      res.redirect(
        `${process.env.OKTA_ORG_URL}/oauth2/default/v1/logout?${params}`
      )
    } else {
      res.redirect('/')
    }
  })

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './public/register.html'));
})



app.post('/register', async (req, res) => {
    // const { body } = req;
    console.log(req.body)
    try {
        await client.createUser({
            profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                login: req.body.email
            },
            credentials: {
                password: {
                value: req.body.password
                }
            }
        })
        res.redirect('/login')
    } catch ({ errorCauses }) {
        console.log(errorCauses) // TODO: more gracefully display error message for login
        res.redirect('/register')
    }
})



/*** DATABASE ***/
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    operatorsAliases: false,
});

const Blog = database.define('blogs', {
    user: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.TEXT
})
const Post = database.define('posts', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT
})
const Comment = database.define('comments', {
    user: Sequelize.STRING,
    content: Sequelize.TEXT
})

Blog.hasMany(Post)
Post.hasMany(Comment)

/*** END DATABASE ***/




/*** DEFINE REST API ***/



// Return all of a user's blogs
app.get('/blogs', oidc.ensureAuthenticated(), (req, res) => {
    Blog.findAll({
        where: {
            user: req.userContext.userinfo.sub
        }
    }).then((blogs) => {
        res.json(blogs)
    })
})

// Create new blog
app.post('/blogs', oidc.ensureAuthenticated(), (req, res) => {
    Blog.create({
        user: req.userContext.userinfo.sub, 
        title: req.body.title,
        description: req.body.description
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

// Update blog 
app.put('/blogs/:blog', oidc.ensureAuthenticated(), (req, res) => {
    Blog.update({
        title: req.body.title,
        description: req.body.description
    }, {
        where: { 
            user: req.userContext.userinfo.sub,
            id: req.params.blog
        }
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

// Delete blog 
app.delete('/blogs/:blog', oidc.ensureAuthenticated(), (req, res) => {
    Blog.destroy({
        where: { 
            user: req.userContext.userinfo.sub,
            id: req.params.blog
        }
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

// Return blog posts in blog
app.get('/blogs/:blog/posts', (req, res) => {
    Post.findAll({
        where: { 
            blogId: req.params.blog
        }
    }).then((posts) => {
        res.json(posts)
    })
})

// Create new blog post
app.post('/blogs/:blog/posts', oidc.ensureAuthenticated(), (req, res) => {
    Post.create({
        blogId: req.params.blog,
        title: req.body.title,
        content: req.body.content
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

// Update blog post
app.put('/blogs/:blog/posts/:post', oidc.ensureAuthenticated(), (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: { 
            user: req.userContext.userinfo.sub,
            id: req.params.post
        }
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

// Delete blog post
app.delete('/blogs/:blog/posts/:post', oidc.ensureAuthenticated(), (req, res) => {
    Post.destroy({
        where: { 
            user: req.userContext.userinfo.sub,
            id: req.params.post
        }
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})







// Return blog title and description
app.get('/blogs/:blog', (req, res) => {
    Blog.findAll({
        where: { 
            id: req.params.blog
        }
    }).then((blogs) => {
        res.json(blogs)
    })
})

// Return blog post title and content
app.get('/blogs/:blog/posts/:post', (req, res) => {
    Post.findAll({
        where: { 
            id: res.params.post
        }
    }).then((posts) => {
        res.json(posts)
    })
})

// Update blog post title and content
app.post('/blogs/:blog/posts/:post', oidc.ensureAuthenticated(), (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: { 
            user: req.userContext.userinfo.sub,
            id: req.params.post
        }
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

// Return comments of blog post
app.get('/blogs/:blog/posts/:post/comments', (req, res) => {
    Comment.findAll({
        where: { 
            postId: res.params.post
        }
    }).then((comments) => {
        res.json(comments)
    })
})

// Create comment on blog post
app.post('/blogs/:blog/posts/:post/comments', oidc.ensureAuthenticated(), (req, res) => {
    Comment.create({
        user: req.userContext.userinfo.sub, 
        content: req.body.content
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

// Update comment
app.post('/blogs/:blog/posts/:post/comments/:comment', oidc.ensureAuthenticated(), (req, res) => {
    Comment.update({
        content: req.body.content
    }, {
        where: { 
            user: req.userContext.userinfo.sub,
            id: req.params.comment
        }
    }).then(() => {
        res.json({
            status: 'ok'
        })
    })
})

/*** END REST API ***/




database.sync().then(() => {
    oidc.on('ready', () => {
        app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))
    })
})

oidc.on('error', err => {
    // An error occurred while setting up OIDC
    console.log("oidc error: ", err)
})