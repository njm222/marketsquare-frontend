<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <TopBanner
      :landing-title="home.landingTitle"
      :landing-subtitle="home.landingSubtitle"
      :landing-quote-icon="home.quoteIcon"
      :landing-quotes="home.landingQuotes"
    />
    <div
      v-for="(banner, index) in home.landingBanners"
      :key="`home-content-banner-${index}`"
      class="banner"
    >
      <Banner
        :index="index"
        :title="banner.title"
        :content="banner.text"
        :image="banner.image"
      />
    </div>
    <Services :items="home.serviceItems" />
    <ContactForm :contact-details="home.contactDetails" />
  </v-layout>
</template>

<script>
import HomeQuery from '~/apollo/queries/home/homeQuery'
import Banner from '~/components/ContentBanner'
import TopBanner from '~/components/TopBanner/TopBanner'
import Services from '~/components/Services/Services'
import ContactForm from '~/components/Contact/ContactForm'

export default {
  components: {
    ContactForm,
    Services,
    Banner,
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
  }
}
</script>
<style>
  .banner {
    width: 100%;
  }
</style>
