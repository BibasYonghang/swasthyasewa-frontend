import React from "react";
import { Outlet } from "react-router-dom";
import Wallet from "./sidebar/left/Wallet.jsx";

export default function WalletLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Wallet />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
