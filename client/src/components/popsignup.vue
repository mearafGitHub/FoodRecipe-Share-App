<template>
  <v-dialog max-width="500px">
    <v-icon slot="activator" class="primary" dark>person</v-icon>

    <v-card>
      <h1 class="primary pl-3 pt-2 pb-2">Sign Up Here</h1>
      <div class="alert alert-danger" role="alert" v-if="error" v-html="error">{{ error }}</div>
      <v-form class="px-1 mx-3">
     

        <v-text-field label="Email" v-model="user.email" required></v-text-field>

        <v-text-field label="User Name" v-model="user.username" required></v-text-field>
        
          <v-text-field type="password" label="Password" v-model="user.password" autocomplete="new-password" ></v-text-field>
      
         
          <!-- <v-text-field
            type="password"
            label="Confirm Password"
            v-model="user.ConfirmPassword"
            required
          ></v-text-field> -->
  

        <v-btn flat class="primary" @click="register">SignUp</v-btn>
      </v-form>
      <v-card-actions>
        <p>
          <a href="http://" target="_blank" rel="noopener noreferrer">Forgot password</a>
        </p>
      </v-card-actions>
    </v-card>
    <br>
  </v-dialog>
</template>

<script>

//import Joi from 'joi';
import axios from 'axios';

// const schema = Joi.object().keys({
//      username: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).min(3).max(30).required(),
//      password: Joi.string().trim().min(8).required(),
    

// });

export default {
  name: "popsignup",

  data() {
    return {
      error: "",
      
      user:{
         username: "",
          password: "",
       //   ConfirmPassword: "",
          email: ""
      }
     
    };
  },
watch:{
   user:{     handler() {
       this.error='';
    },
     deep: true,
  }
},
  methods: {
      // async register(){
      // console.log(`register button clicked`, this.user);
      //   const response = await AuthService.register(...user);
      //   console.log(response.data);
      // }


    // async register() {
    //   this.error='';
    //   if(validUser){
    //      console.log(this.user);
    //   }

    //  },
    async  register() {
    //   if (this.user.password !== this.ConfirmPassword) {
    //      this.error = "password does not match. Please try agian. ";
    //      this.user = {};
    //      return false;
    //    }
    //   const result = Joi.validate(this.user, schema);
    //  if (result.error === null){
     
        //     let newUser= {
        //      username: this.user.username,
        //      password: this.user.password,
        //      email: this.user.email,
        //      fulname: this.user.fullname
        
        //  };

        try{
         const responce = await axios.post('http://localhost:5000/user/signup',this.user);
          console.log(this.user);
         this.$store.dispatch('setToken', responce.data.token);
         this.$store.dispatch('setUser', responce.data.user);
        }
        catch(error){
            this.error=error.responce.data.error;
        }
          // await AuthService.signUp(this.user);
    
      // return true;
      //}
    //  if(result.error.message.includes('username')){
    //    this.error = "Invalide Username ";
    // }
    //   else{
    //     this.error = "Invalide Password";
    // }
    //   return false;
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

