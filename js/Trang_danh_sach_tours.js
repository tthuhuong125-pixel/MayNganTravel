/*
  Trang_danh_sach_tours.js — Mây Ngàn Travel
  Bộ lọc + sắp xếp + xử lý search từ trang chủ

  THỨ TỰ LOAD (bắt buộc):
  1. tourdata.js   → TOURS_DATA
  2. tourcard.js   → renderTourGrid
  3. file này      → filter + sort + search
*/

/* ══════════════════════════════════════════════════
   CHUẨN HOÁ TIẾNG VIỆT — bỏ dấu, lowercase
   Dùng để so sánh search không phân biệt hoa thường / dấu
══════════════════════════════════════════════════ */
function normalizeVN(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/à|á|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
    .replace(/è|é|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
    .replace(/ì|í|ỉ|ĩ|ị/g, 'i')
    .replace(/ò|ó|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
    .replace(/ù|ú|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
    .replace(/ỳ|ý|ỷ|ỹ|ỵ/g, 'y')
    .replace(/đ/g, 'd')
    .trim();
}

/* ══════════════════════════════════════════════════
   BẢNG MAP: từ khoá → data-dest chip
   keywords đã được normalize sẵn (không dấu, lowercase)
══════════════════════════════════════════════════ */
const DEST_SEARCH_MAP = [
  { dest: 'sapa',    keywords: ['sapa', 'sa pa', 'fansipan'] },
  { dest: 'yty',     keywords: ['y ty', 'y ti', 'yty', 'bat xat'] },
  { dest: 'mocchau', keywords: ['moc chau', 'mocchau', 'moc chau'] },
  { dest: 'bachha',  keywords: ['bac ha', 'bach ha', 'bachha', 'ta van chu'] },
  { dest: 'mcc',     keywords: ['mu cang chai', 'mu cang', 'mcc'] },
  { dest: 'taxua',   keywords: ['ta xua', 'taxua', 'bac yen'] },
  { dest: 'hagiang', keywords: ['ha giang', 'hagiang', 'dong van', 'lung cu', 'nho que', 'ma pi leng'] },
  { dest: 'caobang', keywords: ['cao bang', 'caobang', 'ban gioc', 'pac bo'] },
  { dest: 'backan',  keywords: ['bac kan', 'backan', 'ba be', 'ho ba be'] },
];

function findDestFromQuery(normalizedQuery) {
  if (!normalizedQuery || normalizedQuery.length < 2) return null;
  for (const entry of DEST_SEARCH_MAP) {
    for (const kw of entry.keywords) {
      if (normalizedQuery.includes(kw) || kw.includes(normalizedQuery)) {
        return entry.dest;
      }
    }
  }
  return null;
}


document.addEventListener('DOMContentLoaded', function () {

  /* ── BƯỚC 1: RENDER ── */
  renderTourGrid('#toursGrid', {});

  /* ── BƯỚC 2: DOM ── */
  const tourGrid     = document.getElementById('toursGrid');
  const countEl      = document.getElementById('tourCount');
  const checkboxes   = document.querySelectorAll('.filter-checkbox');
  const chips        = document.querySelectorAll('.chip');
  const sortBtns     = document.querySelectorAll('.sort-btn');
  const backToTopBtn = document.getElementById('backToTop');

  /* ── BƯỚC 3: TRẠNG THÁI ── */
  let activeFilters = {
    duration:    [],
    price:       [],
    departure:   [],
    destination: 'all'
  };
  let currentSort = 'tatca';

  /* ── BƯỚC 4: HÀM LỌC + SẮP XẾP ── */
  function filterAndSortTours() {
    const cards = Array.from(tourGrid.querySelectorAll('.tour-card'));
    let visibleCount = 0;

    cards.forEach(function (card) {
      const duration  = card.getAttribute('data-duration');
      const price     = parseInt(card.getAttribute('data-price-num'), 10);
      const destSlug  = card.getAttribute('data-destination') || '';
      const destList  = destSlug.length ? destSlug.split(' ') : [];
      const departure = card.getAttribute('data-departure');

      const okDuration  = !activeFilters.duration.length || activeFilters.duration.includes(duration);
      const okDeparture = !activeFilters.departure.length || activeFilters.departure.includes(departure);
      const okDest      = activeFilters.destination === 'all' || destList.includes(activeFilters.destination);

      let okPrice = !activeFilters.price.length;
      if (!okPrice) {
        for (const range of activeFilters.price) {
          if (range === 'under-1m' && price < 1000000)                        { okPrice = true; break; }
          if (range === '1m-3m'   && price >= 1000000 && price <= 3000000)    { okPrice = true; break; }
          if (range === '3m-5m'   && price >= 3000000 && price <= 5000000)    { okPrice = true; break; }
          if (range === 'over-5m' && price > 5000000)                         { okPrice = true; break; }
        }
      }

      let okSort = true;
      if (currentSort === 'banchay') okSort = card.getAttribute('data-hot') === '1';
      if (currentSort === 'moinhat') okSort = card.getAttribute('data-new') === '1';

      const show = okDuration && okDeparture && okDest && okPrice && okSort;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (countEl) countEl.textContent = visibleCount;

    /* FIX: sorted.forEach nằm NGOÀI switch */
    const sorted = [...cards].sort(function (a, b) {
      switch (currentSort) {
        case 'giatang':  return parseInt(a.getAttribute('data-price-num'), 10) - parseInt(b.getAttribute('data-price-num'), 10);
        case 'giamgiam': return parseInt(b.getAttribute('data-price-num'), 10) - parseInt(a.getAttribute('data-price-num'), 10);
        default:         return 0;
      }
    });
    sorted.forEach(card => tourGrid.appendChild(card));
  }

  /* ── BƯỚC 5: APPLY MẶC ĐỊNH ── */
  filterAndSortTours();

  /* ══════════════════════════════════════════════════
     ĐỌC URL PARAM ?q= — từ hero search trang chủ
     VD: ?q=Sapa      → tích chip "Sapa"
         ?q=hà giang  → tích chip "Hà Giang"
         ?q=MU CANG   → tích chip "Mù Cang Chải"
  ══════════════════════════════════════════════════ */
  const urlParams   = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');

  if (searchQuery && searchQuery.trim().length >= 2) {
    const normalized  = normalizeVN(searchQuery.trim());
    const matchedDest = findDestFromQuery(normalized);

    if (matchedDest) {
      const targetChip = document.querySelector('.chip[data-dest="' + matchedDest + '"]');
      if (targetChip) {
        /* Bỏ active tất cả chip, active chip khớp */
        chips.forEach(c => c.classList.remove('chip--active'));
        targetChip.classList.add('chip--active');
        /* Scroll chip vào view nếu cần (mobile) */
        targetChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        activeFilters.destination = matchedDest;
        filterAndSortTours();
      }
    }
    /* Không tìm được → giữ "Tất cả", không báo lỗi */
  }

  /* ══════════════════════════════════════════════════
     ĐỌC URL PARAM ?dest= — từ dropdown header
     Ưu tiên cao hơn ?q= vì slug đã chính xác, không cần map
     VD: ?dest=sapa    → active chip "Sapa"
         ?dest=hagiang → active chip "Hà Giang"
  ══════════════════════════════════════════════════ */
  const destParam = urlParams.get('dest');

  if (destParam) {
    const targetChip = document.querySelector('.chip[data-dest="' + destParam + '"]');
    if (targetChip) {
      /* Bỏ active tất cả chip, active chip khớp */
      chips.forEach(c => c.classList.remove('chip--active'));
      targetChip.classList.add('chip--active');
      /* Scroll chip vào view trên mobile */
      targetChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      activeFilters.destination = destParam;
      filterAndSortTours();
    }
  }

  /* ── BƯỚC 6: CHECKBOX ── */
  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      const type = this.getAttribute('data-filter');
      if (this.checked) {
        activeFilters[type].push(this.value);
      } else {
        activeFilters[type] = activeFilters[type].filter(v => v !== this.value);
      }
      filterAndSortTours();
    });
  });

  /* ── BƯỚC 7: CHIP ── */
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(c => c.classList.remove('chip--active'));
      this.classList.add('chip--active');
      activeFilters.destination = this.getAttribute('data-dest');
      filterAndSortTours();
    });
  });

  /* ── BƯỚC 8: SORT ── */
  sortBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentSort = this.getAttribute('data-sort');
      filterAndSortTours();
    });
  });

  /* ── BƯỚC 9: BACK TO TOP ── */
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      backToTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});