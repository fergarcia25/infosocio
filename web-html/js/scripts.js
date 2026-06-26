// ===== Header — scroll detection =====
(function() {
  var nav = document.getElementById('mainNav');
  if (nav) {
    function onScroll() {
      if (window.scrollY >= window.innerHeight) {
        nav.classList.add('navbar-scrolled');
      } else {
        nav.classList.remove('navbar-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  }
})();

// ===== Header — mobile offcanvas menu =====
(function() {
  var toggler = document.getElementById('navbarToggler');
  var offcanvas = document.getElementById('navOffcanvas');
  var overlay = document.getElementById('navOverlay');
  var closeBtn = document.getElementById('navCloseBtn');

  function openMenu() {
    if (offcanvas) offcanvas.classList.add('open');
    if (overlay) overlay.style.display = 'block';
  }

  function closeMenu() {
    if (offcanvas) offcanvas.classList.remove('open');
    if (overlay) overlay.style.display = 'none';
  }

  if (toggler) toggler.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
})();

// ===== SearchBar — form submit =====
(function() {
  var forms = document.querySelectorAll('.search-container');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var input = form.querySelector('input[name="criterio"]');
      if (input && input.value.trim()) {
        window.location.href = 'resultados?q=' + encodeURIComponent(input.value.trim());
      }
    });
  });
})();

// ===== HomePage slider =====
(function() {
  var track = document.querySelector('.home-slider-track');
  if (!track) return;

  var slides = Array.from(track.children);
  var realCount = slides.length;
  var CARD_WIDTH = 228;

  function getGap() {
    var w = window.innerWidth;
    if (w >= 992) return 24;
    if (w >= 768) return 16;
    return 12;
  }

  var gap = getGap();
  var pos = 0;
  var timer;

  // Clone slides for infinite loop
  for (var i = 0; i < realCount; i++) {
    var clone = slides[i].cloneNode(true);
    track.appendChild(clone);
  }

  var totalSlides = track.children.length;

  function slide() {
    pos++;
    if (pos >= realCount) {
      track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      track.style.transform = 'translateX(-' + (pos * (CARD_WIDTH + gap)) + 'px)';
      setTimeout(function() {
        track.style.transition = 'none';
        pos = 0;
        track.style.transform = 'translateX(0)';
      }, 600);
    } else {
      track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      track.style.transform = 'translateX(-' + (pos * (CARD_WIDTH + gap)) + 'px)';
    }
  }

  function startSlider() {
    stopSlider();
    timer = setInterval(slide, 1000);
  }

  function stopSlider() {
    if (timer) clearInterval(timer);
  }

  function onResize() {
    gap = getGap();
    track.style.transition = 'none';
    pos = 0;
    track.style.transform = 'translateX(0)';
  }

  window.addEventListener('resize', onResize);
  startSlider();
})();

// ===== Filter toggle (mobile) =====
(function() {
  var toggleBtn = document.querySelector('.filter-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      var content = document.querySelector('.filter-content');
      if (content) {
        content.classList.toggle('d-none');
        content.classList.toggle('d-md-flex');
      }
    });
  }
})();

// ===== Price display =====
(function() {
  var priceEls = document.querySelectorAll('.price-display');
  priceEls.forEach(function(el) {
    el.textContent = '$ 15.200';
  });
})();
