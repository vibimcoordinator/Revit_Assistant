
import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const suggestions = [
    { label: '⚡ Phím tắt WA', query: 'Hướng dẫn sử dụng lệnh vẽ tường (WA) và các tùy chọn đi kèm.' },
    { label: '🛠️ Lỗi hiển thị', query: 'Tại sao tôi không thấy đối tượng trên mặt bằng dù đã bật trong VG?' },
    { label: '📏 Ghi chú Dim', query: 'Quy chuẩn ghi kích thước (Dimension) theo Sổ tay Revit-02.' },
    { label: '👥 Làm việc nhóm', query: 'Quy trình khởi tạo Worksharing và Sync dữ liệu chuẩn BIM VCC.' },
    { label: '🧱 Quản lý Family', query: 'Cách tạo và quản lý tham số cho Family cơ bản trong Sổ tay 01.' },
  ];

  useEffect(() => {
    // Khởi tạo Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'vi-VN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Lỗi nhận diện giọng nói:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSend = (text?: string) => {
    const messageToSend = text || input;
    if (messageToSend.trim() && !isLoading) {
      onSend(messageToSend);
      if (!text) setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
        return;
      }
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col gap-3">
      {/* Suggestion Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar custom-scrollbar">
        <div className="flex-shrink-0 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 pr-2 border-r border-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          Gợi ý
        </div>
        <div className="flex gap-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s.query)}
              disabled={isLoading}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-[#ee0033]/5 hover:border-[#ee0033]/30 hover:text-[#ee0033] transition-all whitespace-nowrap shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field Area */}
      <div className="relative flex items-end gap-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-[#ee0033]/20 transition-all">
        {/* Voice Button */}
        <button
          onClick={toggleListening}
          disabled={isLoading}
          className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            isListening 
              ? 'bg-[#ee0033] text-white animate-pulse shadow-[0_0_15px_rgba(238,0,51,0.4)]' 
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
          title={isListening ? "Đang lắng nghe..." : "Hỏi bằng giọng nói"}
        >
          {isListening ? (
            <div className="flex gap-0.5 items-center">
              <span className="w-1 h-4 bg-white rounded-full animate-[bounce_0.6s_infinite]"></span>
              <span className="w-1 h-6 bg-white rounded-full animate-[bounce_0.8s_infinite]"></span>
              <span className="w-1 h-4 bg-white rounded-full animate-[bounce_1s_infinite]"></span>
            </div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
          )}
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Hãy nói điều bạn đang thắc mắc..." : "Nhập câu hỏi kỹ thuật Revit..."}
          className={`flex-grow bg-transparent border-none focus:ring-0 resize-none py-2 px-1 text-slate-800 text-sm max-h-[120px] custom-scrollbar ${isListening ? 'placeholder-[#ee0033] font-medium' : ''}`}
          disabled={isLoading}
        />

        {/* Send Button */}
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${
            input.trim() && !isLoading
              ? 'bg-[#ee0033] text-white hover:bg-[#d4002e] hover:scale-105 active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
