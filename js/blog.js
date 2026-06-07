
const articles = [

  /* ── TIN TỨC ────────────────────────────────────────── */
  {
    id: 1,
    cat: 'news',
    tag: 'Tin tức',
    title: 'Sắc Vàng Tây Bắc - Đón Chờ Mùa Lúa Chín Rực Rỡ Nhất Năm',
    desc: 'Bắt đầu từ tháng 9 đến giữa tháng 10, hàng vạn thửa ruộng bậc thang đồng loạt chuyển mình từ sắc xanh mướt sang màu vàng óng ả, tỏa hương thơm ngát của lúa mới làm say đắm biết bao tâm hồn lữ khách.',
    date: '10/09/2026',
    readTime: '5 phút đọc',
    img: '../images/5_MuCangChai/MNM201/MNM201_01.jpg',
    imgAlt: 'Mù Cang Chải mùa vàng rực rỡ',
    link: 'tintuc/bai1.html'
  },
  {
    id: 2,
    cat: 'news',
    tag: 'Tin tức',
    title: 'Bản Tình Ca Đông Bắc - Thác Bản Giốc & Hồ Ba Bể Mùa Nước Đẹp Nhất',
    desc: 'Từ tháng 8 đến tháng 10, những cơn mưa rào mùa hạ đã lùi xa, nhường chỗ cho dòng nước trong vắt, khí hậu mát mẻ — khoảng thời gian được mệnh danh là "mùa nước đổ ngọc bích" của Đông Bắc.',
    date: '10/09/2026',
    readTime: '5 phút đọc',
    img: '../images/8_CaoBang/MNCB01/MNCB01_04.jpg',
    imgAlt: 'Toàn cảnh dòng sông Quây Sơn Cao Bằng',
    link: 'tintuc/bai2.html'
  },
  {
    id: 3,
    cat: 'news',
    tag: 'Tin tức',
    title: 'Chạm Tay Vào Biển Mây - Y Tý & Tà Xùa Đã Sẵn Sàng Chào Đón',
    desc: 'Khi tiết trời chuyển giao từ thu sang đông, độ ẩm cao kết hợp cùng nhiệt độ thấp tạo điều kiện hoàn hảo nhất cho mùa mây "đặc sản" của Tây Bắc tại Y Tý và Tà Xùa.',
    date: '10/09/2026',
    readTime: '4 phút đọc',
    img: '../images/6_TaXua/MNTX02/MNTX02_05.jpg',
    imgAlt: 'Sống lưng khủng long Tà Xùa và biển mây',
    link: 'tintuc/bai3.html'
  },

  /* ── CẨM NANG ───────────────────────────────────────── */
  {
    id: 4,
    cat: 'guide',
    tag: 'Cẩm nang',
    title: 'Hành Trang Vi Vu Vùng Cao - Đem Gì Để Vừa Đủ, Vừa Đẹp?',
    desc: 'Thời tiết vùng cao vô cùng "đỏng đảnh", có thể mang đủ 4 mùa chỉ trong một ngày. Chuẩn bị hành lý đúng cách giúp bạn thoải mái suốt hành trình và vẫn lên ảnh cực chất.',
    date: '15/09/2026',
    readTime: '6 phút đọc',
    img: '../images/tp2.jpg',
    imgAlt: 'Hành trang du lịch vùng cao gọn gàng',
    link: 'camnang/tip1.html'
  },
  {
    id: 5,
    cat: 'guide',
    tag: 'Cẩm nang',
    title: 'Bản Đồ Ẩm Thực Tinh Hoa Đông - Tây Bắc',
    desc: 'Các món ăn vùng cao không cầu kỳ trong cách trình bày, nhưng lại ghi dấu ấn đặc biệt bởi nguyên liệu núi rừng và các loại gia vị đặc trưng như hạt dổi, mắc khén không thể tìm thấy ở đồng bằng.',
    date: '15/09/2025',
    readTime: '5 phút đọc',
    img: '../images/ga.png',
    imgAlt: 'Mâm cơm Tây Bắc đầy màu sắc',
    link: 'camnang/tip2.html'
  },
  {
    id: 6,
    cat: 'guide',
    tag: 'Cẩm nang',
    title: 'Bí Kíp Vượt Đèo & Chống Say Xe Cho Lữ Khách',
    desc: 'Cung đèo Tây Bắc là trải nghiệm tuyệt vời cho thị giác nhưng lại là "cơn ác mộng" với người dễ say tàu xe. Những bí kíp dưới đây giúp bạn tận hưởng trọn vẹn cảnh sắc mà không bị đánh gục.',
    date: '15/09/2026',
    readTime: '5 phút đọc',
    img: '../images/7_HaGiang/MNHG01/MNHG01_02.jpg',
    imgAlt: 'Đường đèo uốn lượn vùng cao',
    link: 'camnang/tip3.html'
  }

];





function renderFilteredGrid(cat) {
  const viewFiltered = document.getElementById('view-filtered');

  const filtered = articles.filter(a => a.cat === cat);
  const tagClass  = cat === 'news' ? 'blog-tag--news' : 'blog-tag--guide';

  const cardsHTML = filtered.map(function (article) {
    return `
      <article class="blog-card">
        <!-- Toàn bộ card là link dẫn đến bài viết -->
        <a href="${article.link}" class="blog-card-link">
          <div class="blog-card-img">
            <img src="${article.img}"
                 alt="${article.imgAlt}"
                 loading="lazy"
                 onerror="this.parentElement.style.background='var(--color-primary-bg)'; this.style.display='none'">
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
        </a>
      </article>
    `;
  }).join('');

  viewFiltered.innerHTML = cardsHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    const tabs         = document.querySelectorAll('.blog-tab');
    const viewAll      = document.getElementById('view-all');
    const viewFiltered = document.getElementById('view-filtered');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const selectedCat = tab.dataset.tab;
            if (selectedCat === 'all') {
                viewAll.classList.remove('hidden');
                viewFiltered.classList.add('hidden');
            } else {
                viewAll.classList.add('hidden');
                viewFiltered.classList.remove('hidden');
                renderFilteredGrid(selectedCat);
            }
        });
    });

    
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam  = urlParams.get('tab');   
    if (tabParam && tabParam !== 'all') {
        
        const targetTab = document.querySelector(`.blog-tab[data-tab="${tabParam}"]`);
        if (targetTab) {
            targetTab.click();   
        }
    }
    
});