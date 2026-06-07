

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  
  
  const inputs = contactForm.querySelectorAll("input[required], textarea[required]");
  const phoneInput = document.getElementById("phone");

  
  inputs.forEach((input) => {
    
    input.addEventListener("input", function () {
      validateField(this);
    });
    
    
    input.addEventListener("blur", function () {
      validateField(this);
    });
  });

  
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      validatePhone(this);
    });
    phoneInput.addEventListener("blur", function () {
      validatePhone(this);
    });
  }

  
  function validateField(field) {
    const formGroup = field.closest(".form-group");
    
    if (field.type === "email") {
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        formGroup.classList.add("has-error");
        return false;
      }
    } else {
     
      if (field.value.trim() === "") {
        formGroup.classList.add("has-error");
        return false;
      }
    }
    
    
    formGroup.classList.remove("has-error");
    return true;
  }

  
  function validatePhone(field) {
    const formGroup = field.closest(".form-group");
    
    
    if (field.value.trim() === "") {
      formGroup.classList.remove("has-error");
      return true; 
    }
    
    
    const vnf_regex = /((09|03|07|08|05|024|028)+([0-9]{7,8})\b)/g;
    if (!vnf_regex.test(field.value.trim())) {
      formGroup.classList.add("has-error");
      return false;
    }
    
    formGroup.classList.remove("has-error");
    return true;
  }

  
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); 
    
    let isFormValid = true;

    
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    
    if (phoneInput && !validatePhone(phoneInput)) {
      isFormValid = false;
    }

   
    if (isFormValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      
      const originalBtnText = submitBtn.innerText;
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.innerText = "⏳ Đang gửi tin nhắn...";

      
      setTimeout(() => {
        
        alert("🎉 Cảm ơn bạn! Tin nhắn phản hồi đã được gửi đi thành công. Mây Ngàn Travel sẽ liên hệ tư vấn bạn trong vòng 24 giờ tới.");
        
       
        contactForm.reset();
        
       
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerText = originalBtnText;
      }, 1200);

    } else {
      
      const firstError = contactForm.querySelector(".has-error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
     
        const errorInput = firstError.querySelector("input, textarea");
        if (errorInput) errorInput.focus();
      }
    }
  });
});