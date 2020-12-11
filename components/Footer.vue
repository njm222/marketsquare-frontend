<template>
  <v-footer
    dark
    padless
    class="footer"
  >
    <v-card
      flat
      tile
      class="accent text-center"
      width="100%"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          light
          icon
          color="#FFF"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-spacer />

      <v-card-text class="white--text">
        Copyright © {{ new Date().getFullYear() }} Market Square Media Solutions  |  All Rights Reserved  |  Terms & Conditions  |  Privacy Policy
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  })
}
</script>

<style scoped>
.footer .v-btn:not(.v-btn--round).v-size--default {
  padding: 0;
}
</style>
