<template>
  <div class="container">
      <infoPanel/>
      <inputPanel/>
  </div>




</template>
         
<script>
import infoPanel from '../components/infoPanel'
import inputPanel from '../components/inputPanel'
import{setColor} from "../util/backgroundColor";
export default {
  name: 'moneyCounter',
  data(){
    return{
      title_is_null_: false
    }
  },
  mounted(){
  
    // setColor("#00fdff");
    // setColor("#34c8ff");
  },
  components: {
    infoPanel,
    inputPanel
  } ,

  methods:{
    upload(){
    }
  },
  computed:{

  }
}
</script>
<style scoped>
  .container{
    text-align: center;
  }


  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
