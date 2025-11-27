// src/pages/MyBookings.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    setLoading(true);
    api.get("/bookings/me")
      .then(res => { if (!mounted) return; setBookings(res.data || []); setError(null); })
      .catch(err => setError(err?.response?.data?.error || err?.message || "Failed to load"))
      .finally(() => mounted && setLoading(false));
    return () => mounted = false;
  }, [user]);

  if (!user) return <div style={{padding:20}}>You must log in to view bookings.</div>;
  if (loading) return <div style={{padding:20}}>Loading your bookings...</div>;
  if (error) return <div style={{padding:20,color:'red'}}>{error}</div>;

  return (
    <div style={{padding:20}}>
      <h1 className="pageTitle">My Bookings</h1>
      {bookings.length === 0 && <div>No bookings yet.</div>}
      <div style={{display:'grid', gap:12, marginTop:12}}>
        {bookings.map(b => (
          <div key={b.id} style={{padding:12, border:'1px solid #eee', borderRadius:8, background:'#fff'}}>
            <strong>{b.room?.title ?? "Room"}</strong>
            <div style={{color:'#666'}}>Dates: {b.checkIn} → {b.checkOut}</div>
            <div style={{marginTop:6}}>Guest: {b.guestName} — Email: {b.guestEmail}</div>
            <div style={{marginTop:8}}>Code: <code>{b.confirmationCode}</code></div>
          </div>
        ))}
      </div>
    </div>
  );
}
