const playButton = document.getElementById('button-play')
const PHI = (1 + Math.sqrt(5)) / 2
let audio

let started = false
let playing = false
let analyzer
let frequencyArray

function startAudio() {
  if (!playing && !started) {
    audio = new Audio()
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    frequencyArray = new Uint8Array(analyser.frequencyBinCount)

    audio.src = 'roll.mp3'
    started = true
    playing = true
    audio.play()
    render()
    render2()
    render3()
  }
  else if(playing) {
    playing = false
    audio.pause()
  }
  else {
    playing = true
    audio.play()
  }
}


playButton.addEventListener('click', (e) => {
  playButton.innerHTML = playing ? "Play!" : "Pause!"
  startAudio()
})

const canvas = document.getElementById('canvas')
const canvas2 = document.getElementById('canvas2')
const canvas3 = document.getElementById('canvas3')
const ctx = canvas.getContext('2d')
const ctx2 = canvas2.getContext('2d')
const ctx3 = canvas3.getContext('2d')

const centerX = 300 / 2
const centerY = 300 / 2
const radius = 300 / 5
let largest = 0
function render() {
  // ctx.clearRect(0, 0, 300, 300)
  ctx.fillStyle = "rgba(0,0,0,.1)"
  ctx.fillRect(0, 0, 300, 300)
  // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)


  analyser.getByteFrequencyData(frequencyArray)
  const balls = 30
  // const step = Math.PI * 2 / bars

  const ballR = 300 / balls / 2
  for (let i = 0; i < balls; i++) {
    ctx.beginPath()
    ctx.fillStyle = `hsl(${frequencyArray[parseInt((frequencyArray.length / balls) * i)]},50%,50%)`
    ctx.arc(ballR + (i * ballR * 2), 300 - ballR - frequencyArray[parseInt((frequencyArray.length / balls) * i)], ballR, 0, Math.PI * 2)
    ctx.arc(ballR + (i * ballR * 2), ballR + frequencyArray[parseInt((frequencyArray.length / balls) * i)], ballR, 0, Math.PI * 2)
    ctx.fill()
  }



  requestAnimationFrame(render)
}


function render2() {
  analyser.getByteFrequencyData(frequencyArray)

  frequencyArray.forEach((f, i) => {
    ctx2.strokeStyle = `hsl(${f / 255 * 360},50%,50%)`
    ctx2.beginPath()
    ctx2.arc(150, 150, 300 / frequencyArray.length * i, 0, Math.PI * 2)
    ctx2.stroke()
  })

  requestAnimationFrame(render2)
}

function render3() {
  ctx3.clearRect(0, 0, 300, 300)

  analyser.getByteFrequencyData(frequencyArray)


  frequencyArray.forEach((f, i) => {
    ctx3.strokeStyle = `hsl(${f / 255 * 360},50%,50%)`
    ctx3.beginPath()
    ctx3.arc(150, 150, f / 255 * 150, 0, Math.PI * 2)
    ctx3.stroke()
  })

  requestAnimationFrame(render3)
}