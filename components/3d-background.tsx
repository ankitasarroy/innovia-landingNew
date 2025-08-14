"use client"

import { useEffect, useRef } from "react"

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 3D floating particles
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      rotation: number
      rotationSpeed: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 1,
        color: Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    let mouseX = 0
    let mouseY = 0

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz
        particle.rotation += particle.rotationSpeed

        // Mouse interaction - 3D effect
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += dx * force * 0.001
          particle.vy += dy * force * 0.001
        }

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        if (particle.z < 0 || particle.z > 1000) particle.vz *= -1

        // 3D projection
        const perspective = 1000
        const scale = perspective / (perspective + particle.z)
        const projectedX = particle.x * scale
        const projectedY = particle.y * scale
        const projectedSize = particle.size * scale

        // Draw particle with 3D effect
        ctx.save()
        ctx.translate(projectedX, projectedY)
        ctx.rotate(particle.rotation)

        // Create 3D cube effect
        ctx.fillStyle = particle.color
        ctx.globalAlpha = 0.6 * scale

        // Draw multiple layers for 3D effect
        for (let layer = 0; layer < 3; layer++) {
          const layerOffset = layer * 2
          const layerSize = projectedSize - layer

          ctx.fillRect(-layerSize / 2 - layerOffset, -layerSize / 2 - layerOffset, layerSize, layerSize)
          ctx.globalAlpha *= 0.7
        }

        ctx.restore()

        // Connect nearby particles with 3D lines
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const dz = particle.z - otherParticle.z
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance3D < 150) {
            const otherScale = perspective / (perspective + otherParticle.z)
            const otherProjectedX = otherParticle.x * otherScale
            const otherProjectedY = otherParticle.y * otherScale

            ctx.beginPath()
            ctx.moveTo(projectedX, projectedY)
            ctx.lineTo(otherProjectedX, otherProjectedY)
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance3D / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
