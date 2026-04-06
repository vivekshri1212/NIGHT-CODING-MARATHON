# Night Coding Marathon

Full-stack interview prep app with React (frontend), Express + MongoDB (backend), and Gemini-powered question generation.

## Project Structure

- `frontend/` React + Vite client
- `backend/` Express API + MongoDB models/controllers

## Backend Architecture (`backend/`)

- `index.js`: app bootstrap, middleware, route mounting, server startup
- `config/database-config.js`: MongoDB connection helper
- `routes/`
- `auth-route.js`: `/api/auth/*`
- `session-route.js`: `/api/sessions/*`
- `ai-route.js`: `/api/ai/*`
- `controller/`
- `auth-controller.js`: signup/login
- `session-controller.js`: create/list/fetch sessions
- `ai-controller.js`: generate questions/explanations
- `middlewares/auth-middleware.js`: JWT protection
- `models/`: `user`, `session`, `question` schemas
- `utils/prompts-util.js`: Gemini prompt builders

## Frontend Architecture (`frontend/src`)

- `App.jsx`: route map
- `pages/`: route-level screens (`Login`, `SignUp`, `Dashboard`, `InterviewPrep`, `LandingPage`)
- `components/`: reusable UI pieces
- `utils/axiosInstance.js`: axios client + auth header interceptor
- `utils/apiPaths.js`: single source of API endpoint strings

## Setup

### 1) Install dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

### 2) Create env files

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

### 3) Run

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Surface

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/sessions/create` (protected)
- `GET /api/sessions/my-sessions` (protected)
- `GET /api/sessions/:id` (protected)
- `POST /api/ai/generate-questions` (protected)
- `POST /api/ai/generate-explanation` (protected)

## How To Change Safely (Future Scope Friendly)

1. Add new endpoint
- Create controller function in `backend/controller/*`
- Register route in `backend/routes/*`
- Mount route in `backend/index.js` if it is a new route file
- Add matching path in `frontend/src/utils/apiPaths.js`

2. Add new DB field
- Update schema in `backend/models/*`
- Update create/update controller logic
- Update frontend form/state and card rendering

3. Add new AI flow
- Add prompt helper in `backend/utils/prompts-util.js`
- Add controller action in `backend/controller/ai-controller.js`
- Expose route in `backend/routes/ai-route.js`
- Add frontend call in page/component where needed

4. Avoid regressions
- Keep API paths centralized in `apiPaths.js`
- Keep auth token handling inside `axiosInstance.js`
- Keep route-level logic inside `pages/`, reusable blocks in `components/`

## Current Technical Notes

- Session and Question models are now defined and linked.
- JWT payload/verification both use `userId` consistently.
- Backend entrypoint is now wired to DB + API routes.
- Login form fields now correctly bind to state (`name` attributes).
- API base URL fallback now works correctly when env is missing.
