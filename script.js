// ─── CUSTOM CURSOR ───
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor on hover
document.querySelectorAll('a, button, .bento-card, .work-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '24px';
    cursor.style.height = '24px';
    cursor.style.background = 'rgba(201,160,86,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'var(--gold)';
  });
});

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal, .about-list li');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ─── NAV ACTIVE STATE ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--gold)'
      : '';
  });
});

// ─── FEATURED SPLIT POINTS REVEAL ───
const splitPoints = document.querySelectorAll('.fp-split-points li');
const splitObs = new IntersectionObserver(entries => {
  entries.forEach((e, idx) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), idx * 90);
      splitObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
splitPoints.forEach(li => splitObs.observe(li));

// ─── ADD FP CARDS TO CURSOR HOVER LIST ───
document.querySelectorAll('.fp-img-item, .fp-btn, .fp-split').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '28px';
    cursor.style.height = '28px';
    cursor.style.background = 'rgba(201,160,86,0.55)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'var(--gold)';
  });
});