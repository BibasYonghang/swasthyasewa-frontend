import { useState } from "react";
import { Save, Mail, Smartphone } from "lucide-react";

export default function ProfileSettings() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
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
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <inputField label="Full Name" value={formData.name} onChange={(v)=>setFormData({...formData,name:v})} />
        <iconInput label="Email" icon={<Mail size={20} />} value={formData.email} onChange={(v)=>setFormData({...formData,email:v})} />
        <iconInput label="Phone" icon={<Smartphone size={20} />} value={formData.phone} onChange={(v)=>setFormData({...formData,phone:v})} />
      </form>
    </div>
  );
}

function inputField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <input className="w-full border rounded-lg px-4 py-3" value={value} onChange={(e)=>onChange(e.target.value)} />
    </div>
  );
}

function iconInput({ label, icon, value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <div className="flex items-center gap-2">
        {icon}
        <input className="flex-1 border rounded-lg px-4 py-3" value={value} onChange={(e)=>onChange(e.target.value)} />
      </div>
    </div>
  );
}
