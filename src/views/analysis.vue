<template>
  <div>

 <gauge/>

  </div>

</template>

<script>
import Gauge from '../components/Charts/gauge.vue';
import {getRes} from "../util/axiosAPI";
import{setColor} from "../util/backgroundColor";
export default {
  name: "analysis",
  methods:{
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