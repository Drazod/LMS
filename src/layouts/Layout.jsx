/**
 * @description Layout
 * Layout lấy các file từ component và ghép lại với nhau để tạo thành layout hoàn chỉnh chung cho các trang khác nhau
 */
import React from "react";
import Header from "../components/Header1";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
