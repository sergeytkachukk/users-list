import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ErrorComponent } from "./ErrorComponent";
import { LoadingComponent } from "./LoadingComponent";
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
const UserInformationBlock = styled.div`
  margin-bottom: 5px;
  font-style: italic;
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

export const UserInfo = () => {
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
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <UserInfoWrapper>
      <h2>User Information</h2>

      <MainInformation>
        <UserInformation>
          <UserInformationBlock>
            <strong>Id:</strong> {user.id}
          </UserInformationBlock>

          <UserInformationBlock>
            <strong>Name:</strong> {user.name}
          </UserInformationBlock>

          <UserInformationBlock>
            <strong>Email:</strong> {user.email}
          </UserInformationBlock>

          <address>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
            , {user.address.zipcode}
          </address>
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
