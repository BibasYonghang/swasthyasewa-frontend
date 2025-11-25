import { NavLink } from "react-router-dom";
import { Wallet, History, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function WalletLeftSidebar() {
  const items = [
    { name: "Overview", icon: <Wallet />, to: "/wallet" },
    { name: "Transactions", icon: <History />, to: "/wallet/transactions" },
    { name: "Add Balance", icon: <ArrowUpCircle />, to: "/wallet/add" },
    { name: "Withdraw", icon: <ArrowDownCircle />, to: "/wallet/withdraw" },
  ];

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold mb-3">Wallet</h2>

      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
              isActive ? "bg-gray-200 font-medium" : ""
            }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
