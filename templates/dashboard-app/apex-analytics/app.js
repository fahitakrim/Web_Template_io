// Apex Analytics Dashboard Logic (Canvas Area Chart, Filterable Table & State)
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // 1. Sidebar Toggle
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      sidebarToggle.textContent = sidebar.classList.contains("collapsed") ? "»" : "«";
      setTimeout(renderChart, 260); // Repaint chart to match container width
    });
  }

  // 2. Dark / Light Theme Toggle
  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      themeBtn.textContent = next === "dark" ? "◐" : "◑";
      renderChart();
    });
  }

  // 3. Interactive Analytics Area Chart
  const canvas = document.getElementById("analytics-chart");
  const tooltip = document.getElementById("chart-tooltip");
  let activeMetric = "tokens";

  const chartDatasets = {
    tokens: {
      label: "Tokens / Sec (k)",
      color: "#3b82f6",
      fill: "rgba(59, 130, 246, 0.15)",
      data: [120, 145, 130, 190, 210, 240, 220, 280, 310, 290, 350, 420]
    },
    revenue: {
      label: "Daily Revenue ($)",
      color: "#10b981",
      fill: "rgba(16, 185, 129, 0.15)",
      data: [2400, 2600, 2900, 3100, 3400, 3600, 3900, 4100, 4500, 4800, 5200, 5800]
    },
    swarms: {
      label: "Active Swarms",
      color: "#a855f7",
      fill: "rgba(168, 85, 247, 0.15)",
      data: [42, 58, 65, 80, 95, 110, 105, 140, 180, 210, 245, 280]
    }
  };

  const timeLabels = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  function renderChart() {
    if (!canvas) return;
    resizeCanvas();
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const ds = chartDatasets[activeMetric];
    const data = ds.data;
    const padding = { top: 30, right: 20, bottom: 40, left: 50 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...data) * 1.15;
    const minVal = Math.min(...data) * 0.85;

    // Draw Grid Lines
    ctx.strokeStyle = root.getAttribute("data-theme") === "light" 
      ? "rgba(0, 0, 0, 0.05)" 
      : "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = root.getAttribute("data-theme") === "light" ? "#64748b" : "#71717a";
      ctx.font = "11px system-ui";
      const val = Math.round(maxVal - (maxVal - minVal) * (i / 4));
      ctx.fillText(val.toLocaleString(), 10, y + 4);
    }

    // Points coordinates
    const points = data.map((val, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
      return { x, y, val, label: timeLabels[i] };
    });

    // Draw Smooth Area
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.lineTo(points[0].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = ds.fill;
    ctx.fill();

    // Draw Line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.strokeStyle = ds.color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Dots
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = ds.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = root.getAttribute("data-theme") === "light" ? "#fff" : "#121215";
      ctx.stroke();
    });

    // X Axis Labels
    points.forEach((p, idx) => {
      if (idx % 2 === 0) {
        ctx.fillStyle = root.getAttribute("data-theme") === "light" ? "#64748b" : "#71717a";
        ctx.font = "11px system-ui";
        ctx.fillText(p.label, p.x - 14, height - 15);
      }
    });

    canvas.points = points;
  }

  window.addEventListener("resize", renderChart);
  renderChart();

  // Metric Switcher Tabs
  const metricTabs = document.querySelectorAll(".metric-tab");
  metricTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      metricTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeMetric = tab.dataset.metric;
      renderChart();
    });
  });

  // Chart Hover Tooltip
  if (canvas && tooltip) {
    canvas.addEventListener("mousemove", (e) => {
      if (!canvas.points) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let closest = null;
      let minDistance = 40;

      canvas.points.forEach((p) => {
        const dist = Math.abs(p.x - mouseX);
        if (dist < minDistance) {
          closest = p;
          minDistance = dist;
        }
      });

      if (closest) {
        tooltip.style.display = "block";
        tooltip.style.left = `${closest.x}px`;
        tooltip.style.top = `${closest.y}px`;
        tooltip.innerHTML = `<strong>${closest.label}</strong><br/>${chartDatasets[activeMetric].label}: <strong>${closest.val.toLocaleString()}</strong>`;
      } else {
        tooltip.style.display = "none";
      }
    });

    canvas.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  }

  // 4. Data Table Population & Filtering (shadcn Table Pattern)
  const simulationData = [
    { id: "SIM-8492", name: "Q3 Monetary Policy Emergence", seed: "Federal Reserve Minutes (PDF)", model: "Qwen-Plus", agents: "5,000", status: "Completed", latency: "21ms" },
    { id: "SIM-8491", name: "Electric Vehicle Brand Crisis", seed: "Viral Social Threads (JSON)", model: "GPT-4o", agents: "2,500", status: "Simulating", latency: "42ms" },
    { id: "SIM-8490", name: "GenAI Coding Agent Adoption", seed: "Developer Survey 2026", model: "DeepSeek-V3", agents: "10,000", status: "Completed", latency: "18ms" },
    { id: "SIM-8489", name: "Novel Plot Convergence Test", seed: "Chapter 1-40 Manuscript", model: "Qwen-Plus", agents: "240", status: "Completed", latency: "24ms" },
    { id: "SIM-8488", name: "Global Supply Chain Disruptions", seed: "Maritime Trade Logs", model: "GPT-4o", agents: "1,200", status: "Queued", latency: "-" },
    { id: "SIM-8487", name: "Healthcare Reform Public Reaction", seed: "Policy Draft Section 4", model: "DeepSeek-V3", agents: "8,000", status: "Completed", latency: "19ms" }
  ];

  const tableBody = document.getElementById("table-body");
  const searchInput = document.getElementById("sim-search");
  const statusFilter = document.getElementById("status-filter");

  function renderTable() {
    if (!tableBody) return;
    const q = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const st = statusFilter ? statusFilter.value : "all";

    const filtered = simulationData.filter((row) => {
      const matchStatus = st === "all" || row.status === st;
      const haystack = `${row.id} ${row.name} ${row.seed} ${row.model}`.toLowerCase();
      const matchSearch = !q || haystack.includes(q);
      return matchStatus && matchSearch;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted);">No simulation records match your criteria.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map((row) => `
      <tr>
        <td><strong>${row.id}</strong><div style="font-size:11px;color:var(--text-muted);">${row.name}</div></td>
        <td>${row.seed}</td>
        <td><code>${row.model}</code></td>
        <td>${row.agents}</td>
        <td><span class="badge ${row.status.toLowerCase()}">${row.status}</span></td>
        <td>${row.latency}</td>
        <td><button class="btn-outline" style="padding:4px 8px;font-size:11px;" onclick="alert('Viewing telemetry for ${row.id}')">Inspect</button></td>
      </tr>
    `).join("");

    const infoEl = document.getElementById("pagination-info");
    if (infoEl) infoEl.textContent = `Showing 1-${filtered.length} of ${simulationData.length} records`;
  }

  if (searchInput) searchInput.addEventListener("input", renderTable);
  if (statusFilter) statusFilter.addEventListener("change", renderTable);
  renderTable();

  // 5. New Simulation Modal Logic
  const simModal = document.getElementById("sim-modal");
  const openModalBtn = document.getElementById("open-sim-modal");
  const closeModalBtn = document.getElementById("close-sim-modal");
  const cancelModalBtn = document.getElementById("cancel-modal");
  const simForm = document.getElementById("sim-form");

  function toggleModal(open) {
    if (!simModal) return;
    simModal.classList.toggle("open", open);
  }

  if (openModalBtn) openModalBtn.addEventListener("click", () => toggleModal(true));
  if (closeModalBtn) closeModalBtn.addEventListener("click", () => toggleModal(false));
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", () => toggleModal(false));

  if (simForm) {
    simForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value;
      const model = document.getElementById("form-model").value;
      const agents = document.getElementById("form-agents").value;

      simulationData.unshift({
        id: `SIM-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name,
        seed: "Custom seed uploaded",
        model: model,
        agents: parseInt(agents).toLocaleString(),
        status: "Simulating",
        latency: "19ms"
      });

      renderTable();
      toggleModal(false);
      simForm.reset();
    });
  }
});
