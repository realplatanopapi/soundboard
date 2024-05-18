const $buttons = document.querySelectorAll(".soundboard__btn");
const $conejoModeBtn = document.querySelector(".conejo-mode-btn");
let conejoMode = false;

function createAudioElement(src) {
  const audio = document.createElement("audio");
  audio.src = src;
  return audio;
}

const sounds = {
  airhorn: createAudioElement("airhorn.wav"),
  yeah1: createAudioElement("yeah1.mp3"),
  yeah2: createAudioElement("yeah2.mp3"),
};

function getSound(index) {
  if (!conejoMode) {
    return sounds.airhorn;
  } else if (index % 2 === 0) {
    return sounds.yeah1;
  } else {
    return sounds.yeah2;
  }
}

function createButton(element, index) {
  // Create an audio element
  let isPlaying = false;

  function playSound() {
    const audio = getSound(index);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    if (!element.classList.contains("playing")) {
      element.classList.add("playing");
    }

    setTimeout(() => {
      isPlaying = false;
      if (element.classList.contains("playing")) {
        element.classList.remove("playing");
      }
    }, 75);
  }

  // Get the key for this button
  const key = element.dataset.key.toLowerCase();

  // Attach event listeners
  element.addEventListener("mousedown", playSound);
  element.addEventListener("keydown", (event) => {
    const { keyCode } = event;
    if (keyCode === 32 || keyCode === 13) {
      playSound();
    }
  });

  return {
    element,
    playSound,
    key,
  };
}

const buttons = Array.prototype.map.call($buttons, createButton);
const buttonsByKey = {};
buttons.forEach((button) => {
  buttonsByKey[button.key] = button;
});

document.body.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey) {
    return;
  }

  const { key } = event;
  const button = buttonsByKey[key];
  if (button && window.getComputedStyle(button.element).display !== "none") {
    button.playSound();
  }
});

$conejoModeBtn.addEventListener("click", () => {
  conejoMode = !conejoMode;

  if (conejoMode) {
    document.body.classList.add("conejo-mode-active");
  } else {
    document.body.classList.remove("conejo-mode-active");
  }
});
