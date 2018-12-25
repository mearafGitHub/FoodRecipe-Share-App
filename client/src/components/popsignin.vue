<template>
<v-dialog max-width="400px">
   
  <v-icon  slot="activator" class="primary" dark> person </v-icon>
   
        <v-card xs12 sm6 md4 lg3 offset-sm3>
          <h1 class="primary  pt-2 pb-2" dark >Sign In</h1>
          <div v-if="loading">
          <img  src="../assets/Flickr-1.2s-200px.svg" alt=""/>
        </div> 
         <div> <p class="er" color="white--text" v-if="errorMsg"  v-html="errorMsg" >{{ errorMsg }}</p> </div>
    
          <v-form class="px-3 mx-3">
            <v-text-field primary prepend-icon="person" label=" Username " v-model="item.username"></v-text-field>
            <v-text-field  type="password"  primary prepend-icon="lock" label=" Password " v-model="item.password"></v-text-field>
            <v-btn flat class="primary" @click="signin">SignIn</v-btn>
          </v-form>
          <v-card-actions>
            <p>
              <a href="http://" target="_blank" rel="noopener noreferrer">Forgot password</a>
            </p>
          </v-card-actions>
        </v-card>  
 
</v-dialog>
</template>

<script>
const axios = require('axios');

const userUrl = "http://localhost:5000/user/signin/";

export default {
  name: "popsignin",
  data() {
    return {
      errorMsg:'',
      loading:'',
      item: {
        username:'',
        password:''
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
   async signin() {
      try{
        var result = await axios.post(userUrl,this.item);
          console.log('user trying to sign in:', this.item);
          console.log('The result from server:', result);
         localStorage.token = result.data.token;
          console.log('The token sent is:', result.data.token);
          
    //     localStorage.setItem('TOKEN',responce.token);
    //     localStorage.setItem('USER',responce.user);
            setTimeout(()=>{
                this.loading = false;
               this.$router.push('/profile');
             },100);
      }
     catch(error){
      console.log(err);
      this.errorMsg = error.message || response.error.message;
   
    }
   }
  } 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p.er {
  border: 1px solod #ff5b5f;
  background-color:  #ff5b5f;
  padding: 10px;
  color: white;
  margin-bottom: 15px;
}
</style>

