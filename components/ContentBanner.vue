<template>
  <div class="banner"
       v-bind:class="{ right: index % 2 === 1 }"
  >
    <v-container class="banner-container"
                 v-bind:class="{ right: index % 2 === 1 }"
    >
      <div class="banner-text">
        <div class="banner-title text-h5 py-4" v-html="title"></div>
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
  height: 50vh;
}
.banner-container {
  display: flex;
  justify-content: space-around;
}
.banner-text {
  padding: 5vh 0;
  width: 45%;
}
.banner-image {
  width: 35%;
}
.banner.right {
  height: 35vh;
  background: #FFE500;
}
.banner-container.right {
  flex-direction: row-reverse;
}
.banner-container.right .banner-image {
  width: 45%;
  margin-top: -14vh;
}
</style>
