'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // News list state
  const [newsList, setNewsList] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Editor form state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [content, setContent] = useState('');

  // Authentication check
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchNews();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchNews();
      } else {
        setNewsList([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch news list
  const fetchNews = async () => {
    setFetchLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error.message);
    } else {
      setNewsList(data || []);
    }
    setFetchLoading(false);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } else {
      setSuccessMsg('เข้าสู่ระบบสำเร็จ');
      setSession(data.session);
    }
    setLoading(false);
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Delete news item
  const handleDelete = async (id) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบข่าวประชาสัมพันธ์นี้?')) return;

    const { error } = await supabase.from('news').delete().eq('id', id);

    if (error) {
      alert('ลบข้อมูลไม่สำเร็จ: ' + error.message);
    } else {
      fetchNews();
    }
  };

  // Prepare edit form
  const startEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setImgUrl(item.img || '');
    setContent(item.content);
    setIsEditing(true);
  };

  // Prepare add form
  const startAdd = () => {
    setEditId(null);
    setTitle('');
    setImgUrl('');
    setContent('');
    setIsEditing(true);
  };

  // Save news item (Insert or Update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('กรุณากรอกข้อมูลหัวข้อข่าวและเนื้อหาข่าวสาร');
      return;
    }

    setLoading(true);
    const payload = {
      title,
      img: imgUrl || null,
      content,
    };

    let error = null;

    if (editId) {
      // Update
      const { error: err } = await supabase
        .from('news')
        .update(payload)
        .eq('id', editId);
      error = err;
    } else {
      // Insert
      const { error: err } = await supabase
        .from('news')
        .insert([payload]);
      error = err;
    }

    if (error) {
      alert('บันทึกข้อมูลไม่สำเร็จ: ' + error.message);
    } else {
      setIsEditing(false);
      fetchNews();
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full my-8 px-4">
        {!session ? (
          /* Login View */
          <div className="flex justify-center items-center py-16">
            <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-md w-full space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-black text-slate-800">ผู้ดูแลระบบ (Admin)</h1>
                <p className="text-xs text-slate-400">ลงชื่อเข้าใช้งานเพื่อจัดการข้อมูลข่าวประชาสัมพันธ์</p>
              </div>

              {errorMsg && (
                <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200">
                  ⚠️ {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="bg-emerald-50 text-emerald-600 text-xs p-3 rounded-lg border border-emerald-200">
                  ✅ {successMsg}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">อีเมล</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@tcc.ac.th"
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-blue-600 text-slate-800 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">รหัสผ่าน</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-blue-600 text-slate-800 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-900 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-800 transition disabled:opacity-50"
                >
                  {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Dashboard View */
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-800">ระบบจัดการข่าวประชาสัมพันธ์</h1>
                <p className="text-xs text-slate-400 mt-1">ผู้ดูแลระบบ: {session.user.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={startAdd}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-500 transition shadow-sm cursor-pointer"
                >
                  ➕ เพิ่มข่าวใหม่
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-slate-250 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-300 transition cursor-pointer border"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>

            {isEditing ? (
              /* Editor view */
              <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-800">
                  {editId ? '📝 แก้ไขข่าวสาร' : '➕ เพิ่มข่าวประชาสัมพันธ์'}
                </h2>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">หัวข้อข่าว</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="กรอกหัวข้อข่าวสาร..."
                      className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-blue-600 text-slate-800 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">ลิงก์รูปภาพ (Image URL)</label>
                    <input
                      type="text"
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-blue-600 text-slate-800 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block">เนื้อหาข่าวสาร</label>
                    <textarea
                      required
                      rows={8}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="รายละเอียดข่าวแบบเต็ม..."
                      className="w-full px-3.5 py-2 border rounded-xl text-sm focus:outline-none focus:border-blue-600 whitespace-pre-wrap text-slate-800 bg-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-800 transition disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-slate-200 text-slate-700 px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-300 transition cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Table list view */
              <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                {fetchLoading ? (
                  <div className="text-center py-12 text-slate-400 text-sm">กำลังโหลดข้อมูลข่าว...</div>
                ) : newsList.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">ไม่มีข้อมูลข่าวประชาสัมพันธ์ในฐานข้อมูล</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-100 text-xs font-bold text-slate-600 border-b">
                        <tr>
                          <th className="px-6 py-4">รูปภาพ</th>
                          <th className="px-6 py-4">หัวข้อข่าว</th>
                          <th className="px-6 py-4">วันที่ลงข่าว</th>
                          <th className="px-6 py-4 text-right">การจัดการ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {newsList.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="w-16 h-10 rounded bg-slate-100 overflow-hidden">
                                {item.img ? (
                                  <img src={item.img} className="w-full h-full object-cover" alt="" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">ไม่มีรูป</div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium max-w-xs truncate">{item.title}</td>
                            <td className="px-6 py-4 text-xs text-slate-400">
                              {new Date(item.created_at).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </td>
                            <td className="px-6 py-4 text-right space-x-3">
                              <button
                                onClick={() => startEdit(item)}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                              >
                                แก้ไข
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-xs font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
                              >
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
