<template>
  <div class="top-banner">
    <v-container class="banner-container"
    >
      <div class="banner-text">
        <h1 class="landing-title" v-html="landingTitle"></h1>
        <p class="landing-subtitle" v-html="landingSubtitle"></p>
      </div>
      <div class="banner-quote">
        <div>"{{landingQuote}}"</div>
        <div class="quote-author">{{landingAuthor}}</div>
      </div>
    </v-container>
  </div>
</template>

<script>
    export default {
      name: "TopBanner",
      data () {
        return {
          landingTitle: 'We help lead<br>customers to your business',
          landingSubtitle: 'Because your growth is our top priority',
          landingQuote: 'Simplicity is the ultimate sophistication',
          landingAuthor: '-Leonardo Da Vinci'
        }
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
.banner-text .landing-title {
  text-transform: capitalize;
}
.banner-quote {
  display: flex;
  flex-direction: column;
  align-self: center;
}
.banner-quote .quote-author {
  align-self: flex-end;
  font-weight: bold;
}
</style>
