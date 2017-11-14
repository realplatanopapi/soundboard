const $buttonEls = document.querySelectorAll('.soundboard__btn')

function createButton (element) {
  // Create an audio element
  const audio = document.createElement('audio')
  audio.src = 'airhorn.mp3'

  let isPlaying = false

  function playSound () {
    if (isPlaying) {
      return
    }

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
