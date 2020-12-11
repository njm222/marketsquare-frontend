<template>
  <v-app dark>
    <v-app-bar
      color="#FFFF00"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div
      v-if="!isMobile"
      >
        <navbar-nav></navbar-nav>
      </div>
      <v-app-bar-nav-icon
        v-if="isMobile"
        @click.stop="drawer = !drawer"
      />
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :right="right"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  import Footer from '~/components/Footer'
  import NavbarNav from "~/layouts/navbarNav";

export default {
  computed: mapState([
    'isMobile'
  ]),
  components: {NavbarNav, Footer },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
      ],
      miniVariant: false,
      right: true,
      title: 'MarketSquare'
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize () {
      this.$store.commit('setIsMobile', (window.innerWidth < 768))
    },
  },
}
</script>

<style lang="sass">
@import "./assets/variables.scss"
</style>
