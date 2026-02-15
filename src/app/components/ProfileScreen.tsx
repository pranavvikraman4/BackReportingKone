import React from 'react';
import { ArrowLeft, User, Mail, Badge, Building } from 'lucide-react';
import { Language, User as UserType } from '../types';
import { getTranslation } from '../i18n';

interface ProfileScreenProps {
  onGoBack: () => void;
  user: UserType;
  language: Language;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onGoBack,
  user,
  language
}) => {
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'maintainerProfile')}</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white border border-gray-300 p-6 mb-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#005EB8] flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-[#005EB8] mt-2">{user.employeeId}</p>
          {user.role === 'admin' && (
            <span className="inline-block mt-2 px-3 py-1 bg-[#005EB8] text-white text-xs">Admin</span>
          )}
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Building className="w-4 h-4" />
            {getTranslation(language, 'department')}
          </h3>
          <p className="text-sm text-gray-600">{getTranslation(language, 'elevatorMaintenance')}</p>
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {getTranslation(language, 'contactInfo')}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{getTranslation(language, 'email')}:</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="text-gray-900">+358 40 123 4567</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Badge className="w-4 h-4" />
            {getTranslation(language, 'certifications')}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-900">Elevator Safety</span>
              <span className="text-green-600">Valid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Electrical Systems</span>
              <span className="text-green-600">Valid</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Hydraulics</span>
              <span className="text-green-600">Valid</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-300 p-4">
          <h3 className="font-medium text-gray-900 mb-3">{getTranslation(language, 'workSchedule')}</h3>
          <p className="text-sm text-gray-600">Monday - Friday, 08:00 - 17:00</p>
        </div>
      </div>
    </>
  );
};
