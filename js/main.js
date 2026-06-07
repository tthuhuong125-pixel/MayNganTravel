/*
  ============================================================
  main.js — Mây Ngàn Travel
  JS dùng chung cho toàn site — header & footer
  Link vào cuối <body> của mỗi trang:
  <script src="./js/main.js"></script>
  Người phụ trách: Hương
  ============================================================
*/

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Hàm tải HTML và sửa lỗi đường dẫn
    async function loadComponent(elementId) {
        const placeholder = document.getElementById(elementId);
        if (!placeholder) return; // Không có thì bỏ qua

        const filePath = placeholder.getAttribute('data-path');
        const rootPath = placeholder.getAttribute('data-root') || './';
        if (!filePath) return;

        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Lỗi tải: ${filePath}`);
            let htmlText = await response.text();
            
            // Tuyệt chiêu: Thay thế biến {{ROOT}} thành đường dẫn gốc của trang hiện tại
            htmlText = htmlText.replace(/\{\{ROOT\}\}/g, rootPath);
            
            placeholder.innerHTML = htmlText;
        } catch (error) {
            console.error(error);
        }
    }

    // 2. Chạy tải song song Header và Footer
    Promise.all([
        loadComponent("header-placeholder"),
        loadComponent("footer-placeholder")
    ]).then(() => {
        /* CHỈ KHI header/footer đã load xong, ta mới kích hoạt các chức năng menu.
          Nếu không, JS sẽ báo lỗi không tìm thấy nút navToggle.
        */
        initMainFeatures(); 
    });
});

function initMainFeatures() {
    // ----------------------------------------------------
    // COPY TOÀN BỘ CODE CŨ CỦA BẠN TRONG MAIN.JS VÀO ĐÂY
    // (Bao gồm logic navToggle, Dropdown, Back to top...)
    // ----------------------------------------------------
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
            }else {
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

/* ══════════════════════════════════════════════════════
   4. ACTIVE NAV LINK — chỉ so khớp chính xác
   ══════════════════════════════════════════════════════ */
const currentPath = window.location.pathname;
const navLinks    = document.querySelectorAll('.nav-link:not(.nav-link--arrow)');

navLinks.forEach(function (link) {
    const linkHref = link.getAttribute('href');
    if (!linkHref || linkHref === '#') return;

    /* Lấy pathname tuyệt đối của link — bỏ query và hash */
    let linkPathname;
    try {
        linkPathname = new URL(link.href).pathname;
    } catch (e) { return; }

    /* Chuẩn hoá: bỏ dấu / cuối nếu có */
    const normCurrent = currentPath.replace(/\/$/, '') || '/';
    const normLink    = linkPathname.replace(/\/$/, '') || '/';

    /* Chỉ active khi TRÙNG CHÍNH XÁC đường dẫn
       Hoặc trang hiện tại nằm TRONG THƯ MỤC CON của link
       — nhưng chỉ khi link không phải file ở root (tránh lỗi Khuyến mãi) */
    const isExact = normCurrent === normLink;

    /* Chỉ match thư mục nếu link trỏ vào thư mục con thật sự
       (path phải có ít nhất 2 phần, VD: /blog/blog.html) */
    const linkParts   = normLink.split('/').filter(Boolean);    /* bỏ phần tử rỗng */
    const isSubfolder = linkParts.length >= 2 &&               /* phải là file trong thư mục con */
                        normCurrent.startsWith('/' + linkParts[0] + '/');

    if (isExact || isSubfolder) {
        link.classList.add('active');
    }
});
}
