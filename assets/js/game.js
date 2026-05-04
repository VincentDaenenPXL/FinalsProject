"use strict";

(function () {
  const canvas = document.getElementById("gameCanvas");
  const statusEl = document.getElementById("gameStatus");
  const restartBtn = document.getElementById("restartBtn");
  const narrativeEl = document.getElementById("gameNarrative");

  if (!canvas || !statusEl || !restartBtn || !narrativeEl) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const ui = {
    en: {
      skills: "Skills",
      lives: "Lives",
      time: "Time",
      level: "Level",
      start: "Space, Enter, or click to start",
      next: "Space, Enter, or click for next level",
      finish: "Space, Enter, or click for final screen",
      retry: "Space, Enter, or click to retry this level",
      replay: "Space, Enter, or click to play again",
      gameOver: "Game over",
      gameOverLine1: "Falling down is part of learning.",
      gameOverLine2: "Your completed years stay unlocked.",
      winTitle: "Congratulations, Vincent",
      winLines: [
        "From IT fundamentals to cloud, security, and DevSecOps.",
        "You learned to collaborate, communicate, and work under pressure.",
        "This portfolio is not the end point.",
        "It is the starting point for what comes next."
      ],
      teamCall: "Space, Enter, or click: call teammate",
      teammateDazed: "Teammate paused",
      incident: "Security incident. Reach it fast.",
      requires: "needs",
      team: "TEAM",
      locked: "locked",
      completed: "Completed"
    },
    nl: {
      skills: "Skills",
      lives: "Levens",
      time: "Tijd",
      level: "Level",
      start: "Space, Enter of klik om te starten",
      next: "Space, Enter of klik voor het volgende level",
      finish: "Space, Enter of klik voor het eindscherm",
      retry: "Space, Enter of klik om dit level opnieuw te proberen",
      replay: "Space, Enter of klik om opnieuw te spelen",
      gameOver: "Game over",
      gameOverLine1: "Vallen en opstaan hoort bij leren.",
      gameOverLine2: "Je voltooide jaren blijven vrijgespeeld.",
      winTitle: "Proficiat, Vincent",
      winLines: [
        "Van IT-basis naar cloud, security en DevSecOps.",
        "Je leerde samenwerken, communiceren en presteren onder druk.",
        "Dit portfolio is geen eindpunt.",
        "Het is een vertrekpunt voor wat nog komt."
      ],
      teamCall: "Space, Enter of klik: roep teamgenoot",
      teammateDazed: "Teamgenoot pauzeert",
      incident: "Security incident. Bereik het snel.",
      requires: "vereist",
      team: "TEAM",
      locked: "op slot",
      completed: "Voltooid"
    }
  };

  const LEVELS = [
    {
      color: "#3dd6ad",
      bg: "#111817",
      time: 72,
      speed: 3.25,
      blockerCount: 2,
      blockerSpeed: 1.35,
      incidents: false,
      label: {
        en: "Year 1: Foundation",
        nl: "Jaar 1: Fundering"
      },
      eyebrow: {
        en: "Level 1 / 3",
        nl: "Level 1 / 3"
      },
      intro: {
        en: [
          "You start with the basics.",
          "Collect knowledge orbs and avoid bugs.",
          "Move with arrows, WASD, or ZQSD."
        ],
        nl: [
          "Je begint met de basis.",
          "Verzamel kennis en vermijd bugs.",
          "Beweeg met pijlen, WASD of ZQSD."
        ]
      },
      complete: {
        en: [
          "IT fundamentals are in place.",
          "The next challenge needs more than solo work.",
          "Time to learn collaboration."
        ],
        nl: [
          "De IT-basis staat er.",
          "De volgende uitdaging vraagt meer dan solowerk.",
          "Tijd om samenwerking te leren."
        ]
      },
      orbs: [
        { key: "html", name: { en: "HTML/CSS", nl: "HTML/CSS" }, x: 0.2, y: 0.22 },
        { key: "networking", name: { en: "Networking", nl: "Netwerken" }, x: 0.52, y: 0.16 },
        { key: "fundamentals", name: { en: "IT basics", nl: "IT-basis" }, x: 0.78, y: 0.28 },
        { key: "logic", name: { en: "Logic", nl: "Logica" }, x: 0.32, y: 0.7 },
        { key: "problem", name: { en: "Problem solving", nl: "Probleemoplossing" }, x: 0.78, y: 0.72 }
      ]
    },
    {
      color: "#f1b84b",
      bg: "#19160f",
      time: 105,
      speed: 3,
      blockerCount: 2,
      blockerSpeed: 1.45,
      incidents: false,
      teammate: true,
      label: {
        en: "Year 2: Teamwork",
        nl: "Jaar 2: Teamwork"
      },
      eyebrow: {
        en: "Level 2 / 3",
        nl: "Level 2 / 3"
      },
      intro: {
        en: [
          "Some goals need a team.",
          "Gold deliverables unlock only when both players are present.",
          "Press Space, Enter, or click to call your teammate."
        ],
        nl: [
          "Sommige doelen vragen een team.",
          "Gouden deliverables komen vrij wanneer beide spelers aanwezig zijn.",
          "Druk op Space, Enter of klik om je teamgenoot te roepen."
        ]
      },
      complete: {
        en: [
          "Teamwork unlocked.",
          "The deliverables were finished together.",
          "Now complexity and pressure increase."
        ],
        nl: [
          "Teamwork vrijgespeeld.",
          "De deliverables werden samen afgewerkt.",
          "Nu stijgen complexiteit en druk."
        ]
      },
      orbs: [
        { key: "communication", name: { en: "Communication", nl: "Communicatie" }, x: 0.14, y: 0.28 },
        { key: "planning", name: { en: "Planning", nl: "Planning" }, x: 0.54, y: 0.16 },
        { key: "feedback", name: { en: "Feedback", nl: "Feedback" }, x: 0.84, y: 0.28 },
        { key: "project", name: { en: "2TIN project", nl: "Projectweek 2TIN" }, x: 0.22, y: 0.68, team: true, effort: 2.65 },
        { key: "cardiff", name: { en: "Cardiff PoC", nl: "Cardiff PoC" }, x: 0.56, y: 0.75, team: true, effort: 4.1 },
        { key: "pop", name: { en: "POP session", nl: "POP-sessie" }, x: 0.82, y: 0.65, team: true, effort: 1.55 }
      ]
    },
    {
      color: "#86bdf0",
      bg: "#11131a",
      time: 92,
      speed: 3.45,
      blockerCount: 4,
      blockerSpeed: 2.05,
      incidents: true,
      incidentEvery: 19,
      incidentWindow: 9,
      teammate: true,
      label: {
        en: "Year 3: Complexity",
        nl: "Jaar 3: Complexiteit"
      },
      eyebrow: {
        en: "Level 3 / 3",
        nl: "Level 3 / 3"
      },
      intro: {
        en: [
          "Advanced skills unlock in sequence.",
          "Some skills need your teammate beside you.",
          "Keep the delivery moving while incidents appear."
        ],
        nl: [
          "Geavanceerde skills komen in volgorde vrij.",
          "Sommige skills vragen je teamgenoot naast je.",
          "Houd de delivery op gang terwijl incidenten verschijnen."
        ]
      },
      complete: {
        en: [
          "Cloud, security, DevSecOps, and incident response are collected.",
          "The three-year progression is complete."
        ],
        nl: [
          "Cloud, security, DevSecOps en incident response zijn verzameld.",
          "De progressie over drie jaar is compleet."
        ]
      },
      orbs: [
        { key: "cloud", name: { en: "Cloud", nl: "Cloud" }, x: 0.14, y: 0.22 },
        { key: "devops", name: { en: "DevOps", nl: "DevOps" }, x: 0.4, y: 0.14 },
        { key: "security", name: { en: "Security", nl: "Security" }, x: 0.68, y: 0.2, requires: "cloud", effort: 1.65 },
        { key: "devsecops", name: { en: "DevSecOps", nl: "DevSecOps" }, x: 0.82, y: 0.5, requires: ["devops", "security"], team: true, effort: 3.2 },
        { key: "incident-response", name: { en: "Incident response", nl: "Incident response" }, x: 0.52, y: 0.72, requires: "devsecops", team: true, effort: 3.4 },
        { key: "architecture", name: { en: "Architecture", nl: "Architectuur" }, x: 0.18, y: 0.74, requires: "incident-response", team: true, effort: 3.0 }
      ]
    }
  ];

  let state = "INTRO";
  let levelIndex = 0;
  let lives = 3;
  let timeLeft = 0;
  let lastTick = 0;
  let lastDamageAt = 0;
  let player = null;
  let teammate = null;
  let orbs = [];
  let blockers = [];
  let particles = [];
  let incident = null;
  let incidentTimer = Infinity;
  let shakeTime = 0;
  let shakePower = 0;
  let touch = null;
  let callTeammate = false;

  const pressed = new Set();

  function lang() {
    return window.PortfolioI18n ? window.PortfolioI18n.getLang() : "en";
  }

  function text() {
    return ui[lang()] || ui.en;
  }

  function tr(value) {
    if (!value) {
      return "";
    }
    return value[lang()] || value.en || "";
  }

  function config() {
    return LEVELS[Math.min(levelIndex, LEVELS.length - 1)];
  }

  function rnd(min, max) {
    return Math.random() * (max - min) + min;
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function isActionKey(event) {
    return event.code === "Space" || event.code === "Enter" || event.key === " " || event.key === "Spacebar";
  }

  function isHandledKey(event) {
    return [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "KeyW",
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyZ",
      "KeyQ",
      "Space",
      "Enter"
    ].includes(event.code) || ["w", "a", "s", "d", "z", "q"].includes(String(event.key).toLowerCase());
  }

  function keyDown(...keys) {
    return keys.some((key) => pressed.has(key));
  }

  function rememberKey(event) {
    pressed.add(event.code);
    pressed.add(String(event.key).toLowerCase());
  }

  function forgetKey(event) {
    pressed.delete(event.code);
    pressed.delete(String(event.key).toLowerCase());
  }

  window.addEventListener("keydown", (event) => {
    if (isHandledKey(event)) {
      event.preventDefault();
    }

    rememberKey(event);

    if (isActionKey(event)) {
      callTeammate = true;
    }

    if (state === "INTRO" && isActionKey(event)) {
      startLevel();
    } else if (state === "LEVEL_COMPLETE" && isActionKey(event)) {
      nextLevel();
    } else if ((state === "GAME_OVER" || state === "WIN") && isActionKey(event)) {
      restartGame();
    }
  });

  window.addEventListener("keyup", (event) => {
    forgetKey(event);
    if (isActionKey(event)) {
      callTeammate = false;
    }
  });

  restartBtn.addEventListener("click", restartGame);

  canvas.addEventListener("mousedown", (event) => {
    event.preventDefault();

    if (state === "INTRO") {
      startLevel();
      return;
    }
    if (state === "LEVEL_COMPLETE") {
      nextLevel();
      return;
    }
    if (state === "GAME_OVER" || state === "WIN") {
      restartGame();
      return;
    }

    if (teammate) {
      callTeammate = true;
    }
  });

  window.addEventListener("mouseup", () => {
    callTeammate = false;
  });

  canvas.addEventListener("touchstart", (event) => {
    event.preventDefault();
    const point = touchPoint(event);

    if (state === "INTRO") {
      startLevel();
      return;
    }
    if (state === "LEVEL_COMPLETE") {
      nextLevel();
      return;
    }
    if (state === "GAME_OVER" || state === "WIN") {
      restartGame();
      return;
    }

    if (point.x > W * 0.72 && point.y > H * 0.62) {
      callTeammate = true;
      touch = null;
    } else {
      touch = { startX: point.x, startY: point.y, x: point.x, y: point.y };
    }
  }, { passive: false });

  canvas.addEventListener("touchmove", (event) => {
    event.preventDefault();
    if (touch) {
      const point = touchPoint(event);
      touch.x = point.x;
      touch.y = point.y;
    }
  }, { passive: false });

  canvas.addEventListener("touchend", (event) => {
    event.preventDefault();
    touch = null;
    callTeammate = false;
  }, { passive: false });

  function touchPoint(event) {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches[0] || event.changedTouches[0];
    return {
      x: (source.clientX - rect.left) * (W / rect.width),
      y: (source.clientY - rect.top) * (H / rect.height)
    };
  }

  function initLevel() {
    const cfg = config();
    state = "INTRO";
    lives = 3;
    timeLeft = cfg.time;
    lastDamageAt = 0;
    incident = null;
    incidentTimer = cfg.incidents ? cfg.incidentEvery : Infinity;
    particles = [];
    callTeammate = false;
    shakeTime = 0;
    shakePower = 0;

    player = { x: 58, y: H / 2, r: 13, speed: cfg.speed };
    teammate = cfg.teammate
      ? { x: 96, y: H / 2 + 34, r: 11, tx: 160, ty: H / 2, wait: 0, paused: 0 }
      : null;

    orbs = cfg.orbs.map((orb) => ({
      key: orb.key,
      name: orb.name,
      x: orb.x * W,
      y: orb.y * H,
      r: orb.team ? 21 : 16,
      team: Boolean(orb.team),
      requires: orb.requires || null,
      taken: false,
      progress: 0,
      effort: orb.effort || (orb.team ? 2.65 : 1.4)
    }));

    blockers = Array.from({ length: cfg.blockerCount }, (_, index) => {
      const angle = rnd(0, Math.PI * 2);
      return {
        x: rnd(170, W - 70),
        y: rnd(48, H - 48),
        vx: Math.cos(angle) * cfg.blockerSpeed,
        vy: Math.sin(angle) * cfg.blockerSpeed,
        r: rnd(14, 21),
        chasesTeam: Boolean(cfg.teammate && index === 0)
      };
    });

    updateStatus();
  }

  function startLevel() {
    state = "PLAYING";
    lastTick = performance.now();
  }

  function nextLevel() {
    levelIndex += 1;
    if (levelIndex >= LEVELS.length) {
      state = "WIN";
      updateStatus();
    } else {
      initLevel();
    }
  }

  function restartGame() {
    if (state === "WIN") {
      levelIndex = 0;
    }
    initLevel();
  }

  function updateStatus() {
    const cfg = config();
    const copy = text();
    const remaining = orbs.filter((orb) => !orb.taken).length;

    if (state === "WIN") {
      statusEl.textContent = `${copy.completed} | ${copy.skills}: 0 | ${copy.lives}: ${lives}`;
      narrativeEl.textContent = copy.replay;
      return;
    }

    statusEl.textContent = `${tr(cfg.label)} | ${copy.skills}: ${remaining} | ${copy.lives}: ${lives} | ${copy.time}: ${Math.ceil(timeLeft)}s`;
    narrativeEl.textContent = tr(cfg.eyebrow);
  }

  function update(now, dt) {
    const cfg = config();

    timeLeft -= dt;
    if (timeLeft <= 0) {
      state = "GAME_OVER";
      updateStatus();
      return;
    }

    updateShake(dt);
    updateParticles(now);
    updatePlayer();
    updateTeammate(dt);
    updateBlockers(cfg);
    updateIncident(dt, cfg);
    checkCollisions(now, dt, cfg);
    updateStatus();
  }

  function updateShake(dt) {
    if (shakeTime <= 0) {
      return;
    }
    shakeTime -= dt;
    if (shakeTime <= 0) {
      shakePower = 0;
    }
  }

  function updateParticles(now) {
    particles = particles.filter((particle) => {
      const age = now - particle.born;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.94;
      particle.vy *= 0.94;
      particle.alpha = 1 - age / particle.life;
      return age < particle.life;
    });
  }

  function updatePlayer() {
    let dx = 0;
    let dy = 0;

    if (keyDown("ArrowUp", "KeyW", "KeyZ", "w", "z")) {
      dy -= 1;
    }
    if (keyDown("ArrowDown", "KeyS", "s")) {
      dy += 1;
    }
    if (keyDown("ArrowLeft", "KeyA", "KeyQ", "a", "q")) {
      dx -= 1;
    }
    if (keyDown("ArrowRight", "KeyD", "d")) {
      dx += 1;
    }

    if (touch) {
      const tx = touch.x - touch.startX;
      const ty = touch.y - touch.startY;
      const td = Math.hypot(tx, ty);
      if (td > 12) {
        dx = tx / td;
        dy = ty / td;
      }
    }

    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    player.x = clamp(player.x + dx * player.speed, player.r, W - player.r);
    player.y = clamp(player.y + dy * player.speed, player.r, H - player.r);
  }

  function updateTeammate(dt) {
    if (!teammate) {
      return;
    }

    if (teammate.paused > 0) {
      teammate.paused -= dt;
      return;
    }

    let target = null;

    if (callTeammate) {
      target = player;
    } else {
      target = orbs.find((orb) => orb.team && !orb.taken && !isLocked(orb) && distance(player, orb) < 62) || null;
    }

    if (!target) {
      teammate.wait -= dt;
      if (teammate.wait <= 0) {
        teammate.tx = rnd(100, W - 100);
        teammate.ty = rnd(60, H - 60);
        teammate.wait = rnd(1.2, 3.2);
      }
      target = { x: teammate.tx, y: teammate.ty };
    }

    const d = distance(teammate, target);
    if (d > 20) {
      const speed = callTeammate ? 4.5 : 2.1;
      teammate.x += ((target.x - teammate.x) / d) * speed;
      teammate.y += ((target.y - teammate.y) / d) * speed;
    }

    teammate.x = clamp(teammate.x, teammate.r, W - teammate.r);
    teammate.y = clamp(teammate.y, teammate.r, H - teammate.r);
  }

  function updateBlockers(cfg) {
    blockers.forEach((blocker) => {
      if (blocker.chasesTeam && teammate && teammate.paused <= 0) {
        const d = distance(blocker, teammate);
        if (d > 0) {
          blocker.vx += ((teammate.x - blocker.x) / d) * 0.055;
          blocker.vy += ((teammate.y - blocker.y) / d) * 0.055;
          const speed = Math.hypot(blocker.vx, blocker.vy);
          const max = cfg.blockerSpeed * 1.35;
          if (speed > max) {
            blocker.vx = (blocker.vx / speed) * max;
            blocker.vy = (blocker.vy / speed) * max;
          }
        }
      }

      blocker.x += blocker.vx;
      blocker.y += blocker.vy;

      if (blocker.x < blocker.r || blocker.x > W - blocker.r) {
        blocker.vx *= -1;
      }
      if (blocker.y < blocker.r || blocker.y > H - blocker.r) {
        blocker.vy *= -1;
      }

      blocker.x = clamp(blocker.x, blocker.r, W - blocker.r);
      blocker.y = clamp(blocker.y, blocker.r, H - blocker.r);
    });
  }

  function updateIncident(dt, cfg) {
    if (!cfg.incidents) {
      return;
    }

    incidentTimer -= dt;

    if (!incident && incidentTimer <= 0) {
      incident = {
        x: rnd(74, W - 74),
        y: rnd(68, H - 68),
        ttl: cfg.incidentWindow,
        pulse: 0
      };
      incidentTimer = cfg.incidentEvery + rnd(-2, 3);
    }

    if (!incident) {
      return;
    }

    incident.ttl -= dt;
    incident.pulse += dt * 7;

    if (incident.ttl <= 0) {
      incident = null;
      lives -= 1;
      shake(0.35, 9);
      if (lives <= 0) {
        state = "GAME_OVER";
      }
    }
  }

  function checkCollisions(now, dt, cfg) {
    orbs.forEach((orb) => {
      if (orb.taken || isLocked(orb)) {
        return;
      }

      const playerNear = distance(player, orb) < player.r + orb.r;

      if (orb.team) {
        const teamNear = teammate && teammate.paused <= 0 && distance(teammate, orb) < teammate.r + orb.r;
        if (playerNear && teamNear) {
          orb.progress = clamp(orb.progress + dt / orb.effort, 0, 1);
          if (orb.progress >= 1) {
            collectOrb(orb, cfg);
          }
        }
      } else if (playerNear) {
        orb.progress = clamp(orb.progress + dt / orb.effort, 0, 1);
        if (orb.progress >= 1) {
          collectOrb(orb, cfg);
        }
      }
    });

    if (now - lastDamageAt > 1050) {
      const hit = blockers.find((blocker) => distance(player, blocker) < player.r + blocker.r);
      if (hit) {
        lives -= 1;
        lastDamageAt = now;
        player.x = 58;
        player.y = H / 2;
        burst(player.x, player.y, "#f06b8f", 12);
        shake(0.32, 8);
        if (lives <= 0) {
          state = "GAME_OVER";
          return;
        }
      }
    }

    if (teammate && teammate.paused <= 0) {
      const teamHit = blockers.find((blocker) => distance(teammate, blocker) < teammate.r + blocker.r);
      if (teamHit) {
        teammate.paused = 2.1;
        burst(teammate.x, teammate.y, "#f1b84b", 8);
      }
    }

    if (incident && distance(player, incident) < 30) {
      burst(incident.x, incident.y, "#ff5d4d", 10);
      burst(incident.x, incident.y, cfg.color, 8);
      incident = null;
      incidentTimer = cfg.incidentEvery;
    }

    if (orbs.every((orb) => orb.taken)) {
      state = "LEVEL_COMPLETE";
    }
  }

  function collectOrb(orb, cfg) {
    orb.progress = 1;
    orb.taken = true;
    burst(orb.x, orb.y, cfg.color, orb.team ? 16 : 10);
  }

  function isLocked(orb) {
    return requirementsFor(orb).some((key) => !orbs.find((candidate) => candidate.key === key && candidate.taken));
  }

  function requirementsFor(orb) {
    if (!orb.requires) {
      return [];
    }
    return Array.isArray(orb.requires) ? orb.requires : [orb.requires];
  }

  function shake(duration, power) {
    shakeTime = duration;
    shakePower = power;
  }

  function burst(x, y, color, count) {
    for (let i = 0; i < count; i += 1) {
      const angle = rnd(0, Math.PI * 2);
      const speed = rnd(1.2, 4.2);
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rnd(2, 4.5),
        color,
        alpha: 1,
        life: rnd(360, 720),
        born: performance.now()
      });
    }
  }

  function draw(now) {
    const cfg = config();
    const shakeX = shakeTime > 0 ? rnd(-shakePower, shakePower) : 0;
    const shakeY = shakeTime > 0 ? rnd(-shakePower, shakePower) : 0;

    ctx.save();
    ctx.translate(shakeX, shakeY);
    drawBackground(cfg);

    if (state === "INTRO") {
      drawMessageScreen(cfg, tr(cfg.label), tr(cfg.intro), text().start, cfg.color);
      ctx.restore();
      return;
    }

    if (state === "LEVEL_COMPLETE") {
      const prompt = levelIndex === LEVELS.length - 1 ? text().finish : text().next;
      drawMessageScreen(cfg, text().completed, tr(cfg.complete), prompt, cfg.color);
      ctx.restore();
      return;
    }

    if (state === "GAME_OVER") {
      drawMessageScreen(cfg, text().gameOver, [text().gameOverLine1, text().gameOverLine2], text().retry, "#f06b8f");
      ctx.restore();
      return;
    }

    if (state === "WIN") {
      drawWinScreen();
      ctx.restore();
      return;
    }

    drawParticles();
    drawOrbs(cfg, now);
    if (incident) {
      drawIncident(cfg);
    }
    drawBlockers(now);
    if (teammate) {
      drawTeammate(now);
    }
    drawPlayer(cfg);
    drawHud(cfg);

    ctx.restore();
  }

  function drawBackground(cfg) {
    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(244,241,232,0.045)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 46) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += 46) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    const glow = ctx.createLinearGradient(0, 0, W, H);
    glow.addColorStop(0, `${cfg.color}1d`);
    glow.addColorStop(0.55, "rgba(0,0,0,0)");
    glow.addColorStop(1, "rgba(240,107,143,0.12)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
  }

  function drawMessageScreen(cfg, title, lines, prompt, color) {
    ctx.fillStyle = "rgba(0,0,0,0.74)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";

    ctx.fillStyle = color;
    ctx.font = "800 15px 'Space Grotesk', Arial";
    ctx.fillText(tr(cfg.eyebrow), W / 2, H / 2 - 118);

    ctx.fillStyle = "#f4f1e8";
    ctx.font = "800 29px 'Space Grotesk', Arial";
    ctx.fillText(title, W / 2, H / 2 - 82);

    ctx.fillStyle = "#c9c3b6";
    ctx.font = "500 15px 'Outfit', Arial";
    lines.forEach((line, index) => {
      ctx.fillText(line, W / 2, H / 2 - 34 + index * 26);
    });

    ctx.fillStyle = color;
    ctx.font = "800 14px 'Space Grotesk', Arial";
    ctx.fillText(prompt, W / 2, H / 2 + 92);
    ctx.textAlign = "start";
  }

  function drawWinScreen() {
    ctx.fillStyle = "rgba(12,13,15,0.94)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";

    const gradient = ctx.createLinearGradient(W * 0.22, 0, W * 0.78, 0);
    gradient.addColorStop(0, "#3dd6ad");
    gradient.addColorStop(0.5, "#f1b84b");
    gradient.addColorStop(1, "#86bdf0");

    ctx.fillStyle = gradient;
    ctx.font = "800 31px 'Space Grotesk', Arial";
    ctx.fillText(text().winTitle, W / 2, H / 2 - 98);

    ctx.fillStyle = "#f4f1e8";
    ctx.font = "500 15px 'Outfit', Arial";
    text().winLines.forEach((line, index) => {
      ctx.fillText(line, W / 2, H / 2 - 42 + index * 27);
    });

    ctx.fillStyle = "#3dd6ad";
    ctx.font = "800 14px 'Space Grotesk', Arial";
    ctx.fillText(text().replay, W / 2, H / 2 + 102);
    ctx.textAlign = "start";
  }

  function drawOrbs(cfg, now) {
    orbs.forEach((orb) => {
      if (orb.taken) {
        return;
      }

      const locked = isLocked(orb);
      const color = orb.team ? "#f1b84b" : locked ? "#77737d" : cfg.color;
      const pulse = 0.92 + Math.sin(now / 420 + orb.x * 0.01) * 0.08;

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `${color}22`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = orb.team ? "#2a1b05" : "#101c1a";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = locked ? 1.5 : 2.5;
      ctx.stroke();

      if (orb.progress > 0) {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * orb.progress);
        ctx.strokeStyle = orb.team ? "#f1b84b" : cfg.color;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      ctx.textAlign = "center";
      ctx.fillStyle = color;
      drawCenteredText(tr(orb.name), orb.x, orb.y + 4, Math.max(orb.r * 2.4, 54), 10, 7);

      if (orb.team) {
        drawCenteredText(text().team, orb.x, orb.y + orb.r + 15, 74, 9, 7);
      }

      if (locked) {
        const required = requirementsFor(orb)
          .map((key) => orbs.find((candidate) => candidate.key === key))
          .filter(Boolean)
          .map((candidate) => tr(candidate.name))
          .join(" + ");
        ctx.fillStyle = "#8d8792";
        drawCenteredText(`${text().requires}: ${required}`, orb.x, orb.y + orb.r + 15, 126, 9, 7);
      }

      ctx.textAlign = "start";
    });
  }

  function drawBlockers(now) {
    blockers.forEach((blocker) => {
      const color = blocker.chasesTeam ? "#f1b84b" : "#f06b8f";
      const pulse = 0.78 + Math.sin(now / 280 + blocker.x) * 0.14;

      ctx.beginPath();
      ctx.arc(blocker.x, blocker.y, blocker.r * 1.9, 0, Math.PI * 2);
      ctx.fillStyle = `${color}24`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(blocker.x, blocker.y, blocker.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = blocker.chasesTeam ? "#2b1a04" : "#2a0712";
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = "800 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("x", blocker.x, blocker.y + 5);
      ctx.textAlign = "start";
    });
  }

  function drawPlayer(cfg) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r * 2, 0, Math.PI * 2);
    ctx.fillStyle = `${cfg.color}30`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = cfg.color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(player.x + 4, player.y - 2, 4, 0, Math.PI * 2);
    ctx.fillStyle = cfg.color;
    ctx.fill();
  }

  function drawTeammate(now) {
    const alpha = teammate.paused > 0 ? 0.45 + Math.abs(Math.sin(now / 100)) * 0.35 : 1;
    ctx.save();
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.arc(teammate.x, teammate.y, teammate.r * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(241,184,75,0.24)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(teammate.x, teammate.y, teammate.r, 0, Math.PI * 2);
    ctx.fillStyle = "#2a1b05";
    ctx.fill();
    ctx.strokeStyle = "#f1b84b";
    ctx.lineWidth = 2.4;
    ctx.stroke();

    ctx.fillStyle = "#f1b84b";
    ctx.font = "800 9px 'Space Grotesk', Arial";
    ctx.textAlign = "center";
    ctx.fillText(teammate.paused > 0 ? text().teammateDazed : "TEAM", teammate.x, teammate.y + teammate.r + 15);
    ctx.textAlign = "start";
    ctx.restore();
  }

  function drawIncident(cfg) {
    const urgency = clamp(incident.ttl / cfg.incidentWindow, 0, 1);
    const pulse = 0.65 + Math.abs(Math.sin(incident.pulse)) * 0.35;

    if (urgency < 0.35) {
      ctx.fillStyle = `rgba(255,65,65,${0.08 * pulse})`;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.beginPath();
    ctx.arc(incident.x, incident.y, 40 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,93,77,0.24)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(incident.x, incident.y, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#2d0707";
    ctx.fill();
    ctx.strokeStyle = urgency < 0.35 ? "#ff3c2f" : "#ff8a55";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = urgency < 0.35 ? "#ff3c2f" : "#ff8a55";
    ctx.font = "800 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("!", incident.x, incident.y + 6);
    ctx.font = "800 10px 'Space Grotesk', Arial";
    ctx.fillText(`${Math.ceil(incident.ttl)}s`, incident.x, incident.y - 26);
    ctx.textAlign = "start";
  }

  function drawHud(cfg) {
    ctx.fillStyle = cfg.color;
    ctx.font = "800 15px 'Space Grotesk', Arial";
    ctx.fillText(tr(cfg.label), 12, 24);

    for (let i = 0; i < 3; i += 1) {
      ctx.fillStyle = i < lives ? "#f06b8f" : "rgba(244,241,232,0.18)";
      ctx.fillRect(12 + i * 20, H - 22, 13, 13);
    }

    const ratio = clamp(timeLeft / cfg.time, 0, 1);
    const barWidth = 164;
    const x = W - barWidth - 12;
    const y = H - 23;

    ctx.fillStyle = "rgba(244,241,232,0.12)";
    roundedRect(x, y, barWidth, 10, 5);
    ctx.fill();
    ctx.fillStyle = ratio > 0.35 ? cfg.color : ratio > 0.18 ? "#f1b84b" : "#f06b8f";
    roundedRect(x, y, barWidth * ratio, 10, 5);
    ctx.fill();

    ctx.fillStyle = "#c9c3b6";
    ctx.font = "800 11px 'Outfit', Arial";
    ctx.textAlign = "right";
    ctx.fillText(`${Math.ceil(timeLeft)}s`, W - 12, y - 5);
    ctx.textAlign = "start";

    if (teammate) {
      ctx.fillStyle = "rgba(241,184,75,0.75)";
      ctx.font = "800 11px 'Outfit', Arial";
      ctx.textAlign = "center";
      ctx.fillText(text().teamCall, W / 2, H - 12);
      ctx.textAlign = "start";
      drawTouchButton();
    }

    if (incident) {
      ctx.fillStyle = "#ff705f";
      ctx.font = "800 13px 'Space Grotesk', Arial";
      ctx.textAlign = "center";
      ctx.fillText(text().incident, W / 2, 24);
      ctx.textAlign = "start";
    }
  }

  function drawTouchButton() {
    const x = W - 60;
    const y = H - 62;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(241,184,75,0.11)";
    ctx.fill();
    ctx.strokeStyle = "rgba(241,184,75,0.42)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "rgba(241,184,75,0.75)";
    ctx.font = "800 9px 'Space Grotesk', Arial";
    ctx.textAlign = "center";
    ctx.fillText("TEAM", x, y + 3);
    ctx.textAlign = "start";
  }

  function drawParticles() {
    particles.forEach((particle) => {
      ctx.globalAlpha = Math.max(0, particle.alpha);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function roundedRect(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function drawCenteredText(value, x, y, maxWidth, baseSize, minSize) {
    let size = baseSize;
    while (size > minSize) {
      ctx.font = `800 ${size}px 'Space Grotesk', Arial`;
      const metrics = ctx.measureText ? ctx.measureText(value) : null;
      const width = metrics && metrics.width ? metrics.width : 0;
      if (width === 0 || width <= maxWidth) {
        break;
      }
      size -= 1;
    }
    ctx.font = `800 ${size}px 'Space Grotesk', Arial`;
    ctx.fillText(value, x, y);
  }

  function loop(now) {
    if (state === "PLAYING") {
      const dt = Math.min((now - lastTick) / 1000, 0.05);
      lastTick = now;
      update(now, dt);
    }

    draw(now);
    requestAnimationFrame(loop);
  }

  window.addEventListener("portfolio:languagechange", () => {
    updateStatus();
  });

  initLevel();
  requestAnimationFrame(loop);
})();
