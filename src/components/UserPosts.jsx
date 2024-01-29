import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract userId from the URL params
  const { userId } = useParams();

  const fetchUserPosts = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched posts:', data);
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Fetch user posts when the component mounts
  useEffect(() => {
    fetchUserPosts();
  }, [userId]); // Update posts when userId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Posts</h2>
      <Link to={`/`}>Back to Users</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
