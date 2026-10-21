/*
  A9 Epoxy Inspirations — small, dependency-free interaction layer.
  Business contact details are kept here so every contact action stays in sync.
  The static image src values in index.html are deliberately temporary and
  can be swapped one image at a time.
*/
const A9_CONFIG = {
  instagram: "https://www.instagram.com/a9_epoxy_inspirations/",
  whatsapp: "https://wa.me/16043689306",
  email: "mailto:contact@e9epoxy.com",
  formEndpoint: "" // [CONFIGURE LATER]
};

const CONTACT_DISPLAY = {
  email: "contact@e9epoxy.com",
  phone: "+1 (604) 368-9306",
  phoneHref: "tel:+16043689306"
};

const ROUTES = {
  home: "A9 Epoxy Inspirations — Art That Holds Your Story",
  creations: "Our Creations — A9 Epoxy Inspirations",
  about: "About the Artist — A9 Epoxy Inspirations",
  guide: "Customization Guide — A9 Epoxy Inspirations",
  contact: "Contact & Custom Art — A9 Epoxy Inspirations"
};

const body = document.body;
const toast = document.querySelector(".toast");
let toastTimer;

body.classList.add("has-js");

function showToast(message) {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function revealActivePage() {
  const activeRevealItems = document.querySelectorAll(".page-view.is-active .reveal");
  activeRevealItems.forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), Math.min(index * 45, 520));
  });
}

function closeMenu() {
  const nav = document.querySelector(".primary-nav");
  const toggle = document.querySelector(".menu-toggle");
  nav?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
  body.classList.remove("is-menu-open");
}

function showRoute(route, shouldScroll = true) {
  const nextRoute = ROUTES[route] ? route : "home";
  document.querySelectorAll(".page-view").forEach((page) => {
    const isActive = page.dataset.page === nextRoute;
    page.classList.toggle("is-active", isActive);
    page.setAttribute("aria-hidden", String(!isActive));
  });
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === nextRoute);
  });
  document.title = ROUTES[nextRoute];
  closeMenu();
  if (shouldScroll) window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(revealActivePage, 30);
}

function handleRouteClick(event) {
  const routeLink = event.currentTarget;
  const route = routeLink.dataset.route;
  if (!ROUTES[route]) return;
  event.preventDefault();
  if (window.location.hash !== `#${route}`) {
    window.history.pushState({}, "", `#${route}`);
  }
  showRoute(route);
}

document.querySelectorAll("[data-route]").forEach((link) => {
  link.addEventListener("click", handleRouteClick);
});

window.addEventListener("popstate", () => showRoute(window.location.hash.slice(1), false));
window.addEventListener("hashchange", () => showRoute(window.location.hash.slice(1), false));

const menuToggle = document.querySelector(".menu-toggle");
menuToggle?.addEventListener("click", () => {
  const nav = document.querySelector(".primary-nav");
  const willOpen = !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  body.classList.toggle("is-menu-open", willOpen);
});

function setupConfigurableLinks() {
  document.querySelectorAll("[data-channel]").forEach((link) => {
    const channel = link.dataset.channel;
    const configuredUrl = A9_CONFIG[channel];
    if (configuredUrl) {
      link.href = configuredUrl;
      if (configuredUrl.startsWith("mailto:")) {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      } else {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
      link.classList.remove("is-configurable");
      link.removeAttribute("aria-disabled");
      link.removeAttribute("title");
      return;
    }
    link.setAttribute("aria-disabled", "true");
    link.title = `Add the ${channel} URL in script.js before publishing`;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(`The ${channel} link is ready for the real URL — add it in script.js before publishing.`);
    });
  });
}

function setupContactDetails() {
  const rows = [...document.querySelectorAll(".detail-list > div")];
  const details = [
    `<span>email</span><strong><a href="${A9_CONFIG.email}">${CONTACT_DISPLAY.email}</a></strong>`,
    `<span>phone</span><strong><a href="${CONTACT_DISPLAY.phoneHref}">${CONTACT_DISPLAY.phone}</a></strong>`,
    `<span>WhatsApp</span><strong><a href="${A9_CONFIG.whatsapp}" target="_blank" rel="noreferrer">${CONTACT_DISPLAY.phone}</a></strong>`
  ];

  rows.forEach((row, index) => {
    if (details[index]) {
      row.innerHTML = details[index];
    } else {
      row.remove();
    }
  });

  const intro = document.querySelector(".contact-details > h2 + p");
  if (intro) intro.textContent = "Choose the channel that feels easiest and start the conversation about your piece.";

  const note = document.querySelector(".contact-details .muted-note");
  if (note) note.textContent = "Service area and studio address will be added once confirmed.";
}

function setupImageFallbacks() {
  document.querySelectorAll("img[data-fallback-src]").forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackSrc && image.src !== image.dataset.fallbackSrc) {
        image.src = image.dataset.fallbackSrc;
      }
    }, { once: true });
  });
}

function setupHeroVideo() {
  const scene = document.querySelector("[data-hero-scene]");
  const video = scene?.querySelector("[data-hero-video]");
  if (!scene || !video) return;

  const showFallback = () => {
    scene.classList.add("is-video-fallback");
    video.classList.remove("is-visible");
  };
  const hideFallback = () => scene.classList.remove("is-video-fallback");

  const fallbackTimer = window.setTimeout(() => {
    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) showFallback();
  }, 5000);
  const clearFallbackTimer = () => window.clearTimeout(fallbackTimer);

  video.addEventListener("error", showFallback);
  video.addEventListener("canplay", () => {
    clearFallbackTimer();
    hideFallback();
  });
  video.addEventListener("playing", () => {
    clearFallbackTimer();
    hideFallback();
  });
  video.muted = true;
  window.setTimeout(() => video.classList.add("is-visible"), 300);
  video.play().catch(showFallback);
}

function setupPortfolioFilters() {
  const cards = document.querySelectorAll("[data-portfolio-grid] .portfolio-card");
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      cards.forEach((card) => card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter));
    });
  });
}

function setupForm() {
  const form = document.querySelector("#enquiry-form");
  if (!form) return;
  const requiredFields = [...form.querySelectorAll("[required]")];
  const status = form.querySelector(".form-status");

  const validateField = (field) => {
    const isValid = field.checkValidity() && field.value.trim() !== "";
    field.closest("label")?.classList.toggle("has-error", !isValid);
    return isValid;
  };

  requiredFields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest("label")?.classList.contains("has-error")) validateField(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const isValid = requiredFields.map(validateField).every(Boolean);
    if (!isValid) {
      status.textContent = "Please check the highlighted fields before continuing.";
      status.classList.add("is-visible");
      form.querySelector(".has-error input, .has-error textarea")?.focus();
      return;
    }

    if (!A9_CONFIG.formEndpoint) {
      status.textContent = "Your enquiry is valid, but nothing was sent. Add a genuine form endpoint in script.js before publishing.";
      status.classList.add("is-visible");
      showToast("No form destination is configured yet — no message was sent.");
      return;
    }

    const submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    try {
      const response = await fetch(A9_CONFIG.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Form request failed");
      status.textContent = "Thanks — your enquiry has been sent.";
      status.classList.add("is-visible");
      form.reset();
    } catch (error) {
      status.textContent = "The enquiry could not be sent. Please use the configured direct contact channel instead.";
      status.classList.add("is-visible");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = "Prepare enquiry <span>↗</span>";
    }
  });
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
setupContactDetails();
setupConfigurableLinks();
setupImageFallbacks();
setupHeroVideo();
setupPortfolioFilters();
setupForm();
showRoute(window.location.hash.slice(1) || "home", false);
