## Blog Engine Project in 72 hours
#### React, Node.js, Express.js, SQLite

### Overview

Blog engine that allows for multi-user login via Okta NodeJS OIDC Middleware for authentication. Once a user has registered, they will be taken to their Admin page. Here they may create 0-many blogs. Once a blog is created, they may edit or delete the blog. From there, a user can click "Posts" to be taken to the post blog page for that blog. There, they may create, edit, or delete a post.

Posts may be commented on if a user is logged in. If a user is not logged in, they are still able to view blogs and posts. 

Home page has a nice feature that displays 3 random blogs giving it's bloggers visibility to anyone curiously viewing the home page.


### Installation

#### Step 1:
Install `node` and `npm` if you haven't already. 
`node` resource link for installation: https://nodejs.org/en/download/
`npm` resource link for installation: https://www.npmjs.com/get-npm 

#### Step 2: 
Download this repository onto your local machine.

#### Step 3:
Create a free account with Okta (for authentication, login and logout): https://developer.okta.com/.

#### Step 4:
After logging into Okta, you will need to configure it. 
 - In the top left-hand corner, copy your `Org URL`.
 - In the environment file of this project, paste in your `Org URL` for `OKTA_ORG_URL`
 - Click `Applications` in the navbar
 - Click `Add Application`
 - Select `Web` and click `next`
 - Fill out the form accordingly:
    - `Name`: pick a name that makes sense for your application
    - `Base URIs`: use `http://localhost:3000/`
    - `Login redirect URIs`: use `http://localhost:3000/authorization-code/callback`
    - `Group assignments`: use `Everyone` (should default to this value)
    - `Grant type allowed`: check `Authorization Code`
    - Click `Done`
 - Next your `Client ID` and `Client secret` will pop up at the bottom of the screen, insert those values into the `environment` file under `OKTA_CLIENT_ID` and `OKTA_CLIENT_SECRET` accordingly, in single quotes.

#### Step 5:
We need to finish setting up the enviornment file in order for the application to run properly. At this point, you should have everything filled in except `OKTA_TOKEN` and `RANDOM_SECRET_WORD`. 

##### Step 5a.
You may choose your `RANDOM_SECRET_WORD` as anything you like, but please consider using a strong password generator. Enter your secret word in single quotes. 

##### Step 5b.
Generate `OKTA_TOKEN`:
 - Login to your Okta account
 - Hover over `API` in navbar and click `Tokens`
 - On the left side of the screen, click `Create Token`
 - A popup box will appear asking you to name your token. Pick something that makes sense for your project - maybe something related to how you named your Okta application
 - Next, a `Token Value` will pop up, use the editor to copy the token, and insert it into the `environment` file under `OKTA_TOKEN`

#### Step 6:
All dependencies have been neatly set up for you in the `package.json` file. Instead of installing dependencies one by one, you may simply type the following command from your project directory folder:

`npm install`

Note the date of this repository. If you run into errors, consider checking the recent versions and updating the `package.json` file.


#### Step 7: 
To run the application, use the following command:

`node index.js`

#### Step 8: 
Open up your browser to `http://localhost:3000/` and enjoy!



#### FEATURES CREATED:
- Admin, home, and register pages created using Okta
- Multiuser login
- Mulitple bloggers each with their own 'blog space'
- Bloggers can create, delete, edit & retrieve blogs
- Get, post, put, delete API built
- Create posts in blog
- Fixed CSS/Bootstrap for registration page
- Landing/home page generates 3 random blogs and displays to any user (logged in or not)
- Viewing and commenting on blog posts allowed for users logged in
- Viewing of posts/comments (for users not logged in)
- Refactored code - as per necessary, avoided premature optimization
- Explanatory comments at top of files
- Docs on application design
- Error handling check/creation

#### TODO:
- Theming for bloggers

#### STRETCH:
- ERD & Swim lane diagrams
- Header changes per page
- Login for commenting - new registration page
- API docs


### ATTRIBUTION
##### Single blog page tutorial:

https://www.digitalocean.com/community/tutorials/build-a-blog-using-expressjs-and-react-in-30-minutes

Changes from this attribution:
 - Database tables 
 - Not using `epilogue` (created RESTful API to have control over the user)

##### Registration page tutorial:

https://developer.okta.com/blog/2019/05/31/simple-auth-express-fifteen-minutes

Changes from this attribution:
 - Attribution uses `mustache`, whereas this implementation uses `React`
 - No use of `render`
 - Instead of `'/'` redirecting to `'/register'` we explicitly create a route to `'/register'`
    - Other logic is changed in this accordingly in `index.js` line 86-112

##### Logout functionality (virtually no change):

https://developer.okta.com/blog/2019/05/31/simple-auth-express-fifteen-minutes#add-a-logout-route