import React from "react";
import BalanceCards from "../Components/wallet/BalanceCards.jsx";
import { Outlet } from "react-router-dom";

export default function WalletLayout() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Wallet & Payments
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your payments, subscriptions, and transactions
        </p>
      </div>
      <BalanceCards />
      <Outlet />
    </div>
  );
}
