const activiteiten = [
  {
    jaar: 1,
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Gluo",
    detail: "(SNB: Cloud) Inzicht in multi-cloud architecturen en workload spreiding.",
    locatie: "Gluo, Corda Campus",
    datum: "04/03/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 1,
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Toreon",
    detail: "(SNB: Cybersecurity) Introductie ethisch hacken en kwetsbaarheidsanalyse.",
    locatie: "Toreon, Corda Campus",
    datum: "11/03/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 1,
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Infofarm",
    detail: "(SNB: DevOps) CI/CD-pipelines en hosting van webapplicaties in AWS.",
    locatie: "Infofarm, Corda Campus",
    datum: "18/03/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 1,
    type: "Verplicht",
    domein: "Internationalisering",
    titel: "BusIT Week Cardiff",
    detail: "POC in internationale studentengroep rond digitale zorgoplossing.",
    locatie: "Cardiff",
    datum: "06/04/2025 - 11/04/2025",
    foto: "",
  },
  {
    jaar: 2,
    type: "Verplicht",
    domein: "Persoonlijke Ontwikkeling",
    titel: "POP-sessie 2TIN: POPping",
    detail: "Teamsessie rond feedback, teamrollen en samenwerken.",
    locatie: "PXL, Elfde Liniestraat",
    datum: "Datum in template",
    foto: "",
  },
  {
    jaar: 2,
    type: "Verplicht",
    domein: "Persoonlijke Ontwikkeling",
    titel: "POP-sessie 2TIN: Brein aan het werk! Niet storen!",
    detail: "Sessie rond focus en productiviteit tijdens projectwerk.",
    locatie: "Locatie in template",
    datum: "Datum in template",
    foto: "",
  },
  {
    jaar: 2,
    type: "Verplicht",
    domein: "Persoonlijke Ontwikkeling",
    titel: "POP-sessie 3TIN: My Team and I",
    detail: "Groepssessie over teamdynamiek en samenwerking in IT-project.",
    locatie: "Learning Path, Corda Campus",
    datum: "08/10/2025",
    foto: "",
  },
  {
    jaar: 2,
    type: "Extra",
    domein: "Persoonlijke Ontwikkeling",
    titel: "Capture The Flag kennisavond",
    detail: "Kennisuitwisseling rond CTF-uitdagingen met studenten van PXL, UHasselt en KU Leuven.",
    locatie: "PXL Green & Tech, Diepenbeek",
    datum: "13/10/2025 - 2 uur",
    foto: "",
  },
  {
    jaar: 3,
    type: "Verplicht",
    domein: "Innovatie",
    titel: "Innovatieroute Security & Cloud",
    detail: "Sessies rond Secure SD-WAN en crisismanagement in IT-incidenten.",
    locatie: "Exclusive Networks, Fortinet en Resilix - Corda Campus",
    datum: "02/10/2025 + 09/10/2025",
    foto: "",
  },
  {
    jaar: 3,
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Brightest",
    detail: "(SNB: Cybersecurity) Penetratietesten en professionele rapportering.",
    locatie: "Brightest, Corda Campus",
    datum: "05/11/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 3,
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Secwise",
    detail: "(SNB: Cybersecurity) Identity and Access Management.",
    locatie: "Secwise, Corda Campus",
    datum: "12/11/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 3,
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Equans",
    detail: "(SNB: Cybersecurity) Ethical hacking in OT-omgevingen.",
    locatie: "Equans, Corda Campus",
    datum: "26/11/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 3,
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Gluo: Security in CI/CD",
    detail: "(SNB: Cybersecurity & DevOps) Security integreren in GitLab CI/CD.",
    locatie: "Gluo, Corda Campus",
    datum: "03/12/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 3,
    type: "Extra",
    domein: "Seminaries",
    titel: "Seminarie Cegeka Datacenter",
    detail: "(SNB: Networking) Focus op infrastructuur, redundantie en netwerkarchitectuur.",
    locatie: "Cegeka Datacenter, Hasselt",
    datum: "10/12/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 3,
    type: "Extra",
    domein: "Seminaries",
    titel: "Seminarie Politie: Digital Forensics",
    detail: "(SNB: Cybersecurity) Praktijkinzichten in digital forensics.",
    locatie: "Politie, Corda Campus",
    datum: "17/12/2025 - 3 uur",
    foto: "",
  },
  {
    jaar: 3,
    type: "Verplicht",
    domein: "Innovatie",
    titel: "Hackathon CSCBE",
    detail: "Nationale cybersecuritycompetitie met realistische challenges.",
    locatie: "On-site competitie",
    datum: "27/02/2026 - 28/02/2026",
    foto: "",
  },
];

const filtersRoot = document.getElementById("activity-filters");
const grid = document.getElementById("activiteiten-grid");

if (filtersRoot && grid) {
  const filterDefs = [
    { key: "all", label: "Alles" },
    { key: "jaar-1", label: "Jaar 1 - IT Basis" },
    { key: "jaar-2", label: "Jaar 2 - Teamwork" },
    { key: "jaar-3", label: "Jaar 3 - Complex" },
    { key: "Verplicht", label: "Verplicht" },
    { key: "Extra", label: "Extra" },
  ];

  let activeFilter = "all";

  function cardTemplate(item) {
    const photoBlock = item.foto
      ? `<img class="activity-photo" src="${item.foto}" alt="Foto bij ${item.titel}">`
      : `<div class="activity-no-photo">Nog geen foto toegevoegd</div>`;

    return `
      <article class="activity-card">
        ${photoBlock}
        <div class="activity-body">
          <span class="tag">Jaar ${item.jaar}</span>
          <span class="tag">${item.type}</span>
          <span class="tag">${item.domein}</span>
          <h3>${item.titel}</h3>
          <p>${item.detail}</p>
          <div class="activity-meta">
            <p><strong>Locatie:</strong> ${item.locatie}</p>
            <p><strong>Datum:</strong> ${item.datum}</p>
          </div>
        </div>
      </article>
    `;
  }

  function passes(item) {
    if (activeFilter === "all") return true;
    if (activeFilter === "jaar-1") return item.jaar === 1;
    if (activeFilter === "jaar-2") return item.jaar === 2;
    if (activeFilter === "jaar-3") return item.jaar === 3;
    return item.type === activeFilter;
  }

  function renderCards() {
    const html = activiteiten.filter(passes).map(cardTemplate).join("");
    grid.innerHTML = html || `<article class="card"><p>Geen activiteiten voor deze filter.</p></article>`;
  }

  function renderFilters() {
    filtersRoot.innerHTML = filterDefs
      .map(
        (f) =>
          `<button class="filter-chip ${f.key === activeFilter ? "active" : ""}" data-key="${f.key}" type="button">${f.label}</button>`
      )
      .join("");

    filtersRoot.querySelectorAll(".filter-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.key;
        renderFilters();
        renderCards();
      });
    });
  }

  renderFilters();
  renderCards();
}
