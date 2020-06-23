<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <TopBanner />
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import TopBanner from '~/components/TopBanner'

export default {
  components: {
    Logo,
    TopBanner
  }
}
</script>
