/*
  tours-data.js — Mây Ngàn Travel
  TOÀN BỘ dữ liệu tour — sửa ở đây là cập nhật toàn site
  Phương Anh + Ngân phối hợp điền dữ liệu vào đây
*/

const TOURS_DATA = [
    {
    id: 'MNSP01',
    name: 'Tour Du lịch Sa Pa 3N2Đ',
    img: '../images/1_Sapa/MNSP01/MNSP01_01.jpg',
    imgAlt: 'Tour Du lịch Sa Pa 3N2Đ',
    duration: '3N2Đ',
    transport: 'xe',
    departure: 'HN',
    price: 2990000,
    priceOld: null,
    isHot: true,
    isNew: false,
    isSale: false,
    region: 'Tây Bắc',
    primaryDest: 'Sapa',
    otherDests: [],
    link: '../tour/chi_tiet/MNSP01.html' /* Đã tự động tạo link dựa trên ID, bạn kiểm tra lại đường dẫn */
  }

  {
    id: 'MNSP02',
    name: 'Tour Sapa - Mộc Châu - Điện Biên - Lai Châu 5N4Đ',
    img: '../images/1_Sapa/MNSP02/MNSP02_01.jpg',
    imgAlt: 'Tour Sapa - Mộc Châu - Điện Biên - Lai Châu 5N4Đ',
    duration: '5N4Đ',
    transport: 'xe',
    departure: 'HN',
    price: 7018000,
    priceOld: null,
    isHot: false,
    isNew: true,
    isSale: false,
    region: 'Tây Bắc',
    primaryDest: 'Sa Pa',
    otherDests: ['Điện Biên', 'Lai Châu', 'Mộc Châu'],
    link: '../tour/chi_tiet/MNSP02.html' /* Tự động nội suy từ ID, bạn nhớ kiểm tra lại cho khớp tên file thực tế */
  }

  


];