/* Mobile menu */
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('#navMenu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after clicking a link (mobile)
  menu.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* Duplicate marquee content for seamless scroll */
const track = document.querySelector('.marquee__track');
if (track) {
  track.innerHTML = track.innerHTML + track.innerHTML;
}

/* Testimonials slider */
const viewport = document.querySelector('#slider');
const buttons = document.querySelectorAll('.iconbtn[data-dir]');

let current = 0;
function go(dir) {
  if (!viewport) return;
  const total = viewport.children.length;
  current = (current + dir + total) % total;
  viewport.scrollTo({ left: current * viewport.clientWidth, behavior: 'smooth' });
}
buttons.forEach(btn => btn.addEventListener('click', () => go(Number(btn.dataset.dir || 0))));

/* Keep slider aligned on resize */
window.addEventListener('resize', () => {
  if (!viewport) return;
  viewport.scrollTo({ left: current * viewport.clientWidth, behavior: 'auto' });
});

/* Contact removed (portfolio mode) */
/* Footer year */
const y = document.querySelector('#year');
if (y) y.textContent = String(new Date().getFullYear());

/* Subtle parallax on hero card (desktop) */
const codecard = document.querySelector('.codecard');
const visual = document.querySelector('.hero__visual');

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

if (codecard && visual && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  visual.addEventListener('mousemove', (e) => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    const rx = clamp(-y * 6, -6, 6);
    const ry = clamp(x * 8, -8, 8);

    codecard.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });

  visual.addEventListener('mouseleave', () => {
    codecard.style.transform = 'translateZ(0)';
  });
}
