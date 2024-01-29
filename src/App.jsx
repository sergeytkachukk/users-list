import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserInfo from "./components/UserInfo";
import UserPosts from "./components/UserPosts";
import UserAlbums from "./components/UserAlbums";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:userId" element={<UserInfo />} />
        <Route path="/user/:userId/albums" element={<UserAlbums />} />
        <Route path="/user/:userId/posts" element={<UserPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
