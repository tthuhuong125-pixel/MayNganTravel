/*
  khuyenmai.js — Mây Ngàn Travel
  Xử lý trang Khuyến Mãi:
  - Tự động điền giá từ TOURS_DATA (không hardcode trong HTML nữa)
  - Phân trang 3 card / trang
  Yêu cầu: tours-data.js phải load TRƯỚC file này
*/

document.addEventListener("DOMContentLoaded", function () {

  /* ══════════════════════════════════════════════════════
     1. TỰ ĐỘNG ĐIỀN GIÁ TỪ TOURS_DATA
     HTML chỉ cần có data-tour-id trên mỗi .promo-row-card
  ══════════════════════════════════════════════════════ */
  function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
  }

  document.querySelectorAll(".promo-row-card").forEach(function (card) {
    const tourId   = card.getAttribute("data-tour-id");
    const tourData = TOURS_DATA.find(t => t.id === tourId);

    if (!tourData) return;   /* Bỏ qua nếu không tìm thấy tour */

    /* Tính % giảm từ priceOld và price trong TOURS_DATA */
    const oldPrice     = tourData.priceOld;
    const currentPrice = tourData.price;

    const badgeEl        = card.querySelector(".promo-row-card__badge");
    const oldPriceEl     = card.querySelector(".promo-row-card__old-price");
    const currentPriceEl = card.querySelector(".promo-row-card__current-price");

    if (oldPrice && oldPrice > currentPrice) {
      const discountPct = Math.round((1 - currentPrice / oldPrice) * 100);

      if (badgeEl)        badgeEl.textContent        = `Giảm ${discountPct}%`;
      if (oldPriceEl)     oldPriceEl.textContent     = formatCurrency(oldPrice);
      if (currentPriceEl) currentPriceEl.textContent = formatCurrency(currentPrice);
    } else {
      /* Tour không có giá cũ — ẩn badge và giá cũ */
      if (badgeEl)    badgeEl.style.display    = 'none';
      if (oldPriceEl) oldPriceEl.style.display = 'none';
      if (currentPriceEl) currentPriceEl.textContent = formatCurrency(currentPrice);
    }
  });


  /* ══════════════════════════════════════════════════════
     2. PHÂN TRANG
  ══════════════════════════════════════════════════════ */
  const itemsPerPage = 3;
  let currentPage    = 1;

  const tourCards  = Array.from(document.querySelectorAll(".promo-row-card"));
  const totalTours = tourCards.length;
  const totalPages = Math.ceil(totalTours / itemsPerPage);

  const pageButtons = document.querySelectorAll(".promo-page-btn[data-page]");
  const prevBtn     = document.getElementById("prevBtn");
  const nextBtn     = document.getElementById("nextBtn");

  function showPage(page) {
    currentPage    = page;
    const start    = (page - 1) * itemsPerPage;
    const end      = Math.min(start + itemsPerPage, totalTours);

    tourCards.forEach(function (card, index) {
      card.classList.toggle("is-hidden", index < start || index >= end);
    });

    /* Cập nhật trạng thái nút trang */
    pageButtons.forEach(function (btn) {
      btn.classList.toggle(
        "promo-page-btn--active",
        parseInt(btn.getAttribute("data-page")) === page
      );
    });

    prevBtn.classList.toggle("promo-page-btn--disabled", currentPage === 1);
    nextBtn.classList.toggle("promo-page-btn--disabled", currentPage === totalPages);

    document.querySelector(".promo-header-bar")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  pageButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showPage(parseInt(this.getAttribute("data-page")));
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) showPage(currentPage - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (currentPage < totalPages) showPage(currentPage + 1);
    });
  }

  /* Hiện trang đầu tiên */
  showPage(1);
});