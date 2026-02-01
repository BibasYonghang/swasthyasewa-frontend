import { BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "./redux/auth/AuthSlice.jsx";
import ScrollToTop from "./Components/Shared/ScrollToTop.jsx";

import { authRoutes } from "./routes/auth.routes.jsx";
import { mainRoutes } from "./routes/main.routes.jsx";
import { profileRoutes } from "./routes/profile.routes.jsx";
import { personalPlansRoutes } from "./routes/personalPlans.routes.jsx";
import { postsRoutes } from "./routes/posts.routes.jsx";
import { adminRoutes } from "./routes/admin.routes.jsx";
import { settingsRoutes } from "./routes/settings.routes.jsx";
import { otherRoutes } from "./routes/other.routes.jsx";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {authRoutes}
        {mainRoutes}
        {profileRoutes}
        {personalPlansRoutes}
        {postsRoutes}
        {adminRoutes}
        {settingsRoutes}
        {otherRoutes}
      </Routes>
    </Router>
  );
}

export default AppContent;
