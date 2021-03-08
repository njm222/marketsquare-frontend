<template>
  <div ref="sceneContainer" class="sceneContainer" @click="initExplode" />
</template>

<script type="module">
import * as THREE from 'three'
import Stats from 'stats.js'
export default {
  name: 'CubeThree',
  data () {
    return {
      stats: Stats,
      cube: null,
      floor: null,
      cubeParticles: [],
      composer: null,
      renderer: null,
      scene: null,
      camera: null,
      exploding: false,
      y: 1,
      particleSize: 1,
      particleColour: 0xA5402D,
      particleSpeed: 10,
      dirs: [],
      limit: 300,
      interval: 0
    }
  },
  mounted () {
    this.init()
    this.animate()
    this.resizeCanvas()
  },
  methods: {
    init () {
      this.stats = new Stats()
      this.stats.showPanel(1)
      document.body.appendChild(this.stats.dom)
      /** Scene setup */
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xFFF500)
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / (window.innerHeight * 7.5 / 10),
        0.1,
        1000
      )
      this.camera.rotation.set(0, 0, 0)
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight * 7.5 / 10)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMapType = THREE.PCFSoftShadowMap
      this.$refs.sceneContainer.appendChild(this.renderer.domElement)
      this.camera.position.z = 100

      /** Postprocessing setup
          this.composer = EffectComposer( this.renderer );
          this.composer.addPass( new RenderPass( this.scene, this.camera ) );

          const afterimagePass = new AfterimagePass();
          this.composer.addPass( afterimagePass );
          this.composer.passes[1].uniforms.damp.value = 0.7
           */

      const loader = new THREE.TextureLoader()
      const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png')
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.magFilter = THREE.NearestFilter
      const repeats = 500 / 2
      texture.repeat.set(repeats, repeats)
      /** Floor setup */
      const floorGeo = new THREE.PlaneBufferGeometry(1000, 1000)
      const floorMat = new THREE.MeshPhongMaterial()
      this.floor = new THREE.Mesh(floorGeo, floorMat)
      this.floor.receiveShadow = true

      /** Particle setup */
      const cubeGeo = new THREE.BoxGeometry(30, 30, 30, 5, 5, 5)
      const particleGeo = new THREE.BoxBufferGeometry(6, 6, 6)
      const particleMat = new THREE.MeshPhongMaterial({ color: this.particleColour, precision: 'highp' })
      const particleCube = new THREE.Mesh(particleGeo, particleMat)
      particleCube.castShadow = true
      this.cube = new THREE.Group()

      /** Cube positioning */
      this.cube.position.set(window.innerWidth * 3 / 100, 5, -5)
      this.scene.add(this.cube)

      /** Floor positioning */
      this.floor.position.set(0, -75, 0)
      this.floor.rotation.set(-Math.PI / 2, 0, 0)
      this.scene.add(this.floor)

      for (let i = 0; i < cubeGeo.vertices.length; i++) {
        /** create each particleCube */
        const shape = particleCube.clone()
        const vertex = cubeGeo.vertices[i]
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

      /** Lighting setup */
      const color = 0xFFFFFF
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      const ambiLight = new THREE.AmbientLight(0x404040)
      light.position.set(0, 100, 90)
      light.target = this.scene
      light.castShadow = true
      const shadowResolution = 4096 * 2
      light.shadow.mapSize.width = shadowResolution
      light.shadow.mapSize.height = shadowResolution
      const side = 1000
      light.shadow.camera.top = side
      light.shadow.camera.bottom = -side
      light.shadow.camera.left = side
      light.shadow.camera.right = -side
      this.scene.add(light)
      this.scene.add(ambiLight)
    },
    animate () {
      this.stats.begin()
      if (!this.exploding) {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
      } else {
        this.explode(this.y)
      }
      this.stats.end()
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
        const height = window.innerHeight * 7.5 / 10
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
  height: 75vh;
  width: fit-content;
  position: absolute;
  right: 0;
}
</style>
