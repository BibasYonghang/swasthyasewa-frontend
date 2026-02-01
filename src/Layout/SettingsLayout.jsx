import { Outlet } from "react-router-dom";
import SettingsSidebar from "../Components/settings/SettingsSidebar";

export default function SettingsLayout() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsSidebar />
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
