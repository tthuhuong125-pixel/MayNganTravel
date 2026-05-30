/*
  ============================================================
  main.js — Mây Ngàn Travel
  JS dùng chung cho toàn site — header & footer
  Link vào cuối <body> của mỗi trang:
  <script src="./js/main.js"></script>
  Người phụ trách: Hương
  ============================================================
*/


/* ══════════════════════════════════════════════════════════
   1. navToggle MENU (Mobile)
   Bấm nút navToggle → mở/đóng nav trên điện thoại
   ══════════════════════════════════════════════════════════ */
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('open');         /* xoay thanh ngang thành dấu X */
        mainNav.classList.toggle('open');           /* hiện/ẩn nav-list */
    });
}


/* ══════════════════════════════════════════════════════════
   2. DROPDOWN MOBILE / TABLET — click để mở/đóng
   Trên mobile & thiết bị cảm ứng, hover không hoạt động → dùng click
   ══════════════════════════════════════════════════════════ */
const dropdownItems = document.querySelectorAll('.nav-item--dropdown');

dropdownItems.forEach(function (item) {
    const link = item.querySelector('.nav-link--arrow'); /* link có mũi tên */

    if (link) {
        link.addEventListener('click', function (e) {
            /* Chặn click nhảy trang nếu là màn hình nhỏ hoặc thiết bị không hỗ trợ hover (màn cảm ứng) */
            if (window.matchMedia("(hover: none)").matches || window.innerWidth <= 1100) {
                e.preventDefault();                 /* không nhảy trang */
                item.classList.toggle('open');      /* mở/đóng dropdown con */

                /* Đóng các dropdown khác đang mở */
                dropdownItems.forEach(function (other) {
                    if (other !== item) other.classList.remove('open');
                });
            }
        });
    }
});

/* Đóng menu mobile/tablet khi click ra ngoài header */
document.addEventListener('click', function (e) {
    if (!e.target.closest('.main-header') && (window.matchMedia("(hover: none)").matches || window.innerWidth <= 1100)) {
        mainNav && mainNav.classList.remove('open');
        navToggle && navToggle.classList.remove('open');
        dropdownItems.forEach(item => item.classList.remove('open'));
    }
});


/* ══════════════════════════════════════════════════════════
   3. BACK TO TOP
   Cuộn xuống 400px → nút hiện; click → cuộn lên mượt
   ══════════════════════════════════════════════════════════ */
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    /* Theo dõi vị trí cuộn — hiện/ẩn nút */
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = 'flex';    /* hiện nút */
        } else {
            backToTopBtn.style.display = 'none';    /* ẩn nút */
        }
    });

    /* Click vào nút → cuộn lên đầu trang mượt mà */
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'                      /* cuộn mượt, không giật */
        });
    });
}


/* ══════════════════════════════════════════════════════════
   4. ACTIVE NAV LINK (Tương thích GitHub Pages)
   Tự động highlight nav link tương ứng với trang đang xem
   ══════════════════════════════════════════════════════════ */
/* Lấy URL hiện tại, cắt bỏ chuỗi query (như ?dest=sapa) và chuỗi hash (#) */
const currentUrl = window.location.href.split(/[?#]/)[0];
const navLinks   = document.querySelectorAll('.nav-link:not(.nav-link--arrow)');

navLinks.forEach(function (link) {
    /* Lấy URL tuyệt đối từ trình duyệt tự dịch (ví dụ: https://github.io/repo/index.html) */
    const linkUrl = link.href.split(/[?#]/)[0];

    /* So sánh URL đang đứng với URL của thẻ <a> */
    /* Điều kiện 2: Xử lý highlight thư mục cha nếu đang đứng ở trang con */
    if (currentUrl === linkUrl || 
       (link.getAttribute('href') !== './index.html' && currentUrl.includes(link.getAttribute('href').replace('./', '').split('/')[0]))) {
        link.classList.add('active');               /* thêm class active → đổi màu */
    }
});