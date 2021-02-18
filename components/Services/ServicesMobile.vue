<template>
  <div class="services">
    <div class="title text-h4 font-weight-bold">
      We Indulge in Such Services & Much More
    </div>
    <v-carousel
      height="60vh"
      hide-delimiters
      show-arrows="false"
      progress
      progress-color="#000"
    >
      <v-carousel-item
        v-for="item in items.filter((item) => (item.text))"
        :key="item.id + '-service'"
        reverse-transition="slide-x"
        transition="slide-x-reverse"
        class="service-card"
      >
        <div
          class="service-container"
        >
          <div class="service-image">
            <v-lazy
              :options="{
                threshold: .5
              }"
            >
              <v-img
                v-if="item.image"
                :src="item.image.url"
                :lazy-src="item.image.url"
              />
            </v-lazy>
          </div>
          <div class="text-h6 pb-2 font-weight-bold">
            {{ item.title }}
          </div>
          <div class="text">
            {{ item.text }}
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ServicesMobile',
  props: {
    items: {
      title: String,
      text: String,
      image: {
        url: String
      }
    }
  },
  data () {
    return {
      model: 0
    }
  },
  computed: mapState([
    'isMobile'
  ])
}
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 1em;
}
.service-container {
  padding: 3em 2em;
  height: 54vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
}
.service-image {
  max-width: 100px;
  margin-bottom: 1em;
}
.service-card {
  height: 90%;
  margin: 0 2em;
  background-color: #FFE500;
  border: 2px #FFF solid;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
