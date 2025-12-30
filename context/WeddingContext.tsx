
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WeddingData, RSVP } from '../types';
import { DEFAULT_WEDDING_DATA } from '../constants';

interface WeddingContextType {
  wedding: WeddingData;
  rsvps: RSVP[];
  updateWedding: (data: Partial<WeddingData>) => void;
  addRSVP: (rsvp: Omit<RSVP, 'id' | 'createdAt'>) => void;
  deleteRSVP: (id: string) => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wedding, setWedding] = useState<WeddingData>(() => {
    const saved = localStorage.getItem('betawi_wedding_data');
    return saved ? JSON.parse(saved) : DEFAULT_WEDDING_DATA;
  });

  const [rsvps, setRsvps] = useState<RSVP[]>(() => {
    const saved = localStorage.getItem('betawi_wedding_rsvps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('betawi_wedding_data', JSON.stringify(wedding));
  }, [wedding]);

  useEffect(() => {
    localStorage.setItem('betawi_wedding_rsvps', JSON.stringify(rsvps));
  }, [rsvps]);

  const updateWedding = (data: Partial<WeddingData>) => {
    setWedding(prev => ({ ...prev, ...data }));
  };

  const addRSVP = (rsvp: Omit<RSVP, 'id' | 'createdAt'>) => {
    const newRSVP: RSVP = {
      ...rsvp,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setRsvps(prev => [newRSVP, ...prev]);
  };

  const deleteRSVP = (id: string) => {
    setRsvps(prev => prev.filter(r => r.id !== id));
  };

  return (
    <WeddingContext.Provider value={{ wedding, rsvps, updateWedding, addRSVP, deleteRSVP }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) throw new Error("useWedding must be used within WeddingProvider");
  return context;
};
