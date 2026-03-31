const activiteiten = [
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Gluo",
    detail: "(SNB: Cloud) Inzicht in multi-cloud architecturen en workload spreiding.",
    locatie: "Gluo, Corda Campus",
    datum: "04/03/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Toreon",
    detail: "(SNB: Cybersecurity) Introductie ethisch hacken en kwetsbaarheidsanalyse.",
    locatie: "Toreon, Corda Campus",
    datum: "11/03/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Infofarm",
    detail: "(SNB: DevOps) CI/CD-pipelines en hosting van webapplicaties in AWS.",
    locatie: "Infofarm, Corda Campus",
    datum: "18/03/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Politie",
    detail: "(SNB: Cybersecurity) Digitaal onderzoek, forensics en data-analyse.",
    locatie: "Politie, Corda Campus",
    datum: "01/04/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Brightest",
    detail: "(SNB: Cybersecurity) Penetratietesten en professionele rapportering.",
    locatie: "Brightest, Corda Campus",
    datum: "05/11/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Secwise",
    detail: "(SNB: Cybersecurity) Identity and Access Management.",
    locatie: "Secwise, Corda Campus",
    datum: "12/11/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Equans",
    detail: "(SNB: Cybersecurity) Ethical hacking in OT-omgevingen.",
    locatie: "Equans, Corda Campus",
    datum: "26/11/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Seminaries",
    titel: "Seminarie Gluo: Security in CI/CD",
    detail: "(SNB: Cybersecurity & DevOps) Security integreren in GitLab CI/CD.",
    locatie: "Gluo, Corda Campus",
    datum: "03/12/2025 - 3 uur",
  },
  {
    type: "Verplicht",
    domein: "Innovatie",
    titel: "Innovatieroute Security & Cloud",
    detail: "Sessies rond Secure SD-WAN en crisismanagement in IT-incidenten.",
    locatie: "Exclusive Networks, Fortinet en Resilix - Corda Campus",
    datum: "02/10/2025 + 09/10/2025",
  },
  {
    type: "Verplicht",
    domein: "Innovatie",
    titel: "Hackathon CSCBE",
    detail: "Nationale cybersecuritycompetitie met realistische challenges.",
    locatie: "On-site competitie",
    datum: "27/02/2026 - 28/02/2026",
  },
  {
    type: "Verplicht",
    domein: "Persoonlijke Ontwikkeling",
    titel: "POP-sessie 2TIN: POPping",
    detail: "Teamsessie rond feedback, teamrollen en samenwerken.",
    locatie: "PXL, Elfde Liniestraat",
    datum: "Datum in template",
  },
  {
    type: "Verplicht",
    domein: "Persoonlijke Ontwikkeling",
    titel: "POP-sessie 2TIN: Brein aan het werk! Niet storen!",
    detail: "Sessie rond focus, productiviteit en impact van afleiding.",
    locatie: "Locatie in template",
    datum: "Datum in template",
  },
  {
    type: "Verplicht",
    domein: "Persoonlijke Ontwikkeling",
    titel: "POP-sessie 3TIN: My Team and I",
    detail: "Groepssessie over teamdynamiek in het IT-project.",
    locatie: "Learning Path, Corda Campus",
    datum: "08/10/2025",
  },
  {
    type: "Verplicht",
    domein: "Internationalisering",
    titel: "BusIT Week Cardiff",
    detail: "POC in internationale studentengroep rond digitale zorgoplossing.",
    locatie: "Cardiff",
    datum: "06/04/2025 - 11/04/2025",
  },
  {
    type: "Extra",
    domein: "Seminaries",
    titel: "Seminarie Cegeka",
    detail: "(SNB: Cybersecurity)",
    locatie: "Cegeka, Corda Campus",
    datum: "22/04/2025 - 3 uur",
  },
  {
    type: "Extra",
    domein: "Seminaries",
    titel: "Seminarie Cegeka Datacenter",
    detail: "(SNB: Networking) Infrastructuur, redundantie en netwerkarchitectuur.",
    locatie: "Cegeka Datacenter, Hasselt",
    datum: "10/12/2025 - 3 uur",
  },
  {
    type: "Extra",
    domein: "Seminaries",
    titel: "Seminarie Politie: Digital Forensics",
    detail: "(SNB: Cybersecurity)",
    locatie: "Politie, Corda Campus",
    datum: "17/12/2025 - 3 uur",
  },
  {
    type: "Extra",
    domein: "Persoonlijke Ontwikkeling",
    titel: "Capture The Flag kennisavond",
    detail: "Kennisuitwisseling met studenten van PXL, UHasselt en KU Leuven.",
    locatie: "PXL Green & Tech, Diepenbeek",
    datum: "13/10/2025 - 2 uur",
  },
];

const grid = document.getElementById("activiteiten-grid");

if (grid) {
  activiteiten.forEach((item) => {
    const card = document.createElement("article");
    card.className = "activity-card";
    card.innerHTML = `
      <span class="tag">${item.type} - ${item.domein}</span>
      <h3>${item.titel}</h3>
      <p>${item.detail}</p>
      <p><strong>Locatie:</strong> ${item.locatie}</p>
      <p><strong>Datum:</strong> ${item.datum}</p>
    `;
    grid.appendChild(card);
  });
}
