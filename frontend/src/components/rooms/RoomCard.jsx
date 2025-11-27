// src/components/rooms/RoomCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./RoomCard.css";

export default function RoomCard({ room }) {
  const type = (room?.type || "").toLowerCase();
  const fallback = `https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80`;
  const src = room?.photoUrl && room.photoUrl.trim() !== "" ? room.photoUrl : fallback;

  return (
    <article className="room-card">
      <div className="room-card-image">
        <img src={src} alt={room.title} loading="lazy" />
        <div className="room-card-badge">
          {room.type?.toUpperCase()}
        </div>
      </div>

      <div className="room-card-content">
        <div className="room-card-header">
          <h3 className="room-card-title">{room.title}</h3>
          <div className="room-card-price">
            <span className="price-amount">₹{room.pricePerNight}</span>
            <span className="price-period">/ night</span>
          </div>
        </div>

        <p className="room-card-description">{room.description}</p>

        <div className="room-card-features">
          <div className="feature">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
            <span>{room.capacity || 2} Guests</span>
          </div>

          <div className="feature">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span>Prime Location</span>
          </div>
        </div>

        <Link to={`/rooms/${room.id}`} className="room-card-button">
          View Details
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}