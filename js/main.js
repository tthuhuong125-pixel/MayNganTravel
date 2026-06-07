

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
        
        initMainFeatures(); 
    });
});

function initMainFeatures() {
    
    const navToggle = document.getElementById('navToggle');
    const mainNav   = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('open');        
            mainNav.classList.toggle('open');           
        });
    }



    const dropdownItems = document.querySelectorAll('.nav-item--dropdown');

    dropdownItems.forEach(function (item) {
        const link = item.querySelector('.nav-link--arrow'); 

        if (link) {
            link.addEventListener('click', function (e) {
            
                if (window.matchMedia("(hover: none)").matches || window.innerWidth <= 1100) {
                    e.preventDefault();                 
                    item.classList.toggle('open');     

                
                    dropdownItems.forEach(function (other) {
                        if (other !== item) other.classList.remove('open');
                    });
                }
            });
        }
    });


    document.addEventListener('click', function (e) {
        if (!e.target.closest('.main-header') && (window.matchMedia("(hover: none)").matches || window.innerWidth <= 1100)) {
            mainNav && mainNav.classList.remove('open');
            navToggle && navToggle.classList.remove('open');
            dropdownItems.forEach(item => item.classList.remove('open'));
        }
    });



    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
    
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTopBtn.style.display = 'flex';    
            }else {
                backToTopBtn.style.display = 'none';   
            }
        });

   
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'                   
            });
        });
}


const currentPath = window.location.pathname;
const navLinks    = document.querySelectorAll('.nav-link:not(.nav-link--arrow)');

navLinks.forEach(function (link) {
    const linkHref = link.getAttribute('href');
    if (!linkHref || linkHref === '#') return;

   
    let linkPathname;
    try {
        linkPathname = new URL(link.href).pathname;
    } catch (e) { return; }

    
    const normCurrent = currentPath.replace(/\/$/, '') || '/';
    const normLink    = linkPathname.replace(/\/$/, '') || '/';

    
    const isExact = normCurrent === normLink;

   
    const linkParts   = normLink.split('/').filter(Boolean);    
    const isSubfolder = linkParts.length >= 2 &&               
                        normCurrent.startsWith('/' + linkParts[0] + '/');

    if (isExact || isSubfolder) {
        link.classList.add('active');
    }
});
}
