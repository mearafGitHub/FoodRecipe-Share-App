<template>
  <v-dialog max-width="800px" max-height="900px">
  
    <v-icon slot="activator" class=" xl10" color="light--gray"  large dark>add
      <v-span>Publish Recipe</v-span>
    </v-icon>

    <v-card xs12 sm10 md8 lg6 offset-sm3>
      <h1 align="center" class="primary pl-3 pt-4 pb-3">Publish Your Recipe | To The World</h1>

      <h3 align="center">Add your recipe list</h3>
      <div v-if="error" class="error" v-html="error">{{ error }}</div>
      <hr>
      <v-form class="pt-2 pb-2 pl-3 pr-3">

       <div class="field" enctype="multipart/formd-data">
         <label for="file" class="lable">Choose Image</label>
         <input
          type="file"
          refs="file"
          @change="selectFile"/>
       </div>
    
        <b-form-file
          primary
          v-model="item.file"
          :state="Boolean(item.file)"
          placeholder="Choose a your recipe's picture..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{item.file && item.file.name}}</div>
        <v-text-field solo label="Your Recipe Name" v-model="item.name"></v-text-field>
        <v-textarea solo label="Brief Description" v-model="item.shortdesc"></v-textarea>
        <v-text-field solo label="Category" v-model="item.category"></v-text-field>
        <v-text-field solo label="Cuisine" v-model="item.cuisine"></v-text-field>
        <v-textarea solo label="Explain your Recipe" v-model="item.steps"></v-textarea>


        <v-tooltip top>
          <v-icon  align="right" slot="activator" color="primary" dark x-large @click="publishRequest">send</v-icon>

          <span>Publish</span>
        </v-tooltip>
      </v-form>
    </v-card>

    <br>

    
  </v-dialog>
</template>
<script>
import axios from "axios";
const URL = 'http://localhost:5000/recipes/create/';
const profUrl = 'http://localhost:5000/api/user/profiles/publish/';

const TokenUrl = "http://localhost:5000";
const ProfileUrl = "http://localhost:5000/api/user/profiles/";

export default {
  name: "popcreate",
  data() {
    return {
     
      error: "",
      item: {
        steps: "",
        name: "",
        file: "",
        shortdesc: "",
        category: "",
        by: "",
        cuisine: "",
        createdAt: ""
      }
    };
  },
  //
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
          this.item.by = result.user.username;
          console.log("this.user is:", this.user);
          this.authorization = true;
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
    publishRequest() {
      console.log(this.item);
     
      axios
        .post(profUrl, { 
                  name: this.item.name,
                  steps: this.item.steps,
                 
                  file: this.item.file.name,
                  shortdesc: this.item.shortdesc,
                  category: this.item.category,
                  by: this.item.by,
                  cuisine: this.item.cuisine,
                  createdAt: this.item.createdAt
         })
        .then((response) => {
          console.log('server response', response);
          console.log('recoreded recipes',this.item);
        })
        .catch((error)=> {
          // this.loading = false;
          console.log(error);
          this.error=error && error.responce && error.responce.data && error.responce.data.error;
        });
      //this.error=err && err.responce && err.responce.data && err.responce.data.error;
    },
async selectFile(){
      const formData = new FormData();
      this.item.file=this.$refs.file.files[0];
      try{
        await axios.post(URL,formData );
      }
      catch(err){
        this.error = err;
      }
     
    }
  }
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.error {
  border: 1px solod #ff5b5f;
  background-color: bisque;
  padding: 10px;
  margin-bottom: 15px;
}
</style>

