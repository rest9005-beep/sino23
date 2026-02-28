:root{
  --bg: #07070b;
  --panel:#0f0f16;
  --panel2:#141425;
  --border: rgba(255,255,255,.09);
  --text:#f5f5ff;
  --muted: rgba(245,245,255,.68);
  --pink:#ff2d8d;
  --pink2:#ff5fb0;
  --shadow: 0 12px 40px rgba(0,0,0,.55);
  --r: 14px;
  --r2: 20px;
  --focus: 0 0 0 3px rgba(255,45,141,.25);
  --max: 1120px;
  --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji";
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: var(--font);
  background:
    radial-gradient(900px 500px at 15% -10%, rgba(255,45,141,.12), transparent 60%),
    radial-gradient(900px 500px at 80% 0%, rgba(255,95,176,.10), transparent 55%),
    linear-gradient(180deg, #05050a, #090912);
  color: var(--text);
}

a{ color:inherit; text-decoration:none; }
button, input, textarea{ font:inherit; color:inherit; }
button{ cursor:pointer; }
::selection{ background: rgba(255,45,141,.35); }

.container{ max-width: var(--max); margin:0 auto; padding: 18px 16px 40px; }
.row{ display:flex; align-items:center; gap:12px; }
.spacer{ flex:1; }

.topbar{
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px);
  background: rgba(7,7,11,.62);
  border-bottom: 1px solid var(--border);
}
.topbar-inner{
  max-width: var(--max);
  margin:0 auto;
  padding: 12px 16px;
  display:flex;
  align-items:center;
  gap: 12px;
}

.brand{
  display:flex;
  align-items:center;
  gap:10px;
  padding: 6px 10px;
  border-radius: 12px;
}
.brand:focus-visible{ outline:none; box-shadow: var(--focus); }
.brand svg{ width:34px; height:34px; display:block; }
.brand strong{ letter-spacing: .3px; font-weight: 900; font-size: 15px; }
.brand strong span{ color: var(--pink); }

.search{
  flex:1;
  display:flex;
  align-items:center;
  gap:10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15,15,22,.72);
}
.search:focus-within{ box-shadow: var(--focus); border-color: rgba(255,45,141,.4); }
.search input{
  width:100%;
  border:0;
  outline:none;
  background: transparent;
  color: var(--text);
}
.search svg{ opacity:.8; }

.pill{
  display:inline-flex;
  align-items:center;
  gap:10px;
  border:1px solid var(--border);
  background: rgba(15,15,22,.72);
  padding: 10px 14px;
  border-radius: 999px;
  transition: transform .15s ease, border-color .15s ease;
}
.pill:hover{ transform: translateY(-1px); border-color: rgba(255,45,141,.35); }
.pill:focus-visible{ outline:none; box-shadow: var(--focus); }
.pill.primary{
  border-color: rgba(255,45,141,.55);
  background: linear-gradient(180deg, rgba(255,45,141,.22), rgba(255,45,141,.12));
}
.pill.primary:hover{ border-color: rgba(255,45,141,.75); }

.grid{
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
@media (max-width: 980px){ .grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 620px){ .grid{ grid-template-columns: 1fr; } .search{ display:none; } }

.card{
  border:1px solid var(--border);
  background: rgba(15,15,22,.75);
  border-radius: var(--r2);
  overflow:hidden;
  box-shadow: 0 1px 0 rgba(255,255,255,.04) inset;
  transition: transform .18s ease, border-color .18s ease;
}
.card:hover{ transform: translateY(-2px); border-color: rgba(255,45,141,.25); }
.thumb{
  aspect-ratio: 16 / 9;
  background: rgba(255,255,255,.04);
  position: relative;
  overflow:hidden;
}
.thumb img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}
.thumb .play{
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
}
.play .dot{
  width:64px;
  height:64px;
  border-radius: 999px;
  border: 1px solid rgba(255,45,141,.45);
  background: rgba(7,7,11,.55);
  box-shadow: var(--shadow);
  display:grid;
  place-items:center;
}
.play svg{ width:22px; height:22px; }
.meta{ padding: 12px 12px 14px; display:flex; gap:10px; }
.avatar{
  width:36px; height:36px; border-radius: 999px;
  border: 1px solid rgba(255,45,141,.35);
  background: radial-gradient(circle at 30% 30%, rgba(255,45,141,.40), rgba(255,45,141,.12));
  flex: none;
}
.title{ font-weight: 800; font-size: 14px; line-height:1.2; margin:0; }
.sub{ margin-top:6px; font-size: 12px; color: var(--muted); display:flex; gap:10px; flex-wrap:wrap; }

.pageTitle{
  margin: 18px 0 12px;
  font-size: 18px;
  letter-spacing:.2px;
  font-weight: 900;
}
.muted{ color: var(--muted); }

.panel{
  border:1px solid var(--border);
  background: rgba(15,15,22,.75);
  border-radius: var(--r2);
  padding: 14px;
}

.field{ display:flex; flex-direction:column; gap:8px; margin-bottom: 12px; }
.label{ font-size: 12px; color: var(--muted); }
.input, textarea{
  border: 1px solid var(--border);
  background: rgba(7,7,11,.55);
  border-radius: 14px;
  padding: 12px 12px;
  outline:none;
}
.input:focus, textarea:focus{ box-shadow: var(--focus); border-color: rgba(255,45,141,.45); }
textarea{ resize: vertical; min-height: 96px; }

.hr{ height:1px; background: var(--border); margin: 14px 0; }

.toast{
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 18px;
  background: rgba(15,15,22,.92);
  border:1px solid rgba(255,45,141,.25);
  border-radius: 999px;
  padding: 10px 14px;
  box-shadow: var(--shadow);
  color: var(--text);
  z-index: 999;
  max-width: min(560px, calc(100vw - 24px));
  display:none;
}
