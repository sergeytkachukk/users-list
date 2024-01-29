import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import styled from "styled-components";

const UsersPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  text-decoration: none;
  margin: 10px;
  color: black;
  width: max-content;
`;
const PostInformation = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 20px;
  margin-right: 40px;
`;

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  const fetchUserPosts = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched posts:", data);
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <UsersPostWrapper>
      <h2>User Posts</h2>
      <StyledLink to={`/user/${userId}`}>Back to User</StyledLink>
      <ul>
        {posts.map((post) => (
          <PostInformation key={post.id}>
            <h2>
              {post.title
                ? post.body.charAt(0).toUpperCase() + post.body.slice(1)
                : ""}
            </h2>
            <p>
              {post.body
                ? post.body.charAt(0).toUpperCase() + post.body.slice(1)
                : ""}
            </p>
          </PostInformation>
        ))}
      </ul>
    </UsersPostWrapper>
  );
};

export default UserPosts;
