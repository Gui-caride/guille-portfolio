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

const scrollScene = document.querySelector("[data-scroll-scene]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (scrollScene) {
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const interpolate = (start, end, progress) => start + (end - start) * progress;

  const updateScrollScene = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const sceneRange = Math.max(0, scrollScene.offsetHeight - viewportHeight);
    const progress = reducedMotion.matches
      ? 1
      : clamp(-scrollScene.getBoundingClientRect().top / sceneRange, 0, 1);
    const mobile = viewportWidth <= 600;
    const initialTitleSize = clamp(viewportWidth * 0.11, 52, 160);
    const compactTitleSize = clamp(viewportWidth * 0.052, 34, 66);
    const reveal = clamp((progress - 0.28) / 0.72, 0, 1);

    scrollScene.style.setProperty("--intro-title-size", `${interpolate(initialTitleSize, compactTitleSize, progress)}px`);
    scrollScene.style.setProperty("--intro-title-x", `${interpolate(viewportWidth * (mobile ? 0.05 : 0.17), viewportWidth * (mobile ? 0.05 : 0.17), progress)}px`);
    scrollScene.style.setProperty("--intro-title-y", `${interpolate(viewportHeight * (mobile ? 0.4 : 0.49), viewportHeight * (mobile ? 0.34 : 0.4), progress)}px`);
    scrollScene.style.setProperty("--intro-copy-opacity", `${reveal}`);
    scrollScene.style.setProperty("--intro-copy-y", `${interpolate(22, 0, reveal)}px`);
    scrollScene.style.setProperty("--intro-hint-opacity", `${1 - reveal}`);
    scrollScene.style.setProperty("--flower-x", `${interpolate(0, mobile ? 9 : 18, progress)}px`);
    scrollScene.style.setProperty("--flower-y", `${interpolate(0, -12, progress)}px`);
    scrollScene.style.setProperty("--flower-rotation", `${interpolate(-4, 8, progress)}deg`);
    scrollScene.style.setProperty("--ring-x", `${interpolate(0, -28, progress)}px`);
    scrollScene.style.setProperty("--ring-y", `${interpolate(0, -18, progress)}px`);
    scrollScene.style.setProperty("--ring-rotation", `${interpolate(0, 28, progress)}deg`);
  };

  let sceneUpdateScheduled = false;
  const scheduleSceneUpdate = () => {
    if (sceneUpdateScheduled) return;
    sceneUpdateScheduled = true;
    window.requestAnimationFrame(() => {
      updateScrollScene();
      sceneUpdateScheduled = false;
    });
  };

  window.addEventListener("scroll", scheduleSceneUpdate, { passive: true });
  window.addEventListener("resize", scheduleSceneUpdate);
  reducedMotion.addEventListener("change", scheduleSceneUpdate);
  updateScrollScene();
}

document.querySelectorAll("body > header").forEach((header) => {
  header.classList.add("site-header");

  const updateScrollState = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();
});
