"use strict";

(function () {
  const activities = [
    {
      id: "gluo-cloud",
      year: 2,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "CL",
      nl: {
        title: "Seminarie Gluo",
        detail: "(SNB: Cloud) Inzicht in multi-cloud architecturen en hoe organisaties workloads spreiden over verschillende cloudplatformen.",
        location: "Gluo, Corda Campus",
        date: "04/03/2025 - 3 uur"
      },
      en: {
        title: "Gluo seminar",
        detail: "(SNB: Cloud) Insight into multi-cloud architectures and how organisations spread workloads across different cloud platforms.",
        location: "Gluo, Corda Campus",
        date: "04/03/2025 - 3 hours"
      }
    },
    {
      id: "toreon-ethical-hacking",
      year: 2,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "EH",
      nl: {
        title: "Seminarie Toreon",
        detail: "(SNB: Cybersecurity) Introductie tot ethisch hacken en hoe kwetsbaarheden systematisch worden opgespoord en gerapporteerd.",
        location: "Toreon, Corda Campus",
        date: "11/03/2025 - 3 uur"
      },
      en: {
        title: "Toreon seminar",
        detail: "(SNB: Cybersecurity) Introduction to ethical hacking and how vulnerabilities are found and reported systematically.",
        location: "Toreon, Corda Campus",
        date: "11/03/2025 - 3 hours"
      }
    },
    {
      id: "infofarm-cicd",
      year: 2,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "CI",
      nl: {
        title: "Seminarie Infofarm",
        detail: "(SNB: DevOps) Praktische toelichting over CI/CD-pipelines voor het hosten van webapplicaties in AWS.",
        location: "Infofarm, Corda Campus",
        date: "18/03/2025 - 3 uur"
      },
      en: {
        title: "Infofarm seminar",
        detail: "(SNB: DevOps) Practical explanation of CI/CD pipelines for hosting web applications in AWS.",
        location: "Infofarm, Corda Campus",
        date: "18/03/2025 - 3 hours"
      }
    },
    {
      id: "police-cybercrime",
      year: 2,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "DF",
      nl: {
        title: "Seminarie Politie",
        detail: "(SNB: Cybersecurity) Uitleg over digitaal onderzoek binnen cybercrime, met focus op forensics, crypto-assets en data-analyse.",
        location: "Politie, Corda Campus",
        date: "01/04/2025 - 3 uur"
      },
      en: {
        title: "Police seminar",
        detail: "(SNB: Cybersecurity) Digital investigation in cybercrime, with a focus on forensics, crypto assets, and data analysis.",
        location: "Police, Corda Campus",
        date: "01/04/2025 - 3 hours"
      }
    },
    {
      id: "brightest-pentesting",
      year: 3,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "PT",
      nl: {
        title: "Seminarie Brightest",
        detail: "(SNB: Cybersecurity) Toelichting over penetratietesten in professionele omgevingen en rapportering van bevindingen.",
        location: "Brightest, Corda Campus",
        date: "05/11/2025 - 3 uur"
      },
      en: {
        title: "Brightest seminar",
        detail: "(SNB: Cybersecurity) Penetration testing in professional environments and reporting findings clearly.",
        location: "Brightest, Corda Campus",
        date: "05/11/2025 - 3 hours"
      }
    },
    {
      id: "secwise-iam",
      year: 3,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "ID",
      nl: {
        title: "Seminarie Secwise",
        detail: "(SNB: Cybersecurity) Inzicht in identity and access management en het belang van identiteitsbeveiliging.",
        location: "Secwise, Corda Campus",
        date: "12/11/2025 - 3 uur"
      },
      en: {
        title: "Secwise seminar",
        detail: "(SNB: Cybersecurity) Insight into identity and access management and the importance of identity security.",
        location: "Secwise, Corda Campus",
        date: "12/11/2025 - 3 hours"
      }
    },
    {
      id: "equans-ot",
      year: 3,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "OT",
      nl: {
        title: "Seminarie Equans",
        detail: "(SNB: Cybersecurity) Ethical hacking in industriele systemen en de specifieke uitdagingen binnen OT-omgevingen.",
        location: "Equans, Corda Campus",
        date: "26/11/2025 - 3 uur"
      },
      en: {
        title: "Equans seminar",
        detail: "(SNB: Cybersecurity) Ethical hacking in industrial systems and the specific challenges of OT environments.",
        location: "Equans, Corda Campus",
        date: "26/11/2025 - 3 hours"
      }
    },
    {
      id: "gluo-devsecops",
      year: 3,
      type: "required",
      domain: "seminars",
      visual: "seminar",
      mark: "DS",
      nl: {
        title: "Seminarie Gluo: Security in CI/CD",
        detail: "(SNB: Cybersecurity en DevOps) Security integreren in CI/CD-processen met GitLab.",
        location: "Gluo, Corda Campus",
        date: "03/12/2025 - 3 uur"
      },
      en: {
        title: "Gluo seminar: Security in CI/CD",
        detail: "(SNB: Cybersecurity and DevOps) Integrating security into CI/CD processes with GitLab.",
        location: "Gluo, Corda Campus",
        date: "03/12/2025 - 3 hours"
      }
    },
    {
      id: "innovation-security-cloud",
      year: 3,
      type: "required",
      domain: "innovation",
      visual: "innovation",
      mark: "SC",
      nl: {
        title: "Innovatieroute Security & Cloud",
        detail: "Technische sessies rond Secure SD-WAN in Fortinet-omgevingen en crisismanagement binnen IT-incidenten.",
        location: "Exclusive Networks, Fortinet en Resilix, Corda Campus",
        date: "02/10/2025 en 09/10/2025 - 6 uur"
      },
      en: {
        title: "Innovation route Security & Cloud",
        detail: "Technical sessions about Secure SD-WAN in Fortinet environments and crisis management during IT incidents.",
        location: "Exclusive Networks, Fortinet, and Resilix, Corda Campus",
        date: "02/10/2025 and 09/10/2025 - 6 hours"
      }
    },
    {
      id: "hackathon-cscbe",
      year: 3,
      type: "required",
      domain: "innovation",
      visual: "innovation",
      mark: "HC",
      nl: {
        title: "Hackathon Cybersecurity Challenge Belgium",
        detail: "Deelname aan een nationale cybersecuritycompetitie met realistische hacking- en securityopdrachten.",
        location: "Cybersecurity Challenge Belgium",
        date: "27/02/2026 - 28/02/2026"
      },
      en: {
        title: "Cybersecurity Challenge Belgium hackathon",
        detail: "Participation in a national cybersecurity competition with realistic hacking and security challenges.",
        location: "Cybersecurity Challenge Belgium",
        date: "27/02/2026 - 28/02/2026"
      }
    },
    {
      id: "projectweek-2tin",
      year: 2,
      type: "required",
      domain: "development",
      visual: "development",
      mark: "RP",
      nl: {
        title: "Projectweek 2TIN",
        detail: "Teamperiode rond het opstarten van het Research Project, met projectplan, rolverdeling, reflectie en presentatie.",
        location: "PXL",
        date: "Vanaf 10/02/2025 - 2 weken"
      },
      en: {
        title: "2TIN project week",
        detail: "Team period for starting the Research Project, with planning, role division, reflection, and a presentation.",
        location: "PXL",
        date: "From 10/02/2025 - 2 weeks"
      }
    },
    {
      id: "pop-popping",
      year: 2,
      type: "required",
      domain: "development",
      visual: "development",
      mark: "PO",
      nl: {
        title: "POP-sessie 2TIN: POPping",
        detail: "Teamsessie rond feedback, teamrollen en het leren kennen van elkaars sterktes binnen het researchproject.",
        location: "PXL, Elfde Liniestraat",
        date: "Datum niet gespecificeerd in document"
      },
      en: {
        title: "2TIN POP session: POPping",
        detail: "Team session about feedback, team roles, and recognising each other's strengths during the research project.",
        location: "PXL, Elfde Liniestraat",
        date: "Date not specified in document"
      }
    },
    {
      id: "pop-focus",
      year: 2,
      type: "required",
      domain: "development",
      visual: "development",
      mark: "FO",
      nl: {
        title: "POP-sessie 2TIN: Brein aan het werk! Niet storen!",
        detail: "Sessie rond focus en productiviteit, met inzicht in de impact van afleiding en digitale media.",
        location: "PXL",
        date: "Datum niet gespecificeerd in document"
      },
      en: {
        title: "2TIN POP session: Brain at work! Do not disturb!",
        detail: "Session about focus and productivity, including the impact of distraction and digital media.",
        location: "PXL",
        date: "Date not specified in document"
      }
    },
    {
      id: "pop-team",
      year: 3,
      type: "required",
      domain: "development",
      visual: "development",
      mark: "TM",
      nl: {
        title: "POP-sessie 3TIN: My Team and I",
        detail: "Groepssessie rond teamdynamiek en effectieve samenwerking binnen het IT-project.",
        location: "Learning Path, Corda Campus",
        date: "08/10/2025"
      },
      en: {
        title: "3TIN POP session: My Team and I",
        detail: "Group session about team dynamics and effective collaboration during the IT project.",
        location: "Learning Path, Corda Campus",
        date: "08/10/2025"
      }
    },
    {
      id: "cardiff-busit",
      year: 2,
      type: "required",
      domain: "international",
      visual: "international",
      mark: "UK",
      nl: {
        title: "BusIT Week Cardiff",
        detail: "Uitwerking van een proof of concept in een internationale studentengroep rond een digitale oplossing voor de gezondheidssector.",
        location: "Cardiff Metropolitan University, Wales",
        date: "06/04/2025 - 11/04/2025"
      },
      en: {
        title: "BusIT Week Cardiff",
        detail: "Creation of a proof of concept in an international student group around a digital solution for the health sector.",
        location: "Cardiff Metropolitan University, Wales",
        date: "06/04/2025 - 11/04/2025"
      }
    },
    {
      id: "creative-portfolio",
      year: 3,
      type: "extra",
      domain: "portfolio",
      visual: "portfolio",
      mark: "VD",
      nl: {
        title: "Creatieve versie portfolio",
        detail: "Deze website zet het portfolio om naar een interactieve, tweetalige versie met activiteitenoverzicht en progressiegame.",
        location: "Online",
        date: "2026"
      },
      en: {
        title: "Creative portfolio version",
        detail: "This website turns the portfolio into an interactive bilingual version with an activity overview and progression game.",
        location: "Online",
        date: "2026"
      }
    },
    {
      id: "cegeka-cybersecurity",
      year: 2,
      type: "extra",
      domain: "seminars",
      visual: "seminar",
      mark: "CG",
      nl: {
        title: "Seminarie Cegeka",
        detail: "(SNB: Cybersecurity) Extra seminarie binnen het securitydomein.",
        location: "Cegeka, Corda Campus",
        date: "22/04/2025 - 3 uur"
      },
      en: {
        title: "Cegeka seminar",
        detail: "(SNB: Cybersecurity) Extra seminar in the security domain.",
        location: "Cegeka, Corda Campus",
        date: "22/04/2025 - 3 hours"
      }
    },
    {
      id: "cegeka-datacenter",
      year: 3,
      type: "extra",
      domain: "seminars",
      visual: "seminar",
      mark: "DC",
      nl: {
        title: "Seminarie Cegeka Datacenter",
        detail: "(SNB: Networking) Bezoek aan het Cegeka-datacenter met focus op infrastructuur, redundantie en netwerkarchitectuur.",
        location: "Cegeka Datacenter, Hasselt",
        date: "10/12/2025 - 3 uur"
      },
      en: {
        title: "Cegeka Datacenter seminar",
        detail: "(SNB: Networking) Visit to the Cegeka datacenter with a focus on infrastructure, redundancy, and network architecture.",
        location: "Cegeka Datacenter, Hasselt",
        date: "10/12/2025 - 3 hours"
      }
    },
    {
      id: "police-digital-forensics",
      year: 3,
      type: "extra",
      domain: "seminars",
      visual: "seminar",
      mark: "DF",
      nl: {
        title: "Seminarie Politie: Digital Forensics",
        detail: "(SNB: Cybersecurity) Praktijkinzichten in digitaal forensisch onderzoek.",
        location: "Politie, Corda Campus",
        date: "17/12/2025 - 3 uur"
      },
      en: {
        title: "Police seminar: Digital Forensics",
        detail: "(SNB: Cybersecurity) Practical insight into digital forensic investigation.",
        location: "Police, Corda Campus",
        date: "17/12/2025 - 3 hours"
      }
    },
    {
      id: "ctf-evening",
      year: 3,
      type: "extra",
      domain: "development",
      visual: "development",
      mark: "CTF",
      image: "assets/img/activities/portfolio-image2.png",
      nl: {
        title: "Capture The Flag kennisavond",
        detail: "Technische kennisuitwisseling rond CTF-uitdagingen tussen studenten van PXL, UHasselt en KU Leuven.",
        location: "PXL Green & Tech, Diepenbeek",
        date: "13/10/2025 - 2 uur",
        proof: "Uitnodiging als bewijsstuk",
        imageAlt: "Screenshot van de uitnodiging voor de Capture The Flag kennisavond"
      },
      en: {
        title: "Capture The Flag knowledge evening",
        detail: "Technical knowledge exchange around CTF challenges with students from PXL, UHasselt, and KU Leuven.",
        location: "PXL Green & Tech, Diepenbeek",
        date: "13/10/2025 - 2 hours",
        proof: "Invitation used as evidence",
        imageAlt: "Screenshot of the invitation for the Capture The Flag knowledge evening"
      }
    }
  ];

  const labels = {
    en: {
      all: "All",
      year2: "Year 2",
      year3: "Year 3",
      required: "Required",
      extra: "Extra",
      seminars: "Seminars",
      innovation: "Innovation",
      development: "Personal development",
      international: "Internationalisation",
      portfolio: "Portfolio",
      modeFilter: "View",
      allDomains: "All domains",
      showing: "showing",
      total: "total activities",
      requiredStat: "required",
      extraStat: "extra",
      domainsStat: "domains",
      year: "Year",
      type: "Type",
      domain: "Domain",
      location: "Location",
      date: "Date",
      proof: "Proof",
      noResults: "No activities for this filter."
    },
    nl: {
      all: "Alles",
      year2: "Jaar 2",
      year3: "Jaar 3",
      required: "Verplicht",
      extra: "Extra",
      seminars: "Seminaries",
      innovation: "Innovatie",
      development: "Persoonlijke ontwikkeling",
      international: "Internationalisering",
      portfolio: "Portfolio",
      modeFilter: "Weergave",
      allDomains: "Alle domeinen",
      showing: "zichtbaar",
      total: "activiteiten totaal",
      requiredStat: "verplicht",
      extraStat: "extra",
      domainsStat: "domeinen",
      year: "Jaar",
      type: "Type",
      domain: "Domein",
      location: "Locatie",
      date: "Datum",
      proof: "Bewijs",
      noResults: "Geen activiteiten voor deze filter."
    }
  };

  const modeFilters = [
    { key: "all", label: "all", test: () => true },
    { key: "required", label: "required", test: (item) => item.type === "required" },
    { key: "extra", label: "extra", test: (item) => item.type === "extra" },
    { key: "year-2", label: "year2", test: (item) => item.year === 2 },
    { key: "year-3", label: "year3", test: (item) => item.year === 3 }
  ];

  const domainOptions = [
    { key: "all", label: "allDomains" },
    { key: "seminars", label: "seminars" },
    { key: "innovation", label: "innovation" },
    { key: "development", label: "development" },
    { key: "international", label: "international" },
    { key: "portfolio", label: "portfolio" }
  ];

  const filtersRoot = document.getElementById("activity-filters");
  const grid = document.getElementById("activiteiten-grid");
  const statsRoot = document.getElementById("activity-stats");

  if (!filtersRoot || !grid || !statsRoot) {
    return;
  }

  let activeMode = "all";
  let activeDomain = "all";

  function lang() {
    return window.PortfolioI18n ? window.PortfolioI18n.getLang() : "en";
  }

  function localLabels() {
    return labels[lang()] || labels.en;
  }

  function escapeHTML(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function activityText(item) {
    return item[lang()] || item.en;
  }

  function typeLabel(type) {
    return localLabels()[type] || type;
  }

  function domainLabel(domain) {
    return localLabels()[domain] || domain;
  }

  function visualTemplate(item) {
    const text = activityText(item);
    if (item.image) {
      return `<img class="activity-photo" src="${escapeHTML(item.image)}" alt="${escapeHTML(text.imageAlt || text.title)}" loading="lazy">`;
    }

    return `
      <div class="activity-visual visual-${escapeHTML(item.visual)}" aria-hidden="true">
        <span class="visual-mark">${escapeHTML(item.mark)}</span>
        <span class="visual-caption">${escapeHTML(domainLabel(item.domain))}</span>
      </div>
    `;
  }

  function cardTemplate(item) {
    const l = localLabels();
    const text = activityText(item);
    const proof = text.proof
      ? `<p><strong>${escapeHTML(l.proof)}</strong> ${escapeHTML(text.proof)}</p>`
      : "";

    return `
      <article class="activity-card">
        ${visualTemplate(item)}
        <div class="activity-body">
          <div class="tag-row">
            <span class="tag tag-year-${item.year}">${escapeHTML(l.year)} ${item.year}</span>
            <span class="tag tag-${item.type}">${escapeHTML(typeLabel(item.type))}</span>
            <span class="tag">${escapeHTML(domainLabel(item.domain))}</span>
          </div>
          <h3>${escapeHTML(text.title)}</h3>
          <p class="activity-detail">${escapeHTML(text.detail)}</p>
          <div class="activity-meta">
            <p><strong>${escapeHTML(l.location)}</strong> ${escapeHTML(text.location)}</p>
            <p><strong>${escapeHTML(l.date)}</strong> ${escapeHTML(text.date)}</p>
            ${proof}
          </div>
        </div>
      </article>
    `;
  }

  function currentMode() {
    return modeFilters.find((filter) => filter.key === activeMode) || modeFilters[0];
  }

  function passesFilters(item) {
    const domainPass = activeDomain === "all" || item.domain === activeDomain;
    return currentMode().test(item) && domainPass;
  }

  function renderStats() {
    const l = localLabels();
    const required = activities.filter((item) => item.type === "required").length;
    const extra = activities.filter((item) => item.type === "extra").length;
    const domains = new Set(activities.map((item) => item.domain)).size;

    statsRoot.innerHTML = `
      <article class="stat-card"><strong>${activities.length}</strong><span>${escapeHTML(l.total)}</span></article>
      <article class="stat-card"><strong>${required}</strong><span>${escapeHTML(l.requiredStat)}</span></article>
      <article class="stat-card"><strong>${extra}</strong><span>${escapeHTML(l.extraStat)}</span></article>
      <article class="stat-card"><strong>${domains}</strong><span>${escapeHTML(l.domainsStat)}</span></article>
    `;
  }

  function renderFilters() {
    const l = localLabels();
    const filteredCount = activities.filter(passesFilters).length;
    const modes = modeFilters
      .map((filter) => {
        const active = filter.key === activeMode;
        return `<button class="filter-chip ${active ? "active" : ""}" type="button" data-mode="${filter.key}" aria-pressed="${active}">${escapeHTML(l[filter.label])}</button>`;
      })
      .join("");

    const domains = domainOptions
      .map((option) => `<option value="${option.key}" ${option.key === activeDomain ? "selected" : ""}>${escapeHTML(l[option.label])}</option>`)
      .join("");

    filtersRoot.innerHTML = `
      <div class="filter-toolbar">
        <div class="filter-block">
          <span class="filter-label">${escapeHTML(l.modeFilter)}</span>
          <div class="filter-segment" role="group" aria-label="${escapeHTML(l.modeFilter)}">
            ${modes}
          </div>
        </div>
        <label class="domain-select">
          <span>${escapeHTML(l.domain)}</span>
          <select data-domain-filter>
            ${domains}
          </select>
        </label>
      </div>
      <p class="filter-summary">${filteredCount} / ${activities.length} ${escapeHTML(l.showing)}</p>
    `;

    filtersRoot.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        activeMode = button.dataset.mode;
        render();
      });
    });

    const domainFilter = filtersRoot.querySelector("[data-domain-filter]");
    domainFilter.addEventListener("change", () => {
      activeDomain = domainFilter.value;
      render();
    });
  }

  function renderCards() {
    const filtered = activities.filter(passesFilters);
    grid.innerHTML = filtered.length
      ? filtered.map(cardTemplate).join("")
      : `<article class="activity-card"><div class="activity-body"><p>${escapeHTML(localLabels().noResults)}</p></div></article>`;
  }

  function render() {
    renderStats();
    renderFilters();
    renderCards();
  }

  window.addEventListener("portfolio:languagechange", render);
  render();
})();
