# Frontend Testing Guide

## Pre-requisites

1. Backend Django server is running on port 8000
2. React development server is running on port 3000
3. MongoDB is populated with test data
4. Codespace name is correctly set

## Quick Testing Steps

### 1. Check Codespace URL

Before running the app, verify your codespace name:

```bash
echo $CODESPACE_NAME
```

Should output something like: `codespace-name-12345`

### 2. Test Backend API Directly

Before testing the frontend, verify the backend is accessible:

```bash
# Using curl
curl -X GET https://{CODESPACE_NAME}-8000.app.github.dev/api/

# Example:
curl -X GET https://elegant-potato-7x4qgq1q-8000.app.github.dev/api/
```

Expected response: List of available API endpoints

### 3. Test Specific Endpoints

```bash
# Users
curl -X GET https://{CODESPACE_NAME}-8000.app.github.dev/api/users/

# Activities
curl -X GET https://{CODESPACE_NAME}-8000.app.github.dev/api/activities/

# Teams
curl -X GET https://{CODESPACE_NAME}-8000.app.github.dev/api/teams/

# Leaderboard
curl -X GET https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

# Workouts
curl -X GET https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts/
```

### 4. Start Frontend Development Server

```bash
cd octofit-tracker/frontend
npm install  # if needed
npm start
```

The app will open at `http://localhost:3000`

### 5. Browser Testing

1. **Open DevTools** (F12 or right-click → Inspect)
2. **Go to Console tab** - watch for API calls and responses
3. **Navigate to each page** in the app and check:
   - Data appears correctly
   - No JavaScript errors
   - Console logs show API endpoints and data

### 6. Check Console Logs

Each component will log:

```
Fetching users from: https://{CODESPACE_NAME}-8000.app.github.dev/api/users/
Users data received: {results: Array(n)}
```

### 7. Test Network Requests

In DevTools Network tab:

1. Go to Network tab
2. Navigate to each component page
3. Look for requests to `{CODESPACE_NAME}-8000.app.github.dev`
4. Verify responses are 200 OK

## Troubleshooting

### Issue: "Cannot connect to backend"

**Solution:**

1. Verify backend is running: `ps aux | grep python`
2. Check port 8000 is forwarded and public
3. Verify CORS settings in Django settings.py
4. Check browser console for specific error messages

### Issue: "API endpoint returns 404"

**Solution:**

1. Verify endpoint exists in Django backend
2. Check URL is correct (no trailing issues)
3. Ensure MongoDB collections have data
4. Run populate_db.py if data is missing

### Issue: "CORS errors in browser"

**Solution:**

1. Ensure `django-cors-headers` is installed
2. Check `CORS_ALLOWED_ORIGINS` in settings.py includes frontend URL
3. Restart Django server after changes

### Issue: "Environment variable not set"

**Solution:**

```bash
# Set for current session
export REACT_APP_CODESPACE_NAME=$(echo $CODESPACE_NAME)

# Verify it's set
echo $REACT_APP_CODESPACE_NAME
```

## Component-Specific Tests

### Users Component

- ✓ Loads list of users
- ✓ Displays user info (username, email, name)
- ✓ Shows appropriate message if no users found

### Activities Component

- ✓ Displays table with activity data
- ✓ Shows activity type, duration, date, user
- ✓ Handles empty results gracefully

### Teams Component

- ✓ Shows team cards
- ✓ Displays team name, description, member count
- ✓ Shows creation date properly formatted

### Leaderboard Component

- ✓ Displays ranked users
- ✓ Shows rank number, user, score, activity count, total minutes
- ✓ Table formatted with proper styling

### Workouts Component

- ✓ Shows workout cards
- ✓ Displays title, description, duration, difficulty level
- ✓ Includes workout type information

## Performance Testing

Monitor performance using DevTools:

1. Performance tab → Record
2. Navigate through app pages
3. Check page load times
4. Look for API request bottlenecks

## Security Testing

1. Verify HTTPS is used (not HTTP)
2. Check that sensitive data isn't logged in console
3. Verify API requests include proper headers
4. Test CORS is working correctly

## Automated Testing

Run React tests:

```bash
npm test
```

Tests are located in `src/**/*.test.js` files.

## Debugging Tips

### Enable Network Debug Logging

Add to browser console:

```javascript
// Log all fetch requests
const originalFetch = window.fetch;
window.fetch = function (...args) {
  console.log('Fetch:', args[0]);
  return originalFetch.apply(this, args);
};
```

### View Complete API Response

```javascript
// In browser console
fetch('https://{CODESPACE_NAME}-8000.app.github.dev/api/users/')
  .then((r) => r.json())
  .then((data) => console.log(JSON.stringify(data, null, 2)));
```

### Check Current Codespace Name

```javascript
// In browser console
const codesspaceName = new URL(window.location.origin).hostname.split(
  '-',
)[0];
console.log('Codespace:', codesspaceName);
```

## Success Indicators

When everything is working:
✓ All navigation links work
✓ Data loads on each page
✓ Console shows API endpoints and data
✓ No error messages in console
✓ Bootstrap styling is applied
✓ Responsive design works on different screen sizes
✓ Network requests show 200 responses
