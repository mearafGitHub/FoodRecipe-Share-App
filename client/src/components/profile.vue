<template>
  <nav>
    <v-toolbar color="primary" pt-5 flat app>

      <v-toolbar-side-icon   class="gray--text  xl10" dark @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-capitalised gray-text">
        <span class="white--text">Hey,  {{ user.username }} !</span>
        <span class="font-weight-light   white--text" > | What do you want to publish today?</span>
      </v-toolbar-title>
       <v-spacer></v-spacer>
      <v-toolbar-actions>
         
          <v-flex>
              <popcreate/>
          </v-flex>
      </v-toolbar-actions>
     <v-spacer></v-spacer>
      <v-btn @click="signOut" flat color="light">
        <span color="primary">Sign Out</span>
        <v-icon right color="accent">exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <div> <p class="er" color="white--text" v-if="error"  v-html="error" >{{ error }}</p> </div>

    <v-navigation-drawer app v-model="drawer" class="primary" >
      <v-spacer></v-spacer>
      <v-list>
        <v-list-tile >
          <v-list-tile-action>
     
        <v-icon  class=" xl10" color="light--gray" dark  @click="$router.push({name:'home'})"> home 

        </v-icon>
          </v-list-tile-action>
        </v-list-tile>
            <v-list-tile >          
          <v-list-tile-action>
            
            <v-dialog max-width="1300px" max-height="1900px">
                
                 <v-icon  slot="activator" color="accent" dark>  folder </v-icon>
<!--                  
      v-for="recipes in recipes"
          :key="recipes._id"            -->
              
      <v-layout column wrap class="col-4">
        <v-flex
          class="mx-2 px 2 my 2 py-2"
          xs12
          sm8
          md5
          lg3
        
        >
                 
                  <v-card flat >
                             <v-img :aspect-ratio="16/8" src="d.jpg"></v-img>
                          <v-card-text>
                           
                                  <h1 class="header" align="center">{{ recipes.name }}</h1>
                                  <h4 align="center" class="gray--text">{{ recipes.shortdesc }}</h4>
                                  <h5 align="center" class="text">Category:{{ recipes.category }}</h5>
                                  <h5 align="center" class="text"> Cuisine: {{ recipes.cuisine }}</h5>
                                  <h5 align="center" class="text">  By: {{ user.username }}</h5>
                                  <div align="center" class="grray--text">At:{{recipes.createdAt}}</div>
                                       <div>
                                        <span
                                       v-if="recipes && recipes.createdAt"
                                      >{{ `${recipes.createdAt.getDate()}/${recipes.createdAt.getMonth()}/${recipes.createdAt.getFullYear()}`}}</span>
                                      </div>
                                      <h5 align="center" >The recipes steps</h5>
                                      <hr>
                                      <p align="center">{{ recipes.steps }}</p>
                                       <hr>
                                      <br>
                             
                     </v-card-text>
                     <!-- <v-card-actions>
                        <v-spacer></v-spacer>
                         <v-btn icon flat>
                         <v-icon small color="primary">favorite</v-icon>
                         <span>{{count}}</span>
                             </v-btn>

                            <v-btn icon>
                           <v-icon small>bookmark</v-icon>
                              </v-btn>
                     </v-card-actions> -->
                  </v-card>
        </v-flex>
      </v-layout>
               
               
            </v-dialog>
          </v-list-tile-action>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>


<script>
import popcreate from "./popcreate";

const TokenUrl = "http://localhost:5000";
const ProfileUrl = "http://localhost:5000/api/user/profiles/";
export default {
  name: "profile",
  components: {
    popcreate
  },
  data() {
    return {
      user: {},
      recipes: [
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
      ] ,
      authorization: false,
      drawer: true,
      error: ""
    };
  },
  mounted() {
    fetch(TokenUrl, {
      headers: {
        authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log("result.user is:", result.user);
        console.log("result.user.username is :", result.user.username);
        if (result.user.username) {
          this.user = result.user;
          console.log("this.user is:", this.user);
          this.authorization = true;
          this.getRecipes();
        } else {
          this.signOut();
        }
      })
      .catch(err => {
        console.log(err);
        this.error = err.message || err.message;
        //   this.errorMsg=err.message;// && err.responce && err.responce.data && err.responce.data.error;
      });
  },

  methods: {
    //later try with axios
    getRecipes() {
      fetch(`${TokenUrl}/api/user/profiles`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(recipes => {
          this.recipes = recipes;
        });
    },

    signOut() {
      this.authorization = false;
      localStorage.removeItem("token");
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
</style>
