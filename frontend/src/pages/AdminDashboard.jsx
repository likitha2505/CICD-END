import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <p>Admin actions: manage rooms & bookings.</p>
      <Link to="/admin/rooms">Manage Rooms</Link>{" | "}
      <Link to="/admin/bookings">Manage Bookings</Link>
    </div>
  );
}
