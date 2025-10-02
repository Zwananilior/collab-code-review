# Collaborative Code Review Platform

A RESTful API-driven platform that enables developers and teams to post code snippets, request feedback, and collaborate on reviews in real-time. Built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**, this platform simplifies the peer review process.

---

## ✅ Features

- Authentication & User Management (JWT)
  - Register, login, roles: `submitter`, `reviewer`, `admin`
  - Profile management
- Projects / Repositories
  - Create projects, add/remove members
- Code Submissions
  - Upload text snippets / files (text only)
  - Track status: `pending`, `in_review`, `approved`, `changes_requested`
- Comments
  - Inline (line number) + general comments
  - CRUD (with permissions)
- Review Workflow
  - Approve or request changes; review history tracking
- Notifications & Real-time
  - Activity feed endpoint + WebSocket notifications
- Analytics
  - Project-level stats (avg review time, approval rates, most commented submission)

---

## 📦 Project Structure (example)

collab-code-review/
│
├─ src/
│ ├─ controllers/
│ ├─ middleware/
│ ├─ routes/
│ ├─ db.ts
│ ├─ app.ts
│ └─ server.ts
├─ sql/
│ └─ schema.sql
├─ postman/
│ └─ collection.json
├─ .env.example
├─ package.json
└─ README.md

yaml
Copy code

---

## ⚙️ Quick Setup (local dev)

### 1. Clone repository
```bash
git clone https://github.com/your-username/collab-code-review.git
cd collab-code-review
2. Install dependencies
bash
Copy code
npm install
3. Create .env (see below)
Copy .env.example → .env and fill values.

4. Create database & run schema
Use pgAdmin or psql to create DB and run sql/schema.sql:

sql
Copy code
CREATE DATABASE collab_review;
-- then in psql or pgAdmin run:
\i sql/schema.sql
5. Start dev server
bash
Copy code
npm run dev
API: http://localhost:4000

WebSocket: ws://localhost:4050

🗄️ Database (quick overview)
sql/schema.sql should create these main tables:

users — id, name, email, password (hashed), role, avatar_url, created_at

projects — id, name, description, created_by, created_at

project_members — project_id, user_id, role

submissions — id, project_id, title, content, filename, status, submitter_id, timestamps

comments — id, submission_id, author_id, body, line_number, timestamps

reviews — id, submission_id, reviewer_id, action, comment, created_at

notifications — id, user_id, payload, read, created_at

(Use the scaffold sql/schema.sql included in the repo.)

🔐 Environment Variables (.env)
Create .env in project root (example):

env
Copy code
PORT=4000
WS_PORT=4050
DATABASE_URL=postgresql://postgres:YourPassword@localhost:5432/collab_review
JWT_SECRET=replace_with_a_strong_secret
Replace YourPassword and JWT_SECRET with your values. Do not commit .env to Git.

▶️ Run & Dev commands
Dev (auto-reload): npm run dev

Build: npm run build

Start (production): npm start

🧪 Seed data (optional)
You can create accounts via the API (recommended). If you prefer SQL seeds, create entries for projects and submissions after registering users, replacing <USER_UUID> with real user IDs:

sql
Copy code
INSERT INTO projects (id, name, description, created_by) VALUES ('11111111-1111-1111-1111-111111111111','Demo Project','Seed project', '<USER_UUID>');

INSERT INTO submissions (id, project_id, title, content, filename, submitter_id) VALUES ('22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','Sample Submission','console.log(\"hi\")','sample.js','<USER_UUID>');
📬 API Endpoints & Examples
All endpoints are prefixed with /api. Use Authorization: Bearer <token> header for protected routes.

AUTHENTICATION
Register
http
Copy code
POST /api/auth/register
Request body

json
Copy code
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "role": "submitter"
}
Response (201)

json
Copy code
{
  "id": "uuid",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "submitter"
}
Login
http
Copy code
POST /api/auth/login
Request body

json
Copy code
{
  "email": "alice@example.com",
  "password": "password123"
}
Response (200)

json
Copy code
{
  "token": "eyJ...your.jwt.token..."
}
USERS
(If you implement user CRUD, these are the expected endpoints)

Get all users
http
Copy code
GET /api/users
Get user
http
Copy code
GET /api/users/:id
Update user
http
Copy code
PUT /api/users/:id
Request body

json
Copy code
{
  "name": "Alice New",
  "email": "alice.new@example.com",
  "avatar_url": "https://..."
}
Delete user
http
Copy code
DELETE /api/users/:id
PROJECTS
Create project
http
Copy code
POST /api/projects
Request body

json
Copy code
{
  "name": "My Project",
  "description": "A project for review"
}
Response (201): created project object.

List projects
http
Copy code
GET /api/projects
Add project member
http
Copy code
POST /api/projects/:id/members
Request body

json
Copy code
{
  "userId": "uuid-of-user",
  "role": "reviewer"
}
Remove project member
http
Copy code
DELETE /api/projects/:id/members/:userId
SUBMISSIONS
Create submission
http
Copy code
POST /api/submissions
Request body (note project_id matches DB column)

json
Copy code
{
  "project_id": "project-uuid",
  "title": "Refactor auth",
  "content": "function login() { ... }",
  "filename": "auth.js"
}
Response (201): submission object

List submissions for a project
http
Copy code
GET /api/projects/:id/submissions
(If your code uses GET /api/submissions/project/:id use that route — adjust README to match your code.)

Get single submission
http
Copy code
GET /api/submissions/:id
Update submission status (approve/request)
http
Copy code
PATCH /api/submissions/:id/status
Request body

json
Copy code
{
  "status": "in_review"
}
Delete submission
http
Copy code
DELETE /api/submissions/:id
COMMENTS
Add comment (inline or general)
http
Copy code
POST /api/submissions/:id/comments
Request body (inline comment)

json
Copy code
{
  "body": "Please rename this variable for clarity.",
  "line_number": 42
}
Request body (general comment)

json
Copy code
{
  "body": "Overall this looks good."
}
List comments for submission
http
Copy code
GET /api/submissions/:id/comments
Update comment
http
Copy code
PATCH /api/comments/:id
Request body

json
Copy code
{
  "body": "Updated comment text"
}
Delete comment
http
Copy code
DELETE /api/comments/:id
REVIEW WORKFLOW
Approve a submission
http
Copy code
POST /api/submissions/:id/approve
Response

json
Copy code
{ "ok": true }
Request changes
http
Copy code
POST /api/submissions/:id/request-changes
Request body

json
Copy code
{
  "comment": "Please update tests and address edge-case X"
}
Get review history
http
Copy code
GET /api/submissions/:id/reviews
NOTIFICATIONS & STATS
User activity feed
http
Copy code
GET /api/users/:id/notifications
Project stats
http
Copy code
GET /api/projects/:id/stats
Example response (project stats)

json
Copy code
{
  "projectId": "uuid",
  "totalSubmissions": 23,
  "avgReviewTimeSeconds": 4320,
  "approvedCount": 12,
  "changesRequestedCount": 6
}
🔁 WebSockets (Real-time)
WS server listens (default) at: ws://localhost:4050

Clients can connect and optionally subscribe to project updates. Example client message:

json
Copy code
{ "type": "subscribe", "projectId": "project-uuid" }
Server pushes notifications like:

json
Copy code
{ "type": "submission_reviewed", "submissionId": "...", "status": "approved" }
🧾 Error Responses
400 Bad Request — invalid/missing fields

json
Copy code
{ "error": "Missing required field: title" }
401 Unauthorized — missing/invalid token

json
Copy code
{ "error": "Missing authorization header" }
403 Forbidden — insufficient role/permission

json
Copy code
{ "error": "Forbidden" }
404 Not Found — resource not found

json
Copy code
{ "error": "Submission not found" }
500 Internal Server Error — unexpected failure

json
Copy code
{ "error": "Internal server error" }
