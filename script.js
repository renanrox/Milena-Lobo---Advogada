// Edite estes dados antes de publicar. Todos os links do site são atualizados daqui.
const SITE_CONFIG = {
  whatsappNumber: "5500000000000",
  defaultMessage: "Olá, Dra. Milena, gostaria de mais informações sobre atendimento jurídico.",
  email: "contato@seudominio.com.br",
  instagramHandle: "@seuinstagram",
  instagramUrl: "https://instagram.com/seuinstagram",
  region: "Cidade e região a informar",
  hours: "Segunda a sexta, com agendamento"
};

const makeWhatsAppUrl = (message = SITE_CONFIG.defaultMessage) =>
  `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = makeWhatsAppUrl(link.dataset.message || SITE_CONFIG.defaultMessage);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-service]").forEach((link) => {
  const service = link.dataset.service;
  link.href = makeWhatsAppUrl(`Olá, Dra. Milena, gostaria de orientação sobre ${service}.`);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-email]").forEach((element) => {
  element.textContent = SITE_CONFIG.email;
});
document.querySelectorAll("[data-email-link]").forEach((link) => {
  link.href = `mailto:${SITE_CONFIG.email}`;
});
document.querySelectorAll("[data-instagram]").forEach((element) => {
  element.textContent = SITE_CONFIG.instagramHandle;
});
document.querySelectorAll("[data-instagram-link]").forEach((link) => {
  link.href = SITE_CONFIG.instagramUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-region]").forEach((element) => {
  element.textContent = SITE_CONFIG.region;
});
document.querySelectorAll("[data-hours]").forEach((element) => {
  element.textContent = SITE_CONFIG.hours;
});

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => event.key === "Escape" && closeMenu());
window.addEventListener("resize", () => window.innerWidth > 900 && closeMenu());

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 18);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const sections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll(".accordion details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".accordion details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

document.getElementById("current-year").textContent = new Date().getFullYear();
