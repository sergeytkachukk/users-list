import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-conten: space-beetwen;
  border: 1px solid black;
  border-radius: 10px;
  width: max-content;
`;
const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
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
`;
const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  const fetchUserInfo = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
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
    <UserInfoWrapper>
      <h2>User Information</h2>
      <MainInformation>
        <UserInformation>
          <div>
            <strong>Id:</strong> {user.id}
          </div>
          <strong>Name:</strong> {user.name}
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
            , {user.address.zipcode}
          </div>
        </UserInformation>

        <div>
          <StyledLink to={`/`}>Back to Users List</StyledLink>

          <StyledLink to={`/user/${userId}/posts`}>View Posts</StyledLink>

          <StyledLink to={`/user/${userId}/albums`}>View Albums</StyledLink>
        </div>
      </MainInformation>
    </UserInfoWrapper>
  );
};

export default UserInfo;
