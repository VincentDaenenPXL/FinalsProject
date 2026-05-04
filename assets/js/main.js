"use strict";

(function () {
  const STORAGE_KEY = "portfolio-language";
  const DEFAULT_LANGUAGE = "en";

  const copy = {
    en: {
      "title.home": "Vincent Daenen | I-Talent Portfolio",
      "title.about": "About | Vincent Daenen",
      "title.activities": "Activities | Vincent Daenen",
      "title.game": "Progression Game | Vincent Daenen",
      "language.label": "Language",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.activities": "Activities",
      "nav.game": "Game",
      "footer.text": "Made by Vincent Daenen for I-Talent at PXL University of Applied Sciences.",

      "home.eyebrow": "I-Talent portfolio 2023-2026",
      "home.title": "From IT fundamentals to security-focused delivery",
      "home.lead": "A bilingual portfolio about three years of growth at PXL, built around cloud, DevOps, cybersecurity, teamwork, and reflection.",
      "home.tag.analysis": "Analytical",
      "home.cta.activities": "View activities",
      "home.cta.game": "Play progression game",
      "home.board.aria": "Three year progression",
      "home.board.kicker": "PXL growth path",
      "home.board.activities": "activities",
      "home.year1.label": "Year 1",
      "home.year1.title": "Foundation",
      "home.year1.short": "IT basics",
      "home.year1.body": "HTML, networking, problem solving, and the first security concepts formed the base for everything that followed.",
      "home.year2.label": "Year 2",
      "home.year2.title": "Collaboration",
      "home.year2.short": "Projects and feedback",
      "home.year2.body": "Research project work, POP sessions, seminars, and Cardiff made teamwork and communication much more concrete.",
      "home.year3.label": "Year 3",
      "home.year3.title": "Complexity",
      "home.year3.short": "Security and cloud",
      "home.year3.body": "Cloud, DevSecOps, penetration testing, incident response, and cybersecurity competitions pushed the work closer to the field.",

      "about.eyebrow": "Profile",
      "about.lead": "Applied Computer Science student with a clear interest in cybersecurity, cloud, and automation.",
      "about.tag.result": "Result oriented",
      "about.who.kicker": "Who am I?",
      "about.who.p1": "My name is Vincent Daenen. I study Applied Computer Science and I am especially interested in cloud computing, automation, and cybersecurity. What attracts me to IT is continuous learning and solving realistic, complex problems.",
      "about.who.p2": "My strongest current areas are DevOps and red teaming. DevOps fits my interest in CI/CD, infrastructure as code, and automating repeated work. Red teaming pushes me to think creatively and critically from an attacker's perspective.",
      "about.who.p3": "My Thalento profile points to an analytical and result-oriented working style. I prepare decisions carefully, try to limit risks, and stay motivated when the technical challenge has real depth.",
      "about.growth.kicker": "Growth points",
      "about.growth.p1": "Blue teaming and DevSecOps are areas where I currently have less experience, but they are clear learning goals. I want to strengthen detection, monitoring, secure-by-design work, and the defensive side of security.",
      "about.growth.p2": "The POP sessions helped me notice that I sometimes make a problem too complex too early. A strong, well understood foundation matters before advanced solutions can work reliably.",
      "about.growth.p3": "I also learned that I should communicate progress sooner in teams. I tend to wait until something is finished, but projects benefit from earlier updates and clearer agreements.",
      "about.ambition.kicker": "Ambition",
      "about.ambition.p1": "In the medium term I want practical experience in cybersecurity, cloud environments, and automation. After my internship, my concrete goal is a job in cybersecurity, preferably with a focus on pentesting or offensive security.",
      "about.ambition.p2": "In the long term I would like to start a company in cybersecurity. Not from quick enthusiasm, but from a solid technical base and enough field experience to build thoughtful solutions.",
      "about.role": "Applied Computer Science student at PXL",
      "about.photo.placeholder": "Photo placeholder",
      "about.photo.note": "Add your portrait here later",
      "about.stats.years": "years at PXL",
      "about.stats.activities": "activities",
      "about.focus": "Focus",
      "about.workpoints": "Work points",
      "about.workpoint.communication": "Proactive communication",

      "activities.eyebrow": "Portfolio evidence",
      "activities.title": "All I-Talent activities",
      "activities.lead": "Every activity from the portfolio document is shown here with its domain, type, year, date, location, and available proof.",

      "game.eyebrow": "Skill Quest",
      "game.title": "Three years of growth in one game",
      "game.lead": "Move through foundation, teamwork, and complex security delivery while collecting the skills that shaped the portfolio.",
      "game.legend.player": "You",
      "game.legend.team": "Teammate",
      "game.legend.skill": "Skill",
      "game.legend.teamorb": "Team deliverable",
      "game.legend.blocker": "Bug or conflict",
      "game.legend.incident": "Incident",
      "game.canvas.aria": "Skill Quest progression game",
      "game.controls.arrows": "Arrows",
      "game.controls.action": "Space, Enter, click",
      "game.restart": "Restart",
      "game.guide.year1": "Year 1: Foundation",
      "game.guide.year1.body": "Collect the basic knowledge orbs and avoid bugs. The first level is simple, but it sets the base.",
      "game.guide.year2": "Year 2: Teamwork",
      "game.guide.year2.body": "Some deliverables need both you and your teammate. Call them back with Space, Enter, or a canvas click when blockers split the team.",
      "game.guide.year3": "Year 3: Complexity",
      "game.guide.year3.body": "Skills unlock in sequence, then the advanced work needs your teammate. Incidents still create pressure, but the focus is progression."
    },
    nl: {
      "title.home": "Vincent Daenen | I-Talent Portfolio",
      "title.about": "Voorstelling | Vincent Daenen",
      "title.activities": "Activiteiten | Vincent Daenen",
      "title.game": "Progressiegame | Vincent Daenen",
      "language.label": "Taal",
      "nav.home": "Home",
      "nav.about": "Voorstellen",
      "nav.activities": "Activiteiten",
      "nav.game": "Game",
      "footer.text": "Gemaakt door Vincent Daenen voor I-Talent aan PXL Hogeschool.",

      "home.eyebrow": "I-Talent portfolio 2023-2026",
      "home.title": "Van IT-basis naar securitygerichte delivery",
      "home.lead": "Een tweetalig portfolio over drie jaar groei aan PXL, opgebouwd rond cloud, DevOps, cybersecurity, teamwork en reflectie.",
      "home.tag.analysis": "Analytisch",
      "home.cta.activities": "Bekijk activiteiten",
      "home.cta.game": "Speel de progressiegame",
      "home.board.aria": "Progressie over drie jaar",
      "home.board.kicker": "PXL groeipad",
      "home.board.activities": "activiteiten",
      "home.year1.label": "Jaar 1",
      "home.year1.title": "Fundering",
      "home.year1.short": "IT-basis",
      "home.year1.body": "HTML, netwerken, probleemoplossing en eerste securityconcepten vormden de basis voor alles wat volgde.",
      "home.year2.label": "Jaar 2",
      "home.year2.title": "Samenwerking",
      "home.year2.short": "Projecten en feedback",
      "home.year2.body": "Researchproject, POP-sessies, seminaries en Cardiff maakten teamwork en communicatie veel concreter.",
      "home.year3.label": "Jaar 3",
      "home.year3.title": "Complexiteit",
      "home.year3.short": "Security en cloud",
      "home.year3.body": "Cloud, DevSecOps, penetratietesten, incident response en cybersecuritycompetities brachten het werk dichter bij het werkveld.",

      "about.eyebrow": "Voorstelling",
      "about.lead": "Student Toegepaste Informatica met een duidelijke interesse in cybersecurity, cloud en automatisatie.",
      "about.tag.result": "Resultaatgericht",
      "about.who.kicker": "Wie ben ik?",
      "about.who.p1": "Mijn naam is Vincent Daenen. Ik studeer Toegepaste Informatica en heb vooral interesse in cloud computing, automatisatie en cybersecurity. Wat mij aantrekt in IT is voortdurend bijleren en het oplossen van realistische, complexe problemen.",
      "about.who.p2": "Mijn huidige sterktes liggen in DevOps en red teaming. DevOps sluit aan bij mijn interesse in CI/CD, infrastructuur als code en automatisatie. Red teaming dwingt mij om creatief en kritisch te denken vanuit het perspectief van een aanvaller.",
      "about.who.p3": "Mijn Thalento-profiel wijst op een analytische en resultaatgerichte werkstijl. Ik bereid beslissingen graag grondig voor, probeer risico's te beperken en blijf gemotiveerd wanneer een technische uitdaging inhoud heeft.",
      "about.growth.kicker": "Werkpunten",
      "about.growth.p1": "Blue teaming en DevSecOps zijn domeinen waarin ik momenteel minder ervaring heb, maar ze zijn duidelijke leerdoelen. Ik wil sterker worden in detectie, monitoring, secure-by-design werk en de verdedigende kant van security.",
      "about.growth.p2": "De POP-sessies hielpen mij zien dat ik problemen soms te vroeg te complex maak. Een sterke, goed begrepen fundering is nodig voordat geavanceerde oplossingen betrouwbaar kunnen werken.",
      "about.growth.p3": "Ik leerde ook dat ik in teams sneller vooruitgang moet communiceren. Ik wacht soms tot iets volledig klaar is, terwijl projecten voordeel halen uit vroegere updates en duidelijke afspraken.",
      "about.ambition.kicker": "Ambitie",
      "about.ambition.p1": "Op middellange termijn wil ik praktijkervaring opdoen in cybersecurity, cloudomgevingen en automatisatie. Na mijn stage is mijn concrete doel een job in cybersecurity, liefst met focus op pentesting of offensieve security.",
      "about.ambition.p2": "Op lange termijn wil ik zelf een bedrijf starten binnen cybersecurity. Niet vanuit snel enthousiasme, maar vanuit een stevige technische basis en voldoende praktijkervaring om doordachte oplossingen te bouwen.",
      "about.role": "Student Toegepaste Informatica aan PXL",
      "about.photo.placeholder": "Foto placeholder",
      "about.photo.note": "Voeg hier later je portret toe",
      "about.stats.years": "jaar aan PXL",
      "about.stats.activities": "activiteiten",
      "about.focus": "Focus",
      "about.workpoints": "Werkpunten",
      "about.workpoint.communication": "Proactieve communicatie",

      "activities.eyebrow": "Portfolio bewijs",
      "activities.title": "Alle I-Talent activiteiten",
      "activities.lead": "Elke activiteit uit het portfoliodocument staat hier met domein, type, jaar, datum, locatie en beschikbaar bewijs.",

      "game.eyebrow": "Skill Quest",
      "game.title": "Drie jaar groei in een game",
      "game.lead": "Beweeg door fundering, teamwork en complexe securitydelivery terwijl je de skills verzamelt die het portfolio hebben gevormd.",
      "game.legend.player": "Jij",
      "game.legend.team": "Teamgenoot",
      "game.legend.skill": "Skill",
      "game.legend.teamorb": "Teamdeliverable",
      "game.legend.blocker": "Bug of conflict",
      "game.legend.incident": "Incident",
      "game.canvas.aria": "Skill Quest progressiegame",
      "game.controls.arrows": "Pijlen",
      "game.controls.action": "Space, Enter, klik",
      "game.restart": "Herstart",
      "game.guide.year1": "Jaar 1: Fundering",
      "game.guide.year1.body": "Verzamel de basiskennis en vermijd bugs. Het eerste level is eenvoudig, maar zet de basis.",
      "game.guide.year2": "Jaar 2: Teamwork",
      "game.guide.year2.body": "Sommige deliverables vragen zowel jou als je teamgenoot. Roep je teamgenoot terug met Space, Enter of een klik op het canvas wanneer blockers het team splitsen.",
      "game.guide.year3": "Jaar 3: Complexiteit",
      "game.guide.year3.body": "Skills komen in volgorde vrij, daarna vraagt het geavanceerde werk je teamgenoot. Incidenten zorgen nog voor druk, maar progressie staat centraal."
    }
  };

  function normalizeLanguage(value) {
    return value === "nl" ? "nl" : "en";
  }

  let currentLanguage = normalizeLanguage(localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE);

  function t(key, lang = currentLanguage) {
    return copy[lang][key] || copy.en[key] || key;
  }

  function applyLanguage(lang, options = {}) {
    currentLanguage = normalizeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });

    const titleKey = document.body.dataset.titleKey;
    if (titleKey) {
      document.title = t(titleKey);
    }

    document.querySelectorAll("[data-lang-choice]").forEach((button) => {
      const isActive = button.dataset.langChoice === currentLanguage;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (!options.silent) {
      window.dispatchEvent(new CustomEvent("portfolio:languagechange", {
        detail: { lang: currentLanguage }
      }));
    }
  }

  function markActiveNavigation() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === current);
    });
  }

  document.querySelectorAll("[data-lang-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.langChoice);
    });
  });

  window.PortfolioI18n = {
    getLang: () => currentLanguage,
    setLang: applyLanguage,
    t
  };

  markActiveNavigation();
  applyLanguage(currentLanguage, { silent: true });
})();
