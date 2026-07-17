import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Route, Routes, Navigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { API, formatApiError, useAuth } from "../lib/auth";
import { NerveLogo } from "../components/NerveLogo";
import { LogOut, Users, BookOpen, Newspaper, MessageSquare, Home } from "lucide-react";

export default function AdminApp() {
  const { user, logout } = useAuth();
  if (user === null) return <div className="p-10 font-mono text-xs">Checking session…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div data-testid="admin-app" className="min-h-screen bg-editorial-cream text-aggie-navy grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="bg-aggie-void text-editorial-cream p-6 md:p-8 md:min-h-screen">
        <Link to="/"><NerveLogo color="#F9F8F6" accent="#FDB927" /></Link>
        <div className="mt-10 font-mono text-[10px] uppercase tracking-widest text-white/50">Editor</div>
        <div className="mt-2 text-sm text-white">{user.email}</div>
        <nav className="mt-10 space-y-2">
          <SideLink to="/admin/members" icon={Users}>Members</SideLink>
          <SideLink to="/admin/publications" icon={BookOpen}>Publications</SideLink>
          <SideLink to="/admin/news" icon={Newspaper}>News</SideLink>
          <SideLink to="/admin/contacts" icon={MessageSquare}>Messages</SideLink>
        </nav>
        <div className="mt-12 space-y-2 border-t border-white/10 pt-6">
          <Link to="/" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-aggie-gold"><Home className="w-3 h-3" /> Public site</Link>
          <button data-testid="admin-logout" onClick={logout}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-aggie-gold">
            <LogOut className="w-3 h-3" /> Sign out
          </button>
        </div>
      </aside>

      <section className="p-6 md:p-12 max-w-5xl">
        <Routes>
          <Route index element={<Navigate to="members" replace />} />
          <Route path="members" element={<MembersAdmin />} />
          <Route path="publications" element={<PublicationsAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="contacts" element={<ContactsAdmin />} />
        </Routes>
      </section>
    </div>
  );
}

const SideLink = ({ to, icon: Icon, children }) => (
  <NavLink to={to}
    className={({ isActive }) => `flex items-center gap-2 px-3 py-2 text-sm font-mono uppercase tracking-widest ${isActive ? "bg-aggie-gold text-aggie-void" : "text-white/80 hover:text-aggie-gold"}`}>
    <Icon className="w-3.5 h-3.5" /> {children}
  </NavLink>
);

// ---------- Cloudinary Upload ----------
async function uploadToCloudinary(file, folder) {
  const sig = (await axios.get(`${API}/cloudinary/signature`, { params: { resource_type: "image", folder }, withCredentials: true })).data;
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.api_key);
  form.append("timestamp", sig.timestamp);
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloud_name}/image/upload`, { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Upload failed");
  // Auto-optimize via inline transform
  return data.secure_url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");
}

// ---------- Generic CRUD Section ----------
const H = ({ children }) => <h2 className="font-serif text-4xl text-aggie-navy mb-8 tracking-tight">{children}</h2>;
const Row = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
const Input = ({ label, value, onChange, type = "text", testid }) => (
  <label className="block">
    <span className="block font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70 mb-1">{label}</span>
    <input data-testid={testid} type={type} value={value ?? ""} onChange={onChange}
      className="w-full border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-aggie-navy" />
  </label>
);
const Textarea = ({ label, value, onChange, testid, rows = 4 }) => (
  <label className="block col-span-full">
    <span className="block font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70 mb-1">{label}</span>
    <textarea data-testid={testid} rows={rows} value={value ?? ""} onChange={onChange}
      className="w-full border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-aggie-navy" />
  </label>
);

// ---------- Members ----------
function MembersAdmin() {
  const [items, setItems] = useState([]);
  const [f, setF] = useState(emptyMember());
  const load = () => axios.get(`${API}/members`).then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (f.id) await axios.put(`${API}/admin/members/${f.id}`, stripId(f), { withCredentials: true });
      else await axios.post(`${API}/admin/members`, stripId(f), { withCredentials: true });
      toast.success("Saved.");
      setF(emptyMember()); load();
    } catch (err) { toast.error(formatApiError(err.response?.data?.detail)); }
  };
  const del = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    await axios.delete(`${API}/admin/members/${id}`, { withCredentials: true });
    toast.success("Deleted."); load();
  };
  const upload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const url = await uploadToCloudinary(file, "members/"); setF((s) => ({ ...s, photo_url: url })); toast.success("Photo uploaded."); }
    catch (err) { toast.error(err.message); }
  };

  return (
    <div data-testid="admin-members">
      <H>Members</H>
      <form onSubmit={save} className="bg-white border border-black/10 p-6 mb-10 space-y-4">
        <Row>
          <Input testid="m-name" label="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Input testid="m-role" label="Role" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} />
          <Input testid="m-focus" label="Focus area" value={f.focus_area} onChange={(e) => setF({ ...f, focus_area: e.target.value })} />
          <Input testid="m-email" label="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <label className="block">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70 mb-1">Category</span>
            <select data-testid="m-category" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}
              className="w-full border border-black/15 bg-white px-3 py-2 text-sm">
              <option value="director">director</option>
              <option value="member">member</option>
              <option value="alumni">alumni</option>
            </select>
          </label>
          <Input testid="m-order" label="Sort order" type="number" value={f.order} onChange={(e) => setF({ ...f, order: Number(e.target.value) })} />
          <Textarea testid="m-bio" label="Bio" value={f.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} />
          <label className="block col-span-full">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70 mb-1">Photo</span>
            <div className="flex items-center gap-4">
              {f.photo_url ? <img src={f.photo_url} alt="" className="w-16 h-16 object-cover" /> : null}
              <input data-testid="m-photo" type="file" accept="image/*" onChange={upload} />
            </div>
          </label>
        </Row>
        <div className="flex gap-3">
          <button data-testid="m-save" type="submit" className="bg-aggie-navy text-editorial-cream px-6 py-3 font-mono text-xs uppercase tracking-widest">{f.id ? "Update" : "Add member"}</button>
          {f.id && <button type="button" onClick={() => setF(emptyMember())} className="border border-aggie-navy px-6 py-3 font-mono text-xs uppercase tracking-widest">Cancel</button>}
        </div>
      </form>

      <ul className="divide-y divide-black/10">
        {items.map((m) => (
          <li key={m.id} className="py-4 flex items-center gap-4">
            {m.photo_url ? <img src={m.photo_url} alt="" className="w-12 h-12 object-cover" /> : <div className="w-12 h-12 bg-editorial-stone" />}
            <div className="flex-1"><div className="font-serif text-lg">{m.name}</div><div className="font-mono text-[10px] uppercase tracking-widest text-aggie-blue">{m.category} · {m.role}</div></div>
            <button onClick={() => setF({ ...emptyMember(), ...m })} className="text-xs font-mono uppercase tracking-widest text-aggie-blue">Edit</button>
            <button onClick={() => del(m.id)} className="text-xs font-mono uppercase tracking-widest text-aggie-red">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
const emptyMember = () => ({ id: null, name: "", role: "", focus_area: "", bio: "", email: "", photo_url: "", category: "member", order: 100 });
const stripId = (o) => { const { id, ...rest } = o; return rest; };

// ---------- Publications ----------
function PublicationsAdmin() {
  const [items, setItems] = useState([]);
  const [f, setF] = useState(emptyPub());
  const load = () => axios.get(`${API}/publications`).then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      if (f.id) await axios.put(`${API}/admin/publications/${f.id}`, stripId(f), { withCredentials: true });
      else await axios.post(`${API}/admin/publications`, stripId(f), { withCredentials: true });
      toast.success("Saved."); setF(emptyPub()); load();
    } catch (err) { toast.error(formatApiError(err.response?.data?.detail)); }
  };
  const del = async (id) => {
    if (!window.confirm("Delete?")) return;
    await axios.delete(`${API}/admin/publications/${id}`, { withCredentials: true }); load();
  };
  return (
    <div data-testid="admin-publications">
      <H>Publications</H>
      <form onSubmit={save} className="bg-white border border-black/10 p-6 mb-10">
        <Row>
          <Input testid="p-title" label="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <Input testid="p-authors" label="Authors" value={f.authors} onChange={(e) => setF({ ...f, authors: e.target.value })} />
          <Input testid="p-journal" label="Journal" value={f.journal} onChange={(e) => setF({ ...f, journal: e.target.value })} />
          <Input testid="p-year" label="Year" type="number" value={f.year} onChange={(e) => setF({ ...f, year: Number(e.target.value) })} />
          <Input testid="p-doi" label="DOI" value={f.doi} onChange={(e) => setF({ ...f, doi: e.target.value })} />
          <Input testid="p-topic" label="Topic" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} />
        </Row>
        <button data-testid="p-save" type="submit" className="mt-4 bg-aggie-navy text-editorial-cream px-6 py-3 font-mono text-xs uppercase tracking-widest">{f.id ? "Update" : "Add publication"}</button>
      </form>
      <ul className="divide-y divide-black/10">
        {items.map((p) => (
          <li key={p.id} className="py-4 flex gap-4 items-baseline">
            <div className="font-mono text-xs text-aggie-blue w-14">{p.year}</div>
            <div className="flex-1"><div className="font-serif">{p.title}</div><div className="text-xs text-editorial-text/70">{p.authors}</div></div>
            <button onClick={() => setF({ ...emptyPub(), ...p })} className="text-xs font-mono uppercase text-aggie-blue">Edit</button>
            <button onClick={() => del(p.id)} className="text-xs font-mono uppercase text-aggie-red">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
const emptyPub = () => ({ id: null, title: "", authors: "", journal: "", year: new Date().getFullYear(), doi: "", topic: "" });

// ---------- News ----------
function NewsAdmin() {
  const [items, setItems] = useState([]);
  const [f, setF] = useState(emptyNews());
  const load = () => axios.get(`${API}/news`).then((r) => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      if (f.id) await axios.put(`${API}/admin/news/${f.id}`, stripId(f), { withCredentials: true });
      else await axios.post(`${API}/admin/news`, stripId(f), { withCredentials: true });
      toast.success("Saved."); setF(emptyNews()); load();
    } catch (err) { toast.error(formatApiError(err.response?.data?.detail)); }
  };
  const del = async (id) => { if (!window.confirm("Delete?")) return; await axios.delete(`${API}/admin/news/${id}`, { withCredentials: true }); load(); };
  const upload = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { const url = await uploadToCloudinary(file, "news/"); setF((s) => ({ ...s, image_url: url })); toast.success("Uploaded."); }
    catch (err) { toast.error(err.message); }
  };
  return (
    <div data-testid="admin-news">
      <H>News &amp; Media</H>
      <form onSubmit={save} className="bg-white border border-black/10 p-6 mb-10 space-y-4">
        <Row>
          <Input testid="n-title" label="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <Input testid="n-date" label="Date (YYYY-MM-DD)" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
          <Input testid="n-tag" label="Tag" value={f.tag} onChange={(e) => setF({ ...f, tag: e.target.value })} />
          <label className="block col-span-full">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-aggie-navy/70 mb-1">Image</span>
            <div className="flex items-center gap-4">
              {f.image_url ? <img src={f.image_url} alt="" className="w-16 h-16 object-cover" /> : null}
              <input data-testid="n-image" type="file" accept="image/*" onChange={upload} />
            </div>
          </label>
          <Textarea testid="n-excerpt" label="Excerpt" value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} />
          <Textarea testid="n-body" label="Body" rows={6} value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} />
        </Row>
        <button data-testid="n-save" type="submit" className="bg-aggie-navy text-editorial-cream px-6 py-3 font-mono text-xs uppercase tracking-widest">{f.id ? "Update" : "Add news"}</button>
      </form>
      <ul className="divide-y divide-black/10">
        {items.map((n) => (
          <li key={n.id} className="py-4 flex items-center gap-4">
            {n.image_url ? <img src={n.image_url} alt="" className="w-12 h-12 object-cover" /> : <div className="w-12 h-12 bg-editorial-stone" />}
            <div className="flex-1"><div className="font-serif">{n.title}</div><div className="text-xs text-editorial-text/70">{n.date}</div></div>
            <button onClick={() => setF({ ...emptyNews(), ...n })} className="text-xs font-mono uppercase text-aggie-blue">Edit</button>
            <button onClick={() => del(n.id)} className="text-xs font-mono uppercase text-aggie-red">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
const emptyNews = () => ({ id: null, title: "", excerpt: "", body: "", date: "", image_url: "", tag: "news" });

// ---------- Contacts ----------
function ContactsAdmin() {
  const [items, setItems] = useState([]);
  useEffect(() => { axios.get(`${API}/admin/contacts`, { withCredentials: true }).then((r) => setItems(r.data)).catch(() => {}); }, []);
  return (
    <div data-testid="admin-contacts">
      <H>Messages</H>
      {items.length === 0 ? <p className="font-mono text-xs uppercase tracking-widest text-aggie-navy/60">No messages yet.</p> :
        <ul className="divide-y divide-black/10">
          {items.map((c) => (
            <li key={c.id} className="py-4">
              <div className="font-serif text-lg">{c.subject || "(no subject)"}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-aggie-blue">{c.name} · {c.email} · {c.created_at?.slice(0, 10)}</div>
              <p className="mt-2 text-sm whitespace-pre-wrap">{c.message}</p>
            </li>
          ))}
        </ul>}
    </div>
  );
}
