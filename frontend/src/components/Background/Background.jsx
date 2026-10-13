import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useReducedMotion } from 'motion/react'
// import {
//   motion,
//   useMotionValue,
//   useSpring,
//   useReducedMotion,
// } from 'motion/react'

// const CursorGlow = () => {
//   const x = useMotionValue(-200)
//   const y = useMotionValue(-200)
//   const springX = useSpring(x, { stiffness: 120, damping: 20 })
//   const springY = useSpring(y, { stiffness: 120, damping: 20 })

//   useEffect(() => {
//     const handleMove = (e) => {
//       x.set(e.clientX - 100)
//       y.set(e.clientY - 100)
//     }
//     window.addEventListener('pointermove', handleMove)
//     return () => window.removeEventListener('pointermove', handleMove)
//   }, [x, y])

//   return (
//     <motion.div
//       aria-hidden="true"
//       style={{ x: springX, y: springY }}
//       className="pointer-events-none fixed left-0 top-0 z-0 h-[50px] w-[50px] rounded-full bg-[#63C7BE]/10 blur-2xl"
//     />
//   )
// }

const Background = () => {
  const [ready, setReady] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 60 },
        color: { value: ['#63C7BE', '#99E1D9'] },
        opacity: { value: { min: 0.2, max: 0.6 } },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          color: '#99E1D9',
          distance: 140,
          opacity: 0.15,
        },
        move: {
          enable: !reduceMotion,
          speed: 0.6,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.4 } },
        },
      },
    }),
    [reduceMotion]
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    >
      {ready && (
        <Particles id="tsparticles" options={options} className="h-full w-full" />
      )}
      {/* {!reduceMotion && <CursorGlow />} */}
    </div>
  )
}

export default Background