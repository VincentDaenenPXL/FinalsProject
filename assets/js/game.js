"use strict";
(function () {
  // ── Canvas & DOM ─────────────────────────────────────────────────
  const canvas = document.getElementById("gameCanvas");
  const statusEl = document.getElementById("gameStatus");
  const restartBtn = document.getElementById("restartBtn");
  const narrativeEl = document.getElementById("gameNarrative");
  if (!canvas || !statusEl || !restartBtn || !narrativeEl) return;

  const ctx = canvas.getContext("2d");
  const W = canvas.width;   // 920
  const H = canvas.height;  // 470

  // ── Level definitions ────────────────────────────────────────────
  const LEVELS = [
    {
      id: 0,
      label: "Jaar 1 — IT Basis",
      eyebrow: "LEVEL 1 / 3",
      color: "#2ad8b7",
      bgColor: "#061520",
      intro: [
        "Je begint van nul.",
        "Verzamel kennis-orbs. Vermijd de bugs.",
        "",
        "Pijltjestoetsen of WASD om te bewegen.",
      ],
      time: 70,
      playerSpeed: 3.2,
      soloOrbs: [
        { name: "HTML/CSS",          fx: 0.20, fy: 0.22, requires: null },
        { name: "Netwerken",         fx: 0.52, fy: 0.15, requires: null },
        { name: "IT Fundamentals",   fx: 0.78, fy: 0.28, requires: null },
        { name: "Logisch denken",    fx: 0.32, fy: 0.70, requires: null },
        { name: "Probleemoplossing", fx: 0.78, fy: 0.72, requires: null },
      ],
      teamOrbs: [],
      blockerCount: 2,
      blockerSpeed: 1.4,
      incidentEnabled: false,
      incidentInterval: 0,
      incidentWindow: 0,
      levelCompleteLines: [
        "IT-fundamentals beheersen: check.",
        "Maar de volgende uitdaging vraagt meer dan jij alleen.",
        "Tijd om te leren samenwerken.",
      ],
    },
    {
      id: 1,
      label: "Jaar 2 — Teamwork",
      eyebrow: "LEVEL 2 / 3",
      color: "#f8b948",
      bgColor: "#0b0d07",
      intro: [
        "Alleen kom je ver. Samen kom je verder.",
        "",
        "Goudkleurige orbs zijn TEAM-deliverables.",
        "Beide jij én je teamgenoot moeten aanwezig zijn",
        "om ze samen te unlocken.",
        "",
        "SPATIE → roep je teamgenoot naar jou.",
        "Oranje blockers jagen specifiek op je teamgenoot.",
      ],
      time: 80,
      playerSpeed: 3.0,
      soloOrbs: [
        { name: "Communicatie",   fx: 0.14, fy: 0.28, requires: null },
        { name: "Planning",       fx: 0.54, fy: 0.16, requires: null },
        { name: "Feedback geven", fx: 0.84, fy: 0.28, requires: null },
      ],
      teamOrbs: [
        { name: "Projectweek 2TIN", fx: 0.22, fy: 0.68 },
        { name: "Cardiff PoC",      fx: 0.56, fy: 0.75 },
        { name: "POP-sessie",       fx: 0.82, fy: 0.65 },
      ],
      blockerCount: 3,
      blockerSpeed: 1.8,
      incidentEnabled: false,
      incidentInterval: 0,
      incidentWindow: 0,
      levelCompleteLines: [
        "Teamwork: unlocked.",
        "Jij en je team hebben samen alle deliverables afgewerkt.",
        "Nu: complexe systemen, tijdsdruk en crises.",
      ],
    },
    {
      id: 2,
      label: "Jaar 3 — Complexe Oplossingen",
      eyebrow: "LEVEL 3 / 3",
      color: "#8fc8ff",
      bgColor: "#07080e",
      intro: [
        "Jaar 3. Complexe systemen, tijdsdruk, crises.",
        "",
        "Sommige skills zijn vergrendeld tot je",
        "de vereiste kennis eerst hebt verzameld.",
        "",
        "ROOD ALERT → Security incident uitgebroken!",
        "Bereik het in tijd, anders verlies je een leven.",
      ],
      time: 65,
      playerSpeed: 3.8,
      soloOrbs: [
        { name: "Cloud",           fx: 0.14, fy: 0.22, requires: null },
        { name: "DevOps",          fx: 0.40, fy: 0.14, requires: null },
        { name: "Security",        fx: 0.68, fy: 0.20, requires: "Cloud" },
        { name: "DevSecOps",       fx: 0.82, fy: 0.50, requires: "DevOps" },
        { name: "Incident Resp.",  fx: 0.52, fy: 0.72, requires: "Security" },
        { name: "Architectuur",    fx: 0.18, fy: 0.74, requires: "DevSecOps" },
      ],
      teamOrbs: [],
      blockerCount: 5,
      blockerSpeed: 2.5,
      incidentEnabled: true,
      incidentInterval: 16,
      incidentWindow: 8,
      levelCompleteLines: [
        "Cloud, Security, DevSecOps, Incident Response.",
        "Alle complexe skills verzameld.",
        "Dit is wie je geworden bent na 3 jaar.",
      ],
    },
  ];

  // ── Runtime state ────────────────────────────────────────────────
  let gameState = "INTRO";
  let levelIdx   = 0;
  let lives, timeLeft, lastDmgAt, incidentTimer;
  let player, teammate, orbs, blockers, incident, particles;
  let shakeX = 0, shakeY = 0, shakeTTL = 0, shakeStr = 0;
  let lastTick = 0;

  // ── Input ────────────────────────────────────────────────────────
  const keys = {};
  let callTeammate = false;

  window.addEventListener("keydown", e => {
    keys[e.key] = true;
    if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); callTeammate = true; }
    if (gameState === "INTRO"         && (e.key === " " || e.key === "Enter")) startPlaying();
    if (gameState === "LEVEL_COMPLETE"&& (e.key === " " || e.key === "Enter")) doNextLevel();
    if ((gameState === "GAME_OVER" || gameState === "WIN") && (e.key === " " || e.key === "Enter")) fullRestart();
  });
  window.addEventListener("keyup", e => {
    keys[e.key] = false;
    if (e.key === " " || e.key === "Spacebar") callTeammate = false;
  });
  restartBtn.addEventListener("click", fullRestart);

  // Touch
  let touchActive = false, touchStartX = 0, touchStartY = 0, touchCurX = 0, touchCurY = 0;
  let touchAction = false;
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const sx = W / rect.width, sy = H / rect.height;
    const tx = (t.clientX - rect.left) * sx;
    const ty = (t.clientY - rect.top)  * sy;
    if (gameState === "INTRO")          { startPlaying(); return; }
    if (gameState === "LEVEL_COMPLETE") { doNextLevel();  return; }
    if (gameState === "GAME_OVER" || gameState === "WIN") { fullRestart(); return; }
    // Action button: bottom-right quadrant
    if (tx > W * 0.72 && ty > H * 0.62) {
      touchAction = true; callTeammate = true;
    } else {
      touchActive = true;
      touchStartX = tx; touchStartY = ty;
      touchCurX   = tx; touchCurY   = ty;
    }
  }, { passive: false });
  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    touchCurX = (t.clientX - rect.left) * (W / rect.width);
    touchCurY = (t.clientY - rect.top)  * (H / rect.height);
  }, { passive: false });
  canvas.addEventListener("touchend", e => {
    e.preventDefault();
    touchActive = false; touchAction = false; callTeammate = false;
  }, { passive: false });

  // ── Helpers ──────────────────────────────────────────────────────
  function rnd(a, b) { return Math.random() * (b - a) + a; }
  function dst(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  function shake(str, ms) {
    shakeStr = str; shakeTTL = ms;
  }

  function burst(x, y, color, n = 8) {
    for (let i = 0; i < n; i++) {
      const a = rnd(0, Math.PI * 2), spd = rnd(1.2, 4.5);
      particles.push({ x, y, vx: Math.cos(a)*spd, vy: Math.sin(a)*spd,
        alpha: 1, maxLife: rnd(350, 700), born: performance.now(), color, r: rnd(2, 5) });
    }
  }

  // ── Init ─────────────────────────────────────────────────────────
  function initLevel() {
    const cfg = LEVELS[levelIdx];
    lives         = 3;
    timeLeft      = cfg.time;
    lastDmgAt     = 0;
    callTeammate  = false;
    incident      = null;
    incidentTimer = cfg.incidentEnabled ? cfg.incidentInterval : Infinity;
    particles     = [];
    shakeX = shakeY = shakeTTL = 0;

    player = { x: 55, y: H / 2, r: 13, speed: cfg.playerSpeed };

    // Teammate only in Level 2
    teammate = null;
    if (cfg.teamOrbs.length > 0) {
      teammate = {
        x: 90, y: H / 2 + 35, r: 11,
        wpX: rnd(120, W - 120), wpY: rnd(50, H - 50),
        wpTimer: 2000,
        dazedTTL: 0,
      };
    }

    orbs = [
      ...cfg.soloOrbs.map(o => ({
        name: o.name, x: o.fx * W, y: o.fy * H,
        r: 16, isTeam: false, taken: false,
        requires: o.requires || null, teamProg: 0,
      })),
      ...cfg.teamOrbs.map(o => ({
        name: o.name, x: o.fx * W, y: o.fy * H,
        r: 21, isTeam: true, taken: false,
        requires: null, teamProg: 0,
      })),
    ];

    blockers = Array.from({ length: cfg.blockerCount }, (_, i) => {
      const a = rnd(0, Math.PI * 2), spd = cfg.blockerSpeed;
      // In level 2 some blockers home on teammate
      const chasesTeammate = cfg.teamOrbs.length > 0 && i < Math.floor(cfg.blockerCount * 0.45);
      return {
        x: rnd(180, W - 70), y: rnd(40, H - 40),
        vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
        r: rnd(14, 22),
        chasesTeammate,
      };
    });

    gameState = "INTRO";
    updateStatusBar();
  }

  function startPlaying() {
    lastTick = performance.now();
    gameState = "PLAYING";
  }

  function doNextLevel() {
    levelIdx++;
    if (levelIdx >= LEVELS.length) { gameState = "WIN"; }
    else { initLevel(); }
  }

  function fullRestart() {
    levelIdx = 0;
    initLevel();
  }

  function updateStatusBar() {
    const cfg = LEVELS[levelIdx];
    const left = orbs ? orbs.filter(o => !o.taken).length : 0;
    statusEl.textContent =
      `${cfg.label}  |  Skills: ${left}  |  Levens: ${lives}  |  Tijd: ${Math.ceil(timeLeft)}s`;
    narrativeEl.textContent = cfg.eyebrow;
  }

  // ── Update ───────────────────────────────────────────────────────
  function update(now, dt) {
    const cfg = LEVELS[levelIdx];

    timeLeft -= dt;
    if (timeLeft <= 0) { gameState = "GAME_OVER"; return; }

    // Shake
    if (shakeTTL > 0) {
      shakeTTL -= dt * 1000;
      shakeX = rnd(-shakeStr, shakeStr);
      shakeY = rnd(-shakeStr, shakeStr);
    } else { shakeX = shakeY = 0; }

    // Particles
    particles = particles.filter(p => {
      const age = now - p.born;
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.94; p.vy *= 0.94;
      p.alpha = 1 - age / p.maxLife;
      return age < p.maxLife;
    });

    updatePlayer();
    if (teammate) updateTeammate(dt);
    updateBlockers(cfg);
    if (cfg.incidentEnabled) updateIncidents(dt);
    checkCollisions(now, dt, cfg);
    updateStatusBar();
  }

  function updatePlayer() {
    let dx = 0, dy = 0;
    if (keys["ArrowUp"]    || keys["w"] || keys["W"]) dy -= 1;
    if (keys["ArrowDown"]  || keys["s"] || keys["S"]) dy += 1;
    if (keys["ArrowLeft"]  || keys["a"] || keys["A"]) dx -= 1;
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) dx += 1;

    if (touchActive) {
      const tdx = touchCurX - touchStartX, tdy = touchCurY - touchStartY;
      const td = Math.hypot(tdx, tdy);
      if (td > 12) { dx = tdx / td; dy = tdy / td; }
    }

    if (dx !== 0 && dy !== 0) { dx *= 0.7071; dy *= 0.7071; }
    player.x = Math.max(player.r, Math.min(W - player.r, player.x + dx * player.speed));
    player.y = Math.max(player.r, Math.min(H - player.r, player.y + dy * player.speed));
  }

  function updateTeammate(dt) {
    const tm = teammate;
    if (tm.dazedTTL > 0) { tm.dazedTTL -= dt * 1000; return; }

    const SPD = 2.0;

    if (callTeammate) {
      // Rush toward player
      const d = dst(tm, player);
      if (d > 28) {
        tm.x += ((player.x - tm.x) / d) * SPD * 2.4;
        tm.y += ((player.y - tm.y) / d) * SPD * 2.4;
      }
    } else {
      // Check if player is near a team orb → teammate moves to assist
      let assist = null;
      for (const orb of orbs) {
        if (orb.isTeam && !orb.taken && dst(player, orb) < orb.r + player.r + 30) {
          assist = orb; break;
        }
      }

      if (assist) {
        const d = dst(tm, assist);
        if (d > 22) {
          tm.x += ((assist.x - tm.x) / d) * SPD * 1.8;
          tm.y += ((assist.y - tm.y) / d) * SPD * 1.8;
        }
      } else {
        // Wander
        tm.wpTimer -= dt * 1000;
        if (tm.wpTimer <= 0) {
          tm.wpX = rnd(80, W - 80);
          tm.wpY = rnd(50, H - 50);
          tm.wpTimer = rnd(1800, 4000);
        }
        const d = dst(tm, { x: tm.wpX, y: tm.wpY });
        if (d > 20) {
          tm.x += ((tm.wpX - tm.x) / d) * SPD;
          tm.y += ((tm.wpY - tm.y) / d) * SPD;
        }
      }
    }

    tm.x = Math.max(tm.r, Math.min(W - tm.r, tm.x));
    tm.y = Math.max(tm.r, Math.min(H - tm.r, tm.y));
  }

  function updateBlockers(cfg) {
    for (const b of blockers) {
      // Conflict blockers home toward teammate
      if (b.chasesTeammate && teammate && teammate.dazedTTL <= 0) {
        const d = dst(b, teammate);
        if (d > 0) {
          b.vx += ((teammate.x - b.x) / d) * 0.07;
          b.vy += ((teammate.y - b.y) / d) * 0.07;
          const spd = Math.hypot(b.vx, b.vy);
          const max = cfg.blockerSpeed * 1.3;
          if (spd > max) { b.vx = b.vx / spd * max; b.vy = b.vy / spd * max; }
        }
      }
      b.x += b.vx; b.y += b.vy;
      if (b.x < b.r || b.x > W - b.r) b.vx *= -1;
      if (b.y < b.r || b.y > H - b.r) b.vy *= -1;
      b.x = Math.max(b.r, Math.min(W - b.r, b.x));
      b.y = Math.max(b.r, Math.min(H - b.r, b.y));
    }
  }

  function updateIncidents(dt) {
    incidentTimer -= dt;
    if (incidentTimer <= 0 && !incident) {
      const m = 70;
      incident = { x: rnd(m, W - m), y: rnd(m, H - m), ttl: LEVELS[levelIdx].incidentWindow, pulse: 0 };
      incidentTimer = LEVELS[levelIdx].incidentInterval + rnd(-3, 3);
    }
    if (incident) {
      incident.ttl -= dt;
      incident.pulse += dt * 7;
      if (incident.ttl <= 0) {
        incident = null;
        lives--;
        shake(10, 450);
        if (lives <= 0) gameState = "GAME_OVER";
      }
    }
  }

  function checkCollisions(now, dt, cfg) {
    // Player vs orbs
    for (const orb of orbs) {
      if (orb.taken) continue;
      if (orb.requires) {
        const dep = orbs.find(o => o.name === orb.requires);
        if (dep && !dep.taken) continue;
      }
      const playerNear = dst(player, orb) < player.r + orb.r;

      if (orb.isTeam) {
        const tmNear = teammate && !teammate.dazedTTL && dst(teammate, orb) < teammate.r + orb.r;
        if (playerNear && tmNear) {
          orb.teamProg += dt * 0.72; // fills in ~1.4 s when both present
          if (orb.teamProg >= 1) {
            orb.taken = true;
            burst(orb.x, orb.y, cfg.color, 12);
            burst(orb.x, orb.y, "#ffffff", 6);
          }
        } else {
          orb.teamProg = Math.max(0, orb.teamProg - dt * 0.4); // decays if not both present
        }
      } else if (playerNear) {
        orb.taken = true;
        burst(orb.x, orb.y, cfg.color, 8);
      }
    }

    // Player vs blockers (damage)
    if (now - lastDmgAt > 1100) {
      for (const b of blockers) {
        if (dst(player, b) < player.r + b.r) {
          lives--;
          player.x = 55; player.y = H / 2;
          lastDmgAt = now;
          shake(8, 350);
          burst(player.x, player.y, "#ff5d8f", 10);
          if (lives <= 0) { gameState = "GAME_OVER"; return; }
          break;
        }
      }
    }

    // Teammate vs blockers (daze)
    if (teammate && teammate.dazedTTL <= 0 && now - lastDmgAt > 600) {
      for (const b of blockers) {
        if (dst(teammate, b) < teammate.r + b.r) {
          teammate.dazedTTL = 2400;
          burst(teammate.x, teammate.y, "#ffaa44", 8);
          break;
        }
      }
    }

    // Player vs incident
    if (incident && dst(player, { x: incident.x, y: incident.y }) < 28) {
      burst(incident.x, incident.y, "#ff5d8f", 8);
      burst(incident.x, incident.y, "#8fc8ff", 6);
      incident = null;
      incidentTimer = LEVELS[levelIdx].incidentInterval;
    }

    // Level complete
    if (orbs.every(o => o.taken)) gameState = "LEVEL_COMPLETE";
  }

  // ── Draw ─────────────────────────────────────────────────────────
  function draw(now) {
    const cfg = LEVELS[levelIdx];

    ctx.save();
    if (shakeTTL > 0) ctx.translate(shakeX, shakeY);

    // Background
    ctx.fillStyle = cfg.bgColor;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;
    for (let y = 0; y <= H; y += 42) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    for (let x = 0; x <= W; x += 42) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }

    // Ambient glow
    const ag = ctx.createRadialGradient(W * 0.12, H * 0.18, 0, W * 0.12, H * 0.18, 240);
    ag.addColorStop(0, cfg.color + "18"); ag.addColorStop(1, "transparent");
    ctx.fillStyle = ag; ctx.fillRect(0, 0, W, H);
    const ag2 = ctx.createRadialGradient(W * 0.88, H * 0.85, 0, W * 0.88, H * 0.85, 200);
    ag2.addColorStop(0, cfg.color + "10"); ag2.addColorStop(1, "transparent");
    ctx.fillStyle = ag2; ctx.fillRect(0, 0, W, H);

    if (gameState === "INTRO")          { drawIntro(cfg, now);        ctx.restore(); return; }
    if (gameState === "GAME_OVER")      { drawGameOver(cfg, now);     ctx.restore(); return; }
    if (gameState === "LEVEL_COMPLETE") { drawLevelComplete(cfg, now);ctx.restore(); return; }
    if (gameState === "WIN")            { drawWin(now);                ctx.restore(); return; }

    // ── PLAYING ──
    drawParticles(now);
    drawOrbs(cfg, now);
    if (incident) drawIncident(now);
    drawBlockers(cfg, now);
    if (teammate) drawTeammateChar(cfg, now);
    drawPlayerChar(cfg, now);
    drawHUD(cfg, now);
    if (teammate) drawTouchBtn(cfg);

    ctx.restore();
  }

  // ── Screen: Intro ─────────────────────────────────────────────
  function drawIntro(cfg, now) {
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";

    ctx.fillStyle = cfg.color;
    ctx.font = "700 13px 'Space Grotesk', Arial";
    ctx.fillText(cfg.eyebrow, W/2, H/2 - 130);

    ctx.fillStyle = "#edf2ff";
    ctx.font = "700 26px 'Space Grotesk', Arial";
    ctx.fillText(cfg.label, W/2, H/2 - 100);

    ctx.fillStyle = "#a7b6dc";
    ctx.font = "400 14px 'Outfit', Arial";
    cfg.intro.forEach((line, i) => ctx.fillText(line, W/2, H/2 - 56 + i * 22));

    const p = 0.82 + 0.18 * Math.sin(now / 380);
    ctx.globalAlpha = p;
    ctx.fillStyle = cfg.color;
    ctx.font = "700 15px 'Space Grotesk', Arial";
    ctx.fillText("► SPATIE of ENTER om te starten", W/2, H/2 + 110);
    ctx.globalAlpha = 1;
    ctx.textAlign = "start";
  }

  // ── Screen: Level complete ────────────────────────────────────
  function drawLevelComplete(cfg, now) {
    ctx.fillStyle = "rgba(0,0,0,0.78)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";

    ctx.fillStyle = cfg.color;
    ctx.font = "700 22px 'Space Grotesk', Arial";
    ctx.fillText("LEVEL VOLTOOID!", W/2, H/2 - 75);

    ctx.fillStyle = "#edf2ff";
    ctx.font = "400 15px 'Outfit', Arial";
    cfg.levelCompleteLines.forEach((l, i) => ctx.fillText(l, W/2, H/2 - 28 + i * 26));

    const p = 0.8 + 0.2 * Math.sin(now / 380);
    ctx.globalAlpha = p;
    ctx.fillStyle = cfg.color;
    ctx.font = "700 14px 'Space Grotesk', Arial";
    const isLast = levelIdx === LEVELS.length - 1;
    ctx.fillText(isLast ? "► SPATIE / ENTER → Eindscherm" : "► SPATIE / ENTER → Volgend level", W/2, H/2 + 72);
    ctx.globalAlpha = 1;
    ctx.textAlign = "start";
  }

  // ── Screen: Game Over ─────────────────────────────────────────
  function drawGameOver(cfg, now) {
    ctx.fillStyle = "rgba(0,0,0,0.84)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";

    ctx.fillStyle = "#ff5d8f";
    ctx.font = "800 30px 'Space Grotesk', Arial";
    ctx.fillText("GAME OVER", W/2, H/2 - 48);

    ctx.fillStyle = "#a7b6dc";
    ctx.font = "400 14px 'Outfit', Arial";
    ctx.fillText("Vallen en opstaan is deel van het leerproces.", W/2, H/2);
    ctx.fillText("Probeer opnieuw.", W/2, H/2 + 22);

    const p = 0.8 + 0.2 * Math.sin(now / 380);
    ctx.globalAlpha = p;
    ctx.fillStyle = "#edf2ff";
    ctx.font = "700 14px 'Space Grotesk', Arial";
    ctx.fillText("► SPATIE / ENTER → Opnieuw", W/2, H/2 + 70);
    ctx.globalAlpha = 1;
    ctx.textAlign = "start";
  }

  // ── Screen: Win ───────────────────────────────────────────────
  function drawWin(now) {
    ctx.fillStyle = "rgba(4,8,18,0.92)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";

    const grad = ctx.createLinearGradient(W*0.2, 0, W*0.8, 0);
    grad.addColorStop(0, "#2ad8b7");
    grad.addColorStop(0.5, "#f8b948");
    grad.addColorStop(1, "#8fc8ff");
    ctx.fillStyle = grad;
    ctx.font = "800 28px 'Space Grotesk', Arial";
    ctx.fillText("GEFELICITEERD, VINCENT!", W/2, H/2 - 95);

    ctx.fillStyle = "#edf2ff";
    ctx.font = "400 14px 'Outfit', Arial";
    const lines = [
      "Van IT-fundamentals naar cloud, security en DevSecOps.",
      "Je hebt leren samenwerken, communiceren en presteren onder druk.",
      "Precies de groei die 3 jaar I-Talent in gang heeft gezet.",
      "",
      "Dit portfolio is geen eindpunt.",
      "Het is een vertrekpunt voor wat nog komt.",
    ];
    lines.forEach((l, i) => ctx.fillText(l, W/2, H/2 - 46 + i * 24));

    const p = 0.8 + 0.2 * Math.sin(now / 400);
    ctx.globalAlpha = p;
    ctx.fillStyle = "#2ad8b7";
    ctx.font = "700 14px 'Space Grotesk', Arial";
    ctx.fillText("► SPATIE / ENTER → Opnieuw spelen", W/2, H/2 + 108);
    ctx.globalAlpha = 1;
    ctx.textAlign = "start";
  }

  // ── Draw: Orbs ────────────────────────────────────────────────
  function drawOrbs(cfg, now) {
    for (const orb of orbs) {
      if (orb.taken) continue;

      const locked = orb.requires && !orbs.find(o => o.name === orb.requires && o.taken);
      const pulse  = 0.88 + 0.12 * Math.sin(now / 520 + orb.x * 0.01);
      const oc     = orb.isTeam ? "#f8b948" : locked ? "#444466" : cfg.color;

      // Glow halo
      const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * 2.8);
      g.addColorStop(0, oc + "44"); g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r * 2.8, 0, Math.PI*2); ctx.fill();

      // Body
      ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r * pulse, 0, Math.PI*2);
      ctx.fillStyle   = locked ? "#111126" : orb.isTeam ? "#231500" : "#081828";
      ctx.fill();
      ctx.strokeStyle = oc; ctx.lineWidth = locked ? 1.5 : 2.5; ctx.stroke();

      // Team-progress arc (fills as both players are near)
      if (orb.isTeam && orb.teamProg > 0) {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r + 6, -Math.PI/2, -Math.PI/2 + Math.PI*2 * orb.teamProg);
        ctx.strokeStyle = "#f8b948"; ctx.lineWidth = 4; ctx.stroke();
      }

      // Label
      ctx.fillStyle = locked ? "#666688" : oc;
      ctx.font = "600 10px 'Space Grotesk', Arial";
      ctx.textAlign = "center";
      ctx.fillText((locked ? "[L] " : "") + orb.name, orb.x, orb.y + 4);

      if (orb.isTeam) {
        ctx.fillStyle = "#f8b94866";
        ctx.font = "700 9px 'Space Grotesk', Arial";
        ctx.fillText("TEAM", orb.x, orb.y + orb.r + 14);
      }

      if (locked) {
        ctx.fillStyle = "#666688";
        ctx.font = "700 9px 'Space Grotesk', Arial";
        ctx.fillText("vereist: " + orb.requires, orb.x, orb.y + orb.r + 14);
      }

      ctx.textAlign = "start";
    }
  }

  // ── Draw: Blockers ────────────────────────────────────────────
  function drawBlockers(cfg, now) {
    for (const b of blockers) {
      const isConflict = b.chasesTeammate;
      const bc = isConflict ? "#ff8800" : "#ff5d8f";
      const pulse = 0.7 + 0.3 * Math.sin(now / 280 + b.x * 0.02);

      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2.2);
      g.addColorStop(0, bc + "55"); g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * 2.2, 0, Math.PI*2); ctx.fill();

      ctx.beginPath(); ctx.arc(b.x, b.y, b.r * pulse, 0, Math.PI*2);
      ctx.fillStyle   = isConflict ? "#1e1000" : "#1a0510";
      ctx.fill();
      ctx.strokeStyle = bc; ctx.lineWidth = 2; ctx.stroke();

      ctx.fillStyle = bc;
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("x", b.x, b.y + 4);
      ctx.textAlign = "start";
    }
  }

  // ── Draw: Teammate ────────────────────────────────────────────
  function drawTeammateChar(cfg, now) {
    const tm = teammate;
    const isDazed = tm.dazedTTL > 0;
    ctx.globalAlpha = isDazed ? 0.45 + 0.45 * Math.abs(Math.sin(now / 90)) : 1;

    // Glow
    const g = ctx.createRadialGradient(tm.x, tm.y, 0, tm.x, tm.y, 32);
    g.addColorStop(0, (isDazed ? "#888844" : "#f8b948") + "44"); g.addColorStop(1, "transparent");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(tm.x, tm.y, 32, 0, Math.PI*2); ctx.fill();

    // Body
    ctx.beginPath(); ctx.arc(tm.x, tm.y, tm.r, 0, Math.PI*2);
    ctx.fillStyle   = isDazed ? "#2a2a1a" : "#1a1200";
    ctx.fill();
    ctx.strokeStyle = isDazed ? "#888866" : "#f8b948";
    ctx.lineWidth = 2.2; ctx.stroke();

    // Dot
    ctx.beginPath(); ctx.arc(tm.x + 3, tm.y - 2, 3.5, 0, Math.PI*2);
    ctx.fillStyle = isDazed ? "#888866" : "#f8b948"; ctx.fill();

    ctx.fillStyle = isDazed ? "#888866" : "#f8b948";
    ctx.font = "600 9px 'Space Grotesk', Arial";
    ctx.textAlign = "center";
    ctx.fillText(isDazed ? "DAZED" : "TEAMGENOOT", tm.x, tm.y + tm.r + 14);
    ctx.textAlign = "start";
    ctx.globalAlpha = 1;
  }

  // ── Draw: Player ──────────────────────────────────────────────
  function drawPlayerChar(cfg, now) {
    const g = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, player.r * 2);
    g.addColorStop(0, cfg.color + "44"); g.addColorStop(1, "transparent");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(player.x, player.y, player.r * 2, 0, Math.PI*2); ctx.fill();

    ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI*2);
    ctx.fillStyle = "#ffffff"; ctx.fill();
    ctx.strokeStyle = cfg.color; ctx.lineWidth = 2.5; ctx.stroke();

    ctx.beginPath(); ctx.arc(player.x + 4, player.y - 2, 4, 0, Math.PI*2);
    ctx.fillStyle = cfg.color; ctx.fill();
  }

  // ── Draw: Incident ────────────────────────────────────────────
  function drawIncident(now) {
    const inc = incident;
    const urgency = inc.ttl / LEVELS[levelIdx].incidentWindow;
    const p = 0.55 + 0.45 * Math.abs(Math.sin(inc.pulse));

    if (urgency < 0.33) {
      ctx.fillStyle = `rgba(220,0,0,${0.05 * p})`;
      ctx.fillRect(0, 0, W, H);
    }

    const g = ctx.createRadialGradient(inc.x, inc.y, 0, inc.x, inc.y, 36 * p);
    g.addColorStop(0, "#ff444466"); g.addColorStop(1, "transparent");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(inc.x, inc.y, 36 * p, 0, Math.PI*2); ctx.fill();

    ctx.beginPath(); ctx.arc(inc.x, inc.y, 18, 0, Math.PI*2);
    ctx.fillStyle = "#1a0000"; ctx.fill();
    ctx.strokeStyle = urgency < 0.4 ? "#ff2222" : "#ff7744";
    ctx.lineWidth = 2.5; ctx.stroke();

    ctx.fillStyle = urgency < 0.4 ? "#ff2222" : "#ff7744";
    ctx.font = "bold 15px Arial";
    ctx.textAlign = "center";
    ctx.fillText("!", inc.x, inc.y + 5);

    ctx.font = "700 10px 'Space Grotesk', Arial";
    ctx.fillStyle = "#ff6644";
    ctx.fillText("INCIDENT", inc.x, inc.y - 26);
    ctx.fillText(`${Math.ceil(inc.ttl)}s`, inc.x, inc.y - 14);
    ctx.textAlign = "start";
  }

  // ── Draw: HUD ─────────────────────────────────────────────────
  function drawHUD(cfg, now) {
    // Level label top-left
    ctx.fillStyle = cfg.color;
    ctx.font = "700 15px 'Space Grotesk', Arial";
    ctx.fillText(cfg.label, 12, 24);

    // Hearts
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < lives ? "#ff5d8f" : "#2a2535";
      ctx.font = "15px Arial";
      ctx.fillText("♥", 12 + i * 22, H - 12);
    }

    // Time bar bottom-right
    const maxT  = LEVELS[levelIdx].time;
    const ratio = Math.max(0, timeLeft / maxT);
    const bw = 160, bx = W - bw - 12, by = H - 22;
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath(); ctx.roundRect(bx, by, bw, 10, 5); ctx.fill();
    ctx.fillStyle = ratio > 0.4 ? cfg.color : ratio > 0.2 ? "#f8b948" : "#ff5d8f";
    ctx.beginPath(); ctx.roundRect(bx, by, bw * ratio, 10, 5); ctx.fill();
    ctx.fillStyle = "#a7b6dc";
    ctx.font = "500 11px 'Outfit', Arial";
    ctx.textAlign = "right";
    ctx.fillText(`${Math.ceil(timeLeft)}s`, W - 12, by - 4);
    ctx.textAlign = "start";

    // Teammate hint center-bottom
    if (teammate && teammate.dazedTTL <= 0) {
      ctx.fillStyle = "rgba(248,185,72,0.65)";
      ctx.font = "500 11px 'Outfit', Arial";
      ctx.textAlign = "center";
      ctx.fillText("SPATIE → Roep teamgenoot", W/2, H - 8);
      ctx.textAlign = "start";
    }
    if (teammate && teammate.dazedTTL > 0) {
      ctx.fillStyle = "rgba(248,185,72,0.5)";
      ctx.font = "500 11px 'Outfit', Arial";
      ctx.textAlign = "center";
      ctx.fillText(`Teamgenoot dazed — ${(teammate.dazedTTL / 1000).toFixed(1)}s`, W/2, H - 8);
      ctx.textAlign = "start";
    }

    // Incident banner
    if (incident) {
      ctx.fillStyle = "rgba(255,60,40,0.92)";
      ctx.font = "700 13px 'Space Grotesk', Arial";
      ctx.textAlign = "center";
      ctx.fillText("SECURITY INCIDENT — Ga er snel naartoe!", W/2, 20);
      ctx.textAlign = "start";
    }
  }

  // ── Draw: Touch action button ─────────────────────────────────
  function drawTouchBtn(cfg) {
    const bx = W - 58, by = H - 60, br = 26;
    ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI*2);
    ctx.fillStyle   = "rgba(248,185,72,0.10)"; ctx.fill();
    ctx.strokeStyle = "rgba(248,185,72,0.35)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle   = "rgba(248,185,72,0.55)";
    ctx.font = "600 8px 'Space Grotesk', Arial";
    ctx.textAlign = "center";
    ctx.fillText("ROEP", bx, by - 3);
    ctx.fillText("TEAM", bx, by + 9);
    ctx.textAlign = "start";
  }

  // ── Draw: Particles ───────────────────────────────────────────
  function drawParticles() {
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color; ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // ── Loop ─────────────────────────────────────────────────────
  function loop(now) {
    if (gameState === "PLAYING") {
      const dt = Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;
      update(now, dt);
    }
    draw(now);
    requestAnimationFrame(loop);
  }

  initLevel();
  requestAnimationFrame(loop);
})();
