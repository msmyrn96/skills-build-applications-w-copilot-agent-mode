import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
    console.log('Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched teams data:', data);
        const items = data.results || data;
        setTeams(items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map(team => (
          <li key={team.id} className="list-group-item">
            <strong>{team.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;