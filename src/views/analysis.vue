<template>
  <div>
    <!-- <router-link to="/login" @click="logout" class="logout">
    <el-button type="" icon="el-icon-arrow-right" class="logout">登出</el-button>
    </router-link> -->
 
 <gauge/>
  </div>

</template>

<script>
import Gauge from '../components/Charts/gauge.vue';
import {getRes} from "../util/axiosAPI";

export default {
  name: "analysis",
  mounted(){
    // const _this = this;
    // getRes(
    //     '/bill/allBills',
    //     res => {
    //       _this.list = res.data;
    //       _this.$nextTick(() => {
    //         this.$refs.templateCharts.drawWeek(this.list);
    //       })
    //     }
    // )
  },
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