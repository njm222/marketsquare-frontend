<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <TopBanner :landingTitle="home.landingTitle"
               :landingSubtitle="home.landingSubtitle"
               :landingQuotes="home.landingQuotes"
    />
    <div class="banner" v-for="(banner, index) in home.landingBanners">
      <Banner :index="index" :title="banner.bannerTitle"
              :content="banner.bannerText"
              :image="banner.bannerImage"
      />
    </div>
  </v-layout>
</template>

<script>
import Banner from '~/components/ContentBanner'
import Logo from '~/components/Logo.vue'
import TopBanner from '~/components/TopBanner'
import HomeQuery from '~/apollo/queries/home/homeQuery'

export default {
  components: {
    Banner,
    Logo,
    TopBanner
  },
  data () {
    return {
      home: []
    }
  },
  apollo: {
    home: {
      prefetch: true,
      query: HomeQuery
    }
  },
}
</script>
<style>
  .banner {
    width: 100%;
  }
</style>
