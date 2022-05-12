<template>
  <div>

 <gauge/>

     <router-link to="/login" @click="logout" class="logout">
    <el-button  class="logout">登出</el-button>
    </router-link>
 
  </div>

</template>

<script>
import Gauge from '../components/Charts/gauge.vue';
import {getRes} from "../util/axiosAPI";
import{setColor} from "../util/backgroundColor";
export default {
  name: "analysis",
  methods:{
    logout(){
      localStorage.clear("token");
    }
  },
  components:{
    Gauge
  }
}
</script>

<style scoped>

.logout{
  float: right;
  margin-right: 10px;
  border-radius: 20px;
}

</style>