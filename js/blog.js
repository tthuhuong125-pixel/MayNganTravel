/*
  blog.js — Mây Ngàn Travel
  Xử lý tab lọc Tin tức / Cẩm nang trên trang Blog
  Người phụ trách: Nhi
*/

/* ══════════════════════════════════════════════════════════
   DỮ LIỆU BÀI VIẾT
   Khi có bài mới: thêm object vào mảng articles bên dưới
   ══════════════════════════════════════════════════════════ */
const articles = [
  {
    id: 1,
    cat: 'news',                                           /* "news" = Tin tức */
    tag: 'Tin tức',
    title: 'Hà Giang tháng 10 — Mùa hoa tam giác mạch nở rộ khắp cao nguyên đá Đồng Văn',
    desc: 'Tháng 10 là thời điểm đẹp nhất để ghé thăm Hà Giang khi hàng nghìn héc-ta hoa tam giác mạch tím phủ kín các triền đồi...',
    date: '15/10/2026',
    readTime: '5 phút đọc',
    img: '../assets/images/blog/ha-giang-hoa.jpg',         /* CHÈN ẢNH: đổi đường dẫn này */
    imgAlt: 'Hoa tam giác mạch Hà Giang'
  },
  {
    id: 2,
    cat: 'news',
    tag: 'Tin tức',
    title: 'Mùa vàng Mù Cang Chải 2026 — Lịch khai hội ruộng bậc thang',
    desc: 'Năm 2026, lễ hội khám phá ruộng bậc thang Mù Cang Chải dự kiến diễn ra vào tuần đầu tháng 10, thu hút hàng nghìn du khách...',
    date: '08/10/2026',
    readTime: '3 phút đọc',
    img: '../assets/images/blog/mcc-mua-vang.jpg',         /* CHÈN ẢNH */
    imgAlt: 'Mù Cang Chải mùa vàng'
  },
  {
    id: 3,
    cat: 'news',
    tag: 'Tin tức',
    title: 'Cao Bằng — Thác Bản Giốc đẹp nhất vào tháng 9 mỗi năm',
    desc: 'Tháng 9 là thời điểm nước từ thượng nguồn đổ về nhiều nhất, tạo nên khung cảnh thác Bản Giốc hùng vĩ và trắng xóa...',
    date: '25/09/2026',
    readTime: '4 phút đọc',
    img: '../assets/images/blog/cao-bang-thac.jpg',        /* CHÈN ẢNH */
    imgAlt: 'Thác Bản Giốc Cao Bằng'
  },
  {
    id: 4,
    cat: 'guide',                                          /* "guide" = Cẩm nang */
    tag: 'Cẩm nang',
    title: 'Kinh nghiệm du lịch Sapa tự túc dành cho người lần đầu',
    desc: 'Từ cách chọn thời điểm đi, đặt phòng, đến những điểm không thể bỏ qua — cẩm nang đầy đủ cho chuyến Sapa đầu tiên của bạn...',
    date: '05/10/2026',
    readTime: '7 phút đọc',
    img: '../assets/images/blog/sapa-kinh-nghiem.jpg',     /* CHÈN ẢNH */
    imgAlt: 'Du lịch Sapa tự túc'
  },
  {
    id: 5,
    cat: 'guide',
    tag: 'Cẩm nang',
    title: 'Đi tour nhóm nhỏ hay đoàn lớn — Nên chọn loại nào phù hợp?',
    desc: 'Mỗi loại tour có ưu nhược điểm riêng. Bài viết này giúp bạn chọn đúng hình thức phù hợp với ngân sách và phong cách du lịch...',
    date: '01/10/2026',
    readTime: '5 phút đọc',
    img: '../assets/images/blog/tour-nhom.jpg',            /* CHÈN ẢNH */
    imgAlt: 'Tour nhóm du lịch miền núi'
  },
  {
    id: 6,
    cat: 'guide',
    tag: 'Cẩm nang',
    title: 'Nên mặc gì khi đi tour miền núi mùa đông? Gợi ý trang phục từ A–Z',
    desc: 'Mùa đông ở Sapa và Mù Cang Chải có thể xuống dưới 5°C về đêm. Chuẩn bị trang phục đúng cách giúp bạn thoải mái suốt hành trình...',
    date: '20/09/2026',
    readTime: '6 phút đọc',
    img: '../assets/images/blog/trang-phuc-mua-dong.jpg',  /* CHÈN ẢNH */
    imgAlt: 'Trang phục du lịch mùa đông'
  }
];


/* ══════════════════════════════════════════════════════════
   TAB SWITCHING LOGIC
   Click tab → hiện/ẩn view tương ứng
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  const tabs       = document.querySelectorAll('.blog-tab');
  const viewAll      = document.getElementById('view-all');
  const viewFiltered = document.getElementById('view-filtered');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {

      /* 1. Cập nhật trạng thái tab active */
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCat = tab.dataset.tab;   /* "all", "news", hoặc "guide" */

      if (selectedCat === 'all') {
        /* Hiện magazine layout, ẩn grid */
        viewAll.classList.remove('hidden');
        viewFiltered.classList.add('hidden');

      } else {
        /* Ẩn magazine layout, hiện grid đã lọc */
        viewAll.classList.add('hidden');
        viewFiltered.classList.remove('hidden');
        renderFilteredGrid(selectedCat);
      }
    });
  });
});


/* ══════════════════════════════════════════════════════════
   RENDER GRID KHI LỌC THEO LOẠI BÀI
   Tạo HTML card và nhét vào #view-filtered
   ══════════════════════════════════════════════════════════ */
function renderFilteredGrid(cat) {
  const viewFiltered = document.getElementById('view-filtered');

  /* Lọc bài theo loại */
  const filtered = articles.filter(a => a.cat === cat);

  /* Xác định class tag */
  const tagClass = cat === 'news' ? 'blog-tag--news' : 'blog-tag--guide';

  /* Tạo HTML cho từng card */
  const cardsHTML = filtered.map(function (article) {
    return `
      <article class="blog-card">
        <div class="blog-card-img">
          <!--
            CHÈN ẢNH: đường dẫn lấy từ mảng articles phía trên
            Kích thước đề xuất: 400x250px
          -->
          <img src="${article.img}" alt="${article.imgAlt}"
               onerror="this.style.background='#E1F5EE';this.style.minHeight='180px'">
        </div>
        <div class="blog-card-body">
          <span class="blog-tag ${tagClass}">${article.tag}</span>
          <h3 class="blog-card-title">${article.title}</h3>
          <p class="blog-card-desc">${article.desc}</p>
          <div class="article-meta">
            <span>${article.date}</span>
            <span class="meta-dot">·</span>
            <span>${article.readTime}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  viewFiltered.innerHTML = cardsHTML;
}