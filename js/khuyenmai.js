document.addEventListener("DOMContentLoaded", function () {
  // Hàm định dạng số thành chuỗi tiền tệ việt nam (Ví dụ: 2660000 -> 2.660.000đ)
  function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
  }

  // Quét qua toàn bộ các card tour
  const tourCards = document.querySelectorAll(".promo-row-card");

  tourCards.forEach(card => {
    // Lấy giá cũ và % giảm từ các thuộc tính data- ở thẻ HTML
    const oldPrice = parseFloat(card.getAttribute("data-old-price"));
    const discountPercent = parseFloat(card.getAttribute("data-discount"));

    if (!isNaN(oldPrice) && !isNaN(discountPercent)) {
      // Công thức tự động trừ phần trăm ra giá mới
      const currentPrice = oldPrice * (1 - (discountPercent / 100));
      const roundedCurrentPrice = Math.round(currentPrice); // Làm tròn số tiền nếu lẻ

      // Lấy các thẻ hiển thị nội dung
      const badgeElement = card.querySelector(".promo-row-card__badge");
      const oldPriceElement = card.querySelector(".promo-row-card__old-price");
      const currentPriceElement = card.querySelector(".promo-row-card__current-price");

      // Điền thông tin tự động lên giao diện
      if (badgeElement) {
        badgeElement.textContent = `Giảm ${discountPercent}%`;
      }
      if (oldPriceElement) {
        oldPriceElement.textContent = formatCurrency(oldPrice);
      }
      if (currentPriceElement) {
        currentPriceElement.textContent = formatCurrency(roundedCurrentPrice);
      }
    }
  });
});