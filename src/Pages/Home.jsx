// src/pages/HomePage.jsx
import React from "react";
import Sidebar from "../components/Home/Sidebar";
import Alerts from "../Components/Home/Alerts";
import HomeFeed from "../Components/Home/HomeFeed";
import AiRecommandations from "../Components/Home/AiRecommandations";
import NearbyHelpers from "../Components/Home/NearbyHelpers";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
          <Alerts />
          <HomeFeed />
          <AiRecommandations />
          <NearbyHelpers />
        </main>
      </div>
    </div>
  );
};

export default Home;
