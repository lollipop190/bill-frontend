<template>
<div class="container">
<el-input v-model="input" placeholder="请输入要搜索的内容（标题或标签名称）"></el-input>

  <div v-for="(item, index) in list" class="itemContainer" >
    <div class="delete" @click="deleteBill(item,index)"><span id="close"></span></div>
    <div class="item">
    <div>
    <div class="titleAndTag">
      <div class="title">{{item.bill.title}}</div>
      <div v-for="tag in item.tags" class="tag">{{tag.name}}</div></div>
    <div class="date"><span>{{item.bill.date}}</span></div>
    </div>
    <div class="amount">-{{item.bill.amount}}</div>
    </div>

  </div>

<div class="block" v-if="!queryMode">
  <div class="pageContainer">


  <el-pagination
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="billsAmount"
    @currentChange="getPageBill"
    ></el-pagination>
</div> 
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
      '/bill/allBillsAmount',
      res =>{
        _this.billsAmount = res.data;
      }
    )
    getRes(
        '/bill/allBills/1/'+_this.pageSize + '/default',
        res =>{
          _this.list = res.data;
        }
    )

    
  },
  data(){
    return{
      billsAmount:0,
      pageSize:7,
      input:'',
      pageIndex:1,
      list:[
      ],
      queryMode:false
    }
  },
  methods:{
    deleteBill(item,index){
      let is_confirm = confirm("是否要删除账单：" + item.bill.title + "?");
      if(is_confirm){
        const _this = this;
        postRes(
          '/bill/deleteBill/' + item.bill.id,
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
    },
    getPageBill(pageIndex){
      this.pageIndex = pageIndex;
      const _this = this;
      getRes(
        '/bill/allBills/' + pageIndex + '/' + _this.pageSize + '/' + ((_this.input === '') ? 'default': _this.input),
        res => {
          _this.list = res.data;
        }
      )
    }
  },
  watch: {
    input(newQues, oldQues){
      //具体的函数逻辑还是应该封装在methods中：
        if (newQues.length === 0){     
          const _this = this;
    getRes(
      '/bill/allBillsAmount',
      res =>{
        _this.billsAmount = res.data;
      }
    );
    getRes(
        '/bill/allBills/1/'+_this.pageSize + '/default',
        res =>{
          _this.list = res.data;
        }
    );
        this.queryMode = false;
        }else{
          this.queryMode = true;
          const _this = this;
      getRes(
        '/bill/allBills/' + 0 + '/' + 0 + '/' +  _this.input,
        res => {
          _this.list = res.data;
        }
      )
        }
      

    }
  }

}
</script>

<style scoped>
.pageContainer{
  margin-top: 3%;
}
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
  grid-template-columns: 73% 27%;
  padding: 15px;/*字和边框的距离*/
  z-index: 1;
}

.title{
  font-weight: bold;
  font-size: 16px;
  display: inline-block;
}

.tag{
  font-size: 12px;
  padding: 2px;
  border:1px solid #20B2AA;
  color: #20B2AA;
  border-radius: 15px;
  margin-left: 5px;
  display: inline-block;
  position: relative;
  top: -10px;
  left: 5px;
}
.amount{
  color: #40E0D0;
  font-size: 23px;
  padding: 7px;
  text-align: right;
  font-weight: bolder;
}

.date{
  margin-top: 7px;
}
.delete{
  width :20px;
  height:20px;
  text-align: center;
  z-index: 3;
  position: absolute;
  top: -6px;
  right: 0px;
  border: 2px solid whitesmoke;
  background-color: whitesmoke;
  border-radius: 50%;
}

.itemContainer{
  position: relative;
}

 #close {
        display: inline-block;
        width: 10px;
        height: 1px;
        background: #333;
        transform: rotate(45deg);
        margin-bottom: 5px;
    }

    #close::after {
        content: '';
        display: block;
        width: 10px;
        height: 1px;
        background: #333;
        transform: rotate(-90deg);
    }
</style>