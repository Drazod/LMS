/**
 * @description Layout
 * Layout lấy các file từ component và ghép lại với nhau để tạo thành layout hoàn chỉnh chung cho các trang khác nhau
 */

import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header1";
import { Footer } from "@/components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
