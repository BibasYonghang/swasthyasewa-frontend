export default function DataSettings() {
  const exportData = () => alert("Export started");
  const deleteAccount = () => confirm("Delete account?") && alert("Requested");

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={exportData}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Export Data
      </button>

      <button
        onClick={deleteAccount}
        className="bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Delete Account
      </button>
    </div>
  );
}
