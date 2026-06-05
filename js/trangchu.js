/*
  ============================================================
  trangchu.js — Mây Ngàn Travel
  JS riêng cho trang chủ (index.html)
  Chạy SAU main.js (đã link ở cuối index.html)
  Người phụ trách: Nhóm
  ============================================================
*/

/* ══════════════════════════════════════════════════════════
   DỮ LIỆU TOUR — DATA SOURCE
   Mỗi object là 1 tour. Sau khi có API/JSON riêng,
   chỉ cần đổi nguồn data ở đây, không cần sửa gì thêm.
   ══════════════════════════════════════════════════════════ */
const FEATURED_TOURS = [
    {
        id: "MN-SP234",
        title: "Tour Du Lịch Sapa: Cát Cát – Moana – Fansipan",
        img: "./assets/img/cot-moc-fansipan.jpg",
        alt: "Fansipan – Nóc nhà Đông Dương",
        duration: "3N2Đ",
        transport: "🚌 Xe",
        departure: "📍 HN",
        price: "2.990.000đ",
        badge: null,
        destTags: [{ label: "Sapa", primary: true }],
        url: "./tours/sapa/sapa.html"
    },
    {
        id: "MN-CB05",
        title: "Cao Bằng – Thác Bản Giốc – Pác Bó – Hồ Ba Bể",
        img: "./assets/img/thac_Ban_Gioc.jpg",
        alt: "Thác Bản Giốc hùng vĩ",
        duration: "3N2Đ",
        transport: "🚌 Xe",
        departure: "📍 HN",
        price: "2.680.000đ",
        badge: null,
        destTags: [{ label: "Cao Bằng", primary: true }],
        url: "./tours/caobang/caobang.html"
    },
    {
        id: "MN-HG06",
        title: "Tour Hà Giang – Sông Nho Quế – Hẻm Tu Sản",
        img: "./assets/img/Nho-Que.jpg",
        alt: "Sông Nho Quế xanh ngọc bích",
        duration: "4N4Đ",
        transport: "✈ Bay",
        departure: "📍 HCM",
        price: "7.280.000đ",
        badge: "hot",
        destTags: [{ label: "Hà Giang", primary: true }],
        url: "./tours/hagiang/hagiang.html"
    },
    {
        id: "MN-TX07",
        title: "Tour Săn Mây Tà Xùa – Bắc Yên – Đỉnh Gió",
        img: "./assets/img/maintaxua1.jpg",
        alt: "Biển mây Tà Xùa bồng bềnh",
        duration: "4N3Đ",
        transport: "✈ Bay",
        departure: "📍 HCM",
        price: "6.380.000đ",
        badge: "hot",
        destTags: [{ label: "Tà Xùa", primary: true }, { label: "Bắc Yên", primary: false }],
        url: "./tours/taxua/taxua.html"
    },
    {
        id: "MN-NB08",
        title: "Tour Chùa Bái Đính – Tràng An – Hang Múa",
        img: "./assets/img/BEN-THUYEN-TRANG-AN.jpg",
        alt: "Bến thuyền Tràng An",
        duration: "1 Ngày",
        transport: "🚌 Xe",
        departure: "📍 HN",
        price: "1.080.000đ",
        badge: null,
        destTags: [{ label: "Ninh Bình", primary: true }],
        url: "./tours/baidinh/baidinh.html"
    },
    {
        id: "MN-MC09",
        title: "Tour Du Lịch Mộc Châu – Cao Nguyên Yên Bình",
        img: "./assets/img/mocchau_1.jpg",
        alt: "Cao nguyên Mộc Châu",
        duration: "2N1Đ",
        transport: "🚌 Xe",
        departure: "📍 HN",
        price: "2.080.000đ",
        badge: null,
        destTags: [{ label: "Mộc Châu", primary: true }, { label: "Mai Châu", primary: false }],
        url: "./tours/mocchau/mocchau.html"
    },
    {
        id: "MN-CH10",
        title: "Tour Du Xuân Chùa Hương – Động Hương Tích",
        img: "./assets/img/chuahuong.jpg",
        alt: "Chùa Hương mùa lễ hội",
        duration: "1 Ngày",
        transport: "🚌 Xe",
        departure: "📍 HN",
        price: "990.000đ",
        badge: null,
        destTags: [{ label: "Hà Nội", primary: true }],
        url: "./tours/chuahuong/chuahuong.html"
    },
    {
        id: "MN-YT11",
        title: "Tour Tây Bắc – Săn Mây Y Tý Mùa Lúa Vàng",
        img: "./assets/img/yty.jpg",
        alt: "Y Tý biển mây mùa lúa",
        duration: "4N3Đ",
        transport: "✈ Bay",
        departure: "📍 HCM",
        price: "9.080.000đ",
        badge: "hot",
        destTags: [{ label: "Y Tý", primary: true }],
        url: "./tours/yty/yty.html"
    }
];

/* ── Dữ liệu bài viết blog trang chủ ── */
const BLOG_POSTS = [
    {
        title: "Hà Giang tháng 10 — Mùa hoa tam giác mạch nở rộ",
        cat: "news",
        catLabel: "Tin tức",
        img: "./assets/img/blog/hagiang-tamgiacmach.jpg",
        date: "15/10/2026",
        readTime: "7 phút đọc",
        url: "./blog/hagiang-tam-giac-mach.html"
    },
    {
        title: "Kinh nghiệm du lịch Sapa tự túc cho người lần đầu",
        cat: "guide",
        catLabel: "Cẩm nang",
        img: "./assets/img/blog/sapa-kinh-nghiem.jpg",
        date: "05/10/2026",
        readTime: "7 phút đọc",
        url: "./blog/kinh-nghiem-sapa-tu-tuc.html"
    },
    {
        title: "Mùa vàng Mù Cang Chải 2026 — Lịch khai hội",
        cat: "news",
        catLabel: "Tin tức",
        img: "./assets/img/blog/mucangchai-mua-vang.jpg",
        date: "08/10/2026",
        readTime: "3 phút đọc",
        url: "./blog/mua-vang-mu-cang-chai-2026.html"
    }
];


/* ══════════════════════════════════════════════════════════
   HÀM RENDER TOUR CARD
   Nhận 1 object tour → trả về HTML string của 1 card
   ══════════════════════════════════════════════════════════ */
function buildTourCardHTML(tour) {
    /* ─ Badge HOT/NEW ─ */
    const badgeHTML = tour.badge
        ? `<span class="badge badge--${tour.badge} tour-card__badge">${tour.badge.toUpperCase()}</span>`
        : "";

    /* ─ Destination tags ─ */
    const destTagsHTML = tour.destTags
        .map(t => `<span class="dest-tag${t.primary ? " dest-tag--primary" : ""}">${t.label}</span>`)
        .join("");

    return `
        <div class="tour-card reveal">
            <div style="position:relative; overflow:hidden;">
                <img class="tour-card__img"
                     src="${tour.img}"
                     alt="${tour.alt}"
                     loading="lazy"
                     onerror="this.style.background='var(--bg-secondary)';this.style.height='190px'">
                ${badgeHTML}
            </div>
            <div class="tour-card__body">
                <span class="tour-card__code">${tour.id}</span>
                <h3 class="tour-card__title">${tour.title}</h3>
                <div class="tour-card__info">
                    <span>⏱ ${tour.duration}</span>
                    <span>${tour.transport}</span>
                    <span>${tour.departure}</span>
                </div>
                <div class="tour-card__dest-tags">
                    ${destTagsHTML}
                </div>
                <p class="tour-card__price">${tour.price}</p>
                <a href="${tour.url}" class="tour-card__btn">Xem chi tiết</a>
            </div>
        </div>
    `;
}


/* ══════════════════════════════════════════════════════════
   HÀM RENDER BLOG CARD
   ══════════════════════════════════════════════════════════ */
function buildBlogCardHTML(post) {
    return `
        <a href="${post.url}" class="blog-card reveal">
            <div class="blog-card__img-wrap">
                <img src="${post.img}" alt="${post.title}" loading="lazy"
                     onerror="this.parentElement.style.background='var(--bg-secondary)'">
            </div>
            <div class="blog-card__body">
                <span class="blog-card__cat blog-card__cat--${post.cat}">${post.catLabel}</span>
                <h3 class="blog-card__title">${post.title}</h3>
                <span class="blog-card__meta">${post.date} · ${post.readTime}</span>
            </div>
        </a>
    `;
}


/* ══════════════════════════════════════════════════════════
   INJECT VÀO DOM
   ══════════════════════════════════════════════════════════ */
function renderFeaturedTours() {
    const grid = document.getElementById("featuredToursGrid");
    if (!grid) return;

    grid.innerHTML = FEATURED_TOURS.map(buildTourCardHTML).join("");
}

function renderBlogPosts() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;

    grid.innerHTML = BLOG_POSTS.map(buildBlogCardHTML).join("");
}


/* ══════════════════════════════════════════════════════════
   INTERSECTION OBSERVER — FADE IN KHI CUỘN VÀO
   Theo dõi tất cả phần tử có class .reveal
   ══════════════════════════════════════════════════════════ */
function initRevealOnScroll() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    /* Stagger nhẹ: mỗi phần tử delay thêm 60ms so với cái trước */
                    const delay = (index % 4) * 60;
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                    }, delay);
                    observer.unobserve(entry.target); /* Chỉ chạy 1 lần */
                }
            });
        },
        {
            threshold: 0.12,        /* Hiện khi 12% phần tử vào viewport */
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach(el => observer.observe(el));
}


/* ══════════════════════════════════════════════════════════
   HERO SEARCH — TÌM KIẾM VÀ ĐIỀU HƯỚNG
   ══════════════════════════════════════════════════════════ */
function initHeroSearch() {
    const input  = document.getElementById("heroSearch");
    const btn    = document.getElementById("heroSearchBtn");

    if (!input || !btn) return;

    function doSearch() {
        const keyword = input.value.trim();
        if (!keyword) return;
        /* Chuyển sang trang tour với query string */
        window.location.href = `./tours.html?q=${encodeURIComponent(keyword)}`;
    }

    btn.addEventListener("click", doSearch);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") doSearch();
    });
}


/* ══════════════════════════════════════════════════════════
   ẨN SCROLL HINT KHI CUỘN XUỐNG
   ══════════════════════════════════════════════════════════ */
function initHeroScrollHint() {
    const hint = document.getElementById("heroScrollHint");
    if (!hint) return;

    window.addEventListener("scroll", function onScroll() {
        if (window.scrollY > 80) {
            hint.classList.add("hidden");
            window.removeEventListener("scroll", onScroll); /* Gỡ listener sau khi ẩn */
        }
    }, { passive: true });
}


/* ══════════════════════════════════════════════════════════
   KHỞI CHẠY TẤT CẢ KHI DOM SẴN SÀNG
   ══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {

    /* 1. Render dữ liệu */
    renderFeaturedTours();
    renderBlogPosts();

    /* 2. Sau khi DOM có đủ .reveal elements, gắn observer */
    /*    Dùng requestAnimationFrame để đảm bảo layout đã tính xong */
    requestAnimationFrame(() => {
        initRevealOnScroll();
    });

    /* 3. Hero interactions */
    initHeroSearch();
    initHeroScrollHint();

});