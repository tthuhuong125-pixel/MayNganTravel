/*
  Trang_danh_sach_tours.js — Mây Ngàn Travel
  Bộ lọc + sắp xếp trang danh sách tour

  THỨ TỰ LOAD (bắt buộc):
  1. tourdata.js               → khai báo TOURS_DATA
  2. tourcard.js               → khai báo renderTourGrid
  3. file này                  → filter + sort
*/

document.addEventListener("DOMContentLoaded", function () {

  /* ══════════════════════════════════════════════════
     BƯỚC 1: RENDER CARDS
  ══════════════════════════════════════════════════ */
  renderTourGrid('#toursGrid', {});

  /* ══════════════════════════════════════════════════
     BƯỚC 2: PHẦN TỬ DOM
  ══════════════════════════════════════════════════ */
  const tourGrid     = document.getElementById('toursGrid');
  const countEl      = document.getElementById('tourCount');
  const checkboxes   = document.querySelectorAll('.filter-checkbox');
  const chips        = document.querySelectorAll('.chip');
  const sortBtns     = document.querySelectorAll('.sort-btn');
  const backToTopBtn = document.getElementById('backToTop');

  /* ══════════════════════════════════════════════════
     BƯỚC 3: TRẠNG THÁI BỘ LỌC
  ══════════════════════════════════════════════════ */
  let activeFilters = {
    duration:    [],
    price:       [],
    departure:   [],
    destination: 'all'
  };
  /* Mặc định "Tất cả" — khớp với button active trong HTML */
  let currentSort = 'tatca';

  /* ══════════════════════════════════════════════════
     BƯỚC 4: HÀM CORE — LỌC + SẮP XẾP
  ══════════════════════════════════════════════════ */
  function filterAndSortTours() {
    const cards = Array.from(tourGrid.querySelectorAll('.tour-card'));
    let visibleCount = 0;

    cards.forEach(function (card) {
      const duration  = card.getAttribute('data-duration');
      const price     = parseInt(card.getAttribute('data-price-num'), 10);
      const destSlug  = card.getAttribute('data-destination') || '';
      const destList  = destSlug.length ? destSlug.split(' ') : [];
      const departure = card.getAttribute('data-departure');

      const okDuration = !activeFilters.duration.length
        || activeFilters.duration.includes(duration);

      const okDeparture = !activeFilters.departure.length
        || activeFilters.departure.includes(departure);

      const okDest = activeFilters.destination === 'all'
        || destList.includes(activeFilters.destination);

      let okPrice = !activeFilters.price.length;
      if (!okPrice) {
        for (const range of activeFilters.price) {
          if (range === 'under-1m' && price < 1000000)                     { okPrice = true; break; }
          if (range === '1m-3m'   && price >= 1000000 && price <= 3000000) { okPrice = true; break; }
          if (range === '3m-5m'   && price >= 3000000 && price <= 5000000) { okPrice = true; break; }
          if (range === 'over-5m' && price > 5000000)                      { okPrice = true; break; }
        }
      }

      /* 'tatca' → hiện tất cả | 'banchay' → chỉ HOT | 'moinhat' → chỉ NEW */
      let okSort = true;
      if (currentSort === 'banchay') okSort = card.getAttribute('data-hot') === '1';
      if (currentSort === 'moinhat') okSort = card.getAttribute('data-new') === '1';

      const show = okDuration && okDeparture && okDest && okPrice && okSort;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (countEl) countEl.textContent = visibleCount;

    const sorted = [...cards].sort(function (a, b) {
      switch (currentSort) {
        case 'giatang':
          return parseInt(a.getAttribute('data-price-num'), 10)
               - parseInt(b.getAttribute('data-price-num'), 10);
        case 'giamgiam':
          return parseInt(b.getAttribute('data-price-num'), 10)
               - parseInt(a.getAttribute('data-price-num'), 10);
        default:
          return 0;
      }
    });
    sorted.forEach(card => tourGrid.appendChild(card));
  }

  /* ══════════════════════════════════════════════════
     BƯỚC 5: APPLY MẶC ĐỊNH NGAY SAU KHI RENDER
  ══════════════════════════════════════════════════ */
  filterAndSortTours();

  /* ══════════════════════════════════════════════════
     BƯỚC 6: SỰ KIỆN CHECKBOX
  ══════════════════════════════════════════════════ */
  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      const type  = this.getAttribute('data-filter');
      const value = this.value;
      if (this.checked) {
        activeFilters[type].push(value);
      } else {
        activeFilters[type] = activeFilters[type].filter(v => v !== value);
      }
      filterAndSortTours();
    });
  });

  /* ══════════════════════════════════════════════════
     BƯỚC 7: SỰ KIỆN CHIP ĐIỂM ĐẾN
  ══════════════════════════════════════════════════ */
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(c => c.classList.remove('chip--active'));
      this.classList.add('chip--active');
      activeFilters.destination = this.getAttribute('data-dest');
      filterAndSortTours();
    });
  });

  /* ══════════════════════════════════════════════════
     BƯỚC 8: SỰ KIỆN NÚT SẮP XẾP
  ══════════════════════════════════════════════════ */
  sortBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentSort = this.getAttribute('data-sort');
      filterAndSortTours();
    });
  });

  /* ══════════════════════════════════════════════════
     BƯỚC 9: BACK TO TOP
  ══════════════════════════════════════════════════ */
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      backToTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});