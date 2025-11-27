// src/components/bookings/MyBookings.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings/me");
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Failed to load bookings");
    }
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    if (!confirm("Cancel booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      load();
    } catch (err) {
      alert(err?.response?.data?.message || "Cancel failed");
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>My bookings</h2>
      {bookings.length === 0 && <div>No bookings yet</div>}
      <ul>
        {bookings.map(b => (
          <li key={b.id} style={{marginBottom:12}}>
            <strong>{b.roomTitle}</strong> — {b.checkIn} to {b.checkOut}
            <div>Guest: {b.guestName} ({b.guestEmail})</div>
            <div>Confirmation: {b.confirmationCode}</div>
            <div>Status: {b.cancelled ? "Cancelled" : "Active"}</div>
            {!b.cancelled && <button onClick={()=>cancel(b.id)}>Cancel</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
