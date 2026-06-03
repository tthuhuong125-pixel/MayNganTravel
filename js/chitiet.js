document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SLIDER LIỀN MẠCH KHÔNG KHOẢNG TRỐNG
    // ==========================================
    const mainImage = document.getElementById("mainImage");
    const sliderContainer = document.querySelector(".slider");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const thumbnails = document.querySelectorAll(".gallery img");

    const imageSources = Array.from(thumbnails).map(img => img.src);
    let currentIndex = 0;
    let autoPlayTimer = null;
    let isTransitioning = false; // Chống lag khi khách click quá nhanh

    function slideTo(nextIndex, direction) {
        if (isTransitioning || nextIndex === currentIndex) return;
        isTransitioning = true;

        // Tạo một thẻ ảnh phụ (bóng ma) để nối đuôi ảnh chính
        const cloneImage = mainImage.cloneNode(true);
        cloneImage.id = ""; // Bỏ id để tránh trùng
        cloneImage.src = imageSources[nextIndex];
        cloneImage.style.position = "absolute";
        cloneImage.style.top = "0";
        cloneImage.style.width = "100%";
        cloneImage.style.height = "100%";

        // Đặt vị trí ảnh phụ đứng sát sườn ảnh chính tùy theo hướng lướt
        if (direction === "next") {
            cloneImage.style.left = "100%";
            sliderContainer.appendChild(cloneImage);
        } else {
            cloneImage.style.left = "-100%";
            sliderContainer.insertBefore(cloneImage, mainImage);
        }

        // Ép trình duyệt nhận diện vị trí trước khi tạo hiệu ứng chuyển động
        mainImage.getBoundingClientRect();

        // Bật hiệu ứng trượt cho cả 2 ảnh
        mainImage.classList.add("slider-transition");
        cloneImage.classList.add("slider-transition");

        // Tiến hành kéo sang ngang (Nối đuôi nhau dịch chuyển)
        const moveX = direction === "next" ? "-100%" : "100%";
        mainImage.style.transform = `translateX(${moveX})`;
        cloneImage.style.transform = `translateX(${moveX})`;

        // Sau khi trượt xong (0.5 giây tương ứng CSS)
        setTimeout(() => {
            // Tắt hiệu ứng để reset vị trí ngầm bên dưới
            mainImage.classList.remove("slider-transition");
            
            // Cập nhật ảnh chính thành ảnh mới
            currentIndex = nextIndex;
            mainImage.src = imageSources[currentIndex];
            mainImage.style.transform = "translateX(0)";

            // Xóa ảnh phụ đi vì nhiệm vụ đóng thế đã xong
            cloneImage.remove();
            
            updateThumbnailActive();
            isTransitioning = false;
        }, 500);
    }

    // Đồng bộ độ mờ sáng của hàng ảnh nhỏ (Gallery)
    function updateThumbnailActive() {
        thumbnails.forEach((thumb, idx) => {
            if (idx === currentIndex) {
                thumb.style.opacity = "1";
                thumb.style.border = "2px solid #2e7d32";
            } else {
                thumb.style.opacity = "0.6";
                thumb.style.border = "2px solid transparent";
            }
        });
    }

    function handleNext() {
        let nextIndex = (currentIndex + 1) >= imageSources.length ? 0 : currentIndex + 1;
        slideTo(nextIndex, "next");
    }

    function handlePrev() {
        let prevIndex = (currentIndex - 1) < 0 ? imageSources.length - 1 : currentIndex - 1;
        slideTo(prevIndex, "prev");
    }

    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);

    thumbnails.forEach((thumb, idx) => {
        thumb.style.transition = "all 0.3s ease";
        thumb.style.cursor = "pointer";
        thumb.addEventListener("click", () => {
            const direction = idx > currentIndex ? "next" : "prev";
            slideTo(idx, direction);
        });
    });

    // --- AUTO-PLAY ---
    function startAutoPlay() {
        autoPlayTimer = setInterval(handleNext, 4000);
    }

    function stopAutoPlay() {
        autoPlayTimer = clearInterval(autoPlayTimer);
    }

    startAutoPlay();
    updateThumbnailActive();

    sliderContainer.addEventListener("mouseenter", stopAutoPlay);
    sliderContainer.addEventListener("mouseleave", startAutoPlay);

    // ==========================================
    // 2. XỬ LÝ CHUYỂN ĐỔI TABS (MENU)
    // ==========================================
    const tabs = document.querySelectorAll(".tabs a");
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // ==========================================================
    // NHẬP ĐẾN ĐÂU XỬ LÝ XANH/ĐỎ ĐẾN ĐẤY
    // ==========================================================
    
    const nameInput = document.getElementById("popupName");
    const phoneInput = document.getElementById("popupPhone");
    const dateInput = document.getElementById("popupDate");
    const quantityInput = document.getElementById("popupQuantity");
    const emailInput = document.getElementById("popupEmail");

    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const dateError = document.getElementById("dateError");
    const quantityError = document.getElementById("quantityError");
    const emailError = document.getElementById("emailError");

    // A. Xử lý thời gian thực cho ô HỌ VÀ TÊN
    if (nameInput) {
        nameInput.addEventListener("input", function() {
            if (this.value.trim() !== "") {
                nameError.style.display = "none";
                this.classList.remove("input-error");
            }
        });
    }

    // B. Xử lý thời gian thực cho ô SỐ ĐIỆN THOẠI
    if (phoneInput) {
        phoneInput.addEventListener("input", function() {
            const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
            if (this.value.trim() !== "" && phoneRegex.test(this.value.trim())) {
                phoneError.style.display = "none";
                this.classList.remove("input-error");
            }
        });
    }

    // C. Xử lý thời gian thực cho ô NGÀY KHỞI HÀNH (Dùng sự kiện 'change' vì là thẻ select)
    if (dateInput) {
        dateInput.addEventListener("change", function() {
            if (this.value !== "") {
                dateError.style.display = "none";
                this.classList.remove("input-error");
            }
        });
    }

    // D. Xử lý thời gian thực cho ô SỐ LƯỢNG NGƯỜI
    if (quantityInput) {
        quantityInput.addEventListener("input", function() {
            const quantityValue = parseInt(this.value.trim());
            
            // Điều kiện: Không trống, phải là số hợp lệ và lớn hơn 0
            if (this.value.trim() !== "" && !isNaN(quantityValue) && quantityValue > 0) {
                quantityError.style.display = "none";
                this.classList.remove("input-error");
            }
        });
    }

    // E. Xử lý thời gian thực cho ô EMAIL
    if (emailInput) {
        emailInput.addEventListener("input", function() {
            // Biểu thức chính quy kiểm tra định dạng email chuẩn (chứa @, tên miền, không dấu...)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Điều kiện: Không trống và phải đúng định dạng cấu trúc email
            if (this.value.trim() !== "" && emailRegex.test(this.value.trim())) {
                emailError.style.display = "none";
                this.classList.remove("input-error");
            }
        });
    }

});

// ==========================================
// 3. XỬ LÝ ẨN HIỆN LỊCH TRÌNH CHUẨN (TOGGLE)
// ==========================================
const timelineHeaders = document.querySelectorAll(".timeline-header");

timelineHeaders.forEach(header => {
    header.addEventListener("click", function() {
        // Tìm thẻ cha .timeline-item gần nhất
        const parentItem = this.closest(".timeline-item");
        const icon = this.querySelector(".icon-toggle");

        // Bật / Tắt trạng thái hiển thị của ngày được chọn
        const isActive = parentItem.classList.toggle("active");

        // Nếu đang hiển thị -> đổi sang icon TRỪ (-), nếu đang ẩn -> đổi sang icon CỘNG (+)
        if (isActive) {
            icon.classList.remove("fa-circle-plus");
            icon.classList.add("fa-circle-minus");
        } else {
            icon.classList.remove("fa-circle-minus");
            icon.classList.add("fa-circle-plus");
        }
    });
});

// ==========================================
// 4. LOGIC POPUP ĐẶT TOUR & TỰ TÍNH TIỀN
// ==========================================
const bookingPopup = document.getElementById("bookingPopup");
const closePopupBtn = document.querySelector(".close-popup");
const popupQuantityInput = document.getElementById("popupQuantity");
const popupTotalPrice = document.getElementById("popupTotalPrice");

// Tìm nút Đặt Ngay theo class chuẩn của ông
const datNgayBtn = document.querySelector(".book-btn");

const BASE_PRICE = 8228000; // Giá gốc 1 người: 8.228.000đ

// Hàm định dạng số thành chuỗi tiền tệ tiếng Việt
function formatMoney(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// 1. Khi bấm nút "Đặt Ngay" -> Mở Popup ra
if (datNgayBtn) {
    datNgayBtn.addEventListener("click", (e) => {
        e.preventDefault();
        bookingPopup.style.display = "flex"; // Hiện popup lên ở dạng flex
    });
}

// 2. Khi bấm nút X -> Đóng Popup
if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () => {
        bookingPopup.style.display = "none";
    });
}

// 3. Khi bấm click ra vùng đen bên ngoài -> Cũng đóng luôn popup cho tiện
window.addEventListener("click", (e) => {
    if (e.target === bookingPopup) {
        bookingPopup.style.display = "none";
    }
});

// 4. SỰ KIỆN TỰ ĐỘNG TÍNH TIỀN KHI THAY ĐỔI SỐ NGƯỜI
if (popupQuantityInput) {
    popupQuantityInput.addEventListener("input", function() {
        let quantity = parseInt(this.value);

        // Bảo vệ form: Nếu khách nhập nhỏ hơn 1 người, ép về 1 người
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        // Tính tổng tiền = giá gốc x số lượng người
        const total = BASE_PRICE * quantity;

        // Cập nhật text hiển thị số tiền mới lên giao diện
        popupTotalPrice.textContent = formatMoney(total);
    });
}

// 5. XỬ LÝ BẮT LỖI (VALIDATION) KHI BẤM "XÁC NHẬN ĐẶT TOUR"
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Chặn việc tải lại trang để JS kiểm tra dữ liệu

        // Khai báo các ô input đầu vào
        const nameInput = document.getElementById("popupName");
        const phoneInput = document.getElementById("popupPhone");
        const dateInput = document.getElementById("popupDate");
        const quantityInput = document.getElementById("popupQuantity");
        const emailInput = document.getElementById("popupEmail");

        // Khai báo các thẻ chứa câu báo lỗi tương ứng
        const nameError = document.getElementById("nameError");
        const phoneError = document.getElementById("phoneError");
        const dateError = document.getElementById("dateError");
        const quantityError = document.getElementById("quantityError");
        const emailError = document.getElementById("emailError");

        // Cờ đánh dấu trạng thái form, mặc định là đúng (true)
        let isValid = true;

        // ---- A. KIỂM TRA HỌ TÊN ----
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Tên liên hệ không được để trống";
            nameError.style.display = "block"; // Hiện chữ đỏ nhắc nhở
            nameInput.classList.add("input-error"); // Đổi nền hồng nhạt
            isValid = false;
        } else {
            nameError.style.display = "none";
            nameInput.classList.remove("input-error");
        }

        // ---- B. KIỂM TRA SỐ ĐIỆN THOẠI ----
        const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g; // Kiểm tra định dạng số điện thoại VN
        if (phoneInput.value.trim() === "") {
            phoneError.textContent = "Số điện thoại không được để trống";
            phoneError.style.display = "block";
            phoneInput.classList.add("input-error");
            isValid = false;
        } else if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = "Số điện thoại không hợp lệ";
            phoneError.style.display = "block";
            phoneInput.classList.add("input-error");
            isValid = false;
        } else {
            phoneError.style.display = "none";
            phoneInput.classList.remove("input-error");
        }

        // ---- C. KIỂM TRA NGÀY KHỞI HÀNH (Dành cho thẻ select xổ danh sách) ----
        // ĐÃ XÓA DÒNG KHAI BÁO BIẾN TRÙNG LẶP Ở ĐÂY
        if (dateInput && dateError) {
            if (dateInput.value === "") {
                dateError.textContent = "Vui lòng chọn ngày khởi hành từ danh sách";
                dateError.style.display = "block"; // Hiện chữ đỏ
                dateInput.classList.add("input-error"); // Bật nền hồng nhạt
                isValid = false;
            } else {
                dateError.style.display = "none";
                dateInput.classList.remove("input-error");
            }
        }

        // ---- D. KIỂM TRA SỐ LƯỢNG NGƯỜI ----
        if (quantityInput.value === "" || parseInt(quantityInput.value) < 1) {
            quantityError.textContent = "Số lượng người không hợp lệ";
            quantityError.style.display = "block";
            quantityInput.classList.add("input-error");
            isValid = false;
        } else {
            quantityError.style.display = "none";
            quantityInput.classList.remove("input-error");
        }

        // ---- E. KIỂM TRA EMAIL (THÊM MỚI) ----
        if (emailInput && emailError) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex kiểm tra định dạng email tiêu chuẩn
            const emailValue = emailInput.value.trim();

            if (emailValue === "") {
                emailError.textContent = "Email không được để trống";
                emailError.style.display = "block";
                emailInput.classList.add("input-error");
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                emailError.textContent = "Định dạng email không hợp lệ (Ví dụ: abc@gmail.com)";
                emailError.style.display = "block";
                emailInput.classList.add("input-error");
                isValid = false;
            } else {
                emailError.style.display = "none";
                emailInput.classList.remove("input-error");
            }
        }

        // CHỈ KHI TẤT CẢ Ô NHẬP LIỆU HỢP LỆ (isValid vẫn bằng true)
        if (isValid) {
            // Lấy thêm cái popup thành công mới khai báo ngoài HTML
            const successPopup = document.getElementById("successPopup");
            const btnCloseSuccess = document.getElementById("btnCloseSuccess");

            // 1. Ẩn cái popup điền thông tin đi
            bookingPopup.style.display = "none"; 
            
            // 2. BẬT CÁI POPUP THÀNH CÔNG LÊN
            if (successPopup) {
                successPopup.style.display = "flex"; 
            }

            // 3. Xóa sạch dữ liệu form cũ để chuẩn bị cho lần sau
            bookingForm.reset(); 
            
            // Xóa các class viền đỏ nền hồng của lần nhập lỗi trước (nếu có)
            const allInputs = bookingForm.querySelectorAll("input");
            allInputs.forEach(input => input.classList.remove("input-error"));
            if (dateInput) dateInput.classList.remove("input-error");
            
            // Đưa tiền tạm tính trả về mặc định mức một người
            if (popupTotalPrice) {
                popupTotalPrice.textContent = formatMoney(BASE_PRICE);
            }

            // 4. Bắt sự kiện bấm nút "Đóng" trên popup thành công để ẩn nó đi
            if (btnCloseSuccess) {
                btnCloseSuccess.addEventListener("click", function() {
                    successPopup.style.display = "none";
                });
            }

            // 5. Nếu bấm click ra ngoài vùng đen của popup thành công thì cũng ẩn luôn
            window.addEventListener("click", function(e) {
                if (e.target === successPopup) {
                    successPopup.style.display = "none";
                }
            });
        }
    });
}