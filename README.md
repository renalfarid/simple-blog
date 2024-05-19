# Brief
This Vue 3 application implements the following features:

- Composable API: Utilizes a composable API for handling API calls and managing application state. This approach helps to encapsulate logic related to API requests and responses, promoting reusability and maintainability.

- Store Management with Pinia: Employs Pinia for state management. Pinia is a lightweight and performant alternative to Vuex, providing a reactive store with a simple and intuitive API. It facilitates centralized state management across the application, enabling seamless communication between components.

- Router for Layout Management: Utilizes Vue Router to manage routing and layout for both public and private areas of the application. This allows for dynamic navigation and ensures proper rendering of components based on the current route, enhancing the overall user experience.

- Local Storage: Implements local storage for storing user-specific data, preferences, or session-related information locally in the browser. This enables persistent data storage and retrieval, enhancing performance and providing a smoother user experience, especially in scenarios where users revisit the application frequently.

By integrating these features, the frontend of the blog application achieves a modern, efficient, and user-friendly design, ensuring seamless interaction with the backend Laravel API.

Apps requirements :

- Blog posts have a title, content, author, published date, and status.
- Users have a name, email, password, and role (admin or regular user).
- Users can write blog posts.
- Users can leave comments on blog posts.
- Users can like and dislike blog posts and comments.

# Frontend Task

Using Vue.js and Tailwind, create a frontend web application that consumes the
RESTful API and allows users to perform the following actions:
- [x] Register and authenticate (login/logout).
- [x] Create, update, and delete blog posts.
- [x] Read and filter blog posts by status, author, and date.
- [x] Create, update, and delete comments on blog posts.
- [x] Like and dislike blog posts
- [x] Like and dislike blog comment

- [x] Realtime search (inside dashboard)

Notes : 
- The frontend should be responsive and user-friendly, with appropriate form
validations and error handling. Also, include appropriate authentication and
authorization mechanisms to ensure that only authenticated users can perform
certain actions (e.g., create, update, or delete blog posts).

## How to Setup

- Clone the repo
```bash
$ git clone git@gitlab.com:farid.enal/vuejs-assessment.git
```
- Setup enviroment
```bash
   create .env file
   add BASE_API_URL=<your api url>
```
- Install dependency
```bash
$ yarn install
```
- Run application
```bash
$ yarn dev
```
```
Open browser http://localhost:5173
```