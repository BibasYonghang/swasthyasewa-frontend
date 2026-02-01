import { Route } from "react-router-dom";
import PostsLayout from "../Layout/PostsLayout.jsx";
import CreatePost from "../pages/createPost/CreatePost.jsx";

export const postsRoutes = [
  <Route element={<PostsLayout />}>
    <Route path="/create-post" element={<CreatePost />} />
  </Route>,
];
