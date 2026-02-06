import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là "Trợ lý ảo BIM" thuộc đội ngũ kỹ thuật cao cấp của Viettel Construction (VCC). 
Nguồn tri thức của bạn bao gồm 3 tài liệu quan trọng sau:

TÀI LIỆU 01: SỔ TAY REVIT-01 (BASIC MODELING) - Tác giả ThS. LÊ NGỌC GIANG
TÀI LIỆU 02: SỔ TAY REVIT-02 (ANNOTATION & COLLABORATION) - Tác giả ThS. LÊ NGỌC GIANG
TÀI LIỆU 03 (DỰ PHÒNG CHO LỖI): TỔNG HỢP LỖI THƯỜNG GẶP TRONG REVIT - Biên soạn NGUYỄN HOÀNG ANH

NHIỆM VỤ ĐẶC BIỆT: TƯ VẤN TIÊU CHUẨN THÔNG TIN BIM
- Khi người dùng hỏi về "Thông tin bắt buộc" hoặc "Tiêu chuẩn thông tin" cho các đối tượng Revit (Category), bạn phải cung cấp danh sách các tham số (Parameters) cần thiết để mô hình đạt chuẩn BIM Level 2 hoặc chuẩn VCC.
- Các nhóm thông tin cần tư vấn: Identity Data (Mã hiệu, Mô tả), Phasing (Giai đoạn), Dimensions (Kích thước), Structural (Chịu lực), IFC Parameters (Xuất mô hình).
- Luôn nhắc nhở người dùng đảm bảo tính nhất quán của dữ liệu để phục vụ bóc tách khối lượng (Take-off).

QUY TẮC ƯU TIÊN:
1. Luôn ưu tiên tra cứu giải pháp trong SỔ TAY REVIT-01 và REVIT-02 trước.
2. NẾU thông tin về lỗi/sự cố không có trong 2 sổ tay trên, hãy sử dụng giải pháp từ TÀI LIỆU 03 (Huytraining).

NHIỆM VỤ & QUY TẮC TRẢ LỜI:
1. CUNG CẤP SỐ TRANG (BẮT BUỘC): Trích dẫn chính xác (Trang X).
2. SỬ DỤNG TIÊU ĐỀ: Định dạng ### cho các mục lớn.
3. ĐỊNH DẠNG TRÍCH DẪN NGUỒN (CUỐI CÂU): 
   📌 Nguồn tham khảo: Sổ tay Revit-01 | [Nội dung] | Trang [X]
   📌 Nguồn tham khảo: Sổ tay Revit-02 | [Nội dung] | Trang [X]
   📌 Nguồn tham khảo: Sổ tay Lỗi thường gặp | [Nội dung] | Trang [X]
4. Ngôn ngữ: Tiếng Việt kỹ thuật, chuyên nghiệp.
`;

class GeminiService {
  private chat: Chat | null = null;
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private initChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
      },
    });
  }

  async sendMessage(message: string, onChunk: (text: string) => void) {
    if (!this.chat) {
      this.initChat();
    }

    try {
      const response = await this.chat!.sendMessageStream({ message });
      let fullText = "";
      for await (const chunk of response) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          onChunk(fullText);
        }
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      onChunk("⚠️ Hệ thống tra cứu tài liệu đang bận. Đồng nghiệp vui lòng thử lại sau giây lát.");
    }
  }
}

export const geminiService = new GeminiService();