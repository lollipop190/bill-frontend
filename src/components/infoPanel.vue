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
export default {
    name:'infoPanel',
    mounted() {
    //各项钱款数据

      },
  data(){
        return{
          panel_list:[
            {
              title:'今天',
              money:'0.00',
            },
            {
              title:'昨天',
              money:'1.23'
            },
            {
              title:'本周',
              money:'4.56'
            },
            {
              title:'上周',
              money:'7.89'
            },
            {
              title:'本月',
              money:'0.00'
            },
            {
              title:'上月',
              money:'0.00'
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
  margin: 5px 5px 5px 5px;
  font-size: 23px;
}
.moneyHolder{
  font-size: 30px;
}
</style>