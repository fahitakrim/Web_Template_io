// Nova SaaS Interactive Logic (Retro Grid Canvas, 3D Tilt, Counter & Spotlight)
document.addEventListener("DOMContentLoaded", () => {
  // 1. Mouse-following Spotlight (Aceternity style)
  const root = document.documentElement;
  window.addEventListener("pointermove", (e) => {
    root.style.setProperty("--spotlight-x", `${e.clientX}px`);
    root.style.setProperty("--spotlight-y", `${e.clientY + window.scrollY}px`);
  });

  // 2. Interactive Animated Retro Grid Canvas (Magic UI style)
  const canvas = document.getElementById("grid-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let frame = 0;
    function renderGrid() {
      ctx.clearRect(0, 0, width, height);

      // Draw faint perspective grid lines
      const gridSize = 60;
      ctx.strokeStyle = root.getAttribute("data-theme") === "light" 
        ? "rgba(0, 0, 0, 0.03)" 
        : "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating nodes & connecting lines
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = root.getAttribute("data-theme") === "light"
          ? `rgba(79, 70, 229, ${p.alpha * 0.6})`
          : `rgba(99, 102, 241, ${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby points
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      frame++;
      requestAnimationFrame(renderGrid);
    }
    renderGrid();
  }

  // 3. 3D Tilt Effect on Cards (Framer Motion / Aceternity Card Tilt)
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });

  // 4. Annual / Monthly Pricing Switcher
  const billingSwitch = document.getElementById("billing-switch");
  const priceAmounts = document.querySelectorAll(".amount");
  let isAnnual = false;

  if (billingSwitch) {
    billingSwitch.addEventListener("click", () => {
      isAnnual = !isAnnual;
      billingSwitch.classList.toggle("annual", isAnnual);

      priceAmounts.forEach((el) => {
        const target = isAnnual ? el.dataset.annual : el.dataset.monthly;
        if (target !== undefined) {
          // Smooth numeric transition
          animateNumber(el, parseInt(el.textContent, 10) || 0, parseInt(target, 10), 300);
        }
      });
    });
  }

  function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.textContent = Math.round(start + (end - start) * progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // 5. Intersection Observer for Stat Counters (Magic UI Counter)
  const metricValues = document.querySelectorAll(".metric-value");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1400;
          const startTime = performance.now();

          function count(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const val = current + target * progress;
            el.textContent = isDecimal ? val.toFixed(2) : Math.round(val);
            if (progress < 1) {
              requestAnimationFrame(count);
            }
          }
          requestAnimationFrame(count);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  metricValues.forEach((el) => observer.observe(el));

  // 6. Dark / Light Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      themeToggle.textContent = next === "dark" ? "◐" : "◑";
    });
  }
});
