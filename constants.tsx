
import React from 'react';
import { WeddingData } from './types';

export const DEFAULT_WEDDING_DATA: WeddingData = {
  groom: "Zainal",
  groomFull: "Zainal Abidin, S.T.",
  groomParents: "Putra dari Bpk. Haji Mahmud & Ibu Hj. Siti",
  bride: "Laila",
  brideFull: "Laila Sari, M.Pd.",
  brideParents: "Putri dari Bpk. Mansur & Ibu Fatimah",
  date: "2025-08-17T08:00:00",
  timeAkad: "08:00 - 10:00 WIB",
  timeResepsi: "11:00 - 14:00 WIB",
  locationName: "Setu Babakan Cultural Zone",
  locationAddress: "Jl. RM. Kahfi II, Jagakarsa, Jakarta Selatan",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15860.672464791552!2d106.82282284999999!3d-6.3304543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec3111f185db%3A0x67909068065b75f9!2sSetu%20Babakan!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
  storyTitle: "Kisah Cinta di Jakarta",
  storyContent: "Berawal dari perjumpaan di festival budaya, kami menemukan keselarasan jiwa dalam adat dan cinta.",
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  isMusicEnabled: true,
  gallery: [
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800"
  ]
};

export const GigiBalang: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`gigi-balang w-full ${className}`} />
);

export const PucukRebung: React.FC<{ color?: string, size?: number, className?: string }> = ({ color = "#d4af37", size = 40, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 0L100 100H0L50 0Z" fill={color} />
    <path d="M50 20L80 100H20L50 20Z" fill="white" fillOpacity="0.3" />
  </svg>
);

export const OndelOndel: React.FC<{ size?: number, color?: string }> = ({ size = 60, color = "#064e3b" }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="8" />
    <circle cx="70" cy="80" r="10" fill={color} />
    <circle cx="130" cy="80" r="10" fill={color} />
    <path d="M70 140 Q100 170 130 140" stroke={color} strokeWidth="8" strokeLinecap="round" />
    <path d="M100 20 V50 M80 25 V45 M120 25 V45" stroke="#d4af37" strokeWidth="6" />
  </svg>
);
