import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SecuritySettings() {
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [show, setShow] = useState({ current:false,new:false,confirm:false });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Security Settings</h2>

      {["current","new","confirm"].map((f) => (
        <div key={f}>
          <label className="block mb-2 capitalize">{f} password</label>
          <div className="relative">
            <input
              type={show[f] ? "text" : "password"}
              className="w-full border rounded-lg px-4 py-3"
              value={password[f]}
              onChange={(e)=>setPassword({...password,[f]:e.target.value})}
            />
            <button onClick={()=>setShow({...show,[f]:!show[f]})} className="absolute right-3 top-3">
              {show[f] ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
