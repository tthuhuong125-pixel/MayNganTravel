document.addEventListener("DOMContentLoaded", function () {
    // 1. XỬ LÝ NÚT BACK TO TOP
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        // Ẩn/Hiện nút khi cuộn chuột
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        // Bấm vào để cuộn mượt lên đầu trang
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Cuộn mượt mà
            });
        });
    }

    // 2. HIỆU ỨNG CUỘN TRANG HIỂN THỊ MƯỢT MÀ (SCROLL REVEAL)
    const introSections = document.querySelectorAll(".intro-section");

    // Tạo bộ quan sát màn hình (Intersection Observer)
    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            // Khi 10% diện tích của khối xuất hiện trên màn hình
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target); // Hiện xong thì dừng quan sát khối đó
            }
        });
    }, {
        threshold: 0.1 // Kích hoạt khi thấy 10% phần tử
    });

    // Áp dụng bộ quan sát cho tất cả các section giới thiệu
    introSections.forEach(section => {
        section.classList.add("section-hidden"); // Thêm trạng thái ẩn ban đầu
        sectionObserver.observe(section);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Gọi đúng tên container mới đổi ở HTML
    const butterflyContainer = document.querySelector('.butterfly-container');
    
    // Đường dẫn đến các file ảnh con bướm trong máy của bạn (Hãy đảm bảo có ảnh trong thư mục images nhé)
    const butterflyImages = [
        '../images/buom1.png',
        '../images/buom2.png',
    ];

    function createButterfly() {
        if (!butterflyContainer) return;

        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');

        // Lấy ngẫu nhiên hình con bướm
        const randomImage = butterflyImages[Math.floor(Math.random() * butterflyImages.length)];
        butterfly.style.backgroundImage = `url('${randomImage}')`;
        
        // Vị trí xuất phát ngẫu nhiên theo chiều ngang (0% đến 100% màn hình)
        butterfly.style.left = Math.random() * 100 + 'vw';

        // Kích thước bướm ngẫu nhiên (Từ 25px đến 45px để tạo chiều sâu xa gần)
        const size = Math.random() * 20 + 25; 
        butterfly.style.width = `${size}px`;
        butterfly.style.height = `${size}px`;

        // Tốc độ bay ngẫu nhiên từ dưới lên (Từ 7 giây đến 12 giây một con)
        const flyDuration = Math.random() * 5 + 7;
        
        // Thiết lập thời gian chạy các hiệu ứng: Bay lên, Lướt sóng và Đập cánh (0.2s)
        butterfly.style.animationDuration = `${flyDuration}s, ${Math.random() * 1 + 2}s, 0.2s`;
        butterfly.style.animationDelay = Math.random() * 4 + 's';

        butterflyContainer.appendChild(butterfly);

        // Tự động xóa bướm sau khi bay khuất màn hình để tránh nặng máy
        setTimeout(() => {
            butterfly.remove();
        }, flyDuration * 1000);
    }

    // Cứ mỗi 1.2 giây sinh ra một chú bướm mới
    setInterval(createButterfly, 1200);
});