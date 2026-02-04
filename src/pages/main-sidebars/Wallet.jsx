import React, { useState } from "react";
import TransactionsTable from "../../Components/wallet/TransactionTable.jsx";
import PaymentMethods from "../../Components/wallet/PaymentMethods.jsx";
import Subscriptions from "../../Components/wallet//Subscriptions.jsx";
import PromoBanner from "../../Components/wallet//PromoBanner.jsx";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("transactions");

  return (
    <>
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {["transactions", "payment-methods", "subscriptions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 hover:cursor-pointer rounded-md text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "transactions" && <TransactionsTable />}
      {activeTab === "payment-methods" && <PaymentMethods />}
      {activeTab === "subscriptions" && <Subscriptions />}
      <PromoBanner />
    </>
  );
}
