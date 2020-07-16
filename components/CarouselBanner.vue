<template>
  <div>
    <v-container>
      <div class="product-titles">
        <h1>You build your Business with Love</h1>
        <h1>We help you find Cutomers that’ll Love it</h1>
        <v-tabs
          v-model="model"
          grow
          color=primary
        >
          <v-tab v-for="item in items" :key="item.id + '-tab'">{{item.title}}</v-tab>
        </v-tabs>
      </div>
    </v-container>
    <v-carousel
        light
        hide-delimiters
        height="auto"
        v-model="model"
        prev-icon="mdi-arrow-left"
        next-icon="mdi-arrow-right"
        class="product-carousel-container"

      >
        <v-carousel-item
            v-for="item in items"
            :key="item.id"
            class="product-carousel"
          >
            <v-card
              class="carousel-card"
              color="#FFF"
              elevation=4
            >
              <div
                v-for="(banner, index) in item.productItem"
                :key="item.id + '-banner-' + index"
                class="product-item"
                v-bind:class="{ right: index % 2 === 1 }"
              >
                <div class="product-text">
                  <h2>{{banner.bannerTitle}}</h2>
                  <p>{{banner.bannerText}}</p>
                </div>
                <div class="product-image">
                  <v-img
                    v-if="APIURL && banner.bannerImage"
                    :src="APIURL + banner.bannerImage.url"
                    :lazy-src="APIURL + banner.bannerImage.url"
                  ></v-img>
                </div>
              </div>
            </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
    export default {
      name: "CarouselBanner",
      data () {
        return {
          APIURL: process.env.APIURL,
          model: 0
        }
      },
      props: {
        items: {
          title: String,
          productItem: {
            bannerTitle: String,
            bannerText: String,
            bannerImage: {
              url: String
            }
          }
        }
      }
    }
</script>

<style scoped>
.product-titles {
  text-align: center;
}
.product-titles .v-tab {
  color: #000;
}
.carousel-card {
  margin: 1vh 4vw;
  padding: 3vw 5vw;
  border: 1px solid #000;
}
.product-item {
  display: flex;
  justify-content: flex-start;
  padding: 2vh 0;
}
.product-text {
  width: 45%;
  display: flex;
  flex-direction: column;
  color: #000;
}
.product-image {
  margin-left: 10%;
}
.product-item.right {
  flex-direction: row-reverse;
}
.product-item.right .product-text {
  margin-left: 10%;
}
.product-item.right .product-image {
  margin-left: 0;
}
</style>
