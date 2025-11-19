// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".page-section");
  const goButtons = document.querySelectorAll("[data-go]");
  const langToggleBtn = document.getElementById("lang-toggle");
  const preloader = document.getElementById("preloader");
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links");
  const yearSpan = document.getElementById("year");

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 🔁 Preloader
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 300);
    }, 900);
  }

  // 🧭 Switch sections
  function activateSection(sectionName) {
    sections.forEach((sec) => {
      sec.classList.toggle("active", sec.id === `page-${sectionName}`);
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("data-section") === sectionName
      );
    });
    if (navLinksContainer) {
      navLinksContainer.classList.remove("open");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-section");
      activateSection(target);
    });
  });

  goButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-go");
      activateSection(target);
    });
  });

  // 🍔 Mobile nav toggle
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("open");
    });
  }

  // 🖼️ Gallery Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll(".gallery-item").forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("open");
      });
    });

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("open");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("open");
      }
    });
  }

  // 🌐 Language toggle
  let currentLang = "ar";

  const translations = {
    ar: {
      topbar_phone_label: "اتصل بنا:",
      brand_name_main: "أبو بكر للإنارة",
      brand_name_sub: "إضاءة تُكمل فخامة بيتك",

      nav_home: "الرئيسية",
      nav_about: "من نحن",
      nav_products: "المنتجات",
      nav_gallery: "المعرض",
      nav_projects: "أعمالنا",
      nav_contact: "تواصل",

      hero_title: "إضاءة فاخرة تصنع تفاصيل بيتك",
      hero_subtitle:
        "أبو بكر للإنارة — تشكيلة ضخمة من الثريات، السبوتات، والإنارة المخفية لتصميم منازل، فلل ومحلات تجارية بأعلى درجات الفخامة.",
      hero_cta_primary: "شاهد مجموعتنا",
      hero_cta_secondary: "احجز استشارة إنارة",
      hero_badge_years: "+10 سنوات خبرة",
      hero_badge_projects: "+300 مشروع منجز",

      about_title: "من نحن",
      about_subtitle: "نبذة عن أبو بكر للإنارة",
      about_p1:
        "أبو بكر للإنارة هو معرض متخصص في حلول الإنارة العصرية والراقية للمنازل، الفلل، المحلات التجارية والمكاتب.",
      about_p2:
        "نوفر تشكيلة واسعة من الثريات الكلاسيك والمودرن، السبوتات، الإنارة المخفية، والإضاءة الخارجية بجودة عالية وأسعار منافسة.",
      about_p3:
        "فريقنا يقدم لك استشارات إنارة متكاملة لاختيار الإضاءة المناسبة لكل زاوية في بيتك، لتعيش تجربة ضوء مريحة وجمالية.",

      products_title: "المنتجات",
      products_subtitle: "تشكيلة مختارة من أهم فئات الإنارة",
      prod_chandeliers_title: "ثريات فاخرة",
      prod_chandeliers_desc:
        "ثريات كريستال ومودرن تناسب الصالونات، غرف السفرة، والفلل ذات الأسقف العالية.",
      prod_spots_title: "سبوتات وإنارة مخفية",
      prod_spots_desc:
        "سبوتات سقفية وليد مخفي للأسقف الجبسية مع توزيع ضوء مريح وعصري.",
      prod_led_title: "ليد شريط وإنارة ديكورية",
      prod_led_desc:
        "شرائط ليد ومؤثرات ضوئية لإبراز تفاصيل الجبس والديكور الداخلي.",
      prod_outdoor_title: "إنارة خارجية",
      prod_outdoor_desc:
        "وحدات إنارة للحدائق، الممرات، واجهات المباني ومداخل الفلل.",

      gallery_title: "المعرض",
      gallery_subtitle: "لقطات من داخل المعرض وأبرز القطع",

      projects_title: "أعمالنا",
      projects_subtitle: "نماذج من مشاريع الإنارة التي قمنا بتنفيذها",
      project1_title: "إنارة فيلا خاصة",
      project1_desc:
        "تصميم إنارة متكامل للفيلا يشمل الصالونات، غرف النوم، الممرات والواجهة الخارجية.",
      project2_title: "محل تجاري",
      project2_desc:
        "إنارة عرض للمنتجات داخل محل تجاري مع توزيع ضوء يبرز الألوان والتفاصيل.",
      project3_title: "شقة عائلية",
      project3_desc:
        "حلول إنارة اقتصادية وعملية لشقة عائلية مع الحفاظ على لمسة جمالية دافئة.",

      contact_title: "تواصل معنا",
      contact_subtitle:
        "احجز استشارة أو اسأل عن أي قطعة تناسب ديكور بيتك",
      contact_visit_title: "زورنا في المعرض",
      contact_address: "الأردن - اكتب هنا عنوان أبو بكر للإنارة بالتفصيل",
      contact_phone_label: "الهاتف:",
      contact_hours_label: "ساعات العمل:",
      contact_hours_value: "السبت - الخميس: 10 صباحًا - 10 مساءً",
      contact_form_title: "تواصل سريع عبر واتساب",
      contact_form_desc:
        "اضغط على الزر أدناه لبدء محادثة واتساب معنا مباشرة، وأرسل لنا صورة الغرفة أو المكان لنقترح لك أنسب إنارة.",
      contact_whatsapp_btn: "تواصل عبر واتساب"
    },

    en: {
      topbar_phone_label: "Call us:",
      brand_name_main: "Abu Bakr Lighting",
      brand_name_sub: "Lighting that completes your home's luxury",

      nav_home: "Home",
      nav_about: "About",
      nav_products: "Products",
      nav_gallery: "Gallery",
      nav_projects: "Projects",
      nav_contact: "Contact",

      hero_title: "Premium lighting that shapes your home's details",
      hero_subtitle:
        "Abu Bakr Lighting — a wide collection of chandeliers, spotlights and hidden lighting for homes, villas and commercial spaces.",
      hero_cta_primary: "View our collection",
      hero_cta_secondary: "Book a lighting consultation",
      hero_badge_years: "10+ years of experience",
      hero_badge_projects: "300+ completed projects",

      about_title: "About us",
      about_subtitle: "Who we are",
      about_p1:
        "Abu Bakr Lighting is a showroom specialized in modern and elegant lighting solutions for homes, villas, shops and offices.",
      about_p2:
        "We offer a wide range of classic and modern chandeliers, spotlights, hidden lighting and outdoor fixtures with high quality and competitive prices.",
      about_p3:
        "Our team provides complete lighting consultations to choose the right fixtures for every corner of your space.",

      products_title: "Products",
      products_subtitle:
        "A curated selection of our main lighting categories",
      prod_chandeliers_title: "Luxury chandeliers",
      prod_chandeliers_desc:
        "Crystal and modern chandeliers suitable for living rooms, dining rooms and high-ceiling villas.",
      prod_spots_title: "Spotlights & hidden lighting",
      prod_spots_desc:
        "Ceiling spotlights and hidden LED lighting for gypsum ceilings with a modern, comfortable light distribution.",
      prod_led_title: "LED strips & decorative lighting",
      prod_led_desc:
        "LED strips and decorative effects to highlight gypsum details and interior design elements.",
      prod_outdoor_title: "Outdoor lighting",
      prod_outdoor_desc:
        "Lighting fixtures for gardens, pathways, facades and villa entrances.",

      gallery_title: "Gallery",
      gallery_subtitle: "Shots from inside the showroom and key pieces",

      projects_title: "Projects",
      projects_subtitle: "Examples of lighting projects we executed",
      project1_title: "Private villa lighting",
      project1_desc:
        "A complete lighting design for a villa including living rooms, bedrooms, corridors and the exterior facade.",
      project2_title: "Retail shop",
      project2_desc:
        "Product-focused lighting for a retail shop with light distribution that highlights colors and details.",
      project3_title: "Family apartment",
      project3_desc:
        "Practical and budget-friendly lighting solutions for a family apartment with a cozy atmosphere.",

      contact_title: "Contact us",
      contact_subtitle:
        "Book a consultation or ask about any piece that suits your décor",
      contact_visit_title: "Visit our showroom",
      contact_address:
        "Jordan – write here the full address of Abu Bakr Lighting",
      contact_phone_label: "Phone:",
      contact_hours_label: "Opening hours:",
      contact_hours_value: "Saturday – Thursday: 10am – 10pm",
      contact_form_title: "Fast contact on WhatsApp",
      contact_form_desc:
        "Click the button below to start a WhatsApp chat with us and send a photo of your room so we can suggest the best lighting.",
      contact_whatsapp_btn: "Contact on WhatsApp"
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    if (lang === "ar") {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
      if (langToggleBtn) langToggleBtn.textContent = "EN";
    } else {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
      if (langToggleBtn) langToggleBtn.textContent = "عربي";
    }
  }

  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "ar" ? "en" : "ar";
      applyLanguage(currentLang);
    });
  }
});
