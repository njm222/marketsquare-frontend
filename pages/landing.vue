<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <TopBanner />
    <Banner :index="0" />
    <Banner :index="1" />
    <Banner :index="2" />
  </v-layout>
</template>

<script>
import Banner from '~/components/ContentBanner'
import Logo from '~/components/Logo.vue'
import TopBanner from '~/components/TopBanner'

export default {
  components: {
    Banner,
    Logo,
    TopBanner
  }
}
</script>
