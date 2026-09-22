const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: null,
  y: null,
  radius: 150
};

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createParticles() {

  particles = [];

  const count =
    window.innerWidth < 700
      ? 45
      : 90;

  for (let i = 0; i < count; i++) {

    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .25,
      vy: (Math.random() - .5) * .25,
      size: Math.random() * 1.7 + .4
    });

  }
}

function drawNetwork() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  particles.forEach(p => {

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > window.innerWidth) {
      p.vx *= -1;
    }

    if (p.y < 0 || p.y > window.innerHeight) {
      p.vy *= -1;
    }

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(150,170,255,.45)";
    ctx.fill();

  });


  for (let i = 0; i < particles.length; i++) {

    for (let j = i + 1; j < particles.length; j++) {

      const a = particles[i];
      const b = particles[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;

      const distance = Math.sqrt(
        dx * dx + dy * dy
      );

      if (distance < 135) {

        const opacity =
          (1 - distance / 135) * .14;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle =
          `rgba(130,145,255,${opacity})`;

        ctx.lineWidth = .6;

        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawNetwork);
}

window.addEventListener("mousemove", event => {

  mouse.x = event.clientX;
  mouse.y = event.clientY;

});

window.addEventListener("resize", () => {

  resizeCanvas();
  createParticles();

});

resizeCanvas();
createParticles();
drawNetwork();


// SCROLL REVEAL

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: .12
  }
);

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});


// NAVBAR SCROLL EFFECT

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {

    navbar.style.background =
      "rgba(5,7,11,.65)";

    navbar.style.backdropFilter =
      "blur(18px)";

    navbar.style.border =
      "1px solid rgba(255,255,255,.07)";

    navbar.style.borderRadius =
      "18px";

    navbar.style.padding =
      "0 18px";

  } else {

    navbar.style.background = "transparent";
    navbar.style.backdropFilter = "none";
    navbar.style.border = "none";
    navbar.style.padding = "0";

  }

});
