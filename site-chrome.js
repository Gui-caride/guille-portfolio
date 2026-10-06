const pageName = window.location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
document.body.classList.add(`page-${pageName}`);

document.querySelectorAll('.site-footer .contact-cta[href^="mailto:"]').forEach((link) => {
  if (link.querySelector("svg")) return;

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "1.6");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.setAttribute("aria-hidden", "true");

  const envelope = document.createElementNS("http://www.w3.org/2000/svg", "path");
  envelope.setAttribute("d", "M3.5 6.5h17v11h-17zM4 7l8 7 8-7");
  icon.append(envelope);
  link.prepend(icon);
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const revealItems = document.querySelectorAll(".home-reveal");

if (revealItems.length && !reducedMotion.matches && "IntersectionObserver" in window) {
  document.body.classList.add("has-scroll-reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll("body > header").forEach((header) => {
  header.classList.add("site-header");

  const updateScrollState = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
});
