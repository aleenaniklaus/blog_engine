require('dotenv').config({ path: process.cwd() + '/environment' });
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const Sequelize = require('sequelize');
const finale = require('finale-rest');
const app = express();
const port = 3000;
const okta = require('@okta/okta-sdk-nodejs');

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

app.get('/home', (req, res) => {
   res.sendFile(path.join(__dirname, './public/home.html'))
})

app.get('/admin', oidc.ensureAuthenticated(), (req, res) => {
    console.log(req.userContext)
    res.sendFile(path.join(__dirname, './public/admin.html'))
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/home')
})

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './public/register.html'));
});

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

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    operatorsAliases: false,
});

const Post = database.define('posts', {
    user: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
})
// TODO: replace finale with RESTful API replacement
finale.initialize({ app, sequelize: database })

const PostResource = finale.resource({
    model: Post,
    endpoints: ['/posts', '/posts/:id'],
})

PostResource.all.auth(function (req, res, context) {
    return new Promise(function (resolve, reject) {
        if (!req.isAuthenticated()) {
            res.status(401).send({ message: "Unauthorized" })
            resolve(context.stop)
        } else {
            resolve(context.continue)
        }
    })
})

database.sync().then(() => {
    oidc.on('ready', () => {
        app.listen(port, () => console.log(`My Blog App listening on port ${port}!`))
    })
})

oidc.on('error', err => {
    // An error occurred while setting up OIDC
    console.log("oidc error: ", err)
})