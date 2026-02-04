import { Route } from "react-router-dom";
import WalletLayout from "../Layout/WalletLayout";
import Wallet from "../pages/main-sidebars/Wallet";

export const walletRoutes = [
  <Route path="/wallet" element={<WalletLayout />}>
    <Route index element={<Wallet />} />
  </Route>,
];
