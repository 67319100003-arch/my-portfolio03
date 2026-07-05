'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [newsList, setNewsList] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('ประชาสัมพันธ์');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchNews();
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) fetchNews(); else setNewsList([]);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchNews = async () => {
    setFetchLoading(true);
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    setNewsList(data || []);
    setFetchLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    else setSession(data.session);
    setLoading(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  const handleDelete = async (id) => {
    if (!confirm('ลบข่าวนี้?')) return;
    await supabase.from('news').delete().eq('id', id);
    fetchNews();
  };

  const startEdit = (item) => {
    setEditId(item.id); setTitle(item.title);
    setImgUrl(item.image_url || ''); setContent(item.content);
    setCategory(item.category || 'ประชาสัมพันธ์');
    setIsEditing(true);
  };

  const startAdd = () => {
    setEditId(null); setTitle(''); setImgUrl('');
    setContent(''); setCategory('ประชาสัมพันธ์');
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('กรุณากรอกข้อมูลหัวข้อและเนื้อหา');
    setLoading(true);
    const payload = { title, image_url: imgUrl || null, content, category };
    if (editId) await supabase.from('news').update(payload).eq('id', editId);
    else await supabase.from('news').insert([payload]);
    setIsEditing(false);
    fetchNews();
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        {/* Orbs */}
        <div className="orb orb-blue w-[500px] h-[500px] top-[-150px] left-[-150px] animate-glow-pulse" />
        <div className="orb orb-gold w-[300px] h-[300px] bottom-[-100px] right-[-100px] animate-glow-pulse" style={{animationDelay:'1s'}} />

        <div className="relative z-10 w-full max-w-md">
          {/* Card */}
          <div className="glass-card border border-white/10 p-8 space-y-7">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/30 mx-auto flex items-center justify-center text-3xl">⚙</div>
              <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
              <p className="text-xs text-slate-500">วิทยาลัยพณิชยการธนบุรี</p>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/25 text-red-400 text-xs p-3 rounded-xl">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">อีเมล</label>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tcc.ac.th"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">รหัสผ่าน</label>
                <input
                  type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-white/8 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-black text-white">Admin Dashboard</h1>
          <p className="text-[10px] text-slate-500">{session.user.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={startAdd}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            ➕ เพิ่มข่าวใหม่
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            ออกจากระบบ
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {isEditing ? (
          /* Edit/Add Form */
          <div className="glass-card border border-white/10 p-7 space-y-6">
            <h2 className="text-lg font-black text-white">
              {editId ? '✏️ แก้ไขข่าวสาร' : '➕ เพิ่มข่าวประชาสัมพันธ์'}
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">หัวข้อข่าว *</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="กรอกหัวข้อข่าวสาร..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">หมวดหมู่</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-blue-500/60 transition-all">
                    <option>ประชาสัมพันธ์</option>
                    <option>จัดซื้อ</option>
                    <option>ประกาศ</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">ลิงก์รูปภาพ</label>
                  <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">เนื้อหาข่าว *</label>
                  <textarea required rows={8} value={content} onChange={(e) => setContent(e.target.value)}
                    placeholder="รายละเอียดข่าวแบบเต็ม..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-all resize-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all disabled:opacity-50 cursor-pointer">
                  {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล ✓'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold text-sm hover:bg-white/10 transition-all cursor-pointer">
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* News list table */
          <div className="glass-card border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
              <h2 className="font-black text-white text-base">รายการข่าวทั้งหมด</h2>
              <span className="text-xs text-slate-500">{newsList.length} รายการ</span>
            </div>

            {fetchLoading ? (
              <div className="text-center py-16 text-slate-600">
                <div className="animate-spin text-3xl mb-3">⟳</div>
                <p className="text-sm">กำลังโหลด...</p>
              </div>
            ) : newsList.length === 0 ? (
              <div className="text-center py-16 text-slate-600">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-sm">ยังไม่มีข่าวในฐานข้อมูล</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-800/50">
                      <th className="px-5 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">รูปภาพ</th>
                      <th className="px-5 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">หัวข้อข่าว</th>
                      <th className="px-5 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">หมวดหมู่</th>
                      <th className="px-5 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-wider">วันที่</th>
                      <th className="px-5 py-3 text-right text-[11px] font-black text-slate-400 uppercase tracking-wider">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {newsList.map((item) => (
                      <tr key={item.id} className="hover:bg-white/3 transition-colors">
                        <td className="px-5 py-4">
                          <div className="w-14 h-10 rounded-lg bg-slate-800 overflow-hidden border border-white/8">
                            {item.image_url
                              ? <img src={item.image_url} className="w-full h-full object-cover" alt="" />
                              : <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">📰</div>
                            }
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-200 max-w-xs">
                          <span className="line-clamp-1">{item.title}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            {item.category || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-slate-500">
                          {new Date(item.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </td>
                        <td className="px-5 py-4 text-right space-x-4">
                          <button onClick={() => startEdit(item)}
                            className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                            แก้ไข
                          </button>
                          <button onClick={() => handleDelete(item.id)}
                            className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors cursor-pointer">
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
