import React from "react";
import { CheckCircle } from "lucide-react";

export default function Subscriptions() {
  const subscriptionPlans = [
    {
      id: 1,
      name: "Basic",
      price: 9.99,
      period: "month",
      features: [
        "5 consultations/month",
        "Basic health reports",
        "Email support",
      ],
    },
    {
      id: 2,
      name: "Pro",
      price: 24.99,
      period: "month",
      popular: true,
      features: [
        "Unlimited consultations",
        "Advanced AI insights",
        "Priority support",
        "Family accounts",
      ],
    },
    {
      id: 3,
      name: "Annual Pro",
      price: 239.99,
      period: "year",
      features: [
        "All Pro features",
        "Save 20%",
        "Free health checkup",
        "Premium content",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Subscription Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${plan.popular ? "border-2 border-indigo-500 relative" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-500 ml-2">/{plan.period}</span>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <button
              className={`w-full py-3 rounded-lg font-medium transition-colors ${plan.popular ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            >
              {plan.popular ? "Get Started" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* Current Subscription */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Current Subscription
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-gray-900 font-medium">Pro Monthly Plan</p>
            <p className="text-gray-600 text-sm">Next billing: Feb 15, 2024</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Change Plan
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
