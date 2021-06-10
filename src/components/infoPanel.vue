<template>
    <div>
        <div class="panel">
            <div v-for="item in panel_list" class="item">
              <div class="title">{{item.title}}</div>
              <div class="moneyHolder">{{item.money}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import {getRes} from "../util/axiosAPI";

export default {
    name:'infoPanel',
  mounted() {
      const _this = this;
    getRes(
        '/bill/allDetailBillAmount',
        res =>{

          for (let i = 0; i < res.data.length; i++) {

            _this.panel_list[i].money = res.data[i].toFixed(2);

          }
        }
    )
  },


  data(){
        return{
          panel_list:[
            {
              title:'今天',
              money: 0,
            },
            {
              title:'昨天',
              money: 0
            },
            {
              title:'本周',
              money: 0
            },
            {
              title:'上周',
              money: 0
            },
            {

              title:'本月',
              money: 0
            },
            {
              title:'上月',
              money: 0
            },
          ]
        }
    },
}
</script>

<style scoped>
.panel{
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  border: 2px solid white;
  border-radius: 10px;
  font-family: "Academy Engraved LET",monospace;
}
.container div{
    text-align: center;
}
.title{
  margin: 4px 4px 4px 4px;
  font-size: 20px;
}
.moneyHolder{
  font-size: 30px;
}
</style>