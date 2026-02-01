import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Palette,
  Download,
  Upload,
  Trash2,
  Key,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
} from "lucide-react";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reminders: true,
    healthAlerts: true,
    promotional: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Bibas Yonghang",
    email: "bibas.yonghang@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-01",
    gender: "male",
    height: "175",
    weight: "70",
    emergencyContact: "+1 (555) 987-6543",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const settingsSections = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
    { id: "privacy", label: "Privacy", icon: <Lock size={20} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={20} /> },
    { id: "language", label: "Language", icon: <Globe size={20} /> },
    { id: "data", label: "Data Management", icon: <Download size={20} /> },
    {
      id: "devices",
      label: "Connected Devices",
      icon: <Smartphone size={20} />,
    },
  ];

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  const exportData = () => {
    alert("Data export initiated. You will receive an email shortly.");
  };

  const deleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      alert("Account deletion requested. We will email you confirmation.");
    }
  };

  return (
    <div className="h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col h-screen lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center hover:cursor-pointer gap-3 px-3 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={
                        activeSection === section.id
                          ? "text-indigo-600"
                          : "text-gray-500"
                      }
                    >
                      {section.icon}
                    </span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {activeSection === "profile" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Profile Information
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Update your personal details
                      </p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center gap-2">
                          <Mail className="text-gray-400" size={20} />
                          <input
                            type="email"
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="flex items-center gap-2">
                          <Smartphone className="text-gray-400" size={20} />
                          <input
                            type="tel"
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              dateOfBirth: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        <select
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.gender}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Height (cm)
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.height}
                          onChange={(e) =>
                            setFormData({ ...formData, height: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Weight (kg)
                        </label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.weight}
                          onChange={(e) =>
                            setFormData({ ...formData, weight: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact
                        </label>
                        <input
                          type="tel"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={formData.emergencyContact}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              emergencyContact: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {key === "email" &&
                              "Receive notifications via email"}
                            {key === "push" &&
                              "Push notifications on your device"}
                            {key === "sms" && "Text message notifications"}
                            {key === "reminders" &&
                              "Health reminder notifications"}
                            {key === "healthAlerts" &&
                              "Important health alerts"}
                            {key === "promotional" &&
                              "Promotional offers and updates"}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleNotification(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? "bg-indigo-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Security Settings
                  </h2>
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Key className="text-gray-600" size={24} />
                        <h3 className="text-lg font-bold text-gray-900">
                          Change Password
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.current ? "text" : "password"}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("current")
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPassword.current ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.new ? "text" : "password"}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility("new")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPassword.new ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword.confirm ? "text" : "password"}
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              type="button"
                              onClick={() =>
                                togglePasswordVisibility("confirm")
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPassword.confirm ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Update Password
                      </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-gray-600 mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    {/* Login History */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Recent Login Activity
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              Chrome on Windows
                            </p>
                            <p className="text-sm text-gray-500">
                              New York, USA • 2 hours ago
                            </p>
                          </div>
                          <span className="text-green-600 font-medium">
                            Current
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              Safari on iPhone
                            </p>
                            <p className="text-sm text-gray-500">
                              New York, USA • 1 day ago
                            </p>
                          </div>
                          <button className="text-red-600 font-medium">
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Management Section */}
              {activeSection === "data" && (
                <div className="p-6 overflow-x-auto">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Data Management
                  </h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Download className="text-gray-600" size={24} />
                        <h3 className="text-lg font-bold text-gray-900">
                          Export Your Data
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Download a copy of all your health data, reports, and
                        activity history.
                      </p>
                      <button
                        onClick={exportData}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        <Download size={16} />
                        Request Data Export
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Upload className="text-gray-600" size={24} />
                        <h3 className="text-lg font-bold text-gray-900">
                          Import Health Data
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Upload health data from other platforms or devices.
                      </p>
                      <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Select File to Upload
                      </button>
                    </div>

                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <div className="flex items-center gap-3 mb-4">
                        <Trash2 className="text-red-600" size={24} />
                        <h3 className="text-lg font-bold text-red-900">
                          Delete Account
                        </h3>
                      </div>
                      <p className="text-red-700 mb-4">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>
                      <button
                        onClick={deleteAccount}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Section */}
              {activeSection === "appearance" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Appearance Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Moon className="text-gray-600" size={24} />
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              Dark Mode
                            </h3>
                            <p className="text-gray-600 mt-1">
                              Switch between light and dark themes
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            darkMode ? "bg-indigo-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              darkMode ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Palette className="text-gray-600" size={24} />
                        <h3 className="text-lg font-bold text-gray-900">
                          Theme Colors
                        </h3>
                      </div>
                      <div className="flex gap-3">
                        {["indigo", "blue", "green", "purple", "orange"].map(
                          (color) => (
                            <button
                              key={color}
                              className={`w-10 h-10 rounded-full border-2 ${
                                color === "indigo"
                                  ? "border-indigo-600"
                                  : "border-gray-300"
                              } ${color === "indigo" ? "bg-indigo-600" : `bg-${color}-500`}`}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
