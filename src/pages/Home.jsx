import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full  p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
