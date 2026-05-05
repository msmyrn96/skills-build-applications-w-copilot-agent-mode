import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
    console.log('Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched activities data:', data);
        const items = data.results || data;
        setActivities(items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map(activity => (
          <li key={activity.id} className="list-group-item">
            <strong>{activity.activity}</strong> - Duration: {activity.duration} min
            <br />
            User: {activity.user?.name || 'Unknown'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;