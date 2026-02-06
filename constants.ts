import { Shortcut, CommonError } from './types';

export interface ShortcutGroup {
  category: string;
  items: Shortcut[];
}

export interface BIMCategory {
  name: string;
  icon: string;
  description: string;
}

export const REVIT_SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    category: "Thiết lập & Hệ thống",
    items: [
      { key: 'GR', command: 'Grid', description: 'Tạo lưới trục' },
      { key: 'LL', command: 'Level', description: 'Tạo cao độ' },
      { key: 'UN', command: 'Project Units', description: 'Thiết lập đơn vị' },
    ]
  },
  {
    category: "Dựng hình cơ bản",
    items: [
      { key: 'WA', command: 'Wall', description: 'Vẽ tường' },
      { key: 'DR', command: 'Door', description: 'Bố trí cửa đi' },
      { key: 'WN', command: 'Window', description: 'Bố trí cửa sổ' },
      { key: 'CL', command: 'Column', description: 'Bố trí cột' },
      { key: 'BM', command: 'Beam', description: 'Bố trí dầm' },
    ]
  },
  {
    category: "Chỉnh sửa (Modify)",
    items: [
      { key: 'MV', command: 'Move', description: 'Di chuyển' },
      { key: 'CO', command: 'Copy', description: 'Sao chép' },
      { key: 'RO', command: 'Rotate', description: 'Xoay đối tượng' },
      { key: 'TR', command: 'Trim/Extend', description: 'Cắt/Nối đối tượng' },
      { key: 'AL', command: 'Align', description: 'Căn lề đối tượng' },
      { key: 'OF', command: 'Offset', description: 'Tạo bản sao song song' },
    ]
  },
  {
    category: "Hiển thị & Đồ họa",
    items: [
      { key: 'VG', command: 'Visibility/Graphics', description: 'Quản lý hiển thị' },
      { key: 'HH', command: 'Hide Category', description: 'Ẩn tạm thời category' },
      { key: 'EH', command: 'Hide Element', description: 'Ẩn đối tượng được chọn' },
      { key: 'RH', command: 'Reveal Hidden', description: 'Hiện đối tượng bị ẩn' },
      { key: 'BX', command: 'Section Box', description: 'Cắt 3D vùng chọn' },
      { key: 'TL', command: 'Thin Lines', description: 'Chế độ nét mảnh' },
    ]
  },
  {
    category: "Ghi chú & Hồ sơ",
    items: [
      { key: 'DI', command: 'Dimension', description: 'Ghi kích thước' },
      { key: 'RM', command: 'Room', description: 'Đặt tên phòng' },
      { key: 'RT', command: 'Room Tag', description: 'Gắn tag tên phòng' },
      { key: 'TX', command: 'Text', description: 'Viết ghi chú chữ' },
      { key: 'DL', command: 'Detail Line', description: 'Vẽ đường nét 2D' },
    ]
  }
];

export const BIM_INFO_CATEGORIES: BIMCategory[] = [
  { name: "Tường (Walls)", icon: "🧱", description: "Cấu trúc, chống cháy, vật liệu" },
  { name: "Cột (Columns)", icon: "🏛️", description: "Chịu lực, mã hiệu, cao độ" },
  { name: "Dầm (Beams)", icon: "🏗️", description: "Mác bê tông, tiết diện, cao độ" },
  { name: "Cửa (Doors/Windows)", icon: "🚪", description: "Kích thước, mã hiệu, phụ kiện" },
  { name: "Sàn (Floors)", icon: "📐", description: "Cấu tạo lớp, hoàn thiện, diện tích" },
  { name: "MEP (Mechanical)", icon: "⚙️", description: "Hệ thống, lưu lượng, công suất" }
];

export const REVIT_SHORTCUTS: Shortcut[] = REVIT_SHORTCUT_GROUPS.flatMap(g => g.items);

export const COMMON_ERRORS: CommonError[] = [
  {
    title: "Mất thanh Properties/Project Browser?",
    solutions: ["Chuột phải vào màn hình > chọn Properties hoặc Project Browser", "Vào tab View > User Interface > Tích chọn thanh bị mất."]
  },
  {
    title: "Không thấy nét khuất của dầm?",
    solutions: ["Chỉnh Discipline sang Structural", "Kiểm tra cài đặt Show Hidden Lines trong View Properties."]
  },
  {
    title: "Lỗi Font chữ khi in PDF?",
    solutions: ["Đổi chương trình in PDF khác (Nitro, Adobe, Foxit)", "Kiểm tra bộ font tiếng Việt cài trong máy."]
  }
];

export const MANUAL_URLS = {
  REVIT_01: 'https://drive.google.com/file/d/1MSrXEHQt58-nPhKIICOO1dMoL6VG1shX/view?usp=drive_link',
  REVIT_02: 'https://drive.google.com/file/d/1Hfhl1d_Xs5whtYKlrvxL9btdcZTenOBi/view?usp=drive_link',
  REVIT_ERRORS: 'https://drive.google.com/file/d/11ShF9H2tSBqY6t52ZH_eN7PvqYlOhEZs/view?usp=sharing'
};

export const VCC_LOGO_TEXT = "VCC";