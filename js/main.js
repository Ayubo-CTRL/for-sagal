/* ==========================================================
   For Sagal — behavior
   1. Floating background hearts
   2. Typing terminal  (edit TERMINAL_SCRIPT below to change what it says)
   3. "Tap if you read this far" heart burst
   ========================================================== */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HEART_SVG =
  '<svg class="heart" viewBox="0 0 24 24" aria-hidden="true"><use href="#heart"/></svg>';


/* ---------- 1. Floating hearts ---------- */

function spawnFloatingHearts(count = 30) {
  const layer = document.getElementById("hearts-bg");
  if (!layer) return;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "float-heart";
    el.innerHTML = HEART_SVG;

    const size = 14 + Math.random() * 30; // px
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = size + "px";
    el.style.setProperty("--o", (0.2 + Math.random() * 0.35).toFixed(2));
    el.style.setProperty("--sway", (Math.random() * 60 - 30).toFixed(0) + "px");
    el.style.animationDuration = 12 + Math.random() * 14 + "s";
    el.style.animationDelay = -Math.random() * 20 + "s"; // start mid-flight

    // With reduced motion, hearts sit still but are scattered across the page.
    if (reduceMotion) el.style.top = Math.random() * 100 + "%";

    layer.appendChild(el);
  }
}


/* ---------- 2. Terminal ---------- */

/*
  EDIT ME. Each item is one line.
    { type: "cmd", text: "..." }  -> typed out after a "$" prompt
    { type: "out", text: "..." }  -> printed as the result
    { type: "out", text: "...", love: true } -> printed bold pink
*/
const TERMINAL_SCRIPT = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "ayub" },

  { type: "cmd", text: "cat what-i-never-said.txt" },
  { type: "out", text: "I love you, Sagal.", love: true },
  { type: "out", text: "I'm proud of you, and of who you're becoming." },
  { type: "out", text: "I support you in the big things and the small ones." },
  { type: "out", text: "I'm sorry I went quiet. That one's on me." },

  { type: "cmd", text: 'git commit -m "i will keep showing up"' },
  { type: "out", text: "[main ♥] 1 file changed, 1 promise added" },

  { type: "cmd", text: "./support --for sagal --until forever" },
  { type: "out", text: "running... no end date found" },

  { type: "cmd", text: 'echo "you are so beautiful"' },
  { type: "out", text: "you are so beautiful", love: true },
];

const TYPE_SPEED_MS = 45;   // delay per typed character
const LINE_PAUSE_MS = 450;  // pause between lines

const termBody = document.getElementById("terminal-body");
let runId = 0; // lets "replay" cancel an in-progress run

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function makeLine(className) {
  const p = document.createElement("p");
  p.className = "t-line " + (className || "");
  termBody.appendChild(p);
  return p;
}

function makeCursor() {
  const c = document.createElement("span");
  c.className = "cursor";
  return c;
}

async function runTerminal() {
  const myRun = ++runId;
  termBody.innerHTML = "";

  for (const line of TERMINAL_SCRIPT) {
    if (myRun !== runId) return;

    if (line.type === "cmd") {
      const row = makeLine();
      row.innerHTML = '<span class="t-prompt">$</span>';
      const textNode = document.createElement("span");
      row.appendChild(textNode);
      const cursor = makeCursor();
      row.appendChild(cursor);

      for (const ch of line.text) {
        if (myRun !== runId) return;
        textNode.textContent += ch;
        if (!reduceMotion) await sleep(TYPE_SPEED_MS);
      }
      cursor.remove();
    } else {
      const row = makeLine("t-out" + (line.love ? " love" : ""));
      row.textContent = line.text;
    }

    if (!reduceMotion) await sleep(LINE_PAUSE_MS);
  }

  if (myRun !== runId) return;
  const last = makeLine();
  last.innerHTML = '<span class="t-prompt">$</span>';
  last.appendChild(makeCursor());
}

function setupTerminal() {
  if (!termBody) return;

  // Start typing when the terminal scrolls into view.
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        runTerminal();
      }
    },
    { threshold: 0.35 }
  );
  observer.observe(termBody);

  const replay = document.getElementById("replay");
  if (replay) replay.addEventListener("click", runTerminal);
}


/* ---------- 3. Heart burst button ---------- */

function setupLoveButton() {
  const btn = document.getElementById("love-btn");
  const reply = document.getElementById("love-reply");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (reply) reply.hidden = false;
    if (reduceMotion) return;

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 18; i++) {
      const h = document.createElement("span");
      h.className = "burst-heart";
      h.innerHTML = HEART_SVG;
      h.style.left = cx + "px";
      h.style.top = cy + "px";
      h.style.fontSize = 16 + Math.random() * 22 + "px";

      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 140;
      h.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      h.style.setProperty("--dy", Math.sin(angle) * dist - 40 + "px");

      document.body.appendChild(h);
      h.addEventListener("animationend", () => h.remove());
    }
  });
}


/* ---------- Start ---------- */

spawnFloatingHearts();
setupTerminal();
setupLoveButton();
