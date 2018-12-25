<template>
  <v-dialog max-width="500px">
    <v-icon slot="activator" class="primary" dark>person</v-icon>

    <v-card>
      <h1 class="primary pl-3 pt-2 pb-2">Sign Up Here</h1>
      <div> <p class="error" color="white--text" v-if="errorMsg"  v-html="errorMsg">{{ errorMsg }}</p> </div>
      <v-form class="px-1 mx-3">

         <!-- <div v-if="loading">
          <img  src="../assets/Flickr-1.2s-200px.svg" alt=""/>
        </div>  -->
<!-- 
        <v-text-field 
        label="Email" 
        v-model="user.email" 
        required="true"
        ></v-text-field> -->

        <v-text-field 
        label="User Name (user name must be at least 3 and at most 30 charachters)" 
        v-model="user.username" 
        required = "true">
        </v-text-field>
        
          <v-text-field 
          type="password" 
          label="Password" 
          v-model="user.password" 
          autocomplete="new-password"
          required="true" 
          ></v-text-field>
      
      
          <v-text-field
            type="password"
            label="Confirm Password"
            v-model="user.confirmPass"
            required="true"
          ></v-text-field> 
  

      </v-form>
      <v-card-actions>
       
        <v-btn flat class="primary" @click="SignUp">SignUp</v-btn> 
      </v-card-actions>
    </v-card>
    <br>
  </v-dialog>
</template>

<script>
import Joi from "joi";
//import axios from 'axios';
const axios = require("axios");

const userUrl = "http://localhost:5000/user/signup/";

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .min(8)
    .required(),
  confirmPass: Joi.string()
    .trim()
    .min(8)
    .required()
});

export default {
  name: "popsignup",

  data() {
    return {
    // loading: false,
      errorMsg: '',
      user: {
        username: '',
        password: '',
        confirmPass: ''
      }
    };
  },

  watch: {
    user: {
      handler() {
        this.errorMsg = "";
      },
      deep: true
    }
  },
  methods: {
    SignUp() {
      if (this.user.password !== this.user.confirmPass) {
        this.errorMsg = "Passwords Must match";
        this.user = {};
        //console.log(`valid button clicked`, this.user, this.errorMsg);
        return false;
      }
      const result = Joi.validate(this.user, schema);

      //--------------------------------
      if (result.error === null) {
        console.log(`This user is valid `, this.user);
       // this.loading = true;
        axios
          .post(userUrl, {
            username: this.user.username,
            password: this.user.password
          
          })
          .then((response)=> {
            localStorage.token = response.data.token;
            setTimeout(()=>{
               //this.loading = false;
               //localStorage.token = result.data.token;
               this.$router.push('/post');
            },1000);
            
            console.log(response);
           
          })
          .catch(function(error) {
           // this.loading = false;
            console.log(error);
             
          });

        // here sould be the operation done for registering
        // fetch(userUrl, {
        //   method: 'POST',
        //   body: JSON.stringify(body),
        //   headers: {
        //     'content-type': 'application/json'
        //   }
        // }).then((response) => {
        //     if (response.ok) {
        //       return response.json();
        //     }
        //   return response.json().then((error) => {
        //       throw new Error(error.message);
        //     });
        //   }).then((user) => {

        //     console.log('The user has been sent to the server',this.user);
        //   }).catch((error)=> {
        //     this.errorMsg = error.message;
        //     console.log(error);
        //   });
        //--------------------
        return true;
      }
      if (result.error.message.includes("username")) {
        this.errorMsg = "username is invalid";
        return false;
      }
      if (
        result.error.message.includes("username") &&
        result.error.message.includes("password")
      ) {
        this.errorMsg = "username and password are invalid";
        return false;
      }
      this.errorMsg = "password is invalid";

      console.log(result.error.message);
      this.errorMsg = "Invalide Password";
      return false;
    }
  }
};
</script>

<style scoped>
p.error {
  border: 1px solod #ff5b5f;
  background-color: bisque;
  padding: 10px;
  margin-bottom: 15px;
}
</style>

