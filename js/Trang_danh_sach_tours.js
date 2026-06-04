document.addEventListener("DOMContentLoaded", function () {
  // 1. KHAI BÁO CÁC PHẦN TỬ ĐIỀU HƯỚNG
  const checkboxes = document.querySelectorAll(".filter-checkbox");
  const chips = document.querySelectorAll(".chip");
  const sortBtns = document.querySelectorAll(".sort-btn");
  const tourGrid = document.getElementById("toursGrid");
  const tourCountText = document.getElementById("tourCount");
  const backToTopBtn = document.getElementById("backToTop");

  // Lưu trạng thái bộ lọc đang được chọn
  let activeFilters = {
    duration: [],
    price: [],
    departure: [],
    destination: "all",
  };

  let currentSort = "banchay"; // Default sort

  // Thiết lập Chip "Tất cả" mặc định hoạt động ban đầu
  const defaultChip = document.querySelector('.chip[data-dest="all"]');
  if (defaultChip) defaultChip.classList.add("chip--active");

  // 2. SỰ KIỆN THAY ĐỔI CỦA CHECKBOX (Thời gian, Giá, Khởi hành)
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const filterType = this.getAttribute("data-filter");
      const value = this.value;

      if (this.checked) {
        activeFilters[filterType].push(value);
      } else {
        activeFilters[filterType] = activeFilters[filterType].filter(
          (item) => item !== value
        );
      }
      filterAndSortTours();
    });
  });

  // 3. SỰ KIỆN CHỌN CHIP ĐIỂM ĐẾN
  chips.forEach((chip) => {
    chip.addEventListener("click", function () {
      chips.forEach((c) => c.classList.remove("chip--active"));
      this.classList.add("chip--active");

      activeFilters.destination = this.getAttribute("data-dest");
      filterAndSortTours();
    });
  });

  // 4. SỰ KIỆN THAY ĐỔI TIÊU CHÍ SẮP XẾP
  sortBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      sortBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      currentSort = this.getAttribute("data-sort");
      filterAndSortTours();
    });
  });

  // 5. HÀM CORE: LỌC VÀ SẮP XẾP DỮ LIỆU TOURS
  function filterAndSortTours() {
    const tours = Array.from(tourGrid.querySelectorAll(".tour-card"));
    let visibleCount = 0;

    tours.forEach((tour) => {
      // Đọc thông tin từ data attribute của từng card tour
      const tourDuration = tour.getAttribute("data-duration");
      const tourPrice = parseInt(tour.getAttribute("data-price-num"), 10);
      const tourDestinations = tour.getAttribute("data-destination").split(" ");
      const tourDeparture = tour.getAttribute("data-departure");

      // Khởi tạo trạng thái phù hợp cho từng bộ lọc độc lập
      let matchDuration =
        activeFilters.duration.length === 0 ||
        activeFilters.duration.includes(tourDuration);
      let matchDeparture =
        activeFilters.departure.length === 0 ||
        activeFilters.departure.includes(tourDeparture);
      let matchDestination =
        activeFilters.destination === "all" ||
        tourDestinations.includes(activeFilters.destination);

      // Thẩm định logic phân tầm mức giá
      let matchPrice = false;
      if (activeFilters.price.length === 0) {
        matchPrice = true;
      } else {
        activeFilters.price.forEach((range) => {
          if (range === "under-1m" && tourPrice < 1000000) matchPrice = true;
          if (
            range === "1m-3m" &&
            tourPrice >= 1000000 &&
            tourPrice <= 3000000
          )
            matchPrice = true;
          if (
            range === "3m-5m" &&
            tourPrice >= 3000000 &&
            tourPrice <= 5000000
          )
            matchPrice = true;
          if (range === "over-5m" && tourPrice > 5000000) matchPrice = true;
        });
      }

      // Tổng hợp điều kiện: Nếu thỏa mãn hết thì HIỂN THỊ, ngược lại ẨN
      if (matchDuration && matchPrice && matchDeparture && matchDestination) {
        tour.style.display = "block";
        // Hiệu ứng Fade-in mượt mà khi lọc ra kết quả mới
        tour.style.opacity = "1";
        visibleCount++;
      } else {
        tour.style.display = "none";
      }
    });

    // Cập nhật số lượng đếm được hiển thị lên màn hình
    tourCountText.innerText = visibleCount;

    // Thực thi sắp xếp thứ tự hiển thị dựa trên những phần tử đang mở
    sortDataElements(tours);
  }

  // 6. HÀM SẮP XẾP VẬT LÝ DOM ELEMENTS
  function sortDataElements(toursArray) {
    toursArray.sort((a, b) => {
      if (currentSort === "giatang") {
        return (
          parseInt(a.getAttribute("data-price-num"), 10) -
          parseInt(b.getAttribute("data-price-num"), 10)
        );
      } else if (currentSort === "giamgiam") {
        return (
          parseInt(b.getAttribute("data-price-num"), 10) -
          parseInt(a.getAttribute("data-price-num"), 10)
        );
      } else if (currentSort === "moinhat") {
        return (
          new Date(b.getAttribute("data-date")) -
          new Date(a.getAttribute("data-date"))
        );
      } else if (currentSort === "banchay") {
        return (
          parseInt(b.getAttribute("data-sales"), 10) -
          parseInt(a.getAttribute("data-sales"), 10)
        );
      }
      return 0;
    });

    // Vẽ lại cấu trúc sắp xếp lên thẻ Grid chứa mà không reload trang
    toursArray.forEach((tour) => tourGrid.appendChild(tour));
  }

  // 7. XỬ LÝ HIỆU ỨNG NÚT QUAY LẠI ĐẦU TRANG (BACK TO TOP)
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  });
});