const canvas = document.getElementById("gameCanvas");
const statusEl = document.getElementById("gameStatus");
const restartBtn = document.getElementById("restartBtn");
const narrativeEl = document.getElementById("gameNarrative");

if (canvas && statusEl && restartBtn && narrativeEl) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const levels = [
    {
      label: "Jaar 1 - IT Basis",
      narrative: "Je begint van nul: basisconcepten, logisch denken en eerste technische fundamentals.",
      skills: ["Basis IT", "HTML/CSS", "Netwerk basis", "Probleemoplossing"],
      color: "#2ad8b7",
      blockers: 1,
      blockerSpeed: 1.2,
      time: 65,
      playerSpeed: 3,
    },
    {
      label: "Jaar 2 - Teamwork",
      narrative: "Je leert samenwerken in studentenprojecten: afstemmen, feedback en samen deliveren.",
      skills: ["Teamwork", "Planning", "Communicatie", "Projectflow", "Samen debuggen"],
      color: "#f8b948",
      blockers: 3,
      blockerSpeed: 1.9,
      time: 60,
      playerSpeed: 3.3,
    },
    {
      label: "Jaar 3 - Complexe Oplossingen",
      narrative: "Je bouwt echte complexe oplossingen onder tijdsdruk en met hogere kwaliteitseisen.",
      skills: ["Cloud", "Security", "DevOps", "Architectuur", "Incident response", "Complex delivery"],
      color: "#8fc8ff",
      blockers: 5,
      blockerSpeed: 2.6,
      time: 52,
      playerSpeed: 3.8,
    },
  ];

  let level = 0;
  let player = null;
  let orbs = [];
  let blockers = [];
  let keys = {};
  let lives = 3;
  let remainingTime = 0;
  let playing = true;
  let lastTick = performance.now();
  let lastDamageAt = 0;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function spawnLevel() {
    const cfg = levels[level];
    player = { x: 50, y: H / 2, r: 12, speed: cfg.playerSpeed };
    lives = 3;
    remainingTime = cfg.time;
    lastTick = performance.now();

    orbs = cfg.skills.map((skill) => ({
      name: skill,
      x: rand(150, W - 40),
      y: rand(40, H - 40),
      r: 14,
      taken: false,
    }));

    blockers = Array.from({ length: cfg.blockers }).map(() => ({
      x: rand(130, W - 40),
      y: rand(30, H - 30),
      r: rand(16, 24),
      vx: rand(-cfg.blockerSpeed, cfg.blockerSpeed) || cfg.blockerSpeed,
      vy: rand(-cfg.blockerSpeed, cfg.blockerSpeed) || -cfg.blockerSpeed,
    }));

    narrativeEl.textContent = cfg.narrative;
    updateStatus();
  }

  function updateStatus(extra = "") {
    const left = orbs.filter((o) => !o.taken).length;
    const cfg = levels[level];
    statusEl.textContent = `${cfg.label} | Skills: ${left} | Levens: ${lives} | Tijd: ${Math.ceil(remainingTime)}s ${extra}`.trim();
  }

  function drawBackground(cfg) {
    ctx.fillStyle = "#071325";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = cfg.color;
    ctx.globalAlpha = 0.08;
    ctx.beginPath();
    ctx.arc(W * 0.15, H * 0.2, 130, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.88, H * 0.84, 140, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    for (let y = 0; y <= H; y += 38) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
  }

  function drawPlayer(cfg) {
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = cfg.color;
    ctx.arc(player.x + 4, player.y - 2, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawOrbs(cfg) {
    orbs.forEach((orb) => {
      if (orb.taken) return;

      ctx.beginPath();
      ctx.fillStyle = "#163456";
      ctx.arc(orb.x, orb.y, orb.r + 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = cfg.color;
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#041120";
      ctx.font = "600 11px Space Grotesk";
      ctx.textAlign = "center";
      ctx.fillText(orb.name, orb.x, orb.y + 4);
      ctx.textAlign = "start";
    });
  }

  function drawBlockers() {
    blockers.forEach((b) => {
      ctx.beginPath();
      ctx.fillStyle = "#ff5d8f";
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.arc(b.x, b.y, b.r + 4, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  function movePlayer() {
    if (keys.ArrowUp || keys.w || keys.W) player.y -= player.speed;
    if (keys.ArrowDown || keys.s || keys.S) player.y += player.speed;
    if (keys.ArrowLeft || keys.a || keys.A) player.x -= player.speed;
    if (keys.ArrowRight || keys.d || keys.D) player.x += player.speed;

    player.x = Math.max(player.r, Math.min(W - player.r, player.x));
    player.y = Math.max(player.r, Math.min(H - player.r, player.y));
  }

  function moveBlockers() {
    blockers.forEach((b) => {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < b.r || b.x > W - b.r) b.vx *= -1;
      if (b.y < b.r || b.y > H - b.r) b.vy *= -1;
    });
  }

  function handleCollisions(now) {
    orbs.forEach((orb) => {
      if (orb.taken) return;
      const dist = Math.hypot(player.x - orb.x, player.y - orb.y);
      if (dist < player.r + orb.r) {
        orb.taken = true;
        updateStatus(`- unlocked: ${orb.name}`);
      }
    });

    if (now - lastDamageAt > 900) {
      for (const b of blockers) {
        const dist = Math.hypot(player.x - b.x, player.y - b.y);
        if (dist < player.r + b.r) {
          lives -= 1;
          player.x = 50;
          player.y = H / 2;
          lastDamageAt = now;
          updateStatus("- geraakt door obstakel");
          if (lives <= 0) {
            playing = false;
            statusEl.textContent = "Game over. Herstart en probeer opnieuw.";
          }
          break;
        }
      }
    }

    if (orbs.every((o) => o.taken)) {
      if (level < levels.length - 1) {
        level += 1;
        spawnLevel();
      } else {
        playing = false;
        statusEl.textContent = "Gefeliciteerd: van IT basis naar complexe oplossingen in 3 jaar.";
      }
    }
  }

  function draw() {
    const cfg = levels[level];
    drawBackground(cfg);
    drawOrbs(cfg);
    drawBlockers();
    drawPlayer(cfg);

    ctx.fillStyle = cfg.color;
    ctx.font = "700 20px Space Grotesk";
    ctx.fillText(cfg.label, 18, 30);
  }

  function loop(now) {
    if (playing) {
      const dt = (now - lastTick) / 1000;
      lastTick = now;
      remainingTime -= dt;

      if (remainingTime <= 0) {
        playing = false;
        statusEl.textContent = "Tijd is op. Herstart en probeer sneller te werken.";
      } else {
        movePlayer();
        moveBlockers();
        handleCollisions(now);
      }
    }

    draw();
    if (playing) {
      updateStatus();
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  restartBtn.addEventListener("click", () => {
    level = 0;
    playing = true;
    spawnLevel();
  });

  spawnLevel();
  requestAnimationFrame(loop);
}

