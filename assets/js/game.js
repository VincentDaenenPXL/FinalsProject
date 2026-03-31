const canvas = document.getElementById("gameCanvas");
const statusEl = document.getElementById("gameStatus");
const restartBtn = document.getElementById("restartBtn");

if (canvas && statusEl && restartBtn) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const years = [
    { label: "Jaar 1: Basis", skills: ["HTML", "CSS", "Teamwork", "Probleemoplossing"], color: "#19d3a5" },
    { label: "Jaar 2: Verdieping", skills: ["Cloud", "DevOps", "GitLab CI/CD", "Forensics"], color: "#ffb703" },
    { label: "Jaar 3: Toepassing", skills: ["Red Teaming", "Security Design", "Presenteren", "Leiderschap"], color: "#8ec5ff" },
  ];

  let level = 0;
  let player;
  let orbs;
  let pressed = {};

  function resetLevel() {
    player = { x: 60, y: H / 2, r: 12, speed: 3.2 };
    orbs = years[level].skills.map((name, i) => ({
      name,
      x: 220 + (i % 2) * 250 + Math.random() * 120,
      y: 90 + Math.floor(i / 2) * 170 + Math.random() * 70,
      r: 16,
      taken: false,
    }));
    updateStatus();
  }

  function updateStatus(extra = "") {
    const left = orbs.filter((o) => !o.taken).length;
    statusEl.textContent = `${years[level].label} - nog ${left} skills te verzamelen ${extra}`.trim();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#0b1a2e";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    ctx.fillStyle = years[level].color;
    ctx.font = "700 20px Space Grotesk";
    ctx.fillText(years[level].label, 20, 34);

    orbs.forEach((orb) => {
      if (orb.taken) return;
      ctx.beginPath();
      ctx.fillStyle = "#1f2f4d";
      ctx.arc(orb.x, orb.y, orb.r + 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = years[level].color;
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#081426";
      ctx.font = "600 12px Space Grotesk";
      ctx.textAlign = "center";
      ctx.fillText(orb.name, orb.x, orb.y + 4);
      ctx.textAlign = "start";
    });

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#19d3a5";
    ctx.arc(player.x + 4, player.y - 2, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  function clamp() {
    player.x = Math.max(player.r, Math.min(W - player.r, player.x));
    player.y = Math.max(player.r, Math.min(H - player.r, player.y));
  }

  function movePlayer() {
    if (pressed["ArrowUp"] || pressed["w"] || pressed["W"]) player.y -= player.speed;
    if (pressed["ArrowDown"] || pressed["s"] || pressed["S"]) player.y += player.speed;
    if (pressed["ArrowLeft"] || pressed["a"] || pressed["A"]) player.x -= player.speed;
    if (pressed["ArrowRight"] || pressed["d"] || pressed["D"]) player.x += player.speed;
    clamp();
  }

  function checkCollisions() {
    orbs.forEach((orb) => {
      if (orb.taken) return;
      const dx = player.x - orb.x;
      const dy = player.y - orb.y;
      const dist = Math.hypot(dx, dy);
      if (dist < player.r + orb.r) {
        orb.taken = true;
        updateStatus(`- skill unlocked: ${orb.name}`);
      }
    });

    if (orbs.every((o) => o.taken)) {
      if (level < years.length - 1) {
        level += 1;
        resetLevel();
      } else {
        statusEl.textContent = "Missie compleet: 3 jaar groei in cloud, security, DevOps en teamwork.";
      }
    }
  }

  function loop() {
    movePlayer();
    checkCollisions();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("keydown", (e) => {
    pressed[e.key] = true;
  });

  window.addEventListener("keyup", (e) => {
    pressed[e.key] = false;
  });

  restartBtn.addEventListener("click", () => {
    level = 0;
    resetLevel();
  });

  resetLevel();
  loop();
}
