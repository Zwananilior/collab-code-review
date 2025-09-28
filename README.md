# Collaborative Code Review Platform (API scaffold)

This is a TypeScript + Node.js scaffold for the Collaborative Code Review Platform intended for the assessment.
It includes a PostgreSQL schema, basic Express routes skeleton, JWT authentication skeleton, and Postman collection.

## What's included
- TypeScript Node project structure
- PostgreSQL schema (sql/schema.sql)
- Example .env
- Basic routes: auth, projects, submissions, comments
- WebSocket server skeleton for real-time updates
- Postman collection for working with the API (postman/collection.json)

## Quick setup (Postman + pgAdmin)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill values (database URL, JWT secret).
3. Create database in pgAdmin (`collab_review`) and run `sql/schema.sql` to create tables.
4. Start dev server:
   ```bash
   npm run dev
   ```
5. Import the Postman collection at `postman/collection.json`.

## Notes
- This scaffold is intentionally minimal and designed to help you complete the full assessment quickly.
- Add input validation, permission checks, tests, and production hardening as required by your rubric.

