<template>
  <v-app dark>
    <v-app-bar
      color="#FFFF00"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <navbar-nav />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/Footer'
import NavbarNav from '~/layouts/navbarNav'

export default {
  components: { NavbarNav, Footer },
  data () {
    return {
      fixed: false,
      title: 'MarketSquare'
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') { return }

    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize () {
      this.$store.commit('setIsMobile', (window.innerWidth < 768))
    }
  }
}
</script>
