import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const enlarge = (rows, k) =>
  rows.flatMap((row) => {
    const wide = [...row].map((ch) => ch.repeat(k)).join('')
    return Array(k).fill(wide)
  })

const SPRITES = {
  alien: [
    '00100000100',
    '00010001000',
    '00111111100',
    '01101110110',
    '11111111111',
    '10111111101',
    '10100000101',
    '00011011000',
  ],
  heart: [
    '01100110',
    '11111111',
    '11111111',
    '11111111',
    '01111110',
    '00111100',
    '00011000',
  ],
  coin: [
    '00111100',
    '01111110',
    '11100111',
    '11100111',
    '11100111',
    '11100111',
    '01111110',
    '00111100',
  ],
  star: [
    '0001000',
    '0001000',
    '0011100',
    '1111111',
    '0111110',
    '0110110',
    '1100011',
  ],
  sword: [
    '00100',
    '01110',
    '01110',
    '01110',
    '01110',
    '01110',
    '11111',
    '00100',
    '00100',
    '01110',
  ],
  skull: [
    '01111110',
    '11111111',
    '11011011',
    '11011011',
    '11111111',
    '01111110',
    '01011010',
    '01011010',
  ],
  gamepad: [
    '001111111100',
    '011111111110',
    '111011111011',
    '110001110101',
    '111011111011',
    '011111111110',
    '001110011100',
  ],
  pieceL: enlarge(['10', '10', '11'], 3),
  pieceJ: enlarge(['01', '01', '11'], 3),
  pieceT: enlarge(['111', '010'], 3),
  pieceS: enlarge(['011', '110'], 3),
  pieceZ: enlarge(['110', '011'], 3),
  pieceI: enlarge(['1', '1', '1', '1'], 3),
  pieceO: enlarge(['11', '11'], 3),
}

const NAMES = Object.keys(SPRITES)
const COLORS = ['#63C7BE', '#99E1D9', '#8A7685']
const REPULSE_RADIUS = 140

const pick = (list) => list[Math.floor(Math.random() * list.length)]

const createSprite = (width, height, anywhere) => {
  const rows = SPRITES[pick(NAMES)]
  const pixel = pick([2, 3, 4])
  return {
    rows,
    pixel,
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -rows.length * pixel,
    speed: pixel * 9,
    vx: 0,
    vy: 0,
    color: pick(COLORS),
    alpha: 0.12 + Math.random() * 0.18,
  }
}

const Background = () => {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let sprites = []
    let frameId = 0
    let last = performance.now()

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const s of sprites) {
        ctx.globalAlpha = s.alpha
        ctx.fillStyle = s.color
        s.rows.forEach((row, r) => {
          for (let c = 0; c < row.length; c++) {
            if (row[c] === '1') {
              ctx.fillRect(
                Math.round(s.x + c * s.pixel),
                Math.round(s.y + r * s.pixel),
                s.pixel,
                s.pixel
              )
            }
          }
        })
      }
    }

    const update = (dt) => {
      const damping = Math.exp(-3 * dt)
      for (const s of sprites) {
        const cx = s.x + (s.rows[0].length * s.pixel) / 2
        const cy = s.y + (s.rows.length * s.pixel) / 2
        const dx = cx - mouse.x
        const dy = cy - mouse.y
        const dist = Math.hypot(dx, dy)

        if (dist < REPULSE_RADIUS && dist > 0) {
          const push = (1 - dist / REPULSE_RADIUS) * 900 * dt
          s.vx += (dx / dist) * push
          s.vy += (dy / dist) * push
        }

        s.vx *= damping
        s.vy *= damping
        s.x += s.vx * dt
        s.y += (s.speed + s.vy) * dt

        if (s.y > height || s.x < -150 || s.x > width + 150) {
          Object.assign(s, createSprite(width, height, false))
        }
      }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(120, Math.max(30, Math.floor(width / 50)))
      sprites = Array.from({ length: count }, () =>
        createSprite(width, height, true)
      )
      draw()
    }

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      update(dt)
      draw()
      frameId = requestAnimationFrame(tick)
    }

    const handleMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)

    if (!reduceMotion) {
      window.addEventListener('pointermove', handleMove)
      document.documentElement.addEventListener('mouseleave', handleLeave)
      frameId = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [reduceMotion])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
        }}
      />
    </div>
  )
}

export default Background