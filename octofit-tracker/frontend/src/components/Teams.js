import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Get the codespace name from environment or use current host
        const codesspaceName = process.env.REACT_APP_CODESPACE_NAME || 
          window.location.hostname.split('-')[0];
        
        const apiUrl = `https://${codesspaceName}-8000.app.github.dev/api/teams/`;
        console.log(`Fetching teams from: ${apiUrl}`);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated responses (.results) and plain arrays
        const teamsList = data.results || data;
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container mt-5"><div className="alert alert-info">Loading teams...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {teams.length > 0 ? (
              teams.map(team => (
                <tr key={team.id}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td>{team.members?.length || 0}</td>
                  <td>{new Date(team.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No teams found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
