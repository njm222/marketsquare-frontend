<template>
  <div ref="sceneContainer" class="sceneContainer" @click="initExplode" />
</template>

<script type="module">
import * as THREE from 'three'
export default {
  name: 'CubeThree',
  data () {
    return {
      cube: null,
      cubeParticles: [],
      composer: null,
      renderer: null,
      scene: null,
      camera: null,
      exploding: false,
      y: 1,
      particleSize: 1,
      particleColour: 0xEC474C,
      particleSpeed: 10,
      dirs: [],
      limit: 300,
      interval: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.init()
      this.animate()
      this.resizeCanvas()
    }, 0)
  },
  methods: {
    init () {
      /** Scene setup */
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xFFF500)
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / (window.innerHeight * 9 / 10),
        0.1,
        1000
      )
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight * 9 / 10)
      this.$refs.sceneContainer.appendChild(this.renderer.domElement)
      this.camera.position.z = 75

      /** Postprocessing setup
          this.composer = EffectComposer( this.renderer );
          this.composer.addPass( new RenderPass( this.scene, this.camera ) );

          const afterimagePass = new AfterimagePass();
          this.composer.addPass( afterimagePass );
          this.composer.passes[1].uniforms.damp.value = 0.7
           */

      /** Particle setup */
      const geometry = new THREE.BoxGeometry(30, 30, 30, 5, 5, 5)
      const particleGeo = new THREE.BoxBufferGeometry(6, 6, 6)
      const particleMat = new THREE.MeshLambertMaterial({ color: this.particleColour, precision: 'highp' })
      const particleCube = new THREE.Mesh(particleGeo, particleMat)
      this.cube = new THREE.Group()

      for (let i = 0; i < geometry.vertices.length; i++) {
        /** create each particleCube */
        const shape = particleCube.clone()
        const vertex = geometry.vertices[i]
        shape.position.set(vertex.x, vertex.y, vertex.z)
        this.cubeParticles.push(shape)
        this.cube.add(shape)

        /** direction vector of each particle */
        this.dirs[i] = ({
          x: (Math.random() * this.particleSpeed) - (this.particleSpeed / 3),
          y: (Math.random() * this.particleSpeed) - (this.particleSpeed / 3),
          z: (Math.random() * this.particleSpeed) - (this.particleSpeed / 3)
        })
      }
      this.cube.position.set(window.innerWidth * 3 / 100, 5, -5)
      this.scene.add(this.cube)

      /** Lighting setup */
      const color = 0xFFFFFF
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      const ambiLight = new THREE.AmbientLight(0x404040)
      light.position.set(2, 5, 4)
      this.scene.add(light)
      this.scene.add(ambiLight)
    },
    animate () {
      if (!this.exploding) {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
      } else {
        this.explode(this.y)
      }
      requestAnimationFrame(this.animate)
      // this.composer.render(this.scene, this.camera)
      this.renderer.render(this.scene, this.camera)
    },
    initExplode () {
      if (this.interval === 0) {
        this.y = Math.random() * 2
      }
      this.exploding = !this.exploding
    },
    explode (y) {
      let particleCount = this.cubeParticles.length
      while (particleCount-- > 0) {
        const particle = this.cubeParticles[particleCount]
        if (this.interval >= 100) {
          const multiplier = Math.sqrt(Math.pow(this.interval - 99, y))
          particle.position.x -= this.dirs[particleCount].x / multiplier
          particle.position.y -= this.dirs[particleCount].y / multiplier
          particle.position.z -= this.dirs[particleCount].z / multiplier
          particle.rotation.x -= this.dirs[particleCount].x / (10 * multiplier)
          particle.rotation.z -= this.dirs[particleCount].z / (10 * multiplier)
        } else if (this.interval < 80) {
          const multiplier = Math.sqrt(Math.pow(this.interval + 1, y))
          particle.position.x += this.dirs[particleCount].x / multiplier
          particle.position.y += this.dirs[particleCount].y / multiplier
          particle.position.z += this.dirs[particleCount].z / multiplier
          particle.rotation.x += this.dirs[particleCount].x / (10 * multiplier)
          particle.rotation.z += this.dirs[particleCount].z / (10 * multiplier)
        }
      }

      this.interval++

      if (this.interval >= 180) {
        // reset interval
        this.interval = 0
        this.exploding = false
      }
    },
    resizeCanvas () {
      window.addEventListener('resize', () => {
        const width = window.innerWidth
        const height = window.innerHeight * 9 / 10
        this.camera.aspect = width / height
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.camera.updateProjectionMatrix()
      })
    }
  }
}
</script>

<style scoped>
.sceneContainer {
  height: 100%;
  width: fit-content;
  position: absolute;
  right: 0;
  cursor: pointer;
}
</style>
