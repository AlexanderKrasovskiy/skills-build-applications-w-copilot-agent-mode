import { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Get the codespace name from environment or use current host
        const codesspaceName = process.env.REACT_APP_CODESPACE_NAME || 
          window.location.hostname.split('-')[0];
        
        const apiUrl = `https://${codesspaceName}-8000.app.github.dev/api/leaderboard/`;
        console.log(`Fetching leaderboard from: ${apiUrl}`);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated responses (.results) and plain arrays
        const leaderboardList = data.results || data;
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
        
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading leaderboard...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
              <th>Activities</th>
              <th>Total Minutes</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.username || entry.user}</td>
                  <td>{entry.score || 0}</td>
                  <td>{entry.activity_count || 0}</td>
                  <td>{entry.total_minutes || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No leaderboard data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
