/*
  tour-card.js — Mây Ngàn Travel
  Hàm tạo HTML card tour — dùng ở mọi trang
  CSS: components.css + components_additions.css
  Phải load tours-data.js TRƯỚC file này
*/


/* ══════════════════════════════════════════════════════════
   BẢNG MAPPING — text hiển thị → slug cho filter
   ══════════════════════════════════════════════════════════ */
const REGION_SLUG = {
  'Tây Bắc':    'tay-bac',
  'Đông Bắc':   'dong-bac',
  'Xuyên vùng': 'xuyen-vung'
};

const DEPARTURE_SLUG = {
  'Hà Nội':      'hanoi',
  'Hồ Chí Minh': 'hcm'
};

const DURATION_SLUG = {
  '2N1Đ': '2n1d',
  '3N2Đ': '3n2d',
  '3N3Đ': '3n3d',
  '4N3Đ': '4n3d',
  '5N4Đ': '5n4d',
  '5N5Đ': '5n5d',
  '7N6Đ': '7n6d'
};

const TRANSPORT_MAP = {
  'Xe du lịch':         { icon: '🚌', text: 'Xe du lịch' },
  'Xe du lịch du lịch': { icon: '🚌', text: 'Xe du lịch' },   /* Chuẩn hoá lỗi đánh máy */
  'Máy bay':            { icon: '✈',  text: 'Máy bay'    }
};


/* ══════════════════════════════════════════════════════════
   RENDER 1 CARD
   ══════════════════════════════════════════════════════════ */
function renderTourCard(tour) {

  /* ── Badges trạng thái (góc TRÁI) ── */
  let statusBadgesHTML = '';
  if (tour.isHot)  statusBadgesHTML += `<span class="badge badge--hot">HOT</span>`;
  if (tour.isNew)  statusBadgesHTML += `<span class="badge badge--new">Mới</span>`;
  if (tour.isSale) {
    const pct = (tour.priceOld && tour.priceOld > tour.price)
        ? Math.round((1 - tour.price / tour.priceOld) * 100)
        : 0;
    const label = pct > 0 ? `-${pct}%` : 'Sale';
    statusBadgesHTML += `<span class="badge badge--sale">${label}</span>`;
    }

  /* ── Badge vùng (góc PHẢI) ── */
  let regionBadgeHTML = '';
  if (tour.region === 'Tây Bắc') {
    regionBadgeHTML = `<span class="badge badge--region-tb">Tây Bắc</span>`;
  } else if (tour.region === 'Đông Bắc') {
    regionBadgeHTML = `<span class="badge badge--region-db">Đông Bắc</span>`;
  } else if (tour.region === 'Xuyên vùng') {
    regionBadgeHTML = `<span class="badge badge--xuyen">Xuyên vùng</span>`;
  }

  /* ── Tags điểm đến ── */
  const primaryTag = `<span class="dest-tag dest-tag--primary">${tour.primaryDest}</span>`;
  const otherTags  = (tour.otherDests || [])
    .map(d => `<span class="dest-tag">${d}</span>`)
    .join('');

  /* ── Giá cũ (chỉ hiện nếu có) ── */
  const priceOldHTML = (tour.priceOld && tour.priceOld > tour.price)
    ? `<span class="tour-card__price-old">${tour.priceOld.toLocaleString('vi-VN')}đ</span>`
    : '';

  /* ── Phương tiện (chuẩn hoá) ── */
  const transport = TRANSPORT_MAP[tour.transport] || { icon: '🚌', text: tour.transport };

  /* ── Slugs cho data-attribute (filter JS đọc) ── */
  const regionSlug    = REGION_SLUG[tour.region]       || tour.region;
  const departureSlug = DEPARTURE_SLUG[tour.departure] || tour.departure;
  const durationSlug  = DURATION_SLUG[tour.duration]   || tour.duration.toLowerCase().replace(/\s/g, '');

  return `
    <div class="tour-card"
         data-id="${tour.id}"
         data-region="${regionSlug}"
         data-hot="${tour.isHot ? 1 : 0}"
         data-new="${tour.isNew ? 1 : 0}"
         data-departure="${departureSlug}"
         data-transport="${transport.text}"
         data-duration="${durationSlug}"
         data-price-num="${tour.price}"
         data-destination="${tour.destSlug || ''}">

      <!-- Vùng ảnh -->
      <div class="tour-card__img-wrap">
        <img class="tour-card__img"
             src="${tour.img}"
             alt="${tour.imgAlt}"
             loading="lazy"
             onerror="this.parentElement.style.background='var(--bg-secondary)'; this.style.display='none'">

        <!-- Badges: trái = HOT/NEW/SALE | phải = vùng -->
        <div class="tour-card__badges">
          <div class="tour-card__badges-left">
            ${statusBadgesHTML}
          </div>
          <div class="tour-card__badge-region">
            ${regionBadgeHTML}
          </div>
        </div>
      </div>

      <!-- Nội dung -->
      <div class="tour-card__body">
        <span class="tour-card__code">${tour.id}</span>
        <h3 class="tour-card__title">${tour.name}</h3>

        <!-- Tags điểm đến -->
        <div class="tour-card__tags">
          ${primaryTag}
          ${otherTags}
        </div>

        <!-- Thông tin thời gian / phương tiện / xuất phát -->
        <div class="tour-card__info">
          <span>⏱ ${tour.duration}</span>
          <span class="info-sep">|</span>
          <span>${transport.icon} ${transport.text}</span>
          <span class="info-sep">|</span>
          <span>📍 ${tour.departure}</span>
        </div>

        <!-- Giá -->
        ${priceOldHTML}
        <div class="tour-card__price">${tour.price.toLocaleString('vi-VN')}đ</div>

        <!-- Nút xem chi tiết — XANH (btn-primary) -->
        <a href="${tour.link}" class="tour-card__btn">Xem chi tiết</a>
      </div>

    </div>
  `;
}


/* ══════════════════════════════════════════════════════════
   RENDER NHIỀU CARD VÀO CONTAINER
   Cách dùng:
     renderTourGrid('#toursGrid', {})                → tất cả tour
     renderTourGrid('#featuredGrid', { isHot: true, limit: 8 })
     renderTourGrid('#saleGrid',     { isSale: true })
   ══════════════════════════════════════════════════════════ */
function renderTourGrid(selector, filters = {}) {
  const container = document.querySelector(selector);
  if (!container) return;

  let filtered = [...TOURS_DATA];

  /* Áp dụng bộ lọc tĩnh (dùng khi gọi từ JS, khác với filter động của user) */
  if (filters.region)    filtered = filtered.filter(t => t.region    === filters.region);
  if (filters.isHot)     filtered = filtered.filter(t => t.isHot);
  if (filters.isNew)     filtered = filtered.filter(t => t.isNew);
  if (filters.isSale)    filtered = filtered.filter(t => t.isSale);
  if (filters.departure) filtered = filtered.filter(t => t.departure === filters.departure);
  if (filters.limit)     filtered = filtered.slice(0, filters.limit);

  container.innerHTML = filtered.map(renderTourCard).join('');

  /* Cập nhật bộ đếm nếu có */
  const countEl = document.getElementById('tourCount');
  if (countEl) countEl.textContent = filtered.length;
}