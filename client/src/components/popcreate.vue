<template>
  <v-dialog max-width="800px" max-height="900px">
  
    <v-icon slot="activator" class="primary" dark>edit
      <v-span>Publish Recipe</v-span>
    </v-icon>

    <v-card xs12 sm10 md8 lg6 offset-sm3>
      <h1 align="center" class="primary pl-3 pt-4 pb-3">Publish Your Recipe | To The World</h1>

      <h3 align="center">Add your recipe list</h3>
      <hr>
      <v-form class="pt-2 pb-2 pl-3 pr-3">
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
       <h3>Add the content below</h3>

   <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Step 3</v-stepper-step>

        <v-divider></v-divider>

      <v-stepper-step step="4">Step 4</v-stepper-step>

        <v-divider></v-divider>

      <v-stepper-step step="5">Step 5</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          color="white"
          height="200px"
        >
        <v-textarea  label="Explain your Recipe here.." v-model="item.steps.sone"></v-textarea>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn   color="info">Done</v-btn>
        <v-btn   color="accent">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
            color="white"
          height="200px"
        >
        <v-textarea solo label="Explain your Recipe" v-model="item.steps.stwo"></v-textarea>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

         <v-btn   color="info">Done</v-btn>
        <v-btn   color="accent">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
            color="white"
          height="200px"
        >
        <v-textarea solo label="Explain your Recipe" v-model="item.steps.sthre"></v-textarea>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 4"
        >
          Continue
        </v-btn>

         <v-btn   color="info">Done</v-btn>
        <v-btn   color="accent">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <v-card
          class="mb-5"
            color="white"
          height="200px"
        >
        <v-textarea solo label="Explain your Recipe" v-model="item.steps.sfour"></v-textarea>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 5"
        >
          Continue
        </v-btn>

         <v-btn   color="info">Done</v-btn>
        <v-btn   color="accent">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-card
          class="mb-5"
            color="white"
          height="200px"
        >
        <v-textarea solo label="Explain your Recipe" v-model="item.steps.sfive"></v-textarea>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

         <v-btn   color="info">Done</v-btn>
        <v-btn   color="accent">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>

        <v-tooltip top>
          <v-icon align="right" slot="activator" color="primary" dark x-large @click="publishRequest">send</v-icon>

          <span>Publish</span>
        </v-tooltip>
      </v-form>
    </v-card>

    <br>

    <div v-if="error" class="error" v-html="error">{{ error }}</div>
  </v-dialog>
</template>
<script>


import axios from 'axios'

 //import EventBus from '../eventBus';

export default {
  name: "popcreate",
  data() {
    return {
      e1: 0,
      error: "",
      item: {
        steps: {
          sone: "",
          stwo: "",
          sthree: "",
          sfour: "",
          sfive: ""
        },
        name: "",
        file: "false",
        shortdesc: "",
        category: "",
        by: "",
        cuisine: "",
        createdAt: ""
      }
    };
  },

  methods: {
     
    publishRequest(){
       console.log(this.item);
      
    //  EventBus.$emit('publishRequested', this.item);
      
        try {

       const response = axios.post('http://localhost:5000/recipe/recipeApi/', this.item);
        console.log(response);
        } catch (error) {
       this.item.error = error.response.data.err;
       }
       this.item = {};

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

