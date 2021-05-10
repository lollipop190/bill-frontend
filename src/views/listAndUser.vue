<template>
<div class="container">



  <router-link to="/">
    <el-button type="" icon="el-icon-arrow-left" class="back">返回</el-button>

  </router-link>

  <div v-for="(item, index) in list" class="item" @click="deleteBill(item,index)">
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
import {getRes, postRes} from "../util/axiosAPI";
import { ElMessage } from "element-plus/es";

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

    ElMessage({
          message: '点击对应账单可删除：）',
          type: 'info',
          center: true,
          duration: 1000
        });
  },
  data(){
    return{
      list:[

      ]
    }
  },
  methods:{
    deleteBill(item,index){
      let is_confirm = confirm("是否要删除账单：" + item.title + "?");
      if(is_confirm){
        const _this = this;
        postRes(
          '/deleteBill/' + item.id,
          {}
            ,
          res =>{
          
            if(res.data.code === 200){
            ElMessage({
              message:'删除成功',
              type:'success'
            });
              _this.list.splice(index,1);
            }
            
          }
        )
      }
    }
  }

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
  grid-template-columns: 77% 23%;
  padding: 15px;/*字和边框的距离*/
  z-index: 1;
}
.title{
  font-weight: bold;
  font-size: 16px;
}
.amount{
  color: #40E0D0;
  font-size: 25px;
  padding: 5px;

  font-weight: bolder;
}
.tag{
  margin-left: 5px;
}
.timeAndTag{
  margin-top: 5px;
}
.delete{
  width: 1px;
  z-index: 3;
  position: absolute;
  top: 0;
  right: 0;
}
</style>