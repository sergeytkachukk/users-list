import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  const fetchUserAlbums = () => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setAlbums(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserAlbums();
  }, [userId]); // Update albums when userId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Albums</h2>
      <Link to={`/user/${userId}`}>Back to User</Link>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <h3>{album.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAlbums;
