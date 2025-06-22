const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#02488a', '#006acf', '#0587f2', '#78c2ff'];
const particles = [];
const numParticles = 80;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.radius = Math.random() * 3 + 1;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    this.draw();
  }
}

function init() {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

init();
animate();

history.scrollRestoration = "manual"; // Prevents browser from restoring scroll position
  window.onload = function() {
    window.scrollTo(0, 0); // Always scroll to top
  };


 document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');

  // CLICK: make nav link active on click
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // SCROLL: observe section and highlight nav based on scroll
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      let sectionTop = section.offsetTop - 100; // adjust for header
      let sectionHeight = section.offsetHeight;
      let sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
