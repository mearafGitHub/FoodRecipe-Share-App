<template>
  <v-layout column align-center class="gray lighten-2">
    <v-toolbar app height="150" scroll-off-screen class="primary">
      <v-toolbar-title @click="$router.push({name:'home'})" class="headline text-Capitalized" darken-1>
        <span  href="/">
          <h1 > The Recipes Town</h1>
        </span>
        <span class="font-weight-light">| Enjoy Food Recipes</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
  
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-icon slot="activator" color="pimary" dark @click="$router.push({name:'home'})">home</v-icon>
        <span>Home | Latest Recipe</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn flat dark >
        About
        </v-btn>
      <v-spacer></v-spacer>
      <v-btn flat dark >Privacy Terms </v-btn>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-flex v-if= "!isAuthenticated">
        <popsignin/>
        <span color="white">Sign In</span>
      </v-flex>

      <v-spacer></v-spacer>
      <v-flex v-if= "!isAuthenticated" >
        <popsignup/>
        <span color="white">Sign Up</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex v-if= "isAuthenticated" >
        <popcreate/>
        <span color="white--text" dark >Add Recipe</span>
      </v-flex>
      <v-toolbar-items></v-toolbar-items>
         <v-btn v-if= "isAuthenticated" flat info @click="signOut">Sign Out</v-btn>
    </v-toolbar>

    <imageslider-component/>

    <h3 align="center">Check out the lately published Recipes in Town down here</h3>
    <v-container class="my-3">
      <v-layout row wrap>
        <v-flex
          class="mx-2 px 2 my 2 py-2"
          xs12
          sm8
          md5
          lg3
          v-for="post in posts"
          :key="post._id"
         
        >
          <v-img :aspect-ratio="16/9" src="d.jpg"></v-img>

          <v-card flat >
            <v-card-text>
              <h4 color="primary">{{ post.name }}</h4>
              <div class="gray--text">{{ post.shortdesc }}</div>
              <div class="gray--text">At:{{post.createdAt}}</div>
              <div>
                <span
                  v-if="post && post.createdAt"
                >{{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon flat>
                <v-icon small color="primary" @click="add">favorite</v-icon>
                <span>{{count}}</span>
              </v-btn>
              
              <v-btn icon>
                <v-icon small>bookmark</v-icon>
              </v-btn>
              <v-dialog max-width="1200px">
                <v-icon slot="activator" color="primary">list</v-icon>
 
                          <v-card flat >
                             <v-img :aspect-ratio="16/8" src="d.jpg"></v-img>
                          <v-card-text>
                           
                                  <h1 class="header" align="center">{{ post.name }}</h1>
                                  
                                  <!-- <v-img :aspect-ratio="16/8" src= "post.file" ></v-img> -->
                                  <h4 align="center" class="gray--text">{{ post.shortdesc }}</h4>
                                  <h5 align="center" class="text">Category:{{ post.category }}</h5>
                                  <h5 align="center" class="text"> Cuisine: {{ post.cuisine }}</h5>
                                  <h5 align="center" class="text"> created By: {{ post.by }}</h5>
                                  <div align="center" class="grray--text">At:{{post.createdAt}}</div>
                                       <div>
                                        <span
                                       v-if="post && post.createdAt"
                                      >{{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</span>
                                      </div>

                                  <p align="center">{{ post.steps.sone }}</p>
                                  <p align="center">{{ post.steps.stwo }}</p>
                                  <p align="center">{{ post.steps.sthree }}</p>
                                  <p align="center">{{ post.steps.sfour }}</p>
                                  <p align="center">{{ post.steps.sfive }}</p>
                             
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                         <v-btn icon flat>
                         <v-icon small color="primary" @click="add">favorite</v-icon>
                         <span>{{count}}</span>
                             </v-btn>

                            <v-btn icon>
                           <v-icon small>bookmark</v-icon>
                              </v-btn>
                     </v-card-actions>
                   </v-card> 
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-spacer></v-spacer>

    <p class="error" v-if="error">{{ error }}</p>
  </v-layout>
</template>

<script>

import imagesliderComponent from "./imagesliderComponent";
import popsignin from "./popsignin";
import popsignup from "./popsignup";
import popcreate from "./popcreate";

//<p class="text">{{ post.category }}</p>
// <p class="text">{{ post.cuisine }}</p>
// <p class="text">{{ post.steps }}</p>

export default {
  name: "PostComponent",
  components: {
    imagesliderComponent,
    popsignin,
    popsignup,
    popcreate
  },
  data() {
    return {
      error: "",
      count: 0,
      posts: [
        {
          steps: {
            s1: "step one",
            s2: "step two",
            s3: "step three",
            s4: "step four",
            s5: "step five"
          },

          category: "recipe category",
          cuisine: "recipe cuisine",
          name: "recipei name",
          shortdesc: "short description",
          at: "date created ",
          file: null,
          likes: "",
          by: "user name"
        }
      ]
    };
  },

  async created() {
    try {
      // this.posts = await RecipieService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    isAuthenticated(){
      const token = localStorage.getItem('TOKEN');
      return !!token;
    },
    add: function() {
      this.count = this.count + 1;
      this.posts.likes=this.count;
      return (this.posts.likes);
    },
    signOut(){
       this.$store.dispatch('setToken', null);
       this.$store.dispatch('setUser', null);
       this.$router.push({name: 'home'});
    }
  }
};
</script>

<style scoped>
.error {
  border: 1px solod #ff5b5f;
  background-color: bisque;
  padding: 10px;
  margin-bottom: 15px;
}
</style>
