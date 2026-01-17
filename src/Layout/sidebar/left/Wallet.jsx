import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Wallet as WalletIcon,
  Shield
} from 'lucide-react';

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('transactions');

  const balance = 245.50;
  const monthlySpent = 120.00;
  const credits = 500;

  const transactions = [
    {
      id: 1,
      type: 'payment',
      description: 'Dr. Sarah Johnson - Consultation',
      amount: -120.00,
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'completed'
    },
    {
      id: 2,
      type: 'refund',
      description: 'Cancelled Appointment Refund',
      amount: +90.00,
      date: '2024-01-14',
      time: '3:45 PM',
      status: 'completed'
    },
    {
      id: 3,
      type: 'payment',
      description: 'Health Test Package',
      amount: -49.99,
      date: '2024-01-12',
      time: '11:20 AM',
      status: 'completed'
    },
    {
      id: 4,
      type: 'topup',
      description: 'Wallet Top-up',
      amount: +200.00,
      date: '2024-01-10',
      time: '9:15 AM',
      status: 'completed'
    },
    {
      id: 5,
      type: 'payment',
      description: 'Dr. Emily Brown - Follow-up',
      amount: -150.00,
      date: '2024-01-08',
      time: '2:00 PM',
      status: 'pending'
    },
    {
      id: 6,
      type: 'reward',
      description: 'Referral Bonus',
      amount: +25.00,
      date: '2024-01-05',
      time: '4:30 PM',
      status: 'completed'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa ending in 4242',
      primary: true,
      expires: '06/25'
    },
    {
      id: 2,
      type: 'card',
      name: 'Mastercard ending in 8888',
      primary: false,
      expires: '09/24'
    },
    {
      id: 3,
      type: 'paypal',
      name: 'PayPal',
      primary: false,
      email: 'user@example.com'
    }
  ];

  const subscriptionPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 9.99,
      period: 'month',
      features: ['5 consultations/month', 'Basic health reports', 'Email support']
    },
    {
      id: 2,
      name: 'Pro',
      price: 24.99,
      period: 'month',
      popular: true,
      features: ['Unlimited consultations', 'Advanced AI insights', 'Priority support', 'Family accounts']
    },
    {
      id: 3,
      name: 'Annual Pro',
      price: 239.99,
      period: 'year',
      features: ['All Pro features', 'Save 20%', 'Free health checkup', 'Premium content']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Wallet & Payments</h1>
        <p className="text-gray-600 mt-2">Manage your payments, subscriptions, and transactions</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <button className="flex-1 bg-white text-indigo-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Add Funds
            </button>
            <button className="flex-1 border border-white text-white py-2 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500">Monthly Spending</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">${monthlySpent.toFixed(2)}</p>
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

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {['transactions', 'payment-methods', 'subscriptions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'transactions' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Filter
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Date & Time</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            transaction.type === 'payment' ? 'bg-red-50' :
                            transaction.type === 'refund' ? 'bg-green-50' :
                            transaction.type === 'topup' ? 'bg-blue-50' : 'bg-yellow-50'
                          }`}>
                            {transaction.type === 'payment' ? (
                              <ArrowUpRight className="text-red-600" size={20} />
                            ) : transaction.type === 'refund' ? (
                              <ArrowDownRight className="text-green-600" size={20} />
                            ) : transaction.type === 'topup' ? (
                              <Plus className="text-blue-600" size={20} />
                            ) : (
                              <DollarSign className="text-yellow-600" size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
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
                        <span className={`font-bold ${
                          transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status === 'completed' ? (
                            <CheckCircle size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
      )}

      {activeTab === 'payment-methods' && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus size={16} />
                Add New
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-500">
                        {method.type === 'card' ? `Expires ${method.expires}` : method.email}
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
              <h3 className="text-lg font-bold text-gray-900">Security & Privacy</h3>
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
      )}

      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Subscription Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
                plan.popular ? 'border-2 border-indigo-500 relative' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
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

                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  {plan.popular ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>

          {/* Current Subscription */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Subscription</h3>
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
      )}

      {/* Promo Section */}
      <div className="mt-8 bg-linear-to-r from-green-50 to-emerald-100 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Get 20% Off Your First Annual Plan</h3>
            <p className="text-gray-600 mt-2">Use code: HEALTH2024</p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap">
            Apply Code
          </button>
        </div>
      </div>
    </div>
  );
}