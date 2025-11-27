// src/pages/AdminRooms.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", type: "", description: "", pricePerNight: "", photoUrl: "", capacity: "" });
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({ title: "", type: "", description: "", pricePerNight: "", photoUrl: "", capacity: "" });
  };

  const startEdit = (r) => {
    setEditing(r);
    setForm({ 
      title: r.title || "", 
      type: r.type || "", 
      description: r.description || "", 
      pricePerNight: r.pricePerNight || "", 
      photoUrl: r.photoUrl || "", 
      capacity: r.capacity || "" 
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/rooms/${editing.id}`, { ...form, pricePerNight: Number(form.pricePerNight), capacity: Number(form.capacity) });
      } else {
        await api.post("/rooms", { ...form, pricePerNight: Number(form.pricePerNight), capacity: Number(form.capacity) });
      }
      await load();
      startAdd(); // reset form
    } catch (err) {
      setError(err?.response?.data?.error || "Save failed");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      await load();
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div style={{color:"red"}}>{error}</div>;

  return (
    <div style={{padding:20}}>
      <h2>Admin — Manage Rooms</h2>
      <button onClick={startAdd} style={{marginBottom:12}}>Add room</button>

      {rooms.map(r => (
        <div key={r.id} style={{border:'1px solid #ddd', padding:12, marginBottom:10}}>
          <strong>{r.title}</strong> — {r.type} — ${r.pricePerNight}/night
          <div>{r.description}</div>
          {r.photoUrl && <img src={r.photoUrl} alt={r.title} style={{maxWidth:300, marginTop:8}} />}
          <div style={{marginTop:8}}>
            <button onClick={()=>startEdit(r)}>Edit</button>{" "}
            <button onClick={()=>remove(r.id)}>Delete</button>
          </div>
        </div>
      ))}

      <hr style={{margin:'20px 0'}}/>
      <h3>{editing ? "Edit room" : "Add new room"}</h3>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:500}}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input placeholder="Type" value={form.type} onChange={e=>setForm({...form, type:e.target.value})} required />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input placeholder="Price per night" value={form.pricePerNight} onChange={e=>setForm({...form, pricePerNight:e.target.value})} required />
        <input placeholder="Photo URL" value={form.photoUrl} onChange={e=>setForm({...form, photoUrl:e.target.value})} />
        <input placeholder="Capacity" value={form.capacity} onChange={e=>setForm({...form, capacity:e.target.value})} required />
        <button type="submit">{editing ? "Save" : "Create"}</button>
      </form>
    </div>
  );
}
