
import React, { useState, useEffect, useRef } from 'react';
import { useWedding } from '../context/WeddingContext';
import { GigiBalang, PucukRebung, OndelOndel } from '../constants';
import Countdown from '../components/Countdown';

const InvitationView: React.FC = () => {
  const { wedding, addRSVP, rsvps } = useWedding();
  const [isOpen, setIsOpen] = useState(false);
  const [rsvpData, setRsvpData] = useState({ name: '', attendance: 'hadir', guests: 1, message: '' });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen && wedding.isMusicEnabled && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
  }, [isOpen, wedding.isMusicEnabled]);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRSVP(rsvpData as any);
    setRsvpData({ name: '', attendance: 'hadir', guests: 1, message: '' });
    alert("Terima kasih! RSVP Anda telah terkirim.");
  };

  if (!isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#064e3b] text-[#fef3c7] text-center p-6">
        <GigiBalang className="fixed top-0 rotate-180" />
        <div className="mb-6 animate-bounce">
          <PucukRebung size={80} />
        </div>
        <h3 className="text-lg tracking-[0.4em] uppercase mb-2 font-light">Undangan Pernikahan</h3>
        <h1 className="font-serif text-5xl md:text-7xl mb-8 text-[#d4af37]">{wedding.bride} & {wedding.groom}</h1>
        <p className="mb-10 text-amber-100 max-w-sm font-light">Kepada Bapak/Ibu/Saudara/i,<br/>kami mengundang Anda untuk merayakan kebahagiaan kami.</p>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#d4af37] text-[#064e3b] px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:rotate-12 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          Buka Undangan
        </button>
        <GigiBalang className="fixed bottom-0" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 overflow-x-hidden animate-fade-in bg-amber-50">
      {wedding.isMusicEnabled && (
        <audio ref={audioRef} src={wedding.musicUrl} loop hidden />
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[#064e3b] text-[#fef3c7]">
        <div className="absolute inset-0 opacity-5 betawi-pattern"></div>
        <GigiBalang className="absolute top-0 rotate-180" />
        <div className="z-10">
           <div className="mb-8 flex justify-center gap-4">
             <OndelOndel size={50} color="#d4af37" />
             <PucukRebung size={60} />
             <OndelOndel size={50} color="#d4af37" />
           </div>
           <p className="text-sm tracking-[0.5em] uppercase mb-4 opacity-70">The Wedding Of</p>
           <h1 className="font-serif text-6xl md:text-8xl mb-6 text-[#d4af37]">{wedding.bride} & {wedding.groom}</h1>
           <p className="text-xl md:text-2xl font-serif italic text-amber-100/80">
             {new Date(wedding.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
           </p>
        </div>
        <GigiBalang className="absolute bottom-0" />
      </section>

      {/* Mempelai Detail */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <PucukRebung className="mx-auto mb-12 opacity-20" size={100} />
          <p className="italic text-gray-500 mb-16 text-lg max-w-2xl mx-auto leading-relaxed">
            "Maka nikahkanlah orang-orang yang sendirian di antara kamu... Jika mereka miskin, Allah akan memampukan mereka dengan karunia-Nya." (QS. An-Nur: 32)
          </p>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div className="space-y-6">
              <div className="w-56 h-72 mx-auto rounded-t-full bg-amber-100 p-2 overflow-hidden border-b-8 border-[#d4af37] shadow-xl">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" alt="Bride" className="w-full h-full object-cover rounded-t-full" />
              </div>
              <h2 className="font-serif text-4xl text-[#064e3b]">{wedding.brideFull}</h2>
              <p className="text-gray-500 font-light leading-relaxed">{wedding.brideParents}</p>
            </div>
            
            <div className="space-y-6">
              <div className="w-56 h-72 mx-auto rounded-t-full bg-amber-100 p-2 overflow-hidden border-b-8 border-[#064e3b] shadow-xl">
                <img src="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=400" alt="Groom" className="w-full h-full object-cover rounded-t-full" />
              </div>
              <h2 className="font-serif text-4xl text-[#064e3b]">{wedding.groomFull}</h2>
              <p className="text-gray-500 font-light leading-relaxed">{wedding.groomParents}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-[#064e3b] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10">
           <OndelOndel size={300} color="#fff" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl mb-10 text-[#d4af37]">{wedding.storyTitle}</h2>
          <p className="text-lg leading-loose italic opacity-90 font-light">
            {wedding.storyContent}
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-24 px-6 bg-[#fef3c7] relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <PucukRebung size={50} />
          </div>
          <h2 className="font-serif text-5xl mb-16 text-[#064e3b]">Agenda Bahagia</h2>
          
          <Countdown targetDate={wedding.date} />

          <div className="grid md:grid-cols-2 gap-10 mt-20">
            <div className="bg-white p-10 rounded-3xl shadow-xl border-b-4 border-[#064e3b] transform transition hover:-translate-y-2">
              <div className="mb-6 inline-block bg-green-50 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#064e3b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif text-[#064e3b] mb-4">Akad Nikah</h3>
              <p className="text-xl font-bold text-gray-800 mb-2">{wedding.timeAkad}</p>
              <div className="w-12 h-1 bg-[#d4af37] mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">{wedding.locationName}</p>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{wedding.locationAddress}</p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-xl border-b-4 border-[#d4af37] transform transition hover:-translate-y-2">
              <div className="mb-6 inline-block bg-amber-50 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif text-[#064e3b] mb-4">Resepsi</h3>
              <p className="text-xl font-bold text-gray-800 mb-2">{wedding.timeResepsi}</p>
              <div className="w-12 h-1 bg-[#064e3b] mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">{wedding.locationName}</p>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{wedding.locationAddress}</p>
            </div>
          </div>

          <div className="mt-20">
            <h3 className="font-serif text-3xl mb-8 text-[#064e3b]">Lokasi Acara</h3>
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white h-[400px] group">
              <iframe 
                src={wedding.googleMapsUrl}
                width="100%" height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(wedding.locationAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-10 bg-[#064e3b] text-white px-10 py-4 rounded-full font-bold hover:bg-[#043327] shadow-xl transition-all hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Petunjuk Lokasi
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-serif text-5xl mb-16 text-[#064e3b]">Momen Indah</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wedding.gallery.map((img, i) => (
              <div key={i} className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg group relative">
                <img 
                  src={img} 
                  alt={`Wedding ${i}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-[#064e3b]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP & Guestbook */}
      <section className="py-24 px-6 bg-[#064e3b] text-[#fef3c7] relative overflow-hidden">
        <GigiBalang className="absolute top-0 rotate-180 opacity-20" />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
          <div className="animate-fade-in">
            <h2 className="font-serif text-5xl mb-8 text-[#d4af37]">RSVP</h2>
            <p className="mb-10 opacity-70 font-light text-lg">Suatu kehormatan bagi kami jika Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.</p>
            <form onSubmit={handleRSVPSubmit} className="space-y-5">
              <input 
                required
                type="text" 
                placeholder="Nama Lengkap" 
                className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                value={rsvpData.name}
                onChange={e => setRsvpData({ ...rsvpData, name: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-5">
                <select 
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white outline-none focus:border-[#d4af37] transition-all"
                  value={rsvpData.attendance}
                  onChange={e => setRsvpData({ ...rsvpData, attendance: e.target.value as any })}
                >
                  <option value="hadir" className="text-black">Hadir</option>
                  <option value="tidak_hadir" className="text-black">Tidak Hadir</option>
                </select>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  placeholder="Jml Tamu" 
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#d4af37] transition-all"
                  value={rsvpData.guests}
                  onChange={e => setRsvpData({ ...rsvpData, guests: parseInt(e.target.value) || 1 })}
                />
              </div>
              <textarea 
                rows={4}
                placeholder="Berikan ucapan & doa terbaik untuk kami..." 
                className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#d4af37] transition-all"
                value={rsvpData.message}
                onChange={e => setRsvpData({ ...rsvpData, message: e.target.value })}
              />
              <button type="submit" className="w-full bg-[#d4af37] text-[#064e3b] py-4 rounded-xl font-bold hover:brightness-110 shadow-lg transition-all active:scale-95">
                Kirim Konfirmasi
              </button>
            </form>
          </div>

          <div className="flex flex-col h-full">
            <h2 className="font-serif text-4xl mb-8">Buku Tamu</h2>
            <div className="flex-1 space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {rsvps.length === 0 ? (
                <div className="text-center py-20 opacity-30 italic">Belum ada ucapan. Jadilah yang pertama!</div>
              ) : (
                rsvps.map(r => (
                  <div key={r.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm animate-fade-in">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-[#d4af37] tracking-wide">{r.name}</span>
                      <span className={`text-[10px] uppercase tracking-tighter px-3 py-1 rounded-full font-bold ${r.attendance === 'hadir' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {r.attendance === 'hadir' ? 'Hadir' : 'Absen'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed opacity-80 font-light">"{r.message}"</p>
                    <p className="text-[10px] mt-4 opacity-40 font-mono italic">{new Date(r.createdAt).toLocaleString('id-ID')}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center bg-[#fef3c7] text-[#064e3b]">
        <div className="flex justify-center gap-6 mb-8">
           <OndelOndel size={40} />
           <PucukRebung size={40} />
           <OndelOndel size={40} />
        </div>
        <p className="font-serif text-2xl mb-2">Terima Kasih</p>
        <p className="text-gray-500 font-light max-w-sm mx-auto leading-relaxed">Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.</p>
        <div className="mt-12 opacity-30 text-xs tracking-widest uppercase">
          Digital Wedding Invitation &bull; 2025
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-6 left-0 right-0 px-6 flex justify-center z-40">
        <div className="bg-[#064e3b]/80 backdrop-blur-xl px-8 py-4 rounded-full flex gap-10 items-center shadow-2xl border border-white/10 ring-1 ring-white/20">
          <button 
            onClick={() => {
              const text = `Halo! Kami mengundang Anda ke acara pernikahan ${wedding.bride} & ${wedding.groom}.\n\nBuka undangan digital kami di: ${window.location.href}`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="text-amber-200 hover:text-[#d4af37] transition-colors flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.89 4.44-9.892 9.886-.001 2.125.593 3.456 1.574 5.111l-.973 3.558 3.721-.975zm9.252-7.724c-.325-.16-1.926-.949-2.223-1.058-.297-.108-.514-.16-.73.16-.217.325-.838 1.058-1.027 1.274-.19.216-.378.243-.702.081-.325-.162-1.371-.507-2.612-1.614-.964-.86-1.614-1.92-1.804-2.246-.19-.324-.02-.5-.181-.661-.145-.145-.324-.379-.486-.569-.162-.19-.216-.324-.324-.54-.109-.217-.055-.406-.026-.568.028-.162.216-.514.324-.676.108-.162.145-.27.216-.459.073-.189.035-.352-.016-.514-.05-.162-.459-1.108-.631-1.514-.166-.402-.335-.347-.459-.353-.12-.006-.257-.007-.395-.007s-.361.052-.549.257c-.189.206-.723.707-.723 1.725s.741 2.006.843 2.144c.102.138 1.458 2.226 3.53 3.121.493.213.878.34 1.178.435.496.158.948.135 1.304.081.397-.06 1.206-.494 1.375-.97.168-.475.168-.882.119-.97-.05-.088-.184-.139-.509-.299z"/></svg>
            <span className="text-[10px] mt-1 font-medium tracking-tight">Kirim WA</span>
          </button>
          
          <div className="w-px h-8 bg-white/20"></div>

          <button 
            onClick={() => {
              if (audioRef.current) {
                if (audioRef.current.paused) audioRef.current.play();
                else audioRef.current.pause();
              }
            }}
            className="text-amber-200 hover:text-[#d4af37] transition-colors flex flex-col items-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" className="group-hover:rotate-12 transition-transform">
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
              <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
              <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
            </svg>
            <span className="text-[10px] mt-1 font-medium tracking-tight">Putar Musik</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationView;
