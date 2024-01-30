import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ErrorComponent } from "./ErrorComponent";
import { LoadingComponent } from "./LoadingComponent";
import styled from "styled-components";

const UsersAlbumsWrapper = styled.div`
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

const AlbumsInformation = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 20px;
  margin-right: 40px;
`;

export const UserAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  const fetchUserAlbums = () => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserAlbums();
  }, [userId]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <UsersAlbumsWrapper>
      <h2>User Albums</h2>

      <StyledLink to={`/user/${userId}`}>Back to User</StyledLink>

      <ul>
        {albums.map((album) => (
          <AlbumsInformation key={album.id}>
            <h3>
              {album.title
                ? album.title.charAt(0).toUpperCase() + album.title.slice(1)
                : ""}
            </h3>
          </AlbumsInformation>
        ))}
      </ul>
    </UsersAlbumsWrapper>
  );
};
