<template>
  <div class="sceneContainer" ref="sceneContainer" @click="initExplode"></div>
</template>

<script type="module">
  import * as THREE from 'three'
  import Stats from 'stats.js'
    export default {
      name: "CubeThree",
      data() {
        return {
          stats: Stats,
          cube: null,
          cubeParticles: [],
          composer: null,
          renderer: null,
          scene: null,
          camera: null,
          exploding: false,
          particleSize: 1,
          particleColour: 0x2828FF,
          particleSpeed: 10,
          dirs: [],
          limit: 300,
          interval: 0
        }
      },
      methods: {
        init: function() {
          this.stats = new Stats()
          this.stats.showPanel( 1 )
          document.body.appendChild( this.stats.dom )
          /** Scene setup */
          this.scene = new THREE.Scene()
          this.scene.background = new THREE.Color( 0xFFF500 );
          this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / (window.innerHeight * 7.5 / 10),
            0.1,
            1000
          )
          this.renderer = new THREE.WebGLRenderer()
          this.renderer.setSize(window.innerWidth, window.innerHeight * 7.5 / 10)
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
          const geometry = new THREE.BoxGeometry(30, 30, 30, 15, 15, 15)
          const particleGeo = new THREE.BoxBufferGeometry(2, 2, 2)
          const particleMat = new THREE.MeshLambertMaterial({color: this.particleColour, precision: 'highp' })
          const particleCube = new THREE.Mesh(particleGeo, particleMat)
          this.cube = new THREE.Group()

          for (let i = 0; i < geometry.vertices.length; i ++)
          {
            /** create each particleCube */
            const shape = particleCube.clone()
            const vertex = geometry.vertices[i]
            shape.position.set(vertex.x, vertex.y, vertex.z)
            this.cubeParticles.push(shape)
            this.cube.add(shape)

            /** direction vector of each particle */
            this.dirs[i] = ({
              x:(Math.random() * this.particleSpeed)-(this.particleSpeed/2),
              y:(Math.random() * this.particleSpeed)-(this.particleSpeed/2),
              z:(Math.random() * this.particleSpeed)-(this.particleSpeed/2)
            });
          }
          this.cube.position.set(window.innerWidth * 3 / 100, 5, -5)
          this.scene.add(this.cube)

          /** Lighting setup */
          const color = 0xFFFFFF;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          const ambiLight = new THREE.AmbientLight(0x404040)
          light.position.set(2, 5, 4);
          this.scene.add(light);
          this.scene.add(ambiLight);
        },
        animate () {
          this.stats.begin()
          if (!this.exploding) {
            this.cube.rotation.x += 0.01
            this.cube.rotation.y += 0.01
          } else {
            this.explode(this.cube)
          }
          this.stats.end()
          requestAnimationFrame(this.animate)
          //this.composer.render(this.scene, this.camera)
          this.renderer.render(this.scene, this.camera)
        },
        initExplode () {
          this.exploding = !this.exploding
        },
        explode () {
          let particleCount = this.cubeParticles.length;
          while(particleCount-- > 0) {
            const particle =  this.cubeParticles[particleCount]
            if (this.interval >= 100) {
              particle.position.x -= this.dirs[particleCount].x
              particle.position.y -= this.dirs[particleCount].y
              particle.position.z -= this.dirs[particleCount].z
              particle.rotation.x -= this.dirs[particleCount].x / 10
              particle.rotation.z -= this.dirs[particleCount].z / 10
            } else if ( this.interval < 80) {
              particle.position.x += this.dirs[particleCount].x
              particle.position.y += this.dirs[particleCount].y
              particle.position.z += this.dirs[particleCount].z
              particle.rotation.x += this.dirs[particleCount].x / 10
              particle.rotation.z += this.dirs[particleCount].z / 10
              // add gravity
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
          window.addEventListener('resize', re => {
            const width = window.innerWidth
            const height = window.innerHeight * 7.5 / 10
            this.camera.aspect = width / height
            this.renderer.setSize(width, height)
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.camera.updateProjectionMatrix()
          })
        }
      },
      mounted () {
        this.init()
        this.animate()
        this.resizeCanvas()
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
