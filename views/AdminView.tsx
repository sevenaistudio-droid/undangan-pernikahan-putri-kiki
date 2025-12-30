
import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { PucukRebung } from '../constants';

const AdminView: React.FC = () => {
  const { wedding, updateWedding, rsvps, deleteRSVP } = useWedding();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'rsvp'>('edit');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    navigate('/login');
  };

  const generateStory = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Tuliskan sebuah narasi singkat tentang pertemuan romantis antara ${wedding.bride} dan ${wedding.groom} yang bernuansa budaya Betawi modern. Gunakan bahasa Indonesia yang puitis namun tetap modern dan sopan. Maksimal 80 kata.`,
      });
      if (response.text) {
        updateWedding({ storyContent: response.text.trim() });
      }
    } catch (e) {
      console.error(e);
      alert("Gagal menggunakan AI. Pastikan API_KEY Anda valid.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addToGallery = () => {
    if (newGalleryUrl && newGalleryUrl.startsWith('http')) {
      updateWedding({ gallery: [...wedding.gallery, newGalleryUrl] });
      setNewGalleryUrl('');
    } else {
      alert("Masukkan URL gambar yang valid");
    }
  };

  const removeFromGallery = (index: number) => {
    const updatedGallery = wedding.gallery.filter((_, i) => i !== index);
    updateWedding({ gallery: updatedGallery });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#064e3b] text-white p-6 flex flex-col shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-10">
          <PucukRebung size={32} />
          <h2 className="font-serif text-2xl tracking-tight">Admin Undangan</h2>
        </div>
        
        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'edit' ? 'bg-[#d4af37] text-[#064e3b] font-bold shadow-lg' : 'hover:bg-white/10 opacity-70'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
            Edit Konten
          </button>
          <button 
            onClick={() => setActiveTab('rsvp')}
            className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${activeTab === 'rsvp' ? 'bg-[#d4af37] text-[#064e3b] font-bold shadow-lg' : 'hover:bg-white/10 opacity-70'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
            Daftar RSVP
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{rsvps.length}</span>
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="w-full text-left p-3 rounded-xl hover:bg-white/10 transition-all opacity-70 flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
            Preview Undangan
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto p-3 text-red-300 hover:text-red-100 flex items-center gap-3 font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
          Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-4xl mx-auto animate-fade-in">
          
          {activeTab === 'edit' && (
            <div className="space-y-10">
              <header className="mb-10">
                <h1 className="text-3xl font-serif text-[#064e3b]">Pengaturan Undangan</h1>
                <p className="text-gray-500">Sesuaikan data dan tampilan undangan pernikahan Anda.</p>
              </header>

              {/* Detail Mempelai */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6 text-[#064e3b] flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#d4af37] rounded-full"></span>
                  Detail Mempelai
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Nama Sapaan Wanita</span>
                      <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b] transition-all" value={wedding.bride} onChange={e => updateWedding({ bride: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Nama Lengkap Wanita</span>
                      <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b] transition-all" value={wedding.brideFull} onChange={e => updateWedding({ brideFull: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Nama Orang Tua Wanita</span>
                      <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b] transition-all" value={wedding.brideParents} onChange={e => updateWedding({ brideParents: e.target.value })} />
                    </label>
                  </div>
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Nama Sapaan Pria</span>
                      <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b] transition-all" value={wedding.groom} onChange={e => updateWedding({ groom: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Nama Lengkap Pria</span>
                      <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b] transition-all" value={wedding.groomFull} onChange={e => updateWedding({ groomFull: e.target.value })} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Nama Orang Tua Pria</span>
                      <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b] transition-all" value={wedding.groomParents} onChange={e => updateWedding({ groomParents: e.target.value })} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Jadwal & Lokasi */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6 text-[#064e3b] flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#d4af37] rounded-full"></span>
                  Waktu & Tempat
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <label className="block">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Tanggal Utama</span>
                    <input type="datetime-local" className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b]" value={wedding.date.slice(0, 16)} onChange={e => updateWedding({ date: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Nama Tempat / Gedung</span>
                    <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b]" value={wedding.locationName} onChange={e => updateWedding({ locationName: e.target.value })} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Alamat Lengkap</span>
                    <textarea rows={2} className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b]" value={wedding.locationAddress} onChange={e => updateWedding({ locationAddress: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Jam Akad</span>
                    <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b]" value={wedding.timeAkad} onChange={e => updateWedding({ timeAkad: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Jam Resepsi</span>
                    <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b]" value={wedding.timeResepsi} onChange={e => updateWedding({ timeResepsi: e.target.value })} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Embed URL Google Maps (iframe src)</span>
                    <input className="mt-1 w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#064e3b]" value={wedding.googleMapsUrl} onChange={e => updateWedding({ googleMapsUrl: e.target.value })} />
                  </label>
                </div>
              </div>

              {/* Story Editor */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-[#064e3b] flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#d4af37] rounded-full"></span>
                    Kisah Kami
                  </h3>
                  <button 
                    onClick={generateStory}
                    disabled={isGenerating}
                    className="text-xs bg-amber-100 text-[#064e3b] px-4 py-2 rounded-full font-bold hover:bg-amber-200 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                       <svg className="animate-spin h-3 w-3 text-[#064e3b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : '🪄 Tulis dengan AI'}
                  </button>
                </div>
                <textarea 
                  rows={5}
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl italic text-gray-600 outline-none focus:ring-2 focus:ring-[#064e3b]"
                  value={wedding.storyContent}
                  placeholder="Ceritakan awal pertemuan kalian..."
                  onChange={e => updateWedding({ storyContent: e.target.value })}
                />
              </div>

              {/* Gallery Manager */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6 text-[#064e3b] flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#d4af37] rounded-full"></span>
                  Galeri Foto
                </h3>
                <div className="flex gap-4 mb-8">
                  <input 
                    type="text" 
                    placeholder="URL Gambar (https://...)" 
                    className="flex-1 p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-[#064e3b]"
                    value={newGalleryUrl}
                    onChange={e => setNewGalleryUrl(e.target.value)}
                  />
                  <button onClick={addToGallery} className="bg-[#064e3b] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#043327] transition-all">Tambah</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {wedding.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100">
                      <img src={img} className="w-full h-full object-cover" alt="Gallery item" />
                      <button 
                        onClick={() => removeFromGallery(i)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rsvp' && (
            <div className="space-y-8">
              <header className="mb-10">
                <h1 className="text-3xl font-serif text-[#064e3b]">Daftar RSVP & Ucapan</h1>
                <p className="text-gray-500">Kelola kehadiran tamu dan pesan-pesan indah untuk pernikahan Anda.</p>
              </header>

              <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-xs uppercase text-gray-400 font-bold tracking-widest border-b">
                      <th className="p-6">Nama Tamu</th>
                      <th className="p-6">Kehadiran</th>
                      <th className="p-6 text-center">Tamu</th>
                      <th className="p-6">Pesan / Ucapan</th>
                      <th className="p-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rsvps.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-20 text-center text-gray-400 italic">Belum ada RSVP yang masuk</td>
                      </tr>
                    ) : (
                      rsvps.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-6 font-bold text-[#064e3b]">{r.name}</td>
                          <td className="p-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${r.attendance === 'hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {r.attendance === 'hadir' ? 'Hadir' : 'Absen'}
                            </span>
                          </td>
                          <td className="p-6 text-center font-medium">{r.guests}</td>
                          <td className="p-6 text-sm text-gray-600 italic max-w-xs truncate">"{r.message}"</td>
                          <td className="p-6 text-right">
                            <button 
                              onClick={() => { if(confirm('Hapus RSVP ini?')) deleteRSVP(r.id); }}
                              className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default AdminView;
