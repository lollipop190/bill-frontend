<template>
<div class="container">
  <router-link to="/">
    <el-button type="" icon="el-icon-arrow-left" class="back">返回</el-button>

  </router-link>

  <div v-for="(item, index) in list" class="item">
    <div>

    <div class="title">
      {{item.title}}
    </div>
    <div class="timeAndTag">
      <span>{{item.time}}</span>
      <span v-for="tag in item.tags" class="tag">{{tag}}</span>
    </div>

    </div>


    <div class="amount">-{{item.amount}}</div>


  </div>
</div>
</template>

<script>
import {getRes} from "../util/axiosAPI";

export default {
  name: "moneyList",
  mounted() {
    getRes(
        '/allBills',
        res =>{
          console.log(res);
        }
    )
  },
  data(){
    return{
      list:[
        {
          title:'吃饭',
          time:'2021-05-05 15:30:00',
          tags:['吃饭','日常'],
          amount: 10,
        },
        {
          title:'吃饭',
          time:'2021-05-05 15:30:00',
          tags:['吃饭','日常'],
          amount: 10,
        },
        {
          title:'吃饭',
          time:'2021-05-05 15:30:00',
          tags:['吃饭','日常'],
          amount: 10,
        },
        {
          title:'吃饭',
          time:'2021-05-05 15:30:00',
          tags:['吃饭','日常'],
          amount: 10,
        }
      ]
    }
  },

}
</script>

<style scoped>
.container{
  max-width: 600px;
  margin: 3% auto auto;

}
.back{
  border-radius: 20px;

}
.item{
  margin-left: 5%;
  margin-top: 20px;

  border-radius: 20px;
  background-color: #FFF;

  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  display: grid;
  grid-template-columns: 80% 20%;
  padding: 10px;/*字和边框的距离*/
}
.title{
  font-weight: bold;
  font-size: 20px;
}
.amount{
  text-align: center;
  color: #40E0D0;
  font-size: 25px;
  padding: 10px;
}
.tag{
  margin-left: 5px;
}
</style>