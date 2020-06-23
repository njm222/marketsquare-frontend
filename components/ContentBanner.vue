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
        image will go here
        <v-img>{{img}}</v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
    export default {
      name: "Banner",
      props: {
        index: Number,
        title: String,
        content: String,
        img: String
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
  padding: 5em 0;
  display: flex;
  justify-content: space-between;
}
.banner-container.right {
  flex-direction: row-reverse;
}
.banner-text {
  width: 45%;
}
.banner-image {
  width: 45%;
}
</style>
