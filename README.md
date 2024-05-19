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