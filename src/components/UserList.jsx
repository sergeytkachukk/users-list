import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorComponent } from "./ErrorComponent";
import { LoadingComponent } from "./LoadingComponent";
import styled from "styled-components";

const UsersListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputStyling = styled.input`
  border: 1px solid black;
  padding: 6px;
  border-radius: 10px;
`;
const StyledSelect = styled.select`
  border: 1px solid black;
  padding: 5px;
  border-radius: 10px;
  margin-left: 5px;
`;
const UsersListUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const UsersListLi = styled.li`
  display: flex;
  text-decoration: none;
`;
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: black;
  margin: 5px;
`;

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    return a.username.localeCompare(b.username) * order;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <UsersListWrapper>
      <h2>User List</h2>

      <div>
        <InputStyling
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <StyledSelect value={sortOrder} onChange={handleSortClick}>
          <option value="asc">Sort Ascending</option>
          <option value="desc">Sort Descending</option>
        </StyledSelect>
      </div>

      <UsersListUl>
        {sortedUsers.map((user) => (
          <UsersListLi key={user.id}>
            <StyledLink to={`/user/${user.id}`}>{user.username}</StyledLink>
          </UsersListLi>
        ))}
      </UsersListUl>
    </UsersListWrapper>
  );
};
