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

/* ---------- Testimonial slider (dot navigation) ---------- */
const testCards = document.querySelectorAll('#testimonialSlider .test-card');
const testDotsWrap = document.getElementById('testimonialDots');
let testIndex = 0;

testCards.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToTestimonial(i));
  testDotsWrap.appendChild(dot);
});
const testDots = testDotsWrap.querySelectorAll('span');

function goToTestimonial(i){
  testCards[testIndex].classList.remove('active');
  testDots[testIndex].classList.remove('active');
  testIndex = i;
  testCards[testIndex].classList.add('active');
  testDots[testIndex].classList.add('active');
}

setInterval(() => {
  goToTestimonial((testIndex + 1) % testCards.length);
}, 6000);

/* ---------- Contact form ---------- */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  const payload = {
    name: form.name.value,
    email: form.email.value,
    website: form.website.value,
    message: form.message.value
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(() => {
      openModal();
      form.reset();
    })
    .catch(() => {
      alert('Something went wrong sending your message. Please try again later.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    });
});

/* ---------- Success modal ---------- */
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

function openModal(){
  successModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  successModal.classList.remove('open');
  document.body.style.overflow = '';
}
closeModalBtn.addEventListener('click', closeModal);
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && successModal.classList.contains('open')) closeModal();
});

/* ---------- Download CV placeholder ---------- */
document.getElementById('downloadCv').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
});
