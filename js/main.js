// تبديل بين الصفحات البسيطة
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".nav button");
  const pages = document.querySelectorAll(".page");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-section");
      pages.forEach((p) => {
        p.classList.toggle("active", p.id === `page-${target}`);
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
