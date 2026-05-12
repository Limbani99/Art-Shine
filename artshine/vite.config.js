import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'gsap/Draggable', 'lenis'],
  },
  server: {
    allowedHosts: ["gaming-panorama-poem.ngrok-free.dev"]
  }
})

