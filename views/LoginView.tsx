
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PucukRebung } from '../constants';

const LoginView: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple demo password
      sessionStorage.setItem('admin_token', 'true');
      navigate('/admin');
    } else {
      alert("Password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#064e3b] p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <PucukRebung />
        </div>
        <h1 className="font-serif text-3xl text-[#064e3b] mb-2">Admin Login</h1>
        <p className="text-gray-500 mb-8">Masukkan password untuk mengelola undangan.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            autoFocus
            type="password" 
            placeholder="Password (admin123)" 
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#064e3b] outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="w-full bg-[#064e3b] text-white py-3 rounded-lg font-bold hover:bg-[#043327]">Masuk</button>
        </form>
        <button onClick={() => navigate('/')} className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline">Kembali ke Undangan</button>
      </div>
    </div>
  );
};

export default LoginView;
