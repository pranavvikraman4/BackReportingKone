import React from 'react';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n';

interface AllIssuesScreenProps {
  onGoBack: () => void;
  language: Language;
}

export const AllIssuesScreen: React.FC<AllIssuesScreenProps> = ({
  onGoBack,
  language
}) => {
  const mockIssues = [
    { id: '1', elevator: 'ELV-001', floor: 3, description: 'Door sensor misalignment', status: 'unresolved', date: 'Feb 10, 2026' },
    { id: '2', elevator: 'ELV-001', floor: 5, description: 'Unusual vibration detected', status: 'unresolved', date: 'Feb 9, 2026' },
    { id: '3', elevator: 'ELV-003', floor: 2, description: 'Call button not responding', status: 'resolved', date: 'Feb 8, 2026' },
    { id: '4', elevator: 'ELV-004', floor: 7, description: 'Floor indicator flickering', status: 'unresolved', date: 'Feb 7, 2026' },
    { id: '5', elevator: 'ELV-002', floor: 1, description: 'Door closing slowly', status: 'resolved', date: 'Feb 6, 2026' },
  ];
  
  const unresolvedCount = mockIssues.filter(i => i.status === 'unresolved').length;
  const resolvedCount = mockIssues.filter(i => i.status === 'resolved').length;
  
  return (
    <>
      <div className="bg-white border-b border-gray-300 p-4">
        <div className="flex items-center gap-3">
          <button onClick={onGoBack} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900">{getTranslation(language, 'allIssues')}</h1>
            <p className="text-sm text-gray-600">{unresolvedCount} {getTranslation(language, 'unresolved')}, {resolvedCount} {getTranslation(language, 'resolved')}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {mockIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border border-gray-300 p-4"
            >
              <div className="flex items-start gap-3">
                {issue.status === 'resolved' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className={issue.status === 'resolved' ? 'text-gray-500 line-through' : 'text-gray-900'}>
                      {issue.description}
                    </p>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-600">
                    <span className="text-[#005EB8]">{issue.elevator}</span>
                    <span>• {getTranslation(language, 'floor')} {issue.floor}</span>
                    <span>• {issue.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
