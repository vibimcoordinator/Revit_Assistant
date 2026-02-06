
import React from 'react';
import { Message } from '../types';
import { MANUAL_URLS } from '../constants';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  const renderFormattedContent = (content: string) => {
    if (!content) return null;
    
    const parts = content.split(/(\*\*.*?\*\*|^### .*$|📌 Nguồn tham khảo:.*$)/gm);
    
    return parts.map((part, index) => {
      const partTrimmed = part.trim();
      if (!partTrimmed) return null;

      if (partTrimmed.startsWith('### ')) {
        const headerText = partTrimmed.replace('### ', '');
        return (
          <div key={index} className="font-black text-[#004B8D] text-base mt-4 mb-2 flex items-center gap-2 border-l-4 border-[#ee0033] pl-3 py-1 bg-slate-50 rounded-r-lg shadow-sm">
            {headerText}
          </div>
        );
      }

      if (partTrimmed.startsWith('**') && partTrimmed.endsWith('**')) {
        const boldText = partTrimmed.slice(2, -2);
        return (
          <strong key={index} className={`font-bold ${isModel ? 'text-[#ee0033] bg-red-50 px-1 rounded mx-0.5 shadow-sm' : 'text-white underline underline-offset-4 decoration-white/40'}`}>
            {boldText}
          </strong>
        );
      }
      
      if (partTrimmed.startsWith('📌 Nguồn tham khảo:')) {
        const citationInfo = partTrimmed.replace('📌 Nguồn tham khảo:', '').trim();
        const citationParts = citationInfo.split('|').map(p => p.trim());
        const manualName = citationParts[0] || "";
        const topicName = citationParts[1] || "Xem chi tiết";
        const pageInfo = citationParts[2] || "";

        const isManual01 = manualName.toLowerCase().includes('revit-01');
        const isManual02 = manualName.toLowerCase().includes('revit-02');
        const isErrors = manualName.toLowerCase().includes('lỗi thường gặp');
        
        const url = isManual01 ? MANUAL_URLS.REVIT_01 : (isManual02 ? MANUAL_URLS.REVIT_02 : (isErrors ? MANUAL_URLS.REVIT_ERRORS : null));

        if (!url) {
          return (
            <div key={index} className="mt-4 pt-2 text-[11px] italic text-slate-400 border-t border-slate-100">
              {partTrimmed}
            </div>
          );
        }

        return (
          <div key={index} className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                Tài liệu nguồn {isErrors ? 'Huytraining' : 'VCC'}
              </div>
              {pageInfo && (
                <span className="bg-[#ee0033] text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm">
                  {pageInfo.toUpperCase()}
                </span>
              )}
            </div>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white hover:bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 hover:border-[#ee0033]/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-black text-slate-800 group-hover:text-[#ee0033] transition-colors uppercase">
                  {topicName}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  {manualName}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#ee0033] group-hover:text-white transition-all shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </a>
          </div>
        );
      }
      
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] sm:max-w-[80%] ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md border-2 transition-all ${isModel ? 'bg-white border-[#ee0033] mr-4' : 'bg-[#004B8D] border-[#004B8D] text-white ml-4'}`}>
          {isModel ? (
            <span className="text-lg font-black text-[#ee0033] tracking-tighter">VCC</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          )}
        </div>
        <div className={`p-4 rounded-3xl shadow-sm border transition-all ${
          isModel 
            ? 'bg-white border-slate-200 text-slate-800 rounded-tl-none' 
            : 'bg-[#004B8D] border-[#004B8D] text-white rounded-tr-none'
        }`}>
          <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-[15px]">
            {renderFormattedContent(message.content)}
          </div>
          <div className={`text-[10px] mt-3 font-bold opacity-70 flex justify-between items-center ${isModel ? 'text-slate-500' : 'text-blue-100'}`}>
            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {isModel && (
              <span className="flex items-center gap-1.5 text-[9px] font-black text-[#ee0033] uppercase tracking-tighter">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ee0033] animate-pulse"></span>
                VCC BIM AI
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;