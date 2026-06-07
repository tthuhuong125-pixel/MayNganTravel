/*
  khuyenmai.js — Mây Ngàn Travel
  Trang Khuyến Mãi: render tour sale + phân trang

  Yêu cầu load trước:
    1. toursdata.js  — TOURS_DATA
    2. tourcard.js   — renderTourGrid()
*/

document.addEventListener("DOMContentLoaded", function () {

  /* ══════════════════════════════════════════════════════
     BƯỚC 1: RENDER TẤT CẢ TOUR CÓ isSale:true
     Dùng renderTourGrid từ tourcard.js — giống hệt trang danh sách
     Card HTML, CSS, badge, giá cũ/mới đều tự động từ hệ thống chung
  ══════════════════════════════════════════════════════ */
  renderTourGrid('#promoGrid', { isSale: true });

  /* ── FIX ĐƯỜNG DẪN cho trang root ──────────────────────
     tours-data.js dùng './chi_tiet/' (tương đối từ thư mục tour/)
     Khuyen_mai.html nằm ở root → cần thêm 'tour/' vào đầu
  ──────────────────────────────────────────────────────── */
  document.querySelectorAll('#promoGrid .tour-card__btn').forEach(function (btn) {
    const href = btn.getAttribute('href');
    if (href && href.startsWith('./chi_tiet/')) {
      btn.setAttribute('href', 'tour/' + href.replace('./', ''));
    }
  });

  /* Sau khi render xong, lấy danh sách card để phân trang */
  const grid      = document.getElementById('promoGrid');
  const allCards  = Array.from(grid.querySelectorAll('.tour-card'));
  const totalTours = allCards.length;

  /* Cập nhật bộ đếm */
  const countEl = document.getElementById('tourCount');
  if (countEl) countEl.textContent = totalTours;

  /* Nếu không có tour nào → ẩn phân trang */
  if (totalTours === 0) {
    const pagination = document.getElementById('promoPagination');
    if (pagination) pagination.style.display = 'none';
    return;
  }


  /* ══════════════════════════════════════════════════════
     BƯỚC 2: PHÂN TRANG — 3 card / trang
     Sinh nút số trang tự động dựa trên số tour thực tế
  ══════════════════════════════════════════════════════ */
  const ITEMS_PER_PAGE = 3;
  const totalPages     = Math.ceil(totalTours / ITEMS_PER_PAGE);
  let   currentPage    = 1;

  const prevBtn       = document.getElementById('prevBtn');
  const nextBtn       = document.getElementById('nextBtn');
  const pageNumbersEl = document.getElementById('pageNumbers');

  /* Sinh nút số trang */
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className    = 'promo-page-btn';
    btn.setAttribute('data-page', i);
    btn.textContent  = i;
    btn.addEventListener('click', function () {
      showPage(parseInt(this.getAttribute('data-page')));
    });
    pageNumbersEl.appendChild(btn);
  }

  /* Ẩn phân trang nếu chỉ có 1 trang */
  if (totalPages <= 1) {
    document.getElementById('promoPagination').style.display = 'none';
  }


  /* ══════════════════════════════════════════════════════
     BƯỚC 3: HÀM HIỆN TRANG
  ══════════════════════════════════════════════════════ */
  function showPage(page) {
    currentPage   = page;
    const start   = (page - 1) * ITEMS_PER_PAGE;
    const end     = Math.min(start + ITEMS_PER_PAGE, totalTours);

    /* Hiện/ẩn card */
    allCards.forEach(function (card, index) {
      card.style.display = (index >= start && index < end) ? '' : 'none';
    });

    /* Cập nhật trạng thái nút số trang */
    const pageButtons = pageNumbersEl.querySelectorAll('.promo-page-btn');
    pageButtons.forEach(function (btn) {
      btn.classList.toggle(
        'promo-page-btn--active',
        parseInt(btn.getAttribute('data-page')) === page
      );
    });

    /* Cập nhật prev/next */
    prevBtn.classList.toggle('promo-page-btn--disabled', currentPage === 1);
    nextBtn.classList.toggle('promo-page-btn--disabled', currentPage === totalPages);

    /* Cuộn lên tiêu đề */
    const headerBar = document.querySelector('.promo-header-bar');
    if (headerBar) headerBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* Sự kiện prev/next */
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  nextBtn.addEventListener('click', function () {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  /* Hiện trang đầu tiên */
  showPage(1);

});