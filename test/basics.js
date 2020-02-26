/***** 
 * 
 *  basics.js 
 *  Created by: Aleena Watson
 *  Date: 2.25.2020
 * 
 * 
 *  UNIT TESTS - constrained by Okta, we are only
 *  able to run unit tests when the user is not logged 
 *  in.
 * 
 * 
 * ******/

let fs = require('fs')
let request = require('request')
let expect = require('chai').expect

if (fs.existsSync('./db.sqlite')) {
    fs.renameSync('./db.sqlite', './db.sqlite.bak')
}

let index = require('../index')

before(function(done) {
    setTimeout(done, 1500)
})

after(function(done) {
    fs.unlinkSync('./db.sqlite')
    process.exit()
})

it ('testing /', function(done) {
    request('http://localhost:3000/', function(error, response, body) {
        expect(body).to.equal(fs.readFileSync('./public/home.html').toString())
        done()
    })
})

it ('testing /home', function(done) {
    request('http://localhost:3000/home', function(error, response, body) {
        expect(body).to.equal(fs.readFileSync('./public/home.html').toString())
        done()
    })
})

it ('testing /b/1', function(done) {
    request('http://localhost:3000/b/1', function(error, response, body) {
        expect(body).to.equal(fs.readFileSync('./public/blog.html').toString())
        done()
    })
})

it ('testing /b/1/p/1', function(done) {
    request('http://localhost:3000/b/1/p/1', function(error, response, body) {
        expect(body).to.equal(fs.readFileSync('./public/post.html').toString())
        done()
    })
})

it ('testing /admin', function(done) {
    request('http://localhost:3000/admin', function(error, response, body) {
        expect(body).to.equal('Unauthorized')
        done()
    })
})

it ('testing /admin/1', function(done) {
    request('http://localhost:3000/admin/1', function(error, response, body) {
        expect(body).to.equal('Unauthorized')
        done()
    })
})

it ('testing /register', function(done) {
    request('http://localhost:3000/register', function(error, response, body) {
        expect(body).to.equal(fs.readFileSync('./public/register.html').toString())
        done()
    })
})

it ('testing /user', function(done) {
    request('http://localhost:3000/user', function(error, response, body) {
        expect(body).to.equal('{"loggedIn":false}')
        done()
    })
})

it ('testing /random-blogs', function(done) {
    request('http://localhost:3000/random-blogs', function(error, response, body) {
        expect(body).to.equal('[]')
        done()
    })
})

it ('testing /blogs', function(done) {
    request('http://localhost:3000/blogs', function(error, response, body) {
        expect(body).to.equal('Unauthorized')
        done()
    })
})

it ('testing /blogs/1', function(done) {
    request('http://localhost:3000/blogs/1', function(error, response, body) {
        expect(body).to.equal('{}')
        done()
    })
})

it ('testing /blogs/1/posts', function(done) {
    request('http://localhost:3000/blogs/1/posts', function(error, response, body) {
        expect(body).to.equal('[]')
        done()
    })
})

it ('testing /blogs/1/posts/1', function(done) {
    request('http://localhost:3000/blogs/1/posts/1', function(error, response, body) {
        expect(body).to.equal('{}')
        done()
    })
})

it ('testing /blogs/1/posts/1/comments', function(done) {
    request('http://localhost:3000/blogs/1/posts/1/comments', function(error, response, body) {
        expect(body).to.equal('[]')
        done()
    })
})

it ('adding a blog to the database', function(done) {
    index.Blog.create({
        user: 'test user', 
        title: 'test title',
        description: 'test description',
        theme: 'light'
    }).then(() => {
        done()
    })
})

it ('testing /blogs/1', function(done) {
    request('http://localhost:3000/blogs/1', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.id).to.equal(1)
        expect(body.user).to.equal('test user')
        expect(body.title).to.equal('test title')
        expect(body.description).to.equal('test description')
        expect(body.theme).to.equal('light')
        done()
    })
})

it ('testing /blogs/1/posts', function(done) {
    request('http://localhost:3000/blogs/1/posts', function(error, response, body) {
        expect(body).to.equal('[]')
        done()
    })
})

it ('testing /blogs/1/posts/1', function(done) {
    request('http://localhost:3000/blogs/1/posts/1', function(error, response, body) {
        expect(body).to.equal('{}')
        done()
    })
})

it ('testing /blogs/1/posts/1/comments', function(done) {
    request('http://localhost:3000/blogs/1/posts/1/comments', function(error, response, body) {
        expect(body).to.equal('[]')
        done()
    })
})

it ('adding a post to the database', function(done) {
    index.Post.create({
        blogId: 1,
        user: 'test user', 
        title: 'test title',
        content: 'test content'
    }).then(() => {
        done()
    })
})

it ('testing /blogs/1', function(done) {
    request('http://localhost:3000/blogs/1', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.id).to.equal(1)
        expect(body.user).to.equal('test user')
        expect(body.title).to.equal('test title')
        expect(body.description).to.equal('test description')
        expect(body.theme).to.equal('light')
        done()
    })
})

it ('testing /blogs/1/posts', function(done) {
    request('http://localhost:3000/blogs/1/posts', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.length).to.equal(1)
        expect(body[0].blogId).to.equal(1)
        expect(body[0].id).to.equal(1)
        expect(body[0].user).to.equal('test user')
        expect(body[0].title).to.equal('test title')
        expect(body[0].content).to.equal('test content')
        done()
    })
})

it ('testing /blogs/1/posts/1', function(done) {
    request('http://localhost:3000/blogs/1/posts/1', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.id).to.equal(1)
        expect(body.user).to.equal('test user')
        expect(body.title).to.equal('test title')
        expect(body.content).to.equal('test content')
        done()
    })
})

it ('testing /blogs/1/posts/1/comments', function(done) {
    request('http://localhost:3000/blogs/1/posts/1/comments', function(error, response, body) {
        expect(body).to.equal('[]')
        done()
    })
})

it ('adding a comment to the database', function(done) {
    index.Comment.create({
        postId: 1,
        user: 'test user', 
        content: 'test content'
    }).then(() => {
        done()
    })
})

it ('testing /blogs/1', function(done) {
    request('http://localhost:3000/blogs/1', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.id).to.equal(1)
        expect(body.user).to.equal('test user')
        expect(body.title).to.equal('test title')
        expect(body.description).to.equal('test description')
        expect(body.theme).to.equal('light')
        done()
    })
})

it ('testing /blogs/1/posts', function(done) {
    request('http://localhost:3000/blogs/1/posts', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.length).to.equal(1)
        expect(body[0].blogId).to.equal(1)
        expect(body[0].id).to.equal(1)
        expect(body[0].user).to.equal('test user')
        expect(body[0].title).to.equal('test title')
        expect(body[0].content).to.equal('test content')
        done()
    })
})

it ('testing /blogs/1/posts/1', function(done) {
    request('http://localhost:3000/blogs/1/posts/1', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.id).to.equal(1)
        expect(body.user).to.equal('test user')
        expect(body.title).to.equal('test title')
        expect(body.content).to.equal('test content')
        done()
    })
})

it ('testing /blogs/1/posts/1/comments', function(done) {
    request('http://localhost:3000/blogs/1/posts/1/comments', function(error, response, body) {
        body = JSON.parse(body)
        expect(body.length).to.equal(1)
        expect(body[0].id).to.equal(1)
        expect(body[0].user).to.equal('test user')
        expect(body[0].content).to.equal('test content')
        done()
    })
})