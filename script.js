const card = document.getElementById("card");
const music = document.getElementById("bgMusic");

let yesScale = 1;
let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    music.volume = 0.3;
    music.play().then(() => {
      musicStarted = true;
    }).catch(() => {});
  }
}

document.addEventListener("click", startMusic, { once: true });

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("click", () => {
  startMusic();

  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;

  let noScale = parseFloat(noBtn.dataset.scale || 1);
  noScale -= 0.15;
  if (noScale < 0.05) noScale = 0.05;
  noBtn.dataset.scale = noScale;
  noBtn.style.transform = `scale(${noScale})`;
});

yesBtn.addEventListener("click", () => {
  startMusic();

  card.innerHTML = `
    <h1>Ich wusste, dass du JA sagst ❤️</h1>
    <p>Du hast mir gerade den Valentinstag versüßt 🥰</p>

    <button id="continueBtn" class="continue">Weiter 💌</button>
    <p class="hint">Klick auf „Weiter“ 💕</p>
  `;

  createHearts();

  document
    .getElementById("continueBtn")
    .addEventListener("click", showPlanQuestion);
});

function createHearts() {
  let count = 0;
  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-20px";
    heart.style.fontSize = 20 + Math.random() * 30 + "px";
    heart.style.animation = `floatUp ${2 + Math.random() * 2}s ease-out forwards`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);

    count++;
    if (count >= 25) clearInterval(interval);
  }, 150);
}

function showPlanQuestion() {
  card.innerHTML = `
    <h1>Ich habe etwas für den Valentinstag geplant 💌</h1>
    <p>Möchtest du wissen was es ist?</p>

    <div class="buttons">
      <button id="planYes">Ja</button>
      <button id="planNo">Nein</button>
    </div>

    <button id="continueBtn" class="continue">Weiter 💌</button>
    <p class="hint">Oder klick auf Weiter 😉</p>
  `;

  document.getElementById("planNo").addEventListener("click", () => {
    card.innerHTML = `
      <h1>Okay 😊</h1>
      <p>Dann lass dich überraschen 😉</p>
    `;
  });

  document.getElementById("planYes").addEventListener("click", () => {
    card.innerHTML = `
      <h1>💖 Mein Plan 💖</h1>
      <p>(Hier kommt gleich deine Überraschung 😏)</p>
    `;
  });

  document.getElementById("continueBtn").addEventListener("click", () => {
    card.innerHTML = `
      <h1>💘 Kleine Vorschau 💘</h1>
      <p>Der Valentinstag wird besonders… nur für uns 🥰</p>
    `;
  });
}