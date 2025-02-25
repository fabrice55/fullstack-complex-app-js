# Complex App

This a fullstack javaScript blog web app in which you can do the following:

- You can register and authentic your account,
- You can CRUD your post,
- You can search posts,
- You can view other users' posts,
- You can follow and unfollow users,
- You can chat with users that are online.
- **ATTENTION**: This web app leverages gravatar(Globally Recognized Avatar) services for its user profile picture feature.
https://gravatar.com/gravatar

## Run the app locally

1. Clone the repository
2. Run `npm install` to install all the dependencies.
3. Create a .env file and give it the following variables:

- **CONNECTIONSTRING:** your mongoDB URI,
- **PORT:** viable port value,
- **JWTSECRET:** provide your JSON Web Token secret,
- **RESENDAPIKEY:** API key for the Resend email service,
- **TO_EMAIL:** the email you signed up with https://resend.com

4. Run `npm run watch` to start the server.

## Render Deployment URL

https://fullstack-complex-app-js.onrender.com/

**ATTENTION:** As it is on the free plan, render's services goes to sleep when there is no traffic every 15 min and there is a delay when trying to access it or you might need to reload it.

## APIs Documentation


### Headers

- **Key:** Content-Type, **Value:** application/json


### User Login

- **URL:** /api/login
- **Method:** POST
- **Request Body:** {"username": "string", "password": "string"}
- **Response {JSON}:** {message: "Login successful", "token": "string"}


### Create Post

- **URL:** /api/create-post
- **Method:** POST
- **Request Body:** {"title":"string", "body": "string", "token": "string"}
- **Response {JSON}:** {"message": "success", createdPost:{"title": "string", "body": "string"}}


### Delete Post

- **URL:** /api/post/:id
- **Method:** DELETE
- **Request Body:** {"token":"string"}
- **Response {JSON}:** {"message": "success", deletedPostId:{"id": "string"}}


### Get all Posts from Author

- **URL:** /api/postsByAuthor/:username
- **Method:** GET
- **Request Body:** {"token":"string"}
- **Response {JSON}:** [
    {
        "_id": "string",
        "title": "tring",
        "body": "string",
        "createdDate": "date",
        "author": {
            "username": "string",
            "avatar": "https://gravatar.com/avatar/dad434caccc90924bbb5ea2d127c1092?s=128"
            },
        "isVisitorOwner": boolean
    }
]

- **More APIs might be added later!!!**

### Special thanks to Mr. Brad Schiff

I recommend his javaScript Udemy course, he is a great instuctor.

https://www.udemy.com/user/bradschiff/