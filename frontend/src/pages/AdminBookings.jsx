// src/pages/AdminBookings.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      load();
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  if (loading) return <div style={{padding:20}}>Loading bookings...</div>;
  if (error) return <div style={{padding:20,color:'red'}}>{error}</div>;

  return (
    <div style={{padding:20}}>
      <h1 className="pageTitle">Admin — Manage Bookings</h1>
      <div style={{display:'grid', gap:12, marginTop:12}}>
        {bookings.length === 0 && <div>No bookings yet.</div>}
        {bookings.map(b => (
          <div key={b.id} style={{border:'1px solid #eee', padding:12, borderRadius:8, background:'#fff'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <strong>{b.room?.title ?? 'Room'}</strong>
              <div>
                <button onClick={() => remove(b.id)} style={{background:'#e75d5d', color:'#fff', border:'none', padding:'6px 10px', borderRadius:6}}>Delete</button>
              </div>
            </div>
            <div style={{color:'#555'}}>{b.checkIn} → {b.checkOut}</div>
            <div style={{marginTop:6}}>User: {b.user?.email}</div>
            <div style={{marginTop:6}}>Code: <code>{b.confirmationCode}</code></div>
          </div>
        ))}
      </div>
    </div>
  );
}
