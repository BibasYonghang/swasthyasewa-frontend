// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Home/Sidebar";
// import HomeFeed from "../components/Home/HomeFeed";
// import NearbyHelpers from "../components/Home/NearbyHelpers";
// import Alerts from "../components/Home/Alerts";
import AiRecommendations from "../Components/Home/AiRecommandations";
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
          {/* Alerts */}
          {/* <Alerts /> */}

          {/* Home Feed */}
          {/* <HomeFeed /> */}

          {/* AI Recommendations */}
          <AiRecommendations />

          {/* Nearby Helpers */}
          {/* <NearbyHelpers /> */}
        </main>
      </div>
    </div>
  );
};

export default Home;
