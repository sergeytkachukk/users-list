import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  const fetchUserInfo = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <div>
        <strong>Id:</strong> {user.id}
      </div>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}
      </div>
      <div>
        <Link to={`/`}>Back to Users List</Link>
      </div>
      <div>
        <Link to={`/user/${userId}/posts`}>View Posts</Link>
      </div>
      <div>
        <Link to={`/user/${userId}/albums`}>View Albums</Link>
      </div>
    </div>
  );
};

export default UserInfo;
