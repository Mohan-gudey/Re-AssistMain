import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: "Chats", path: "chats" },
    { name: "Documents", path: "documents" },
    { name: "Grants", path: "grants" },
    { name: "Conferences", path: "conferences" },
    { name: "Help", path: "help" }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
