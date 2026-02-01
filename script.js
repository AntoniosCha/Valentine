const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const music = document.getElementById("bgMusic");

let yesScale = 1;
let musicStarted = false;

// Musik beim ERSTEN Klick starten (Browser-safe)
function startMusic() {
  if (!musicStarted) {
    music.volume = 0.3;
    music.play().then(() => {
      musicStarted = true;
    }).catch(() => {
      // falls Browser meckert – egal
    });
  }
}

document.addEventListener("click", startMusic, { once: true });

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
    <h1>Ich wusste, dass du Ja sagst ❤️</h1>
    <p>Du hast mir gerade den Valentinstag versüßt 🥰</p>
  `;

  let hearts = 0;
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

    hearts++;
    if (hearts >= 25) clearInterval(interval);
  }, 150);
});
