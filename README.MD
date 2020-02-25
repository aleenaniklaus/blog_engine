## Blog Engine Project in 72 hours
#### React, Node.js, Express.js, SQLite

Blog engine to create for avid bloggers looking for a place to create their own
'blog space'. Blog spaces have a blogger's blogs (0-many), and posts within those
blogs,

For login, make account with Okta (follow tutorial below) and install the contents of package.json with the following command:

`npm install`

To run the application:

`node index.js`

FEATURES CREATED:
- admin, home, and register pages created using Okta
- mulitple bloggers each with their own 'blog space'
- bloggers can create, delete, edit & retrieve blogs
- get, post, put, delete API built
- create posts in blog
- fixed CSS/Bootstrap for registration page
- landing/home page generates 3 random blogs and displays to any user (logged in or not)
- viewing and commenting on blog posts allowed for users logged in
- viewing of posts/comments (for users not logged in)
- refactored code - as per necessary, avoided premature optimization
- explanatory comments at top of files

TODO:
- theming for bloggers
- unit tests/error handling check/creation
- docs on application design

STRETCH:
- ERD & Swim lane diagrams
- Header changes per page
- login for commenting - new registration page
- API docs


### ATTRIBUTION
#### Single blog page tutorial:

https://www.digitalocean.com/community/tutorials/build-a-blog-using-expressjs-and-react-in-30-minutes

Changes from this attribution:
 - Database tables 
 - Not using `epilogue` (created RESTful API to have control over the user)

#### Registration page tutorial:

https://developer.okta.com/blog/2019/05/31/simple-auth-express-fifteen-minutes

Changes from this attribution:
 - Attribution uses `mustache`, whereas this implementation uses `React`
 - No use of `render`
 - Instead of `'/'` redirecting to `'/register'` we explicitly create a route to `'/register'`
    - Other logic is changed in this accordingly in `index.js` line 86-112

#### Logout functionality (virtually no change):

https://developer.okta.com/blog/2019/05/31/simple-auth-express-fifteen-minutes#add-a-logout-route