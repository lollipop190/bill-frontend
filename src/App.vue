<template>
 
    <router-view v-slot="{ Component }" :key="key">
    <keep-alive>
    <component :is="Component" />
    </keep-alive>
  <!-- </transition> -->
</router-view>
  <tab-bar/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  max-width: 600px;
  margin: auto;
  margin-bottom: 80px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import MoneyCounter from "./views/moneyCounter";
import TabBar from '@/components/tabbar/TabBar';
import { getRes } from "../src/util/axiosAPI";
export default {
  components: {
    MoneyCounter,
    TabBar
  
  },
  methods:{

  }
}
</script>