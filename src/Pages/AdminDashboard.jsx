// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Home/Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resReports = await axios.get("/api/admin/reports");
      setReports(resReports.data);

      const resUsers = await axios.get("/api/admin/users");
      setUsers(resUsers.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          <section className="mb-6">
            <h2 className="font-bold mb-2">Reports</h2>
            <ul className="bg-white p-4 rounded shadow-md space-y-2">
              {reports.map((r) => (
                <li key={r._id}>{r.text}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-bold mb-2">Users</h2>
            <ul className="bg-white p-4 rounded shadow-md space-y-2">
              {users.map((u) => (
                <li key={u._id}>{u.name} - {u.role}</li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
