<template>
  <div
    class="banner"
    :class="{ right: index % 2 === 1 }"
  >
    <v-container
      class="banner-container"
      :class="{ right: index % 2 === 1 }"
    >
      <div class="banner-text">
        <div class="banner-title text-h5 py-4" v-html="title" />
        <p class="banner-content" v-html="content" />
      </div>
      <div class="banner-image">
        <v-lazy
          :options="{
            threshold: .5
          }"
        >
          <v-img
            v-if="image"
            :src="image.url"
            :lazy-src="image.url"
          />
        </v-lazy>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Banner',
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner-image {
  width: 40%;
}
.banner.right {
  height: 35vh;
  background: #FFE500;
}
.banner-container.right {
  flex-direction: row-reverse;
}
.banner-container.right .banner-text {
  margin-top: -10%;
}
.banner-container.right .banner-image {
  width: 45%;
  margin-top: -10%;
}

@media only screen and (max-width: 768px) {
  .banner,
  .banner.right {
    height: auto;
    padding: 10% 5%;
  }
  .banner-container,
  .banner-container.right {
    flex-direction: column-reverse;
  }

  .banner-text {
    padding: 0;
    width: 80%;
    margin: -10% auto auto;
  }

  .banner-container .banner-image,
  .banner-container.right .banner-image {
    width: 90%;
    margin: -10% auto auto;
  }

  .banner-container.right .banner-image {
    margin: -33% auto auto;
  }
}
</style>
