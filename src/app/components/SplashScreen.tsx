import React, { useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../i18n';

interface SplashScreenProps {
  onNavigate: (screen: any) => void;
  isLoggedIn: boolean;
  language: Language;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate, isLoggedIn, language }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate({ type: isLoggedIn ? 'dashboard' : 'login' });
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [isLoggedIn, onNavigate]);
  
  return (
    <div className="size-full bg-white flex items-center justify-center flex-col gap-6">
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
  );
};
