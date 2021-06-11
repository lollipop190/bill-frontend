<template>
  
  
  

  <div>
    <div class="input_container">
      <input class="title" type="text" placeholder="账单标题" v-model="title">
    </div>
    <tag @tag-selected="handleTagSelected"></tag>
    <div class="numContainer">
      <div v-for="(item,index) in items" class="item" :class="{wider_item:index === 0, ripple:index !== 0}" @click="handleNumClick(index)">{{item}}</div>
    </div>

  
    <el-button style="margin-top: 10px;margin-left: 10px;margin-right: 10px" type="success" round :disabled="title_is_null" @click="upload">提交</el-button>


  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {getRes, postRes} from "../util/axiosAPI";
import tag from '@/components/tag'
export default {
  name: "inputPanel",
 
  data(){
    return{
      title:"",
      items:['0','<',1,2,3,4,5,6,7,8,9,'c',0,'.'],
      tags:[]
    }
  },
  methods:{
    handleNumClick(index){
      if(this.items[0].indexOf('.') !== -1 &&(this.items[0].length > this.items[0].indexOf('.') + 2) && index !==11 && index !== 1){
         ElMessage.warning({
          message: "最多输入两位小数：）",
          type: "warning",
          duration: 1000,
          center: true,
          offset: 10,
        });

        return;
      }
      switch (index) {
        case 0:
          break;
        case 1:
          if (this.items[0].length === 1){
            this.items[0] = '0';
            break;
          }
          this.items[0] = this.items[0].slice(0,this.items[0].length - 1);
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          if (this.items[0] === '0')
            this.items[0] = '' + this.items[index];
          else
            this.items[0] += this.items[index];
          break;
        case 11:
          this.items[0] = '0'
          break;
        case 12:
          if (this.items[0] !== '0')
            this.items[0] += this.items[index];
          break;
        case 13:
          if (!this.items[0].includes(this.items[index]))
            this.items[0] += this.items[index];
          break;



      }
    },
  
handleTagSelected(tagText){
    this.tags.push(tagText);
},
    upload(){
      const _this = this;

      
        postRes(
            '/bill/newBill',
            {
              title: _this.title,
              amount: _this.items[0],
              tagSelected: _this.tags
            }, res =>{
              if(res.data.code === 200){

                _this.$message({
                  message:'添加成功！',
                  type: 'success'
                })
                setTimeout(()=>{
                  window.location.reload();
                }, 1000);
              }
            }
        );

    }
  },
  computed:{
    title_is_null(){
      return this.title === "" || this.items[0] === '0';
    }
  },
  components:{
    tag
  }
}
</script>

<style scoped>
input{
  border: 2px solid white;
  border-radius: 10px;
  font-size: 20px;
}
.title{
  width: 40%;
}


.input_container{
  margin-top: 10px;
}



.numContainer{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 80%;
  margin: auto;

}
.wider_item{
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: right;
  padding: 0;
}
.item{
  border: 2px solid black;
  margin: 1px 1px 1px 1px;
  border-radius: 15px;
  font-size: 40px;
  font-family: "Space Mono",monospace;
  overflow: auto;
}


.ripple {
  position: relative;
  overflow: hidden;
}

.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .1s, opacity .5s;
}

.ripple:active:after {
  transform: scale(10, 10);
  opacity: .3;
  transition: 0s;
}




</style>