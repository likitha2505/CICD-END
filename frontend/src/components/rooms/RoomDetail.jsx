/* src/components/rooms/RoomCard.module.css */
.card{
  background:#fff;
  border:1px solid #e8e8e8;
  border-radius:8px;
  overflow:hidden;
  box-shadow:0 2px 6px rgba(10,10,10,0.03);
  display:flex;
  flex-direction:column;
}
.media img{ width:100%; height:160px; object-fit:cover; display:block; }
.body{ padding:12px; display:flex; flex-direction:column; gap:8px; }
.title{ font-size:16px; margin:0; display:flex; align-items:center; gap:8px; }
.type{ font-size:11px; color:#6b7280; background:#f1f5f9; padding:4px 6px; border-radius:6px; }
.price{ font-weight:700; color:#111; margin:0; }
.desc{ color:#555; font-size:13px; margin:0; min-height:36px; }
.footer{ display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
.viewBtn{ background:#007bff; color:#fff; padding:6px 10px; border-radius:6px; text-decoration:none; }
