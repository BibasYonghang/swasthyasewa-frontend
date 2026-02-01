import { Route } from "react-router-dom";
import SettingsLayout from "../Layout/SettingsLayout.jsx";
import ProfileSettings from "../pages/settings/ProfileSettings.jsx";
import NotificationSettings from "../pages/settings/NotificationSettings.jsx";
import SecuritySettings from "../pages/settings/SecuritySettings.jsx";
import AppearanceSettings from "../pages/settings/AppearanceSettings.jsx";
import DataSettings from "../pages/settings/DataSettings.jsx";

export const settingsRoutes = [
  <Route path="/settings" element={<SettingsLayout />}>
    <Route index element={<ProfileSettings />} />
    <Route path="profile" element={<ProfileSettings />} />
    <Route path="notifications" element={<NotificationSettings />} />
    <Route path="security" element={<SecuritySettings />} />
    <Route path="appearance" element={<AppearanceSettings />} />
    <Route path="data" element={<DataSettings />} />
  </Route>,
];
