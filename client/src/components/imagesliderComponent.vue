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
            src: "pr.jpg"
          },
          {
            src: "f.jpg"
          },
          {
            src: "h.jpg"
          },
          {
            src: "e.jpg"
          },
          {
            src: "f.jpg"
          },
          {
            src: "b.jpg"
          },
          {
            src: "a.jpg"
          },
          {
            src: "c.jpg"
          }
          
        ]
      }
    }
  }
</script>
