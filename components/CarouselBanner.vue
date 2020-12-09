<template>
  <div id="services">
    <v-container
      class="services"
    >
      <v-row>
          <v-col
            v-for="item in items"
            :key="item.id + '-service'"
            cols="12"
            sm="6"
            md="4"
          >
            <div v-if="item.text"
              class="service-container service-card"
            >
              <div class="service-image">
                <v-img
                  v-if="APIURL && item.image"
                  :src="APIURL + item.image.url"
                  :lazy-src="APIURL + item.image.url"
                ></v-img>
              </div>
              <div class="service-text">
                <div class="text-h6 pb-2 font-weight-bold">{{item.title}}</div>
                <div class="text">{{item.text}}</div>
              </div>
            </div>
            <div v-else-if="!isMobile"
              class="service-container"
            >
              <div class="service-text">
                <div class="text-h4 pb-2 font-weight-bold">{{item.title}}</div>
              </div>
            </div>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    export default {
      name: "CarouselBanner",
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
          APIURL: process.env.APIURL,
          model: 0
        }
      },
    }
</script>

<style scoped>
.services {
  padding: 5vh 0;
}
.service-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.service-image {
  max-width: 100px;
  margin-bottom: 1em;
}
.service-text {
  text-align: center;
  margin: 0 1em;
}
.text {
  opacity: 0;
  transition-duration: 0.7s;
  transition-property: opacity;
}
.service-card:hover .text {
  opacity: 100%;
}
.service-card {
  opacity: 50%;
  color: rgba(0, 0, 0, 0.87);
  transition-duration: 1s;
  transition-property: opacity, background-color, opacity, border, box-shadow;
}
.service-card:hover {
  opacity: 100%;
  background-color: #FFE500;
  border: 2px #FFF solid;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
