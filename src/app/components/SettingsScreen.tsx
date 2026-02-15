import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n';

interface SettingsScreenProps {
  onGoBack: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: { code: Language; key: string }[] = [
  { code: 'en', key: 'english' },
  { code: 'fi', key: 'finnish' },
  { code: 'de', key: 'german' },
  { code: 'fr', key: 'french' },
  { code: 'zh', key: 'chinese' },
];

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onGoBack,
  language,
  onLanguageChange
}) => {
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'settings')}</h1>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white border border-gray-300 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-300 bg-gray-50">
            <h2 className="font-medium text-gray-900">{getTranslation(language, 'language')}</h2>
          </div>
          <div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
              >
                <span className="text-gray-900">{getTranslation(language, lang.key)}</span>
                {language === lang.code && (
                  <Check className="w-5 h-5 text-[#005EB8]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
