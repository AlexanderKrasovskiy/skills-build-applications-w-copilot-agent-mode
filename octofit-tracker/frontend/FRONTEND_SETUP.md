# OctoFit Tracker Frontend

React-based fitness tracking application that connects to the Django REST API backend.

## Features

- **Users**: View all registered users in the system
- **Activities**: Log and view fitness activities
- **Teams**: Create and manage teams
- **Leaderboard**: See competitive rankings
- **Workouts**: Get personalized workout suggestions

## Setup

### 1. Install Dependencies

```bash
cd octofit-tracker/frontend
npm install
```

### 2. Configure Environment Variables

The frontend uses the `REACT_APP_CODESPACE_NAME` environment variable to construct the backend API URL.

In GitHub Codespaces, this is automatically available. For local development:

```bash
# Edit .env file
REACT_APP_CODESPACE_NAME=your-codespace-name
```

### 3. Start the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Architecture

### Components

- **App.js**: Main router and navigation
- **Users.js**: Display all users
- **Activities.js**: View fitness activities
- **Teams.js**: Team management
- **Leaderboard.js**: Competitive rankings
- **Workouts.js**: Suggested workouts

### API Integration

Each component fetches data from the Django REST API backend:

```
https://{CODESPACE_NAME}-8000.app.github.dev/api/{endpoint}/
```

#### Endpoints

- `/api/users/` - User list
- `/api/activities/` - Activity log
- `/api/teams/` - Team information
- `/api/leaderboard/` - Rankings
- `/api/workouts/` - Suggested workouts

### Response Handling

Components handle both:
- Paginated responses: `{ results: [...] }`
- Plain array responses: `[...]`

### Debugging

All components include `console.log()` statements that log:
- The API endpoint being called
- The fetched data
- Any errors encountered

Open the browser Developer Tools (F12) to see debug output.

## Technologies

- React 19.2.6
- React Router DOM 7.15.0
- Bootstrap 5.3.8
- Fetch API for HTTP requests

## Build

```bash
npm run build
```

Production build output will be in the `build/` directory.

## Testing

```bash
npm test
```

## Ports

- Frontend: 3000 (local development)
- Backend: 8000 (in Codespace)

## Notes

- All API calls use HTTPS in production
- CORS headers are configured on the backend to allow requests from the frontend
- The app logs all API endpoints and responses to the console for debugging
