# Full_Stack_project_6

This full-stack project combines a React front-end with a Node.js back-end to interact with the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) web service and a local MySQL database. JSONPlaceholder is a fake online REST API for testing and prototyping. ## Project Overview This project consists of two main components:
 1. **Client-Side**: A React application that provides a user interface for interacting with the JSONPlaceholder API, including the ability to view user data, todos, posts, comments, albums, and photos. Additionally, users can post new todos, delete todos, create new posts, and add comments to posts. 
 2. **Server-Side**: A Node.js server that fetches data from JSONPlaceholder and stores it in a local MySQL database. It also exposes API endpoints for the React front-end to interact with, including adding and deleting todos, creating new posts, and managing comments.

## Installation

To get started with this project, follow these steps:
### Client-Side
 To get started with the client-side React application, follow these steps:
 - Clone the repository to your local machine: 
  ```bash
  git clone <https://github.com/KobiPollak/Full_Stack_project_6>
```
- Navigate to the `client` directory:
```bash
cd client
```
- Install the project dependencies using npm or yarn:
 ```bash
npm install
#or
yarn install
```
- Start the development server:
```bash
npm start
# or
yarn start
```
### server-side
To get started with the server-side Node.js application, follow these steps:
- Navigate to the `server` directory:
```bash
cd server
```
- Install the server dependencies using npm:
```bash
npm install
```
- Start the server:
 ```bash
npm start
```
## Using the Application


### Client-Side  #### Login  - To access the client-side application, you have two options: 
1.  **Login with Existing User:**  
-  Username: Bret
-  Password: 3159 
 2.  **Create a New User:**  
 - Navigate to the user creation page. 
 - Fill in the required information for the new user, such as username, password, name, email, etc. 
 - Submit the form to create the new user. 
 #### Dashboard Once logged in, you will have access to the following features: 
 -  **User Info:** View user details. 
 -  **Todos:** View the user's to-do list and add or delete todos. 
 -  **Posts:** 
      -  **View Posts:** You can view the user's posts and comments. 
      -  **Add or Delete Post:** You can add new posts and delete your own posts.
      -  **Delete Comment:** You can delete your own comments on posts.
 ### Server-Side 
 The server-side application handles the interaction with the JSONPlaceholder API and local MySQL database. It provides the necessary API endpoints for the client-side application to perform actions like adding and deleting todos, creating new posts, and managing comments.


## Technologies Used  
-  **Client-Side:**  
   - React 
   - REST API 
 -  **Server-Side:**  
    - Node.js 
    - Express.js 
    - MySQL 
## Acknowledgments  
- Thanks to [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the mock REST API. 
