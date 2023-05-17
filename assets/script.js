let contador = document.getElementById("contador");
let botao = document.getElementById("resetbtn");
let textospace = document.getElementById("textocont");
let acc = 0;
let konamiMode = false;
let muted = false;
let konamiclick = document.getElementById("konamiclick");
let konamicomplete = document.getElementById("konamicomplete");
const muteicon = document.getElementById("muteicon");

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (konamiMode) {
      clickSong();
    }
    acc++;
    contador.textContent = acc;
    atualizarExibicao();
  }
});
botao.addEventListener("click", function (e) {
  resetarAcc();
  atualizarExibicao();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "m") {
    if (muted == false) {
      kc1 = document.getElementById("konamiclick");
      kc2 = document.getElementById("konamicomplete");
      kc1.volume = 0;
      kc2.volume = 0;
      muteicon.style.opacity = 0.4;
      muted = true;
    } else {
      kc1 = document.getElementById("konamiclick");
      kc2 = document.getElementById("konamicomplete");
      kc1.volume = 1;
      kc2.volume = 0.6;
      muteicon.style.opacity = 0;
      muted = false;
    }
  }
});

// Função KonamiCode
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiCodePosition = 0;
// Adiciona o event listener para o evento 'keydown'
document.addEventListener("keydown", function (e) {
  if (e.key === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    console.log(konamiCode[konamiCodePosition]);
    if (konamiCodePosition === konamiCode.length) {
      konamiChanges();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function konamiChanges() {
  blinkFont();
  song();
  konamiMode = true;
}

function clickSong() {
  kc = document.getElementById("konamiclick");
  kc.currentTime = 0;
  kc.play();
}

function song() {
  kc = document.getElementById("konamicomplete");
  kc.currentTime = 0;
  kc.play();
}

function blinkFont() {
  // Variáveis para a piscada
  const fontOptions = ["DotGothic16", "Roboto Condensed"];
  const duration = 1700;
  const interval = 300;
  const endTime = Date.now() + duration;
  let fontIndex = 0;
  // Alterador de fontes
  function updateFont() {
    const currentFont = fontOptions[fontIndex];
    contador.style.fontFamily = currentFont;
    fontIndex = (fontIndex + 1) % fontOptions.length;
  }
  // Verifica o tempo máximo
  function checkTime() {
    if (Date.now() >= endTime) {
      contador.style.fontFamily = fontOptions[0];
      clearInterval(fontInterval);
    }
  }
  // Atualiza as fontes
  updateFont();
  const fontInterval = setInterval(() => {
    updateFont();
    checkTime();
  }, interval);
}

function resetarAcc() {
  acc = 0;
  contador.textContent = acc;
}

function atualizarExibicao() {
  if (acc === 0) {
    botao.style.display = "none";
    textospace.style.display = "flex";
  } else {
    botao.style.display = "flex";
    textospace.style.display = "none";
  }
}
