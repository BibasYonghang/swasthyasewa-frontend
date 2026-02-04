import React from "react";
import { CreditCard, Shield, Plus } from "lucide-react";

export default function PaymentMethods() {
  const paymentMethods = [
    {
      id: 1,
      type: "card",
      name: "Visa ending in 4242",
      primary: true,
      expires: "06/25",
    },
    {
      id: 2,
      type: "card",
      name: "Mastercard ending in 8888",
      primary: false,
      expires: "09/24",
    },
    {
      id: 3,
      type: "paypal",
      name: "PayPal",
      primary: false,
      email: "user@example.com",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus size={16} /> Add New
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CreditCard className="text-gray-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">
                    {method.type === "card"
                      ? `Expires ${method.expires}`
                      : method.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {method.primary && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    Primary
                  </span>
                )}
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Edit
                </button>
                {!method.primary && (
                  <button className="text-red-600 hover:text-red-800 font-medium">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-green-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">
            Security & Privacy
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Two-factor authentication</span>
            <button className="text-indigo-600 font-medium">Enable</button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Transaction notifications</span>
            <button className="text-indigo-600 font-medium">Manage</button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Auto-pay settings</span>
            <button className="text-indigo-600 font-medium">Configure</button>
          </div>
        </div>
      </div>
    </div>
  );
}
