const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const music = document.getElementById("bgMusic");

let yesScale = 1;

// Musik automatisch starten, leise, loop
window.addEventListener("load", () => {
  music.volume = 0.3;
  music.loop = true;
  music.play().catch(() => console.log("Autoplay blockiert, bitte klicken."));
});

noBtn.addEventListener("click", () => {
  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;
  
   // No-Button schrumpft
  let currentNoScale = parseFloat(noBtn.dataset.scale || 1); // aktueller Scale
  currentNoScale -= 0.15; // schrumpfen
  if (currentNoScale < 0.05) currentNoScale = 0.05; // Minimum-Scale
  noBtn.dataset.scale = currentNoScale;
  noBtn.style.transform = `scale(${currentNoScale})`;
});

yesBtn.addEventListener("click", () => {
  card.innerHTML = `
    <h1>Ich wusste dass du auf Ja drückst! ❤️</h1>
    <p>Du hast mir gerade den Valentinstag versüßt 🥰</p>
  `;

  // Herzchen mit versetzter Geschwindigkeit
  let heartsCreated = 0;
  const heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.textContent = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-20px";
    heart.style.fontSize = 20 + Math.random() * 30 + "px";
    heart.style.animation = `floatUp ${2 + Math.random()*2}s ease-out forwards`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);

    heartsCreated++;
    if (heartsCreated >= 25) clearInterval(heartInterval);
  }, 150);
});

document.addEventListener("click", () => {
  if (music.paused) {
    music.volume = 0.3;
    music.play().then(() => {
      console.log("🎶 Musik läuft");
    }).catch(err => {
      console.log("❌ Musik konnte nicht starten:", err);
    });
  }
});

