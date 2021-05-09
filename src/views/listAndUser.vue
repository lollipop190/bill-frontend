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
      <span>{{item.date}}</span>
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
    const _this = this;
    getRes(
        '/allBills',
        res =>{
          _this.list = res.data;
        }
    )
  },
  data(){
    return{
      list:[

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
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 8px;

  border-radius: 30px;
  background-color: #FFF;

  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  display: grid;
  grid-template-columns: 80% 20%;
  padding: 15px;/*字和边框的距离*/
}
.title{
  font-weight: bold;
  font-size: 16px;
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
.timeAndTag{
  margin-top: 5px;
}
</style>