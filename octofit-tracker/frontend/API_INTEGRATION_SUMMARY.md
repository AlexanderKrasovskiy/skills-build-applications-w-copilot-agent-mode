# OctoFit Tracker Frontend - API Integration Updates

## Summary of Changes

This document outlines all updates made to the OctoFit Tracker React frontend to integrate with the Django REST API backend.

## Files Created

### Component Files (in `src/components/`)

1. **Users.js**
   - Fetches from: `/api/users/`
   - Displays user profiles (username, email, first name, last name)
   - Grid layout with Bootstrap cards

2. **Activities.js**
   - Fetches from: `/api/activities/`
   - Displays activities in a table (activity type, duration, date, user)
   - Supports pagination and plain arrays

3. **Teams.js**
   - Fetches from: `/api/teams/`
   - Displays team information (name, description, member count, creation date)
   - Card-based layout

4. **Leaderboard.js**
   - Fetches from: `/api/leaderboard/`
   - Displays ranked users with scores and activity metrics
   - Dark-themed table with ranking

5. **Workouts.js**
   - Fetches from: `/api/workouts/`
   - Shows workout suggestions (title, description, duration, difficulty, type)
   - Card-based layout

### Configuration Files

1. **.env**
   - Empty template for local configuration
   - Instructions for setting REACT_APP_CODESPACE_NAME

2. **.env.example**
   - Template showing environment variable format

3. **FRONTEND_SETUP.md**
   - Comprehensive setup and architecture documentation
   - API endpoint reference
   - Debugging instructions

## Files Modified

### App.js
- Added BrowserRouter setup from react-router-dom
- Created navigation bar with links to all components
- Set up routing with Routes component
- Home page with welcome message
- Footer with copyright information
- Bootstrap navbar with responsive design

### App.css
- Replaced original boilerplate styling
- Added navbar, card, and table styling
- Added animations and hover effects
- Flexbox layout for footer positioning
- Responsive design enhancements

### index.js
- Already properly configured (no changes needed)
- Uses Bootstrap CSS
- Renders App component with React.StrictMode

## API Integration Features

### URL Construction
```javascript
const codesspaceName = process.env.REACT_APP_CODESPACE_NAME || 
  window.location.hostname.split('-')[0];
const apiUrl = `https://${codesspaceName}-8000.app.github.dev/api/{endpoint}/`;
```

### Response Handling
All components handle both response formats:
- Paginated: `data.results`
- Plain array: `data`

### Console Logging
Each component includes logging for:
- API endpoint being called
- Fetched data
- Error messages

Example:
```javascript
console.log(`Fetching users from: ${apiUrl}`);
console.log('Users data received:', data);
console.error('Error fetching users:', error);
```

## Component Structure

```
src/
├── App.js (main router with navigation)
├── App.css (styling)
├── index.js (React DOM rendering)
├── components/
│   ├── Users.js
│   ├── Activities.js
│   ├── Teams.js
│   ├── Leaderboard.js
│   └── Workouts.js
```

## Navigation Routes

- `/` - Home page
- `/users` - Users listing
- `/activities` - Activities log
- `/teams` - Teams information
- `/leaderboard` - Leaderboard rankings
- `/workouts` - Suggested workouts

## Dependencies

All required dependencies are already in `package.json`:
- react@19.2.6
- react-dom@19.2.6
- react-router-dom@7.15.0
- bootstrap@5.3.8

## Running the Application

```bash
cd octofit-tracker/frontend

# Install dependencies (if not already installed)
npm install

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

## Debugging

1. Open browser DevTools (F12)
2. Go to Console tab
3. Each component logs:
   - API endpoint URLs
   - Raw fetched data
   - Any error messages

Example console output:
```
Fetching users from: https://codespace-name-8000.app.github.dev/api/users/
Users data received: [{id: 1, username: "user1", ...}]
```

## Notes

- All components use HTTPS in GitHub Codespaces
- Backend CORS must be configured to allow frontend requests
- Each component independently manages its own state (loading, error, data)
- Bootstrap classes are used for responsive design
- React Router v7 syntax is used (no useRoutes hook needed)

## Next Steps

1. Ensure backend is running and accessible at the correct URL
2. Verify MongoDB is populated with test data
3. Check CORS settings in Django backend
4. Open browser DevTools to monitor API requests
5. Test each navigation link to verify data fetching
