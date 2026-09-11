/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

/* ---------- Active nav link on scroll ---------- */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ---------- Hero image slider (auto every 5s) ---------- */
const sliderImgs = document.querySelectorAll('#slider img');
const dotsWrap = document.getElementById('sliderDots');
let slideIndex = 0;

sliderImgs.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll('span');

function goToSlide(i){
  sliderImgs[slideIndex].classList.remove('active');
  dots[slideIndex].classList.remove('active');
  slideIndex = i;
  sliderImgs[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

let sliderTimer = setInterval(() => {
  goToSlide((slideIndex + 1) % sliderImgs.length);
}, 5000);

/* ---------- About progress bars: fill on scroll into view ---------- */
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.value + '%';
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
bars.forEach(bar => barObserver.observe(bar));

/* ---------- Projects filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

/* ---------- Contact form (demo only, no backend) ---------- */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks for your message! This is a demo form — no data is sent.');
  e.target.reset();
});

/* ---------- Download CV placeholder ---------- */
document.getElementById('downloadCv').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
});
