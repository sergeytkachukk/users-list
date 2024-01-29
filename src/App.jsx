import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import UserPosts from "./components/UserPosts";
import UserAlbums from "./components/UserAlbums";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<UserList />} />
        <Route path="/user/:userId/posts" Component={UserPosts} />
        <Route path="/user/:userId/albums" element={UserAlbums} />
      </Routes>
    </Router>
  );
};

export default App;
