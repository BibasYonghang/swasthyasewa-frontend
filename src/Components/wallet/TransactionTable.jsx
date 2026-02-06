import React from "react";
import {
  Clock,
  CheckCircle,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  DollarSign,
  Receipt,
} from "lucide-react";

export default function TransactionsTable() {
  const transactions = [
    {
      id: 1,
      type: "payment",
      description: "Dr. Sarah Johnson - Consultation",
      amount: -120.0,
      date: "2024-01-15",
      time: "10:30 AM",
      status: "completed",
    },
    {
      id: 2,
      type: "refund",
      description: "Cancelled Appointment Refund",
      amount: +90.0,
      date: "2024-01-14",
      time: "3:45 PM",
      status: "completed",
    },
    {
      id: 3,
      type: "payment",
      description: "Health Test Package",
      amount: -49.99,
      date: "2024-01-12",
      time: "11:20 AM",
      status: "completed",
    },
    {
      id: 4,
      type: "topup",
      description: "Wallet Top-up",
      amount: +200.0,
      date: "2024-01-10",
      time: "9:15 AM",
      status: "completed",
    },
    {
      id: 5,
      type: "payment",
      description: "Dr. Emily Brown - Follow-up",
      amount: -150.0,
      date: "2024-01-08",
      time: "2:00 PM",
      status: "pending",
    },
    {
      id: 6,
      type: "reward",
      description: "Referral Bonus",
      amount: +25.0,
      date: "2024-01-05",
      time: "4:30 PM",
      status: "completed",
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 hover:cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          <button className="px-4 py-2 hover:cursor-pointer bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Date & Time
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          transaction.type === "payment"
                            ? "bg-red-50"
                            : transaction.type === "refund"
                              ? "bg-green-50"
                              : transaction.type === "topup"
                                ? "bg-blue-50"
                                : "bg-yellow-50"
                        }`}
                      >
                        {transaction.type === "payment" ? (
                          <ArrowUpRight className="text-red-600" size={20} />
                        ) : transaction.type === "refund" ? (
                          <ArrowDownRight
                            className="text-green-600"
                            size={20}
                          />
                        ) : transaction.type === "topup" ? (
                          <Plus className="text-blue-600" size={20} />
                        ) : (
                          <DollarSign className="text-yellow-600" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {transaction.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-gray-700">{transaction.date}</span>
                      <span className="text-gray-500">{transaction.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`font-bold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.amount >= 0 ? "+" : "-"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status === "completed" ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <Receipt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
