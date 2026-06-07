

document.addEventListener('DOMContentLoaded', function () {

  
  renderTourGrid('#featuredToursGrid', { isHot: true, limit: 4 });

  
  document.querySelectorAll('#featuredToursGrid .tour-card').forEach(function (card) {

    
    const img = card.querySelector('.tour-card__img');
    if (img) {
      const src = img.getAttribute('src') || '';
      if (src.startsWith('../images/')) {
        img.setAttribute('src', src.replace('../images/', './images/'));
      }
    }

    
    const btn = card.querySelector('.tour-card__btn');
    if (btn) {
      const href = btn.getAttribute('href') || '';
      if (href.startsWith('./chi_tiet/')) {
        btn.setAttribute('href', href.replace('./chi_tiet/', './tour/chi_tiet/'));
      }
    }
  });


 
  const BLOG_HOMEPAGE = [
    {
      title:    'Sắc Vàng Tây Bắc - Đón Chờ Mùa Lúa Chín Rực Rỡ Nhất Năm',
      img:      './images/5_MuCangChai/MNM201/MNM201_01.jpg',
      imgAlt:   'Mù Cang Chải mùa vàng rực rỡ',
      tag:      'Tin tức',
      tagClass: 'blog-tag--news',
      date:     '10/09/2026',
      readTime: '5 phút đọc',
      link:     './blog/tintuc/bai1.html'
    },
    {
      title:    'Chạm Tay Vào Biển Mây - Y Tý & Tà Xùa Đã Sẵn Sàng Chào Đón',
      img:      './images/6_TaXua/MNTX02/MNTX02_05.jpg',
      imgAlt:   'Sống lưng khủng long Tà Xùa và biển mây',
      tag:      'Tin tức',
      tagClass: 'blog-tag--news',
      date:     '10/09/2026',
      readTime: '4 phút đọc',
      link:     './blog/tintuc/bai3.html'
    },
    {
      title:    'Hành Trang Vi Vu Vùng Cao - Đem Gì Để Vừa Đủ, Vừa Đẹp?',
      img:      './images/tp2.jpg',
      imgAlt:   'Hành trang du lịch vùng cao gọn gàng',
      tag:      'Cẩm nang',
      tagClass: 'blog-tag--guide',
      date:     '15/09/2026',
      readTime: '6 phút đọc',
      link:     './blog/camnang/tip1.html'
    }
  ];

  const blogGrid = document.getElementById('blogGrid');
  if (blogGrid) {
    blogGrid.innerHTML = BLOG_HOMEPAGE.map(function (post) {
      return `
        <article class="blog-card">
          <a href="${post.link}" class="blog-card-link">
            <div class="blog-card-img">
              <img src="${post.img}"
                   alt="${post.imgAlt}"
                   loading="lazy"
                   onerror="this.parentElement.style.background='var(--color-primary-bg)';this.style.display='none'">
            </div>
            <div class="blog-card-body">
              <span class="blog-tag ${post.tagClass}">${post.tag}</span>
              <h3 class="blog-card-title">${post.title}</h3>
              <div class="article-meta">
                <span>${post.date}</span>
                <span class="meta-dot">·</span>
                <span>${post.readTime}</span>
              </div>
            </div>
          </a>
        </article>
      `;
    }).join('');
  }


  
  const searchInput = document.getElementById('heroSearch');
  const searchBtn   = document.getElementById('heroSearchBtn');

  function doHeroSearch() {
    const q = (searchInput.value || '').trim();
    if (q) {
    
      window.location.href = './tour/Trang_danh_sach_tours.html?q=' + encodeURIComponent(q);
    } else {
      window.location.href = './tour/Trang_danh_sach_tours.html';
    }
  }

  if (searchBtn)   searchBtn.addEventListener('click', doHeroSearch);
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doHeroSearch();
    });
  }


 
  const scrollHint = document.getElementById('heroScrollHint');
  if (scrollHint) {
    window.addEventListener('scroll', function () {
      scrollHint.style.opacity = window.scrollY > 80 ? '0' : '1';
      scrollHint.style.pointerEvents = window.scrollY > 80 ? 'none' : 'auto';
    }, { passive: true });
  }


 
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    
    backToTopBtn.style.display = '';

    window.addEventListener('scroll', function () {
      backToTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});