<template>
  <div>
    <v-row justify="end">
      <v-col v-for="item in computedNavItems" :key="item.label">
        <a :href="item.link" class="navbar-nav-item" @click="navigate(item.value)">
          <v-btn
            v-if="item.alternate"
            rounded
            raised
            dark
          >
            {{ item.label }}
          </v-btn>
          <v-btn
            v-else
            text
          >
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.label }}
          </v-btn>
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavbarNav',
  data () {
    return {
      navItems: [
        { label: 'Our Services', value: '#services' },
        { label: '+91 832 908 6623', link: 'tel:+918329086623', icon: 'mdi-whatsapp' },
        { label: 'Contact Us', value: '#contact', alternate: true }
      ]
    }
  },
  computed: {
    ...mapState([
      'isMobile'
    ]),
    computedNavItems() {
      return this.isMobile ? this.$data.navItems.slice(1, 2) : this.$data.navItems
    }
  },
  methods: {
    navigate (ref) {
      if (!ref) { return }

      document.querySelector(ref).scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.navbar-nav-item {
  color: #131313;
  text-decoration: none;
}
</style>
