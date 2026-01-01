// ==========================================
// CONFIGURAÇÃO DE ARQUIVOS LOCAIS
// ==========================================

const PATH = "assets/";

// Atualizado para .mp4 conforme solicitado
const FILE_SIRENE = "sirene.mp4";
const FILE_VOZ1 = "voz1.mp4";
const FILE_VOZ2 = "voz2.mp4";

// ==========================================

const audioSiren = new Audio(PATH + FILE_SIRENE);
const audioVoice1 = new Audio(PATH + FILE_VOZ1);
const audioVoice2 = new Audio(PATH + FILE_VOZ2);

// Pré-carregamento
audioSiren.preload = "auto";
audioVoice1.preload = "auto";
audioVoice2.preload = "auto";

let activeVoice = null;

function startAlarm(type) {
  if (type === "xixi") {
    activeVoice = audioVoice1;
  } else {
    activeVoice = audioVoice2;
  }

  const textDisplay = type === "xixi" ? "Texto 1" : "Texto 2";

  document.getElementById("main-screen").classList.add("hidden");
  document.getElementById("stop-screen").classList.remove("hidden");
  document.getElementById("stop-screen").classList.add("flex");
  document.getElementById("status-text").innerText = `Tocando Sirene...`;
  document.getElementById("error-detail").classList.add("hidden");

  // Inicia o ciclo
  playSiren();
}

// 1. Toca Sirene -> Chama Voz
function playSiren() {
  if (!isActive()) return;

  document.getElementById("status-text").innerText = "";
  resetAudio(audioSiren);

  const playPromise = audioSiren.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.error("Erro ao tocar sirene:", error);
      document.getElementById("status-text").innerText = "Erro: Arquivo não encontrado";
      document.getElementById("error-detail").innerText = `Verifique se 'assets/${FILE_SIRENE}' existe.`;
      document.getElementById("error-detail").classList.remove("hidden");
    });
  }

  // Quando a sirene acabar, vai para a voz
  audioSiren.onended = playVoice;
}

// 2. Toca Voz -> Volta para Sirene (Loop)
function playVoice() {
  if (!isActive()) return;

  document.getElementById("status-text").innerText = "";
  resetAudio(activeVoice);

  const playPromise = activeVoice.play();
  if (playPromise !== undefined) {
    playPromise.catch((e) => {
      console.log("Erro na voz, pulando de volta pra sirene...", e);
      // Se der erro na voz, volta pra sirene imediatamente para não parar o loop
      playSiren();
    });
  }

  // Quando a voz acabar, volta para a sirene (Loop infinito)
  activeVoice.onended = playSiren;
}

function stopAlarm() {
  stopAndReset(audioSiren);
  stopAndReset(audioVoice1);
  stopAndReset(audioVoice2);

  // IMPORTANTE: Limpar os eventos para quebrar o loop
  audioSiren.onended = null;
  if (audioVoice1) audioVoice1.onended = null;
  if (audioVoice2) audioVoice2.onended = null;

  document.getElementById("stop-screen").classList.add("hidden");
  document.getElementById("stop-screen").classList.remove("flex");
  document.getElementById("main-screen").classList.remove("hidden");
}

function resetAudio(audioObj) {
  if (audioObj) {
    audioObj.currentTime = 0;
  }
}

function stopAndReset(audioObj) {
  if (audioObj) {
    audioObj.pause();
    audioObj.currentTime = 0;
    audioObj.loop = false;
  }
}

function isActive() {
  return !document.getElementById("stop-screen").classList.contains("hidden");
}
