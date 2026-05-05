import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;
    console.log('Fetching from:', apiUrl);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users data:', data);
        const items = data.results || data;
        setUsers(items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <strong>{user.name}</strong> - {user.email}
            <br />
            Team: {user.team?.name || 'Unknown'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;