# Collaborative Code Review Platform

A RESTful API-driven platform that allows developers and teams to post code snippets, request feedback, and collaborate on reviews in real-time. Built with **Node.js, TypeScript, Express, and PostgreSQL**, this platform simplifies the peer review process.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Postman Usage](#postman-usage)


---

## Project Overview

The Collaborative Code Review Platform enables:

- Uploading code snippets or files.
- Requesting reviews from team members.
- Adding inline and general comments.
- Tracking review status (`pending`, `in_review`, `approved`, `changes_requested`).
- Real-time notifications via WebSockets.
- Project-level analytics.

---

## Features

- **User Authentication & Management**
  - Register & login with JWT authentication.
  - Role-based access: `submitter`, `reviewer`.
  - Profile management.

- **Projects / Repositories**
  - Create, list, and manage projects.
  - Assign or remove members.

- **Code Submissions**
  - Upload snippets or files.
  - Track status and history.

- **Comments**
  - Inline or general comments.
  - CRUD operations (Submitters cannot comment).

- **Review Workflow**
  - Approve or request changes on submissions.
  - Track review history.

- **Notifications & Analytics**
  - Activity feed for users.
  - Project statistics (average review time, most commented submissions).

---

## Tech Stack

- Node.js + TypeScript  
- Express.js  
- PostgreSQL  
- `pg` / `pg-pool` for DB connections  
- JWT for authentication  
- WebSockets for real-time updates  

---

## Setup Instructions

### Clone the repository
```bash
git clone https://github.com/your-username/collab-code-review-platform.git
cd collab-code-review-platform
Install dependencies
bash
Copy code
npm install
Create .env file
See Environment Variables.

Run the development server
bash
Copy code
npm run dev
API server runs on: http://localhost:4000

WebSocket server runs on: ws://localhost:4050

Database Setup
Create a new PostgreSQL database:

sql
Copy code
CREATE DATABASE collab_review;
Run the provided schema.sql file in pgAdmin or psql:

sql
Copy code
\i sql/schema.sql
This will create tables:

users

projects

submissions

comments

reviews

(Optional) Insert seed data for testing.

Environment Variables
Create a .env file in the root directory:

env
Copy code
PORT=4000
WS_PORT=4050
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://postgres:YourPassword@localhost:5432/collab_review
Replace YourPassword with your PostgreSQL password.

Running the Project
Start the dev server:

bash
Copy code
npm run dev
Open Postman to test endpoints.
Use your JWT token for protected routes.

API Endpoints
Authentication
Register User
http
Copy code
POST /api/auth/register
Request Body

json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "submitter"
}
Response (201)

json
Copy code
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "submitter"
}
Login
http
Copy code
POST /api/auth/login
Request Body

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Response (200)

json
Copy code
{
  "token": "jwt-token-string"
}
Users
Get All Users
http
Copy code
GET /api/users
Get User by ID
http
Copy code
GET /api/users/:id
Update User
http
Copy code
PUT /api/users/:id
Request Body

json
Copy code
{
  "name": "John Updated",
  "email": "john_updated@example.com"
}
Delete User
http
Copy code
DELETE /api/users/:id
Projects
Create Project
http
Copy code
POST /api/projects
Request Body

json
Copy code
{
  "name": "My Project",
  "description": "Sample project"
}
List All Projects
http
Copy code
GET /api/projects
Add Member to Project
http
Copy code
POST /api/projects/:id/members
Request Body

json
Copy code
{
  "userId": "uuid"
}
Remove Member
http
Copy code
DELETE /api/projects/:id/members/:userId
Submissions
Create Submission
http
Copy code
POST /api/submissions
Request Body

json
Copy code
{
  "projectId": "uuid",
  "title": "Login Fix",
  "content": "const x = 10;"
}
List Submissions by Project
http
Copy code
GET /api/projects/:id/submissions
Get Submission by ID
http
Copy code
GET /api/submissions/:id
Update Submission Status
http
Copy code
PUT /api/submissions/:id/status
Request Body

json
Copy code
{
  "status": "in_review"
}
Delete Submission
http
Copy code
DELETE /api/submissions/:id
Comments
Add Comment
http
Copy code
POST /api/submissions/:id/comments
Request Body

json
Copy code
{
  "line": 5,
  "text": "Consider renaming this variable."
}
List Comments
http
Copy code
GET /api/submissions/:id/comments
Update Comment
http
Copy code
PUT /api/comments/:id
Request Body

json
Copy code
{
  "text": "Updated comment"
}
Delete Comment
http
Copy code
DELETE /api/comments/:id
Review Workflow
Approve Submission
http
Copy code
POST /api/submissions/:id/approve
Request Changes
http
Copy code
POST /api/submissions/:id/request-changes
Get Review History
http
Copy code
GET /api/submissions/:id/reviews
Notifications & Stats
User Activity Feed
http
Copy code
GET /api/users/:id/notifications
Project Stats
http
Copy code
GET /api/projects/:id/stats
Authentication
Most endpoints require a JWT token.

After logging in, copy the token value.

In Postman, go to:

Authorization → Bearer Token

Paste the token.

Example:

makefile
Copy code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
Postman Usage
Import the Postman collection (if available).

Register a user → /api/auth/register.

Login to get a JWT token → /api/auth/login.

Use that token for all other requests (Authorization tab → Bearer Token).

Test CRUD endpoints (Users, Projects, Submissions, Comments).


