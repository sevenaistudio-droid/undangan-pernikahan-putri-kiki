
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WeddingProvider } from './context/WeddingContext';
import InvitationView from './views/InvitationView';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('admin_token') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <WeddingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<InvitationView />} />
          <Route path="/login" element={<LoginView />} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminView />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </WeddingProvider>
  );
};

export default App;
