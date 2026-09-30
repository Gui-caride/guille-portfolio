const pageName = window.location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
document.body.classList.add(`page-${pageName}`);

document.querySelectorAll("body > header").forEach((header) => {
  header.classList.add("site-header");

  const updateScrollState = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
});
