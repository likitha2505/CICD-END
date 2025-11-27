import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import BookingForm from "../components/bookings/BookingForm";
import { AuthContext } from "../context/AuthContext";
// NOTE: global.css imported in main.jsx, NOT here.

export default function RoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // hooks always in same order
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    api.get(`/rooms/${id}`)
      .then(res => {
        if (!mounted) return;
        setRoom(res.data);
      })
      .catch(err => {
        if (!mounted) return;
        const payload = err?.response?.data || err?.message || "Failed to load room";
        setError(payload);
      })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div style={{padding:20}}>Loading room...</div>;
  if (error) return <div style={{padding:20, color:"red"}}>{JSON.stringify(error)}</div>;
  if (!room) return <div style={{padding:20}}>Room not found</div>;

  const onBooked = (booking) => {
    // server returns booking with confirmationCode and fields
    alert(`Booked! Confirmation code: ${booking.confirmationCode}`);
    navigate("/my-bookings");
  };

  // choose image source (same logic as RoomCard)
  const type = (room?.type || "").toLowerCase();
  const fallback = `/rooms/${type || "default"}.jpeg`;
  const imgSrc = room?.photoUrl && room.photoUrl.trim() !== "" ? room.photoUrl : fallback;

  return (
    <div style={{padding:24, display:'grid', gridTemplateColumns:'1fr 360px', gap:24}}>
      <div>
        <h1 className="pageTitle">{room.title}</h1>
        <p className="lead">{room.type?.toUpperCase()}</p>
        <img src={imgSrc} alt={room.title} style={{width:"100%", maxHeight:420, objectFit:"cover", borderRadius:8}} />
        <p style={{marginTop:12}}>{room.description}</p>
        <p><strong>Capacity:</strong> {room.capacity} • <strong>Price:</strong> ₹{room.pricePerNight} / night</p>
      </div>

      <aside style={{ background:'#fff', padding:16, borderRadius:8, boxShadow:'0 6px 18px rgba(3,6,23,0.04)'}}>
        <h3 style={{marginTop:0}}>Book this room</h3>
        {user ? (
          <BookingForm roomId={room.id} onBooked={onBooked} />
        ) : (
          <div>
            <p>You must <a href="/login">log in</a> to book this room.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
