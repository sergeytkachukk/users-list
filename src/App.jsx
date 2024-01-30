import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { UserList } from "./components/UserList";
import { UserInfo } from "./components/UserInfo";
import { UserPosts } from "./components/UserPosts";
import { UserAlbums } from "./components/UserAlbums";

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  max-width: 100%;
  min-height: 100vh;
  padding: 0 30px 0 30px;
  background-color: #f0ffff;
`;

const App = () => {
  return (
    <HomePageWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:userId" element={<UserInfo />} />
          <Route path="/user/:userId/albums" element={<UserAlbums />} />
          <Route path="/user/:userId/posts" element={<UserPosts />} />
        </Routes>
      </Router>
    </HomePageWrapper>
  );
};

export default App;
