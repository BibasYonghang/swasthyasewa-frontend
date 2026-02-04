import React from "react";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Shield,
  Wallet as WalletIcon,
} from "lucide-react";

export default function BalanceCards() {
  const balance = 245.5;
  const monthlySpent = 120.0;
  const credits = 500;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Balance */}
      <div className="bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-indigo-200">Available Balance</p>
            <p className="text-3xl font-bold mt-2">${balance.toFixed(2)}</p>
            <p className="text-indigo-200 text-sm mt-2">+$45.50 this month</p>
          </div>
          <WalletIcon size={32} />
        </div>
        <div className="flex gap-2 mt-6">
          <button className="flex-1 hover:cursor-pointer bg-white text-indigo-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Add Funds
          </button>
          <button className="flex-1 hover:cursor-pointer border border-white text-white py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      {/* Monthly Spending */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-500">Monthly Spending</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${monthlySpent.toFixed(2)}
            </p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg">
            <DollarSign className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="text-green-600" size={16} />
          <span className="text-green-600">15% less than last month</span>
        </div>
      </div>

      {/* Credits */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-500">Health Credits</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{credits}</p>
          </div>
          <div className="p-2 bg-green-50 rounded-lg">
            <CreditCard className="text-green-600" size={24} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="text-green-600" size={16} />
          <span className="text-green-600">Earned through activities</span>
        </div>
      </div>
    </div>
  );
}
