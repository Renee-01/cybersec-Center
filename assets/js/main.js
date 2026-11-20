document.addEventListener("DOMContentLoaded", () => {
  // 手機版漢堡選單
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 三年藍圖頁面：KPI 分類篩選
  const filterButtons = document.querySelectorAll(".filter-btn");
  const kpiRows = document.querySelectorAll("#kpiTableBody tr");

  if (filterButtons.length && kpiRows.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
        kpiRows.forEach((row) => {
          row.style.display = (category === "all" || row.dataset.cat === category) ? "" : "none";
        });
      });
    });
  }

  // 產學與洽詢頁面：表單摘要複製
  const form = document.getElementById("inquiryForm");
  const statusEl = document.getElementById("formStatus");

  if (form && statusEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const summary = `【資訊安全教學研究中心洽詢】姓名/單位：${data.get("name")}｜信箱：${data.get("email")}｜類別：${data.get("topic")}｜內容：${data.get("message")}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(summary).then(() => {
          statusEl.textContent = "✓ 已產生並複製洽詢摘要至剪貼簿，歡迎直接貼上寄送給中心窗口！";
          statusEl.style.color = "#0d9488";
        }).catch(() => {
          statusEl.textContent = summary;
        });
      } else {
        statusEl.textContent = summary;
      }
    });
  }
});
