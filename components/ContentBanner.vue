<template>
  <div class="banner"
       v-bind:class="{ right: index % 2 === 1 }"
  >
    <v-container class="banner-container"
                 v-bind:class="{ right: index % 2 === 1 }"
    >
      <div class="banner-text">
        <h1 class="banner-title" v-html="title"></h1>
        <p class="banner-content" v-html="text"></p>
      </div>
      <div class="banner-image">
        image will go here
        <v-img></v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
    export default {
      name: "Banner",
      props: {
        index: Number
      },
      data () {
        return {
          title: 'Make your Target Audience<br>Follow you',
          text: 'Through thorough market analysis we identify who your customers are while showing you how to understand, approach and engage them <br><br> Identifying potential customers, targeting them and converting them to active leads.',
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
