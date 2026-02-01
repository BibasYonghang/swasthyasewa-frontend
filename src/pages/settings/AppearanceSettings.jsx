import { useState } from "react";

export default function AppearanceSettings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Appearance</h2>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`h-6 w-11 rounded-full ${darkMode ? "bg-indigo-600" : "bg-gray-300"}`}
      />
    </div>
  );
}
