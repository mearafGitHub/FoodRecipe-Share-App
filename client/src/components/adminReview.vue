<template>

<v-dialog max-width="1800px" max-height="1900px">
  <v-icon slot="activator" class=" xl10" color="light--gray"  large dark >dashboard</v-icon>
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
      <v-flex v-if= "!authorization">
        <popsignin/>
        <span color="white">Sign In</span>
      </v-flex>

      <v-spacer></v-spacer>
      <v-flex v-if= "!authorization" >
        <popsignup/>
        <span color="white--text">Sign Up</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex v-if= "authorization" >
        <popcreate/>
      </v-flex>
      <v-flex v-if= "authorization" >
        <h5 class="username" v-if= "authorization" >Welcome,{{ user.username }} !</h5>
      </v-flex>
      <v-toolbar-items></v-toolbar-items>
      <v-btn v-if= "authorization" flat info @click="signOut">Sign Out</v-btn>
    </v-toolbar>


    <h2 align="center">Recently published recipes </h2>
    <hr>
    <v-container class="my-3">
      <v-layout row wrap>
        <v-flex
          class="mx-2 px 2 my 2 py-2"
          xs12
          sm8
          md5
          lg3
          v-for="item in items"
          :key="item._id"
         
        >
          <v-img :aspect-ratio="16/9" src="d.jpg"></v-img>

          <v-card flat >
            <v-card-text>
              <h4 color="primary">{{ item.name }}</h4>
              <div class="gray--text">{{ item.shortdesc }}</div>
              <div class="gray--text">At:{{item.createdAt}}</div>
              <div>
                <span
                  v-if="item && item.createdAt"
                >{{ `${item.createdAt.getDate()}/${item.createdAt.getMonth()}/${item.createdAt.getFullYear()}`}}</span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon flat>
                <v-icon small color="primary" @click="add">favorite</v-icon>
                <span>{{count}}</span>
              </v-btn>
              
              <v-btn icon v-if="user.username = 'Town_Admin'">
                <v-icon small @click="remove">delete</v-icon>
              </v-btn>
              <v-dialog max-width="1200px">
                <v-icon slot="activator" color="primary">list</v-icon>
 
                          <v-card flat >
                             <v-img :aspect-ratio="16/8" src="d.jpg"></v-img>
                          <v-card-text>
                           
                                  <h1 class="header" align="center">{{ item.name }}</h1>
                                  
                                  <!-- <v-img :aspect-ratio="16/8" src= "item.file" ></v-img> -->
                                  <h4 align="center" class="gray--text">{{ item.shortdesc }}</h4>
                                  <h5 align="center" class="text">Category:{{ item.category }}</h5>
                                  <h5 align="center" class="text"> Cuisine: {{ item.cuisine }}</h5>
                                  <h5 align="center" class="text"> created By: {{ item.by }}</h5>
                                  <div align="center" class="grray--text">At:{{item.createdAt}}</div>
                                       <div>
                                        <span
                                       v-if="item && item.createdAt"
                                      >{{ `${item.createdAt.getDate()}/${item.createdAt.getMonth()}/${item.createdAt.getFullYear()}`}}</span>
                                      </div>
                                      <h3>The recipe steps</h3>
                                      <hr>
                                      <p align="center">{{ item.steps }}</p>
                        
                             
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                         <v-btn icon flat>
                         <v-icon small color="primary" @click="add">favorite</v-icon>
                         <span>{{count}}</span>
                             </v-btn>

                            <v-btn icon v-if=" user.username = 'Town_Admin'">
                           <v-icon @click="remove">delete</v-icon>
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

</v-dialog>
  
</template>

<script>


import popsignin from "./popsignin";
import popsignup from "./popsignup";
import popcreate from "./popcreate";
const axios = require('axios');
const URL = 'http://localhost:5000/recipes/list/';

const TokenUrl = "http://localhost:5000";

export default {
  name: "adminReview",
  components: {
    
    popsignin,
    popsignup,
    popcreate
  },
  data() {
    return {
      error: "",
      count: 0,
      user:{},
      authorization: false,
      items: [
        {
          steps: "recipe step",
          category: "recipe category",
          cuisine: "recipe cuisine",
          name: "recipei name",
          shortdesc: "short description",
          at: "date created ",
          file: "file name",
          likes: ""         
        }
      ] 
    };
  },
  mounted () {
    fetch(TokenUrl,{
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then(res=> res.json())
    .then((result)=>{
     // 
      console.log('result.user is:',result.user);
      console.log('result is :',result);
      if(result.user){
        this.user = result.user;
        this.authorization = true;
      }
      else{
        //if no user/ tiken exprd ot logged out
       // localStorage.removeItem('token');
       //this.$router.push('/login');
       this.signOut();
      }
    }).catch((err)=>{
      console.log(err);
      this.error = err.message || response.err.message;
    //   this.errorMsg=err.message;// && err.responce && err.responce.data && err.responce.data.error;
    });
  },
  
  methods: {
      add: function() {
      this.count = this.count + 1;
      this.item.likes=this.count;
      return (this.count);
    }, 
    
    remove(){
      
    },
    signOut(){
      this.authorization = false;
      localStorage.removeItem('token');
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
.username{
  color: white;
}
</style>
