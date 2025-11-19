// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".page-section");
  const goButtons = document.querySelectorAll("[data-go]");
  const langToggleBtn = document.getElementById("lang-toggle");
  const preloader = document.getElementById("preloader");
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links");
  const footerCopy = document.getElementById("footer-copy");

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

  // 🌐 Language data
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
      contact_whatsapp_btn: "تواصل عبر واتساب",

      footer_dev_by: "تصميم وتنفيذ:",

      // Wizard
      wizard_title: "ابدأ رحلتك الضوئية",
      wizard_subtitle:
        "أجب عن 3 أسئلة بسيطة، ودع نبضة الضوء تقترح لك أجواء الإنارة المناسبة.",

      wizard_q1_title: "ما لون مزاجك الآن؟",
      wizard_q1_desc: "اختر أقرب لون لإحساسك الحالي.",
      wizard_mood_blue: "أزرق — هادئ",
      wizard_mood_red: "أحمر — نشيط",
      wizard_mood_grey: "رمادي — محايد",

      wizard_q2_title: "ما نوع المساحة التي تريد إنارتها؟",
      wizard_q2_desc: "اختر نوع المكان الذي تفكر فيه.",
      wizard_space_home: "منزل",
      wizard_space_office: "مكتب",
      wizard_space_shop: "متجر",
      wizard_space_factory: "مصنع",

      wizard_q3_title: "متى تشعر بالسعادة أكثر؟",
      wizard_q3_desc: "اختر الوقت الأقرب لقلبك.",
      wizard_time_morning: "صباحًا",
      wizard_time_evening: "مساءً",
      wizard_time_night: "ليلاً",

      wizard_btn_generate: "إطلاق نبضة الضوء",
      wizard_error: "من فضلك أجب عن جميع الأسئلة أولاً.",
      wizard_result_title: "نبضتك الضوئية"
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
      contact_whatsapp_btn: "Contact on WhatsApp",

      footer_dev_by: "Designed & developed by:",

      // Wizard
      wizard_title: "Start your light journey",
      wizard_subtitle:
        "Answer 3 simple questions and let the light pulse suggest the right mood for your space.",

      wizard_q1_title: "What is your mood color now?",
      wizard_q1_desc:
        "Pick the color that feels closest to your current mood.",
      wizard_mood_blue: "Blue — Calm",
      wizard_mood_red: "Red — Energetic",
      wizard_mood_grey: "Grey — Neutral",

      wizard_q2_title: "What type of space do you want to light?",
      wizard_q2_desc: "Choose the kind of space you're thinking of.",
      wizard_space_home: "Home",
      wizard_space_office: "Office",
      wizard_space_shop: "Shop",
      wizard_space_factory: "Factory",

      wizard_q3_title: "When do you feel happiest?",
      wizard_q3_desc: "Choose the time that feels most like you.",
      wizard_time_morning: "Morning",
      wizard_time_evening: "Evening",
      wizard_time_night: "Night",

      wizard_btn_generate: "Generate light pulse",
      wizard_error: "Please answer all questions first.",
      wizard_result_title: "Your light pulse"
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

    // dir + lang
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

  // 🌌 Intro overlay logic
  const introOverlay = document.getElementById("intro-overlay");
  const introBtn = document.getElementById("intro-btn");

  if (introOverlay && introBtn) {
    introBtn.addEventListener("click", () => {
      introOverlay.classList.add("playing");

      // صوت ترحيبي (لو المتصفح سامح)
      try {
        const text =
          currentLang === "ar"
            ? "مرحبًا، أنا نورك. كيف تريد أن أغير حياتك اليوم؟"
            : "Welcome, I am your light. How would you like me to change your space today?";
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = currentLang === "ar" ? "ar-SA" : "en-US";
        window.speechSynthesis.speak(utter);
      } catch (e) {
        console.log("Speech not supported or blocked.");
      }

      setTimeout(() => {
        introOverlay.classList.remove("playing");
        introOverlay.classList.add("hidden");
      }, 1400);
    });
  }

  // 🔮 Light pulse wizard logic
  const wizardOptionsContainers = document.querySelectorAll(".wizard-options");
  const wizardGenerateBtn = document.getElementById("wizard-generate");
  const wizardError = document.getElementById("wizard-error");
  const wizardResult = document.getElementById("wizard-result");
  const wizardResultText = document.getElementById("wizard-result-text");
  const wizardVideo = document.getElementById("wizard-video");

  const wizardState = {
    mood: null,
    space: null,
    time: null
  };

  // اختيار الخيارات
  wizardOptionsContainers.forEach((container) => {
    const questionKey = container.getAttribute("data-question");
    const options = container.querySelectorAll(".wizard-option");

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        options.forEach((o) => o.classList.remove("active"));
        opt.classList.add("active");

        const value = opt.getAttribute("data-value");
        wizardState[questionKey] = value;
      });
    });
  });

  function buildDescription(lang, state) {
    const moodMap = {
      ar: {
        blue: "مزاج هادئ يميل للأمان والسكينة",
        red: "مزاج نشيط يحب الحركة والإنجاز",
        grey: "مزاج متوازن ومحايد يحب البساطة"
      },
      en: {
        blue: "a calm mood seeking safety and peace",
        red: "an active mood that loves energy and productivity",
        grey: "a balanced, neutral mood that favors simplicity"
      }
    };

    const spaceMap = {
      ar: {
        home: "مساحة منزلية تحتاج لدفء ولمسة مريحة",
        office: "مساحة عمل تحتاج لتركيز ووضوح",
        shop: "متجر يحتاج لإبراز المنتجات وجذب الانتباه",
        factory: "مساحة عملية تحتاج لإنارة قوية وواضحة"
      },
      en: {
        home: "a home space that needs warmth and comfort",
        office: "a workspace that needs focus and clarity",
        shop: "a shop that needs to highlight products and attract attention",
        factory: "a functional space that needs strong, clear lighting"
      }
    };

    const timeMap = {
      ar: {
        morning: "تستمتع بضوء الصباح اللطيف والبدايات الجديدة",
        evening: "تحب أجواء المساء الدافئة بعد يوم طويل",
        night: "تعشق هدوء الليل ولمسات الضوء الهادئة"
      },
      en: {
        morning: "you enjoy the soft light of morning and fresh starts",
        evening: "you love the warm mood of evenings after a long day",
        night: "you adore the calm of night with subtle lighting touches"
      }
    };

    if (lang === "ar") {
      return `
        يبدو أنك تمتلك ${moodMap.ar[state.mood]}، وتفكر في ${spaceMap.ar[state.space]}،
        و ${timeMap.ar[state.time]}.<br><br>
        نقترح لك مزيجًا من إنارة أساسية ناعمة، مع سبوتات موجهة ولمسات ليد مخفي
        لخلق "نبضة ضوء" خاصة تشبه شخصيتك ومزاجك. شاهد الفيديو لترى كيف يمكن
        أن تتحول مساحتك من عادية إلى مضيئة بالحياة.
      `;
    } else {
      return `
        It looks like you have ${moodMap.en[state.mood]}, thinking about ${spaceMap.en[state.space]},
        and ${timeMap.en[state.time]}.<br><br>
        We recommend a mix of soft main lighting, focused spotlights and hidden LED accents
        to create a unique "light pulse" that matches your personality and mood.
        Watch the video to feel how your space can transform from ordinary to full of life.
      `;
    }
  }

  if (wizardGenerateBtn) {
    wizardGenerateBtn.addEventListener("click", () => {
      if (!wizardState.mood || !wizardState.space || !wizardState.time) {
        if (wizardError) wizardError.style.display = "block";
        return;
      }
      if (wizardError) wizardError.style.display = "none";

      const lang = currentLang;
      if (wizardResultText) {
        wizardResultText.innerHTML = buildDescription(lang, wizardState);
      }

      if (wizardResult) wizardResult.style.display = "block";

      if (wizardVideo) {
        wizardVideo.currentTime = 0;
        wizardVideo.play().catch(() => {});
      }

      wizardResult.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
});
