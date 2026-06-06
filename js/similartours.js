/*
  similar-tours.js — Mây Ngàn Travel
  Gợi ý tour tương tự theo điểm đến

  Logic ưu tiên:
    +3 điểm  → trùng primaryDest với tour hiện tại
    +1 điểm  → trùng bất kỳ điểm đến phụ (otherDests)
    +0 điểm  → không trùng gì → không hiện

  Yêu cầu load trước:
    tours-data.js → kho dữ liệu
    tour-card.js  → hàm renderTourCard
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ── ĐỌC ID TOUR HIỆN TẠI từ <main data-current-id="..."> ── */
  const mainEl     = document.querySelector('main[data-current-id]');
  const currentId  = mainEl ? mainEl.getAttribute('data-current-id') : null;

  if (!currentId) {
    console.warn('similar-tours.js: Không tìm thấy data-current-id trên <main>.');
    return;
  }

  /* ── TÌM TOUR ĐANG XEM trong TOURS_DATA ── */
  const currentTour = TOURS_DATA.find(t => t.id === currentId);

  if (!currentTour) {
    console.warn(`similar-tours.js: Không tìm thấy tour có id "${currentId}" trong TOURS_DATA.`);
    return;
  }

  /* ── TÍNH ĐIỂM TƯƠNG ĐỒNG cho từng tour ── */
  const scored = TOURS_DATA

    /* Bỏ tour đang xem */
    .filter(t => t.id !== currentId)

    /* Tính điểm */
    .map(function (tour) {
      let score = 0;

      /* +3 điểm nếu primaryDest trùng với primaryDest tour hiện tại */
      if (tour.primaryDest === currentTour.primaryDest) {
        score += 3;
      }

      /* +1 điểm nếu primaryDest tour này trùng với bất kỳ điểm phụ của tour hiện tại */
      if ((currentTour.otherDests || []).includes(tour.primaryDest)) {
        score += 1;
      }

      /* +1 điểm nếu có bất kỳ điểm phụ nào trùng với primaryDest tour hiện tại */
      if ((tour.otherDests || []).includes(currentTour.primaryDest)) {
        score += 1;
      }

      /* +1 điểm nếu có điểm phụ trùng nhau giữa 2 tour */
      const currentOthers = new Set(currentTour.otherDests || []);
      (tour.otherDests || []).forEach(function (dest) {
        if (currentOthers.has(dest)) score += 1;
      });

      return { tour, score };
    })

    /* Chỉ giữ tour có điểm > 0 */
    .filter(item => item.score > 0)

    /* Sắp xếp: điểm cao nhất lên đầu */
    .sort((a, b) => b.score - a.score)

    /* Lấy tối đa 3 tour */
    .slice(0, 3)

    /* Chỉ lấy tour object */
    .map(item => item.tour);

  /* ── RENDER VÀO GRID ── */
  const grid = document.getElementById('similarToursGrid');
  if (!grid) return;

  if (scored.length === 0) {
    /* Không tìm được tour tương tự */
    grid.innerHTML = `
      <div class="similar-tours-empty">
        Chưa có tour tương tự. <a href="../danh-sach.html">Xem tất cả tour →</a>
      </div>
    `;
    return;
  }

  /* Dùng renderTourCard từ tour-card.js để đồng bộ giao diện */
  grid.innerHTML = scored.map(renderTourCard).join('');

});