document.addEventListener("DOMContentLoaded", function () {
    // 1. XỬ LÝ NÚT BACK TO TOP
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

       
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth" 
            });
        });
    }

   
    const introSections = document.querySelectorAll(".intro-section");

    
    const sectionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold:
    });

    
    introSections.forEach(section => {
        section.classList.add("section-hidden"); 
        sectionObserver.observe(section);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    
    const butterflyContainer = document.querySelector('.butterfly-container');
    
    
    const butterflyImages = [
        '../images/buom1.png',
        '../images/buom2.png',
    ];

    function createButterfly() {
        if (!butterflyContainer) return;

        const butterfly = document.createElement('div');
        butterfly.classList.add('butterfly');

        
        const randomImage = butterflyImages[Math.floor(Math.random() * butterflyImages.length)];
        butterfly.style.backgroundImage = `url('${randomImage}')`;
        
       
        butterfly.style.left = Math.random() * 100 + 'vw';

        
        const size = Math.random() * 20 + 25; 
        butterfly.style.width = `${size}px`;
        butterfly.style.height = `${size}px`;

        
        const flyDuration = Math.random() * 5 + 7;
        
        
        butterfly.style.animationDuration = `${flyDuration}s, ${Math.random() * 1 + 2}s, 0.2s`;
        butterfly.style.animationDelay = Math.random() * 4 + 's';

        butterflyContainer.appendChild(butterfly);

        
        setTimeout(() => {
            butterfly.remove();
        }, flyDuration * 1000);
    }

    
    setInterval(createButterfly, 1200);
});