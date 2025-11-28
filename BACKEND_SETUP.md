# Backend Setup Guide

## Overview
This project now uses a Node.js + Express backend server to handle GitHub OAuth token exchange securely, avoiding CORS issues.

## Backend Server

The backend server runs on port **3001** and handles the GitHub OAuth token exchange.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Frontend & Backend (shared)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GITHUB_CLIENT_ID=your_github_client_id_here
VITE_GITHUB_CLIENT_SECRET=your_github_client_secret_here
VITE_GITHUB_REDIRECT_URI=http://localhost:8080/auth/github/callback

# Backend (optional)
BACKEND_PORT=3001
```

**Note:** 
- `VITE_GITHUB_CLIENT_ID` - Your GitHub OAuth Client ID
- `VITE_GITHUB_CLIENT_SECRET` - Your GitHub OAuth Client Secret (keep this secure!)
- `VITE_GITHUB_REDIRECT_URI` - Should match your GitHub OAuth app callback URL exactly
- The backend reads these from `.env` using dotenv (VITE_ prefix is fine for backend too)

## Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:backend
```

### Option 2: Run Both Servers Together (Recommended)

```bash
npm run dev:all
```

This will start both the Vite dev server (port 8080) and the Express backend (port 3001) simultaneously.

## Backend Endpoint

The backend provides the following endpoint:

- **GET/POST** `/oauth/github?code={code}`
  - Exchanges GitHub authorization code for access token
  - Returns JSON with `access_token` and other OAuth data
  - Handles errors and returns appropriate status codes

## Vite Proxy Configuration

The Vite dev server is configured to proxy `/oauth/*` requests to the backend server at `http://localhost:3001`. This means:

- Frontend calls: `http://localhost:8080/oauth/github?code=...`
- Vite proxies to: `http://localhost:3001/oauth/github?code=...`

## Security Notes

1. **Client Secret**: The GitHub Client Secret is now stored securely in the backend `.env` file and never exposed to the frontend.

2. **CORS**: The backend is configured to accept requests only from `http://localhost:8080` in development.

3. **Production**: For production, update:
   - CORS origin to your production domain
   - `GITHUB_REDIRECT_URI` to your production callback URL
   - Use environment-specific `.env` files

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Verify `.env` file exists with required variables
- Check console for error messages

### CORS errors
- Ensure backend is running on port 3001
- Check that Vite proxy is configured correctly
- Verify CORS origin in `server.js` matches your frontend URL

### Authentication fails
- Verify GitHub OAuth app callback URL matches `VITE_GITHUB_REDIRECT_URI`
- Check that `VITE_GITHUB_CLIENT_ID` and `VITE_GITHUB_CLIENT_SECRET` are correct
- Check backend console for detailed error messages

