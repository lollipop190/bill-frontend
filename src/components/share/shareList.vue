<template>

  <!--  <el-card class="box-card">-->
  <!--    <template #header>-->
  <!--      <div class="card-header">-->
  <!--        <span>{{ username }}</span>-->
  <!--        <el-button class="button" type="text">关闭</el-button>-->
  <!--      </div>-->
  <!--    </template>-->
  <!--    <el-scrollbar height="200px">-->
  <div v-for="(item, index) in list">
    <el-divider
        v-if="isToday(item.bill.date) && index===0"
        content-position="left"
        class="my-divider">今天
    </el-divider>
    <el-divider
        v-if="isYesterday(item.bill.date) && (index===0 || (index > 0) && isNew(item.bill.date, list[index-1].bill.date))"
        content-position="left"
        class="my-divider">昨天
    </el-divider>
    <el-divider
        v-if="index >= 1 && !isYesterday(item.bill.date) && isNew(item.bill.date, list[index-1].bill.date)"
        content-position="left"
        class="my-divider">{{ item.bill.date.substring(0, 10) }}
    </el-divider>

    <div class="itemContainer">
      <div class="item">
        <div>
          <div class="titleAndTag">
            <div class="title">{{ item.bill.title }}</div>
            <!-- <div class="tagContainer"> -->
            <div v-for="tag in item.tags" class="tag">{{ tag.name }}</div>
            <!-- </div> -->
          </div>

          <div class="date">
            <span>{{ item.bill.date }}</span>
          </div>
        </div>
        <div class="amount">-{{ item.bill.amount }}</div>
      </div>
    </div>
  </div>
  <!--    </el-scrollbar>-->
  <!--  </el-card>-->
</template>

<script>
import {ElMessage} from "element-plus/es";
import axios from 'axios'
import {postRes, getRes} from "@/util/axiosAPI";

export default {
  name: "shareList",
  props: {
    list: [],
    // username: "",
  },
  // data() {
  //   return {
  //     list: [],
  //   }
  // },
  // mounted() {
  //   console.log(this.$route.params.id);
  //   getRes("/getShareBills/" + this.$route.params.id, res => {
  //     this.list = res.data.data;
  //   })
  // },
  methods: {
    isToday(date) {
      let nextDate = new Date(date);
      let lastDate = new Date();
      let _nextDate = Date.parse(nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getDate());
      let _lastDate = Date.parse(lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getDate());
      return _lastDate === _nextDate;
    },
    isYesterday(date) {
      let nextDate = new Date(date);
      let lastDate = new Date();
      let _nextDate = Date.parse(nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getDate());
      let _lastDate = Date.parse(lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getDate());
      return (_lastDate - _nextDate) / (24 * 60 * 60 * 1000) < 2 && (_lastDate - _nextDate) / (24 * 60 * 60 * 1000) >= 1;
    },
    isNew(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = Date.parse(nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getDate());
      let _lastDate = Date.parse(lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getDate());
      return !(_lastDate === _nextDate);
    },
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 3% auto auto;

}

.back {
  border-radius: 20px;

}

.item {
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 8px;

  border-radius: 30px;
  background-color: #FFF;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  display: grid;
  grid-template-columns: 73% 27%;
  padding: 15px; /*字和边框的距离*/
  z-index: 1;
}

.title {
  font-weight: bold;
  font-size: 16px;
  display: inline-block;
}

.tag {
  font-size: 12px;
  padding: 2px;
  border: 1px solid #20B2AA;
  color: #20B2AA;
  border-radius: 15px;
  margin-left: 5px;
  display: inline-block;
  position: relative;
  top: -10px;
  left: 5px;
}

.amount {
  color: #40E0D0;
  font-size: 23px;
  padding: 7px;
  text-align: right;
  font-weight: bolder;
}

.date {
  margin-top: 7px;
}

.delete {
  width: 20px;
  height: 20px;
  text-align: center;
  z-index: 3;
  position: absolute;
  top: -6px;
  right: 0px;
  border: 2px solid whitesmoke;
  background-color: whitesmoke;
  border-radius: 50%;
}

.itemContainer {
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

.my-divider {
  background-color: #fff585;
  height: 9px;
  width: auto;
  box-shadow: 0 -3px 2px rgba(200, 200, 200, 0.2);
  /*border: 2px solid #fff544;*/
  border: 2px solid #fff585;
  border-radius: 10px;
  margin: 20px 2%;
}

/*.card-header {*/
/*  display: flex;*/
/*  justify-content: space-between;*/
/*  align-items: center;*/
/*}*/

/*.text {*/
/*  font-size: 14px;*/
/*}*/

/*.item {*/
/*  margin-bottom: 18px;*/
/*}*/

/*.box-card {*/
/*  width: 80%;*/
/*}*/
</style>
<style>
.el-divider__text {
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  font-size: 15px;
}
</style>