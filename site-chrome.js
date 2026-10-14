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

document.querySelectorAll('a[href*="linkedin.com"]').forEach((link) => {
  if (link.querySelector("svg[data-linkedin-icon]")) return;

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "currentColor");
  icon.setAttribute("aria-hidden", "true");
  icon.setAttribute("data-linkedin-icon", "");

  const mark = document.createElementNS("http://www.w3.org/2000/svg", "path");
  mark.setAttribute("d", "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z");
  icon.append(mark);
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

document.querySelectorAll(".site-header nav").forEach((navigation) => {
  const links = navigation.querySelector(".navlinks");
  if (!links || navigation.querySelector(".mobile-menu-toggle")) return;

  const menuId = "mobile-navigation";
  links.id = menuId;

  const toggle = document.createElement("button");
  toggle.className = "mobile-menu-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open navigation");
  toggle.setAttribute("aria-controls", menuId);
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = '<span></span><span></span><span></span>';
  navigation.append(toggle);

  const header = navigation.closest(".site-header");
  const closeMenu = () => {
    header.classList.remove("menu-open");
    document.body.classList.remove("mobile-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    header.classList.toggle("menu-open", !isOpen);
    document.body.classList.toggle("mobile-menu-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
});

const pageMain = document.querySelector("main");
const updateShadePosition = () => {
  if (pageMain) {
    const scrollableDistance = Math.max(pageMain.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max((window.scrollY - pageMain.offsetTop) / scrollableDistance, 0), 1);
    if (!reducedMotion.matches) {
      document.body.style.setProperty("--shade-scroll-offset", `${progress * 360}px`);
    }

    if (document.body.classList.contains("page-index")) {
      const hero = document.querySelector(".home-hero");
      if (hero) {
        const heroProgress = Math.min(Math.max(window.scrollY / Math.max(hero.offsetHeight, 1), 0), 1);
        hero.style.setProperty("--hero-scroll-progress", heroProgress.toFixed(3));
        hero.style.setProperty("--hero-shade-shift", `${heroProgress * -18}vw`);
        const titleChannel = Math.round(255 * (1 - heroProgress));
        hero.style.setProperty("--hero-title-ink", `rgb(${titleChannel} ${titleChannel} ${titleChannel})`);
      }
    }
  }
};

window.addEventListener("scroll", updateShadePosition, { passive: true });
window.addEventListener("resize", updateShadePosition);
updateShadePosition();
