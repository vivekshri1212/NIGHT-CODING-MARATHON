# Frontend

React + Vite client for Night Coding Marathon.

## Commands

```bash
npm install
npm run dev
npm run build
```

## Environment

Create `.env` in this folder:

```env
VITE_API_BASE_URL=http://localhost:9000
```

## Key Files

- `src/App.jsx`: route declarations
- `src/pages/`: route-level screens
- `src/components/`: reusable UI components
- `src/utils/apiPaths.js`: frontend endpoint constants
- `src/utils/axiosInstance.js`: axios client + token interceptor

For full project architecture and backend setup, see root `README.md`.
