document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const kpiRows = document.querySelectorAll("#kpiTableBody tr");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      kpiRows.forEach((row) => {
        const match = category === "all" || row.dataset.cat === category;
        row.style.display = match ? "" : "none";
      });
    });
  });

  const form = document.getElementById("inquiryForm");
  const statusEl = document.getElementById("formStatus");

  if (form && statusEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name");
      const email = data.get("email");
      const topic = data.get("topic");
      const message = data.get("message");

      const summary = `【資安教學研究中心洽詢】姓名/單位：${name}｜信箱：${email}｜類別：${topic}｜內容：${message}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summary).then(() => {
          statusEl.textContent = "已產生並複製洽詢摘要至剪貼簿，歡迎貼上寄送給中心窗口！";
        }).catch(() => {
          statusEl.textContent = summary;
        });
      } else {
        statusEl.textContent = summary;
      }
    });
  }
});
