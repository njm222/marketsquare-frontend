<template>
  <div class="sceneContainer" ref="sceneContainer" @click="initExplode"></div>
</template>

<script type="module">
  import * as THREE from 'three'
    export default {
      name: "CubeThree",
      data() {
        return {
          cube: null,
          cubeParticles: null,
          composer: null,
          renderer: null,
          scene: null,
          camera: null,
          exploding: false,
          particleSize: 1,
          particleColour: 0x000000,
          particleSpeed: 10,
          dirs: [],
          limit: 300,
          interval: 0
        }
      },
      methods: {
        init: function() {
          /** Scene setup */
          this.scene = new THREE.Scene()
          this.scene.background = new THREE.Color( 0xFFF500 );
          this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / (window.innerHeight * 6 / 10),
            0.1,
            1000
          )
          this.renderer = new THREE.WebGLRenderer()
          this.renderer.setSize(window.innerWidth, window.innerHeight * 6 / 10)
          this.$refs.sceneContainer.appendChild(this.renderer.domElement)
          this.camera.position.z = 50

          /** Postprocessing setup
          this.composer = EffectComposer( this.renderer );
          this.composer.addPass( new RenderPass( this.scene, this.camera ) );

          const afterimagePass = new AfterimagePass();
          this.composer.addPass( afterimagePass );
          this.composer.passes[1].uniforms.damp.value = 0.7
          */

          /** Particle setup */
          const geometry = new THREE.BoxGeometry(15, 15, 15, 50, 50, 50)
          const material = new THREE.PointsMaterial( {
            size: this.particleSize,
            color: this.particleColour
          });
          this.cube = new THREE.Points( geometry, material );
          this.cube.position.set(50, 8, -5)
          this.scene.add(this.cube)

          /** direction of each particle */
          for (let i = 0; i < this.cube.geometry.vertices.length; i ++)
          {
            this.dirs[i] = ({
              x:(Math.random() * this.particleSpeed)-(this.particleSpeed/2),
              y:(Math.random() * this.particleSpeed)-(this.particleSpeed/2),
              z:(Math.random() * this.particleSpeed)-(this.particleSpeed/2)
            });
          }

          /** Lighting setup */
          const color = 0xFFFFFF;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(2, 5, 4);
          this.scene.add(light);
        },
        animate () {
          requestAnimationFrame(this.animate)

          if (!this.exploding) {
            this.cube.rotation.x += 0.01
            this.cube.rotation.y += 0.01
          } else {
            this.explode(this.cube)
          }
          //this.composer.render(this.scene, this.camera)
          this.renderer.render(this.scene, this.camera)
        },
        initExplode () {
          this.exploding = !this.exploding
        },
        explode (shape) {
          let particleCount = shape.geometry.vertices.length;
          while(particleCount-- > 0) {
            const particle =  shape.geometry.vertices[particleCount]
            if (this.interval >= 100) {
              particle.x -= this.dirs[particleCount].x;
              particle.y -= this.dirs[particleCount].y;
              particle.z -= this.dirs[particleCount].z;
            } else if ( this.interval < 80) {
              particle.x += this.dirs[particleCount].x;
              particle.y += this.dirs[particleCount].y;
              particle.z += this.dirs[particleCount].z;
              // add gravity
            }
          }
          shape.geometry.verticesNeedUpdate = true;
          this.interval++
          if (this.interval >= 180) {
            // reset interval
            this.interval = 0
            this.exploding = false
          }
        }
      },
      mounted () {
        this.init()
        this.animate()
      }
    }
</script>

<style scoped>
.sceneContainer {
  height: 60vh;
  width: fit-content;
  position: absolute;
  right: 0;
}
</style>
