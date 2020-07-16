<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <TopBanner :landingTitle="home.landingTitle"
               :landingSubtitle="home.landingSubtitle"
               :landingQuoteIcon="home.quoteIcon"
               :landingQuotes="home.landingQuotes"
    />
    <div class="banner" v-for="(banner, index) in home.landingBanners">
      <Banner :index="index" :title="banner.bannerTitle"
              :content="banner.bannerText"
              v-bind:image="banner.bannerImage"
              :key="`home-content-banner-${index}`"
      />
    </div>
    <CarouselBanner v-bind:items="home.productContainer" />
    <ContactForm />
  </v-layout>
</template>

<script>
import Banner from '~/components/ContentBanner'
import Logo from '~/components/Logo.vue'
import TopBanner from '~/components/TopBanner'
import HomeQuery from '~/apollo/queries/home/homeQuery'
import CarouselBanner from '~/components/CarouselBanner'
import ContactForm from '~/components/ContactForm'

export default {
  components: {
    ContactForm,
    CarouselBanner,
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
