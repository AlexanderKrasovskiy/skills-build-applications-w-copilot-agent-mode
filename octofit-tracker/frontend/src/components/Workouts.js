import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Get the codespace name from environment or use current host
        const codesspaceName = process.env.REACT_APP_CODESPACE_NAME || 
          window.location.hostname.split('-')[0];
        
        const apiUrl = `https://${codesspaceName}-8000.app.github.dev/api/workouts/`;
        console.log(`Fetching workouts from: ${apiUrl}`);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated responses (.results) and plain arrays
        const workoutsList = data.results || data;
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading workouts...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Suggested Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Duration (min)</th>
              <th>Difficulty</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length > 0 ? (
              workouts.map(workout => (
                <tr key={workout.id}>
                  <td>{workout.id}</td>
                  <td>{workout.title}</td>
                  <td>{workout.description}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.difficulty_level}</td>
                  <td>{workout.workout_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No workouts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
