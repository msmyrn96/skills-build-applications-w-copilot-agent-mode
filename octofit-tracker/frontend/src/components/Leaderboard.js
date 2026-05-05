import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched leaderboard data:', data);
        const items = data.results || data;
        setLeaderboard(items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {leaderboard.map(entry => (
          <li key={entry.id} className="list-group-item">
            <strong>{entry.user?.name || 'Unknown'}</strong> - Score: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;