import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n';

interface AddElevatorScreenProps {
  onGoBack: () => void;
  onNavigate: (screen: any) => void;
  onAddElevator: (elevator: any) => void;
  language: Language;
}

export const AddElevatorScreen: React.FC<AddElevatorScreenProps> = ({
  onGoBack,
  onNavigate,
  onAddElevator,
  language
}) => {
  const [formData, setFormData] = useState({
    id: '',
    building: '',
    location: '',
    totalFloors: 5,
    status: 'active' as 'active' | 'inactive'
  });
  
  const handleSubmit = () => {
    if (formData.id && formData.building && formData.location) {
      onAddElevator(formData);
      onNavigate({ type: 'dashboard' });
    }
  };
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'addNewElevator')}</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'elevatorId')}
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="ELV-006"
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'building')}
              </label>
              <input
                type="text"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                placeholder="Tower B"
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'location')}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Helsinki Central"
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'totalFloors')}
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.totalFloors}
                onChange={(e) => setFormData({ ...formData, totalFloors: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'status')}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-3 py-2 border border-gray-300"
              >
                <option value="active">{getTranslation(language, 'active')}</option>
                <option value="inactive">{getTranslation(language, 'inactive')}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate({ type: 'dashboard' })}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-900 font-medium hover:bg-gray-50"
          >
            {getTranslation(language, 'cancel')}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-[#005EB8] text-white font-medium hover:bg-[#004a94]"
          >
            {getTranslation(language, 'addElevator')}
          </button>
        </div>
      </div>
    </>
  );
};
