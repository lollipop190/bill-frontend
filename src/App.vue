<template>
  <div>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <tab-bar v-if="$route.path!=='/login'"></tab-bar>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  max-width: 600px;
  margin: 3% auto auto;
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
import TabBar from "./components/tabbar/TabBar";
import TarBarItem from "./components/tabbar/TarBarItem";

export default {
  components: {TarBarItem, TabBar, MoneyCounter}
}
</script>