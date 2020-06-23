<template>
  <div class="top-banner">
    <v-container class="banner-container"
    >
      <div class="banner-text">
        <h1 class="landing-title" v-html="landingTitle"></h1>
        <p class="landing-subtitle" v-html="landingSubtitle"></p>
      </div>
      <div class="banner-quote">
        <v-carousel cycle
                    hide-delimiters
                    :show-arrows=false
                    height="auto"
        >
          <v-carousel-item v-for="quote in landingQuotes">
            <div class="quote">"{{quote.quoteText}}"</div>
            <div class="quote-author">{{quote.quoteAuthor}}</div>
          </v-carousel-item>
        </v-carousel>
      </div>
    </v-container>
  </div>
</template>

<script>
    export default {
      name: "TopBanner",
      data () {
        return {
          landingQuote: 'Simplicity is the ultimate sophistication.',
          landingAuthor: '-Leonardo Da Vinci'
        }
      },
      props: {
        landingTitle: String,
        landingSubtitle: String,
        landingQuotes: Array
      }
    }
</script>

<style scoped>
.top-banner {
  width: 100%;
  background: #FFE500;
}
.banner-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.banner-text {
  margin-top: 15%;
  max-width: 400px;
}
.banner-quote {
  display: flex;
  flex-direction: column;
  align-self: center;
  font-style: italic;
}
.banner-quote .quote {
  color: #000;
}
.banner-quote .quote-author {
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  color: #000;
}
</style>
