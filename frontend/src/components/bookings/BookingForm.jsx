// src/components/bookings/BookingForm.jsx
import React, { useState } from "react";
import api from "../../api/api";

export default function BookingForm({ roomId, onBooked }) {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        roomId,
        guestName,
        guestEmail,
        checkIn,    // 'YYYY-MM-DD'
        checkOut
      };
      const res = await api.post("/bookings", payload);
      setLoading(false);
      setGuestName(""); setGuestEmail(""); setCheckIn(""); setCheckOut("");
      onBooked && onBooked(res.data);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error || err?.response?.data || err?.message || "Booking failed");
    }
  };

  return (
    <form onSubmit={submit} style={{display:'grid', gap:8}}>
      <input placeholder="Guest name" value={guestName} onChange={e=>setGuestName(e.target.value)} required />
      <input placeholder="Guest email" value={guestEmail} onChange={e=>setGuestEmail(e.target.value)} type="email" required />
      <label style={{fontSize:12, marginTop:6}}>Check-in</label>
      <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} required />
      <label style={{fontSize:12}}>Check-out</label>
      <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} required />
      <button type="submit" disabled={loading} style={{background:'#007bff', color:'#fff', padding:'8px 10px', borderRadius:6}}>
        {loading ? "Booking..." : "Book Room"}
      </button>
      {error && <div style={{color:'red', fontSize:13}}>{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
    </form>
  );
}
