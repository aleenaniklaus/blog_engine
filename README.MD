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
- landing page started
TODO:
- allow commenting on blog posts
- login for commenting - new registration page
- theming for bloggers
STRETCH:
- create 'reader' user who logs in to comment on posts
- landing page for blog engine

Single blog page tutorial attribution:
https://www.digitalocean.com/community/tutorials/build-a-blog-using-expressjs-and-react-in-30-minutes

Registration page tutorial attribution (not built for React):
https://developer.okta.com/blog/2019/05/31/simple-auth-express-fifteen-minutes

Logout functionality:
https://developer.okta.com/blog/2019/05/31/simple-auth-express-fifteen-minutes#add-a-logout-route