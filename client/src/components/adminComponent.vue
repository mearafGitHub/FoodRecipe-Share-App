<template>
  <nav>
    <v-toolbar color="primary" pt-5 flat app>
      <v-toolbar-side-icon class="gray--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-upcase gray-text">
        <span>Admin</span>
        <span class="font-weight-light">Pannel</span>
      </v-toolbar-title>
     <v-spacer></v-spacer>
      <v-btn  color="info">
        <span>Sing out</span>
        <v-icon right color="accent">exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>


    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
<!--     
    <v-container>
      <v-flex v-for="item in item" v-bind:key="item._id">
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
          </v-card>
      </v-flex>
    </v-container> -->
  </nav>
</template>


<script>

//import EventBus from '../eventBus';


export default {
  name: "adminComponent",
  
  data() {
   
    return {
      item:{},
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard"  },
        { icon: "folder", text: "Publishes",  },
        { icon: "home", text: "Home", route: "/" }
      ]
         
    
    };
  },
  //mounted(){
   
// do the allow and deny
    // EventBus.$on('publishRequested', ...item => {
    //   this.item = item;
      
    // });
 // }
       
};
</script>

<style scoped>


</style>
