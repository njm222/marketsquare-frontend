<template>
  <div class="banner"
       v-bind:class="{ right: index % 2 === 1 }"
  >
    <v-container class="banner-container"
                 v-bind:class="{ right: index % 2 === 1 }"
    >
      <div class="banner-text">
        <h1 class="banner-title" v-html="title"></h1>
        <p class="banner-content" v-html="content"></p>
      </div>
      <div class="banner-image">
        <v-img
          v-if="image && this.APIURL"
          :src="this.APIURL + image.url"
          :lazy-src="this.APIURL + image.url"
        ></v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
    export default {
      name: "Banner",
      data () {
        return {
          APIURL: process.env.APIURL
        }
      },
      props: {
        index: Number,
        title: String,
        content: String,
        image: {
          url: String
        }
      }
    }
</script>

<style scoped>
.banner {
  width: 100%;
}
.banner.right {
  background: #FFE500;
}
.banner-container {
  padding: 7em 0;
  display: flex;
  justify-content: space-around;
}
.banner-container.right {
  padding: 4em 0;
}
.banner-container.right {
  flex-direction: row-reverse;
}
.banner-text {
  width: 45%;
}
.banner-image {
  width: 30%;
  margin: -5vw 0;

}
.banner-container.right .banner-image {
  width: 45%;
  max-width: 400px;
  height: 0;
  margin: -7em 0;
}
</style>
