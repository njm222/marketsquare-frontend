<template>
  <div class="top-banner">
    <CubeThree />
    <v-container
      class="banner-container"
    >
      <div class="banner-text">
        <div class="landing-title text-h4" v-html="landingTitle" />
        <p class="landing-subtitle" v-html="landingSubtitle" />
        <v-btn
          rounded
          raised
          dark
          color="accent"
        >
          Here's how
        </v-btn>
      </div>
      <div class="banner-quote">
        <v-img
          v-if="landingQuoteIcon"
          :src="landingQuoteIcon.url"
          :lazy-src="landingQuoteIcon.url"
          width="36"
        />
        <v-carousel
          cycle
          hide-delimiters
          :show-arrows="false"
          height="auto"
        >
          <v-carousel-item v-for="quote in landingQuotes" :key="quote.id">
            <div class="quote">
              {{ quote.quoteText }}
            </div>
            <div class="quote-author">
              {{ quote.quoteAuthor }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </div>
    </v-container>
  </div>
</template>

<script>
import CubeThree from '~/components/TopBanner/CubeThree'
export default {
  name: 'TopBanner',
  components: {
    CubeThree
  },
  props: {
    landingTitle: String,
    landingSubtitle: String,
    landingQuoteIcon: {
      id: String,
      url: String
    },
    landingQuotes: Array
  },
}
</script>

<style scoped>
.top-banner {
  width: 100%;
  background: #FFE500;
}
.banner-container {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.banner-text {
  margin-top: 15%;
  max-width: 400px;
  z-index: 1;
}
.banner-quote {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  font-style: italic;
}
.banner-quote .quote {
  color: #000;
  padding: 0 1em;
}
.banner-quote .quote-author {
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  color: #000;
  padding: 0 1em;
}
</style>
