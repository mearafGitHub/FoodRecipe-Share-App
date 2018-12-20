<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
   name: "imagesliderComponent",
    data () {
      return {
        items: [
          {
            src: "a.jpg"
          },
          {
            src: "mk.jpg"
          },
          {
            src: "a.jpg"
          },
          {
            src: "c.jpg"
          },
          {
            src: "d.jpg"
          },
          {
            src: "r.jpg"
          },
          {
            src: "pl.jpg"
          },
          {
            src: "qq.jpg"
          }
          
        ]
      }
    }
  }
</script>
