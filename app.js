const $buttons = document.querySelectorAll('.soundboard__btn')
const $drakeModeBtn = document.querySelector('.drake-mode-btn')
let drakeMode = false

const sounds = {
  airhorn: 'airhorn.mp3',
  drakeUgh: 'drake-ugh.mp3',
  drakeYeauh: 'drake-yeauh.mp3'
}

// Preload sounds
Object.keys(sounds).forEach(soundName => {
  const audio = document.createElement('audio')
  audio.src = sounds[soundName]
})

function getSound (index) {
  if (!drakeMode) {
    return sounds.airhorn;
  } else if (index % 2 === 0) {
    return sounds.drakeUgh;
  } else {
    return sounds.drakeYeauh;
  }
}

function createButton (element, index) {
  // Create an audio element
  const audio = document.createElement('audio')
  let isPlaying = false

  function playSound () {
    if (isPlaying) {
      return
    }

    audio.src = getSound(index)
    audio.currentTime = 0
    audio.play()
    isPlaying = true
    if (!element.classList.contains('playing')) {
      element.classList.add('playing')
    }

    setTimeout(() => {
      isPlaying = false
      if (element.classList.contains('playing')) {
        element.classList.remove('playing')
      }
    }, 50)
  }

  // Get the key for this button
  const key = element.dataset.key.toLowerCase()

  // Attach event listeners
  element.addEventListener('mousedown', playSound)
  element.addEventListener('keydown', (event) => {
    const {keyCode} = event
    if (keyCode === 32 || keyCode === 13) {
      playSound()
    }
  })

  return {
    element,
    playSound,
    key
  }
}

const buttons = Array.prototype.map.call($buttons, createButton)
const buttonsByKey = {}
buttons.forEach(button => {
  buttonsByKey[button.key] = button
})

document.body.addEventListener('keydown', event => {
  if (event.metaKey || event.ctrlKey) {
    return
  }

  const {key} = event
  const button = buttonsByKey[key]
  if (button && window.getComputedStyle(button.element).display !== 'none') {
    button.playSound()
  }
})

$drakeModeBtn.addEventListener('click', () => {
  drakeMode = !drakeMode

  if (drakeMode) {
    document.body.classList.add('drake-mode-active')
  } else {
    document.body.classList.remove('drake-mode-active')
  }
})
