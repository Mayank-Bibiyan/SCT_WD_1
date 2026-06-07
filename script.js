// NexaFlow — Highly Optimized Web Presentation Scripts
// Updated: Removed custom hovering cursor mouse lag, optimized event handling, and preserved animations.

document.addEventListener('DOMContentLoaded', () => {

  // ── NAV SCROLL + PROGRESS BAR + BACK TO TOP ──
  const nav = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');
  const backTop = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    
    // Smooth progress bar update
    if (progressBar) {
      progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }
    
    // Toggle navigation background for maximum legibility on scroll
    if (nav) {
      nav.classList.toggle('scrolled', scrolled > 60);
    }
    
    // Toggle accessible back to top button visibility threshold
    if (backTop) {
      backTop.classList.toggle('show', scrolled > 400);
    }
  }, { passive: true });

  // ── HAMBURGER MOBILE MENU DRAWER ──
  const ham = document.getElementById('ham');
  const mobileMenu = document.getElementById('mobileMenu');

  if (ham && mobileMenu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close mobile drawer when clicking a navigation highlight link
    document.querySelectorAll('.mm-link').forEach(link => {
      link.addEventListener('click', () => {
        ham.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── SCROLL REVEAL ANIMATIONS (INTELLIGENT INTERSECTION OBSERVER) ──
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Delay trigger slightly to provide a smooth, organic enter transition
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80);
          // Unobserve current target to guarantee performance optimization
          revealObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.08,
      rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // ── FAQ ACCORDION (INTERACTIVE ACCORDION WITH ACCESSIBLE TOGGLES) ──
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.parentElement;
      const isOpen = parentItem.classList.contains('open');
      
      // Close all other adjacent FAQ items to keep focus clean and singular
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
      });
      
      // Toggle current selection State
      if (!isOpen) {
        parentItem.classList.add('open');
      }
    });
  });

  // ── SMOOTH SCROLL BACK TO TOP ACTION ──
  if (backTop) {
    backTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});