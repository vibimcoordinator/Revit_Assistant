import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { geminiService } from './geminiService';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: '🏗️ Chào đồng nghiệp! Tôi là trợ lý BIM từ **Viettel Construction**.\n\nDữ liệu của tôi đã được đồng bộ hóa với:\n- 📗 **Sổ tay Revit-01**: Chuyên sâu về kỹ thuật dựng hình 3D chuẩn BIM.\n- 📘 **Sổ tay Revit-02**: Chuyên sâu về triển khai hồ sơ, quản lý hiển thị và làm việc nhóm.\n- 📙 **Sổ tay Lỗi thường gặp**: Giải pháp khắc phục sự cố kỹ thuật Revit.\n\nBạn cần tra cứu quy trình hay giải quyết sự cố kỹ thuật nào trong dự án hôm nay?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    let modelResponse: Message = {
      role: 'model',
      content: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelResponse]);

    await geminiService.sendMessage(content, (chunk) => {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last.role === 'model') {
          return [...prev.slice(0, -1), { ...last, content: chunk }];
        }
        return prev;
      });
    });

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <Sidebar onShortcutClick={handleSendMessage} />

      {/* Main Content */}
      <main className="flex flex-col flex-grow relative h-full">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <div className="h-10 flex items-center">
              <span className="text-2xl font-black text-[#ee0033] tracking-tighter">VCC</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-black text-slate-700 uppercase tracking-tighter">REVIT ASSISTANT</h1>
                <span className="bg-[#ee0033] text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase shadow-sm">AI Agent</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Đồng hành kiến tạo cuộc sống mới</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end border-r border-slate-200 pr-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Knowledge Base</span>
              <span className="text-[11px] font-black text-[#004B8D]">REVIT 01, 02 & ERRORS</span>
            </div>
            
            {/* YouTube Link Button */}
            <a 
              href="https://www.youtube.com/channel/UCI0kkeA1F12lp0BbyVpQKmA" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Kênh YouTube kỹ thuật VCC"
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-200 shadow-sm hover:bg-[#ee0033] hover:text-white hover:border-[#ee0033] transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>

            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#ee0033] border border-slate-200 shadow-inner overflow-hidden">
               <span className="text-xs font-black text-[#ee0033]">VCC</span>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 custom-scrollbar relative">
          {/* Watermark Background */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
             <span className="text-[20rem] font-black text-slate-900 tracking-tighter">VCC</span>
          </div>
          
          <div className="max-w-4xl mx-auto w-full relative z-10">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && messages[messages.length - 1].content === '' && (
              <div className="flex justify-start mb-6">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#ee0033] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#ee0033] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#ee0033] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <div className="max-w-4xl mx-auto w-full">
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            <div className="flex justify-between items-center mt-3 px-2">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Dữ liệu thuộc sở hữu của Viettel Construction. Bảo mật nội bộ VCC.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Knowledge Base Active</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;