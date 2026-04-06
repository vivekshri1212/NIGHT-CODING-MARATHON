# Submission Note

## Project Title

Night Coding Marathon

## Short Description

Night Coding Marathon is a full-stack interview preparation web application built using React, Express, and MongoDB. It provides user authentication, protected dashboard access, interview session management, preset learning tracks such as MERN, DSA, Java, Python, and AI, and question-based preparation flows backed by MongoDB.

## Tech Stack

- Frontend: `React`, `Vite`, `Tailwind CSS`
- Backend: `Express`, `Node.js`
- Database: `MongoDB`, `Mongoose`
- Authentication: `JWT`

## Main Features

- User signup and login
- Protected routes after authentication
- Create interview preparation sessions
- Preset tracks for `MERN`, `DSA`, `Java`, `Python`, and `AI`
- View and manage session-based questions
- MongoDB-backed persistence

## GitHub Repository

`https://github.com/vivekshri1212/NIGHT-CODING-MARATHON`

## Run Locally

Backend:

```bash
cd backend
npm install
node index.js
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Required Environment Variables

Backend `backend/.env`

```env
PORT=9000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Frontend `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:9000
```
