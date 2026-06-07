

document.addEventListener('DOMContentLoaded', function () {

 
  const mainEl     = document.querySelector('main[data-current-id]');
  const currentId  = mainEl ? mainEl.getAttribute('data-current-id') : null;

  if (!currentId) {
    console.warn('similar-tours.js: Không tìm thấy data-current-id trên <main>.');
    return;
  }

  
  const currentTour = TOURS_DATA.find(t => t.id === currentId);

  if (!currentTour) {
    console.warn(`similar-tours.js: Không tìm thấy tour có id "${currentId}" trong TOURS_DATA.`);
    return;
  }


  const scored = TOURS_DATA

    
    .filter(t => t.id !== currentId)

    
    .map(function (tour) {
      let score = 0;

      
      if (tour.primaryDest === currentTour.primaryDest) {
        score += 3;
      }

      
      if ((currentTour.otherDests || []).includes(tour.primaryDest)) {
        score += 1;
      }

      
      if ((tour.otherDests || []).includes(currentTour.primaryDest)) {
        score += 1;
      }

      
      const currentOthers = new Set(currentTour.otherDests || []);
      (tour.otherDests || []).forEach(function (dest) {
        if (currentOthers.has(dest)) score += 1;
      });

      return { tour, score };
    })

    
    .filter(item => item.score > 0)

    
    .sort((a, b) => b.score - a.score)

    
    .slice(0, 3)

    
    .map(item => item.tour);

  /* ── RENDER VÀO GRID ── */
  const grid = document.getElementById('similarToursGrid');
  if (!grid) return;

  if (scored.length === 0) {
    
    grid.innerHTML = `
      <div class="similar-tours-empty">
        Chưa có tour tương tự.
      </div>
    `;
    return;
  }

  
  grid.innerHTML = scored.map(renderTourCard).join('');

  
grid.querySelectorAll('.tour-card__img').forEach(function (img) {
  const src = img.getAttribute('src') || '';
  if (src.startsWith('../images/')) {
    img.setAttribute('src', src.replace('../images/', '../../images/'));
  }
});


grid.querySelectorAll('.tour-card__btn').forEach(function (btn) {
  const href = btn.getAttribute('href') || '';
  if (href.startsWith('./chi_tiet/')) {
    btn.setAttribute('href', href.replace('./chi_tiet/', './'));
  }
});

});