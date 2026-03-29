// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(n => {
        const text = n.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        animateCounter(n, num, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsEl = document.querySelector('.results-stats');
if (statsEl) statsObserver.observe(statsEl);