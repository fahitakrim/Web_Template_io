// Kinetic Craft Studio — Magnetic Physics, 3D Card Hover, and Smooth Interactions
document.addEventListener("DOMContentLoaded", () => {
  const dot = document.getElementById("cursor-dot");
  const circle = document.getElementById("cursor-circle");

  // 1. Smooth Spring Magnetic Cursor Physics
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let circleX = mouseX;
  let circleY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (dot) {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }
  });

  function animateCursor() {
    // Lerp smoothing (0.15 velocity)
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;

    if (circle) {
      circle.style.left = `${circleX}px`;
      circle.style.top = `${circleY}px`;
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover expansion on interactive elements
  const hoverables = document.querySelectorAll("a, button, .service-row, .work-card, .scope-pill");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      circle && circle.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      circle && circle.classList.remove("hovering");
    });
  });

  // 2. Magnetic Buttons (Framer Motion / Locomotive style physics)
  const magneticButtons = document.querySelectorAll(".magnetic-btn, .magnetic-link");
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });

  // 3. 3D Tilt Effect on Case Study Cards
  const workCards = document.querySelectorAll(".magnetic-card");
  workCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  // 4. Interactive Services Accordion
  const serviceRows = document.querySelectorAll(".service-row");
  serviceRows.forEach((row) => {
    row.addEventListener("click", () => {
      serviceRows.forEach((r) => r.classList.remove("active"));
      row.classList.add("active");
    });
  });

  // 5. Project Scope Estimator
  const scopePills = document.querySelectorAll(".scope-pill");
  const budgetOutput = document.getElementById("scope-budget");
  scopePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      scopePills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      if (budgetOutput && pill.dataset.budget) {
        budgetOutput.textContent = pill.dataset.budget;
      }
    });
  });

  // 6. Copy Email Button
  const copyEmailBtn = document.getElementById("copy-email-btn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = "hello@kineticcraft.studio";
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = "<span>✓ Copied to clipboard!</span>";
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error("Clipboard error:", err);
      }
    });
  }
});
