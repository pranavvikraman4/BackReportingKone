import React, { useState } from 'react';
import { Language, UserRole } from '../types';
import { getTranslation } from '../i18n';

interface LoginScreenProps {
  onNavigate: (screen: any) => void;
  onLogin: (email: string, name: string, role: UserRole) => void;
  language: Language;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLogin, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    if (email && password) {
      const name = email.split('@')[0];
      const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'technician';
      onLogin(email, name, role);
      onNavigate({ type: 'dashboard' });
    }
  };
  
  return (
    <div className="size-full bg-white flex items-center justify-center flex-col gap-8 p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3">
          {['K', 'O', 'N', 'E'].map((letter, i) => (
            <div
              key={i}
              className="w-[24px] h-[32px] border border-[#005EB8] flex items-center justify-center text-[#005EB8] font-bold text-lg"
            >
              {letter}
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm">{getTranslation(language, 'appTitle')}</p>
      </div>
      
      <div className="w-full max-w-[320px] flex flex-col gap-4">
        <input
          type="email"
          placeholder={getTranslation(language, 'email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 text-gray-900"
        />
        <input
          type="password"
          placeholder={getTranslation(language, 'password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 text-gray-900"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 bg-[#005EB8] text-white font-medium hover:bg-[#004a94]"
        >
          {getTranslation(language, 'login')}
        </button>
        
        <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-100 border border-gray-300">
          <p className="font-medium mb-2">Demo Login:</p>
          <p>Admin: admin@kone.com</p>
          <p>Technician: tech@kone.com</p>
          <p>Password: any</p>
        </div>
      </div>
    </div>
  );
};
