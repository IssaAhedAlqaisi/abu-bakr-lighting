document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".page-section");
  const goButtons = document.querySelectorAll("[data-go]");
  const langToggleBtn = document.getElementById("lang-toggle");
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links");
  const footerCopy = document.getElementById("footer-copy");
  const backHomeBtn = document.getElementById("back-home-btn");
  const homeSection = document.getElementById("page-home");

  /* ========= تفعيل قسم معيّن ========= */
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

    updateBackButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ========= زر الرجوع للرئيسية ========= */
  function updateBackButton() {
    if (!backHomeBtn || !homeSection) return;
    if (homeSection.classList.contains("active")) {
      backHomeBtn.style.display = "none";
    } else {
      backHomeBtn.style.display = "block";
    }
  }

  if (backHomeBtn) {
    backHomeBtn.addEventListener("click", () => {
      activateSection("home");
    });
  }

  updateBackButton();

  /* ========= التنقّل من المنيو ========= */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-section");
      activateSection(target);
    });
  });

  /* ========= أزرار "اذهب إلى" في الهيرو ========= */
  goButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-go");
      activateSection(target);
    });
  });

  /* ========= منيو الموبايل ========= */
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("open");
    });
  }

  /* ========= Lightbox للصور ========= */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("open");
  }

  if (lightbox && lightboxImg && lightboxClose) {
    // صور المعرض الأساسية
    document.querySelectorAll(".gallery-item").forEach((img) => {
      img.addEventListener("click", () => openLightbox(img.src));
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

  /* ========= تعدّد اللغات (عربي / إنجليزي) ========= */

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

    // Footer copy
    if (footerCopy) {
      const year = new Date().getFullYear();
      if (lang === "ar") {
        footerCopy.textContent =
          "© " + year + " أبو بكر للإنارة — جميع الحقوق محفوظة";
      } else {
        footerCopy.textContent =
          "© " + year + " Abu Bakr Lighting — All rights reserved";
      }
    }

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

  /* ========= كروت الأقسام (أكورديون) ========= */
  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card) => {
    const header = card.querySelector(".category-header");
    if (!header) return;

    header.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

  /* ========= بيانات المعرض لكل قسم فرعي ========= */
  const galleryData = {
    // الثريات
    "thu-modern": {
      title: "ثريات مودرن",
      desc: "مجموعة من الثريات المودرن بتصاميم عصرية تناسب الصالونات وغرف المعيشة.",
      images: [
        "https://i.imgur.com/jFEsyhC.jpeg",
        "https://i.imgur.com/amXvUUL.jpeg"
      ]
    },
    "thu-crystal": {
      title: "ثريات كريستال",
      desc: "ثريات كريستال فاخرة تضيف لمسة فخامة لأي مساحة.",
      images: [
        "https://i.imgur.com/iD0wrd7.jpeg",
        "https://i.imgur.com/HvHtGm.jpeg"
      ]
    },
    "thu-stairs": {
      title: "ثريات مطالع الدرج",
      desc: "إنارة خاصة لمطالع الدرج بارتفاعات مختلفة وإضاءة مميزة.",
      images: [
        "https://i.imgur.com/GLnZ7LF.jpeg",
        "https://i.imgur.com/RLGHNSb.jpeg",
        "https://i.imgur.com/xf56xsh.jpeg"
      ]
    },
    "thu-pendants": {
      title: "معلّقات",
      desc: "إنارة معلّقة تناسب طاولات السفرة والكونترات والممرات.",
      images: [
        "https://i.imgur.com/hb9FABk.jpeg",
        "https://i.imgur.com/VdGsM0H.jpeg",
        "https://i.imgur.com/KkudgPu.jpeg"
      ]
    },
    "thu-floor-table": {
      title: "فلور لامب وتيبل لامب",
      desc: "إضاءات أرضية وطاولية لزوايا البيت وغرف النوم.",
      images: [
        "https://i.imgur.com/6ayUpdX.jpeg",
        "https://i.imgur.com/cjsWJmn.jpeg"
      ]
    },

    // إنارة جدارية
    "wall-outdoor": {
      title: "إنارة جدارية خارجية",
      desc: "إنارة جدارية خارجية للواجهات والمداخل.",
      images: [
        "https://i.imgur.com/ShsRYzS.jpeg",
        "https://i.imgur.com/euTlcGo.jpeg"
      ]
    },
    "wall-solar": {
      title: "إنارة جدارية بالطاقة الشمسية",
      desc: "إنارة جدارية تعمل بالطاقة الشمسية لتوفير الطاقة.",
      images: [
        "https://i.imgur.com/UtyBbxR.jpeg",
        "https://i.imgur.com/ZaPj0mv.jpeg"
      ]
    },

    // إنارة داخلية
    "in-strip": {
      title: "ستريب لِد",
      desc: "شرائط لِد لإضاءة الجبس والديكور الداخلي.",
      images: [
        "https://i.imgur.com/h74UouB.jpeg",
        "https://i.imgur.com/qmsSYer.jpeg"
      ]
    },
    "in-magnetic": {
      title: "إنارة مجناتيك",
      desc: "مسارات مغناطيسية بإضاءات متعددة قابلة للتركيب والتغيير.",
      images: [
        "https://i.imgur.com/GOlxqf9.jpeg"
      ]
    },
    "in-smart": {
      title: "إنارة مجناتيك سمارت",
      desc: "إنارة مغناطيسية ذكية يمكن التحكم بها عن بعد.",
      images: [
        "https://i.imgur.com/GOlxqf9.jpeg",
        "https://i.imgur.com/UtyBbxR.jpeg"
      ]
    },
    "in-frame": {
      title: "فريم للسبوت",
      desc: "إطارات سبوت بأنواع مختلفة لتوزيع الإضاءة بشكل أنيق.",
      images: [
        "https://i.imgur.com/Inei5Eg.jpeg",
        "https://i.imgur.com/iNnI4mu.jpeg"
      ]
    },

    // إنارة خارجية
    "out-lanterns": {
      title: "فوانيس خارجية",
      desc: "فوانيس إنارة للحدائق والمداخل والشرفات.",
      images: [
        "https://i.imgur.com/LI7gtLh.jpeg",
        "https://i.imgur.com/asbN7ky.jpeg"
      ]
    },
    "out-garden": {
      title: "إنارة أرضية وحدائق",
      desc: "إنارة خاصة للممرات والحدائق والوحدات الأرضية.",
      images: [
        "https://i.imgur.com/LSfmuaV.jpeg",
        "https://i.imgur.com/K4i6ttw.jpeg"
      ]
    },
    "out-flood": {
      title: "كشافات لِد خارجية",
      desc: "كشافات لِد قوية لإنارة المساحات الخارجية.",
      images: [
        "https://i.imgur.com/UvAJH6P.jpeg",
        "https://i.imgur.com/ZaPj0mv.jpeg",
        "https://i.imgur.com/TqZ9llQ.jpeg"
      ]
    },
    "out-street": {
      title: "إنارة شوارع",
      desc: "كشافات وإنارات خاصة للشوارع والمناطق المفتوحة.",
      images: [
        "https://i.imgur.com/ByCzTVw.jpeg",
        "https://i.imgur.com/F0sju2M.jpeg",
        "https://i.imgur.com/OwzYC6D.jpeg"
      ]
    },

    // لمبات
    "bulb-led": {
      title: "لمبات لِد",
      desc: "لمبات لِد باستهلاك منخفض وعمر طويل.",
      images: [
        "https://i.imgur.com/h74UouB.jpeg",
        "https://i.imgur.com/tUaJh8c.jpeg"
      ]
    },
    "bulb-neon": {
      title: "لمبات نيون",
      desc: "لمبات نيون للإنارة العامة واللوحات.",
      images: [
        "https://i.imgur.com/tUaJh8c.jpeg",
        "https://i.imgur.com/h74UouB.jpeg"
      ]
    },
    "bulb-spot": {
      title: "سبوت لِد",
      desc: "سبوتات لِد للأسقف والجبس.",
      images: [
        "https://i.imgur.com/Inei5Eg.jpeg",
        "https://i.imgur.com/iNnI4mu.jpeg"
      ]
    },
    "bulb-louver": {
      title: "لوفر لِد 60×60",
      desc: "لوحات لِد 60×60 للمكاتب والمحلات.",
      images: [
        "https://i.imgur.com/ImXt2UA.jpeg",
        "https://i.imgur.com/qmsSYer.jpeg"
      ]
    },

    // مراوح وشفاطات
    "fans": {
      title: "مراوح وشفاطات",
      desc: "مجموعة من المراوح والشفاطات للاستخدام المنزلي والتجاري.",
      images: [
        "https://i.imgur.com/AgwTI2n.jpeg",
        "https://i.imgur.com/rXYyfud.jpeg",
        "https://i.imgur.com/nVGryNq.jpeg",
        "https://i.imgur.com/Xk3XIK0.jpeg",
        "https://i.imgur.com/1nXHeYK.jpeg"
      ]
    }
  };

  const subcatGallery = document.getElementById("subcat-gallery");
  const subcatTitle = document.getElementById("subcat-title");
  const subcatDesc = document.getElementById("subcat-desc");
  const subcatImages = document.getElementById("subcat-images");
  const backToCatsBtn = document.getElementById("back-to-cats");
  const subcatLinks = document.querySelectorAll(".subcat-link");

  subcatLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.gallery;
      const data = galleryData[key];
      if (!data) return;

      subcatTitle.textContent = data.title;
      subcatDesc.textContent = data.desc;

      subcatImages.innerHTML = "";
      data.images.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = data.title;
        img.classList.add("gallery-item");
        img.addEventListener("click", () => openLightbox(url));
        subcatImages.appendChild(img);
      });

      if (subcatGallery) {
        subcatGallery.classList.add("active");
        subcatGallery.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (backToCatsBtn) {
    backToCatsBtn.addEventListener("click", () => {
      if (subcatGallery) {
        subcatGallery.classList.remove("active");
      }
      const catsSection = document.querySelector(".home-categories");
      if (catsSection) {
        catsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});
