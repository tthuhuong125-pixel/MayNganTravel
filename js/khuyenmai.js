
document.addEventListener("DOMContentLoaded", function () {

  
  renderTourGrid('#promoGrid', { isSale: true });

  
  document.querySelectorAll('#promoGrid .tour-card__btn').forEach(function (btn) {
    const href = btn.getAttribute('href');
    if (href && href.startsWith('./chi_tiet/')) {
      btn.setAttribute('href', 'tour/' + href.replace('./', ''));
    }
  });

  
  document.querySelectorAll('#promoGrid .tour-card__img').forEach(function (img) {
    const src = img.getAttribute('src');
    if (src && src.startsWith('../images/')) {
      img.setAttribute('src', src.replace('../images/', './images/'));
    }
  });

  /* Sau khi render xong, lấy danh sách card để phân trang */
  const grid      = document.getElementById('promoGrid');
  const allCards  = Array.from(grid.querySelectorAll('.tour-card'));
  const totalTours = allCards.length;

  /* Cập nhật bộ đếm */
  const countEl = document.getElementById('tourCount');
  if (countEl) countEl.textContent = totalTours;

  
  if (totalTours === 0) {
    const pagination = document.getElementById('promoPagination');
    if (pagination) pagination.style.display = 'none';
    return;
  }


  
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

   
    const headerBar = document.querySelector('.promo-header-bar');
    if (headerBar) headerBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

 
  prevBtn.addEventListener('click', function () {
    if (currentPage > 1) showPage(currentPage - 1);
  });

  nextBtn.addEventListener('click', function () {
    if (currentPage < totalPages) showPage(currentPage + 1);
  });

  
  showPage(1);

});