/* ==========================================================================
   MAYNGAN TRAVEL - LIENHE.JS (BẢN CHUẨN HOÁ ĐỒNG BỘ)
   Mục đích: Xử lý validation form gửi tin nhắn và tạo hiệu ứng tương tác mượt mà
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  
  // Chỉ chọn các ô nhập liệu nằm TRONG form gửi tin nhắn công ty
  const inputs = contactForm.querySelectorAll("input[required], textarea[required]");
  const phoneInput = document.getElementById("phone");

  // 1. Kiểm tra validation thời gian thực (Real-time Validation)
  inputs.forEach((input) => {
    // Khi người dùng đang gõ chữ
    input.addEventListener("input", function () {
      validateField(this);
    });
    
    // Khi người dùng nhấn chuột ra ngoài ô nhập liệu
    input.addEventListener("blur", function () {
      validateField(this);
    });
  });

  // Kiểm tra định dạng riêng cho trường số điện thoại (nếu người dùng có điền)
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      validatePhone(this);
    });
    phoneInput.addEventListener("blur", function () {
      validatePhone(this);
    });
  }

  // Hàm kiểm tra các trường bắt buộc (Họ tên, Email, Tin nhắn)
  function validateField(field) {
    const formGroup = field.closest(".form-group");
    
    if (field.type === "email") {
      // Biểu thức chính quy kiểm tra định dạng email chuẩn quốc tế
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        formGroup.classList.add("has-error");
        return false;
      }
    } else {
      // Kiểm tra xem trường bắt buộc có bị bỏ trống hay không
      if (field.value.trim() === "") {
        formGroup.classList.add("has-error");
        return false;
      }
    }
    
    // Nếu hợp lệ thì xoá class lỗi đi
    formGroup.classList.remove("has-error");
    return true;
  }

  // Hàm kiểm tra định dạng số điện thoại di động/bàn Việt Nam (Tùy chọn)
  function validatePhone(field) {
    const formGroup = field.closest(".form-group");
    
    // Nếu bỏ trống thì hợp lệ (vì đây là trường Tuỳ chọn)
    if (field.value.trim() === "") {
      formGroup.classList.remove("has-error");
      return true; 
    }
    
    // Regex kiểm tra các đầu số nhà mạng tại Việt Nam bao gồm cả số bàn mới
    const vnf_regex = /((09|03|07|08|05|024|028)+([0-9]{7,8})\b)/g;
    if (!vnf_regex.test(field.value.trim())) {
      formGroup.classList.add("has-error");
      return false;
    }
    
    formGroup.classList.remove("has-error");
    return true;
  }

  // 2. Xử lý sự kiện khi bấm nút "Gửi tin nhắn"
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn chặn trình duyệt tải lại trang tự động
    
    let isFormValid = true;

    // Kích hoạt kiểm tra lại toàn bộ các trường bắt buộc một lần nữa
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    // Kích hoạt kiểm tra trường số điện thoại
    if (phoneInput && !validatePhone(phoneInput)) {
      isFormValid = false;
    }

    // Trường hợp TOÀN BỘ form hợp lệ dữ liệu
    if (isFormValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Tạo hiệu ứng Loading giả lập trên nút bấm nhằm chống Spam Click liên tục
      const originalBtnText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.innerText = "⏳ Đang gửi tin nhắn...";

      // Giả lập thời gian gửi dữ liệu AJAX lên hệ thống Server (khoảng 1.2 giây)
      setTimeout(() => {
        // Thông báo gửi thành công đẹp mắt
        alert("🎉 Cảm ơn bạn! Tin nhắn phản hồi đã được gửi đi thành công. Mây Ngàn Travel sẽ liên hệ tư vấn bạn trong vòng 24 giờ tới.");
        
        // Làm sạch toàn bộ dữ liệu vừa nhập trên form
        contactForm.reset();
        
        // Khôi phục lại trạng thái ban đầu của nút bấm
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerText = originalBtnText;
      }, 1200);

    } else {
      // TRƯỜNG HỢP CÓ LỖI: Tự động cuộn mượt mà màn hình đến ô lỗi đầu tiên bị phát hiện
      const firstError = contactForm.querySelector(".has-error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        // Tự động focus con trỏ chuột vào ô lỗi để người dùng sửa luôn
        const errorInput = firstError.querySelector("input, textarea");
        if (errorInput) errorInput.focus();
      }
    }
  });
});