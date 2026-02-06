import React, { useState } from 'react';
import { REVIT_SHORTCUT_GROUPS, MANUAL_URLS, COMMON_ERRORS, BIM_INFO_CATEGORIES } from '../constants';

interface SidebarProps {
  onShortcutClick: (cmd: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShortcutClick }) => {
  const [errorSearch, setErrorSearch] = useState("");

  const manuals = [
    {
      id: '01',
      title: 'Basic Modeling',
      color: 'bg-emerald-600',
      url: MANUAL_URLS.REVIT_01,
      topics: ['Hệ định vị & Lưới trục', 'Dựng Cột, Tường, Cửa', 'Cài đặt Template']
    },
    {
      id: '02',
      title: 'Annotation & BIM',
      color: 'bg-amber-600',
      url: MANUAL_URLS.REVIT_02,
      topics: ['Kích thước & Ghi chú', 'Quản lý hiển thị (VG)', 'Worksharing']
    },
    {
      id: 'ERR',
      title: 'Troubleshooting',
      color: 'bg-rose-600',
      url: MANUAL_URLS.REVIT_ERRORS,
      topics: ['Lỗi cài đặt & Crack', 'Mất thanh công cụ', 'Thủ thuật in PDF']
    }
  ];

  const filteredErrors = COMMON_ERRORS.filter(error => 
    error.title.toLowerCase().includes(errorSearch.toLowerCase())
  );

  const handleExplainGroup = (group: typeof REVIT_SHORTCUT_GROUPS[0]) => {
    const prompt = `Tổng hợp các lệnh tắt phổ biến trong revit thuộc nhóm lệnh ${group.category}`;
    onShortcutClick(prompt);
  };

  const handleBIMInfoClick = (cat: typeof BIM_INFO_CATEGORIES[0]) => {
    const prompt = `Hãy liệt kê các thông tin (parameters) bắt buộc phải nhập cho đối tượng ${cat.name} theo tiêu chuẩn BIM VCC để đảm bảo mô hình mang đầy đủ thông tin. Vui lòng trình bày dưới dạng bảng hoặc checklist chuyên nghiệp.`;
    onShortcutClick(prompt);
  };

  const handleDiagnosticClick = (error: typeof COMMON_ERRORS[0]) => {
    const prompt = `Tôi đang gặp vấn đề: "${error.title}". Dựa trên các tài liệu Sổ tay Revit (ưu tiên) hoặc Sổ tay Lỗi thường gặp, hãy hướng dẫn khắc phục chi tiết kèm số trang.`;
    onShortcutClick(prompt);
  };

  return (
    <div className="flex flex-col h-full bg-[#004B8D] w-80 hidden lg:flex text-white border-r border-white/10 shadow-xl">
      {/* Header */}
      <div className="p-5 border-b border-white/10 bg-[#003d73]">
        <h2 className="text-lg font-black flex items-center gap-2 tracking-tighter uppercase italic">
          <span className="w-2 h-6 bg-[#ee0033] skew-x-[-15deg]"></span>
          VCC BIM LIBRARY
        </h2>
        <p className="text-[9px] text-blue-300 mt-1 font-bold uppercase tracking-widest text-center italic opacity-70">Source: VCC & Huytraining</p>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-8">
        
        {/* Manuals Section */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-1">Tài liệu nguồn</h3>
          <div className="grid grid-cols-1 gap-2">
            {manuals.map((m) => (
              <div key={m.id} className="bg-white/5 rounded-xl border border-white/10 p-2.5 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[8px] font-black text-white px-1.5 py-0.5 rounded ${m.color}`}>{m.id}</span>
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
                <div className="space-y-1">
                  {m.topics.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => onShortcutClick(`Dựa trên các tài liệu sẵn có, hãy hướng dẫn về: ${topic}`)}
                      className="block w-full text-left text-[11px] text-blue-100 hover:text-white truncate py-0.5"
                    >
                      • {topic}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BIM INFORMATION STANDARDS SECTION */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest px-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee0033]"></span>
            Tiêu chuẩn thông tin BIM
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {BIM_INFO_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleBIMInfoClick(cat)}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#ee0033]/40 hover:bg-white/10 transition-all group"
              >
                <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-[10px] font-bold text-center text-blue-50 group-hover:text-white">{cat.name.split(' (')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostic Section */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-1">Khắc phục sự cố</h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nhập lỗi bạn gặp..."
              value={errorSearch}
              onChange={(e) => setErrorSearch(e.target.value)}
              className="w-full bg-[#003d73] border border-white/10 rounded-lg py-1.5 pl-7 pr-2 text-[11px] text-white focus:outline-none focus:border-[#ee0033]"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-2 text-blue-300/40" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <div className="space-y-1">
            {filteredErrors.map((error, idx) => (
              <button
                key={idx}
                onClick={() => handleDiagnosticClick(error)}
                className="w-full text-left p-2 rounded-lg bg-white/5 border border-transparent hover:border-[#ee0033]/30 hover:bg-[#ee0033]/5 transition-all"
              >
                <p className="text-[10px] font-bold text-blue-50">{error.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Shortcuts Section */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-1 border-b border-white/10 pb-2 mb-3">Nhóm lệnh Revit</h3>
          <div className="flex flex-col gap-1">
            {REVIT_SHORTCUT_GROUPS.map((group) => (
              <button
                key={group.category}
                onClick={() => handleExplainGroup(group)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all group"
              >
                <span className="text-[12px] font-medium text-white group-hover:text-[#ee0033]">
                  {group.category}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-[#ee0033] group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-[#003d73] border-t border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-[#ee0033]">
           <span className="text-sm font-black text-[#ee0033]">VCC</span>
        </div>
        <div>
          <div className="text-[9px] font-black text-white uppercase leading-tight">Viettel Construction</div>
          <div className="text-[8px] text-blue-400 font-bold uppercase tracking-widest">BIM Support Team</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;