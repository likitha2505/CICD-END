// src/components/rooms/RoomList.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import RoomCard from './RoomCard';

export default function RoomList(){
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    api.get('/rooms').then(res => setRooms(res.data)).catch(console.error).finally(()=>setLoading(false));
  }, []);

  if (loading) return <div>Loading rooms...</div>;
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16}}>
      {rooms.map(r => <RoomCard key={r.id} room={r} />)}
    </div>
  );
}
