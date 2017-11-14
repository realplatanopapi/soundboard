let drakeMode = false

const $buttonEls = document.querySelectorAll('.soundboard__btn')
const $drakeModeBtn = document.querySelector('.drake-mode-btn')

function getSound (index) {
  if (!drakeMode) {
    return './airhorn.mp3'
  } else if (index % 2 === 0) {
    return './drake-ugh.mp3'
  } else {
    return './drake-yeauh.mp3'
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
    }, 100)
  }

  // Get the key for this button
  let key = element.dataset.key;
  if (key) {
    key = element.dataset.key.toLowerCase()
  }

  // Attach event listeners
  element.addEventListener('mousedown', playSound)
  element.addEventListener('keydown', (event) => {
    const {keyCode} = event;
    if (keyCode === 32 || keyCode === 13) {
      playSound()
    }
  })

  return {
    playSound,
    key
  }
}

const buttons = Array.prototype.map.call($buttonEls, createButton)

document.body.addEventListener('keydown', event => {
  const {key} = event

  buttons.forEach(button => {
    if (button.key == key) {
      button.playSound()
    }
  })
})

$drakeModeBtn.addEventListener('click', () => {
  drakeMode = !drakeMode

  if (drakeMode) {
    document.body.classList.add('drake-mode-active')
  } else {
    document.body.classList.remove('drake-mode-active')
  }
})
