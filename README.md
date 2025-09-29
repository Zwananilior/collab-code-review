# Collaborative Code Review Platform

A RESTful API-driven platform that allows developers and teams to post code snippets, request feedback, and collaborate on reviews in real-time. Built with Node.js, TypeScript, Express, and PostgreSQL, this platform simplifies the peer review process.

---

## Table of Contents
- Project Overview
- Features
- Tech Stack
- Setup Instructions
- Database Setup
- Environment Variables
- Running the Project
- API Endpoints
- Postman Usage
- Authentication
- License

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

### User Authentication & Management
- Register & login with JWT authentication.  
- Role-based access: Submitter, Reviewer.  
- Profile management.  

### Projects / Repositories
- Create, list, and manage projects.  
- Assign or remove members.  

### Code Submissions
- Upload snippets or files.  
- Track status and history.  

### Comments
- Inline or general comments.  
- CRUD operations (Submitters cannot comment).  

### Review Workflow
- Approve or request changes on submissions.  
- Track review history.  

### Notifications & Analytics
- Activity feed for users.  
- Project statistics (avg review time, most commented submissions).  

---

## Tech Stack
- Node.js + TypeScript  
- Express.js  
- PostgreSQL  
- pg-pool for DB connections  
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
Create .env file in the root folder (see below).
Setup PostgreSQL database (see Database Setup below).
Run the development server
bash
Copy code
npm run dev
Server will listen on http://localhost:4000.
WebSocket server listens on port 4050.

Database Setup
Create a new database in PostgreSQL, e.g., collab_review.

Open pgAdmin and run the provided schema.sql file to create tables:

users

projects

submissions

comments

reviews

Optionally, insert seed data for testing.

Environment Variables
Create a .env file in the root directory:

ini
Copy code
PORT=4000
WS_PORT=4050
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://postgres:YourPassword@localhost:5432/collab_review
Replace YourPassword with your PostgreSQL password.

Running the Project
Start server:

bash
Copy code
npm run dev
Open Postman to test endpoints.

Ensure your JWT token is included in requests requiring authorization.

API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login & get JWT token

Users
Method	Endpoint	Description
GET	/api/users	List all users
GET	/api/users/:id	Get user by ID
PUT	/api/users/:id	Update user profile
DELETE	/api/users/:id	Delete user

Projects
Method	Endpoint	Description
POST	/api/projects	Create project
GET	/api/projects	List all projects
POST	/api/projects/:id/members	Add member to project
DELETE	/api/projects/:id/members/:userId	Remove member from project

Submissions
Method	Endpoint	Description
POST	/api/submissions	Create submission
GET	/api/projects/:id/submissions	List submissions by project
GET	/api/submissions/:id	Get submission by ID
PUT	/api/submissions/:id/status	Update submission status
DELETE	/api/submissions/:id	Delete submission

Comments
Method	Endpoint	Description
POST	/api/submissions/:id/comments	Add comment
GET	/api/submissions/:id/comments	List comments
PUT	/api/comments/:id	Update comment
DELETE	/api/comments/:id	Delete comment

Review Workflow
Method	Endpoint	Description
POST	/api/submissions/:id/approve	Approve submission
POST	/api/submissions/:id/request-changes	Request changes
GET	/api/submissions/:id/reviews	Get review history

Notifications & Stats
Method	Endpoint	Description
GET	/api/users/:id/notifications	Get user activity feed
GET	/api/projects/:id/stats	Get project stats

Postman Usage
Import your Postman collection (if available).

Use POST /api/auth/login to get a JWT token.

Add token to Authorization → Bearer Token in Postman for all protected requests.

Test CRUD operations (users, projects, submissions, comments).

Authentication
JWT tokens are required for most endpoints.

Include header:

http
Copy code
Authorization: Bearer <your_token_here>
