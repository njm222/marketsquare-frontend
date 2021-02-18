<template>
  <div id="services">
    <keep-alive>
      <ServicesMobile v-if="isMobile" :items="items" />
      <ServicesDesktop v-else :items="items" />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ServicesDesktop from './ServicesDesktop'
import ServicesMobile from './ServicesMobile'

export default {
  name: 'Services',
  components: { ServicesDesktop, ServicesMobile },
  props: {
    items: {
      title: String,
      text: String,
      image: {
        url: String
      }
    }
  },
  computed: mapState([
    'isMobile'
  ])
}
</script>

<style scoped>
#services {
  width: 100%;
  padding: 5vh 0;
}
</style>
