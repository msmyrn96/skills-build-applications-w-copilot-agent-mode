import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched workouts data:', data);
        const items = data.results || data;
        setWorkouts(items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading workouts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map(workout => (
          <li key={workout.id} className="list-group-item">
            <strong>{workout.workout}</strong> - Reps: {workout.reps}
            <br />
            User: {workout.user?.name || 'Unknown'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;