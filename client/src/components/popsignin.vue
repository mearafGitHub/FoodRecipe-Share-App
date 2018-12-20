<template>
<v-dialog max-width="400px">
   
  <v-icon  slot="activator" class="primary" dark> person </v-icon>
   
        <v-card xs12 sm6 md4 lg3 offset-sm3>
          <h1 class="primary  pt-2 pb-2" dark >Sign In</h1>
          <div v-if="error" class="error" v-html="error"/>
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
import axios from 'axios'
export default {
  name: "popsignin",
  data() {
    return {
      error:'',
      item: {
        username:'',
        password:''
      }
    };
  },

 methods: {   
   async signin() {
     try{
        const responce = await axios.post('http://localhost:5000/user/signin',this.item);
        localStorage.setItem('TOKEN',responce.data.token);
        localStorage.setItem('USER',responce.data.user);

       this.$router.push({name: 'home'});
        console.log('user trying to sign in:', this.item);
     }
    catch(err){
      console.log(err);
      this.error=err && err.responce && err.responce.data && err.responce.data.error;
    }
   }
  } 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p.error {
  border: 1px solod #ff5b5f;
  background-color: bisque;
  padding: 10px;
  margin-bottom: 15px;
}
</style>

