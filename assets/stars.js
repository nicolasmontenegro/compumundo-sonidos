/* eslint-disable no-console */
class Stars {
  constructor(el) {
    this.canvas = el
    this.c = this.canvas.getContext('2d')

    this.w = null
    this.h = null
    this.prevTime = 0
    this.speed = 0.025

    this.setCanvasExtents()

    window.onresize = () => {
      this.setCanvasExtents()
    }
    // Aquí va cuántas estrellas habrán
    this.stars = this.makeStars(1500)
    requestAnimationFrame((time) => this.init(time))
  }

  setCanvasExtents() {
    this.w = document.body.clientWidth
    this.h = document.body.clientHeight
    this.canvas.width = this.w
    this.canvas.height = this.h
  }

  makeStars(count) {
    const out = []
    for (let i = 0; i < count; i++) {
      const s = {
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      }
      out.push(s)
    }
    return out
  }

  clear() {
    this.c.fillStyle = 'black'
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  putPixel(x, y, brightness) {
    const intensity = brightness * 255
    const rgb = 'rgb(' + intensity + ',' + intensity + ',' + intensity + ')'
    this.c.fillStyle = rgb
    // Aqui va el tamaño de cada estrella
    this.c.fillRect(x, y, 2, 3)
  }

  moveStars(distance) {
    const count = this.stars.length
    for (let i = 0; i < count; i++) {
      const s = this.stars[i]
      s.z -= distance
      while (s.z <= 1) {
        s.z += 1000
      }
    }
  }

  init(time) {
    this.prevTime = time
    requestAnimationFrame((time) => this.tick(time))
  }

  tick(time) {
    const elapsed = time - this.prevTime
    this.prevTime = time

    // Aquí va la velocidad
    this.moveStars(elapsed * this.speed)

    this.clear()

    const cx = this.w / 2
    const cy = this.h / 2

    const count = this.stars.length
    for (let i = 0; i < count; i++) {
      const star = this.stars[i]

      const x = cx + star.x / (star.z * 0.001)
      const y = cy + star.y / (star.z * 0.001)

      if (x < 0 || x >= this.w || y < 0 || y >= this.h) {
        continue
      }

      const d = star.z / 1000.0
      const b = 1 - d * d

      this.putPixel(x, y, b)
    }

    requestAnimationFrame((time) => this.tick(time))
  }
}

export default Stars
