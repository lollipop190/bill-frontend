<template>
  <div>

    <!-- <div id="tab-bar">
      <tar-bar-item path="/list">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="../../assets/img/tabbar/list.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="../../assets/img/tabbar/list_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>明细</div>
        </template>
      </tar-bar-item>

      <tar-bar-item path="/statistics">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="../../assets/img/tabbar/statistics.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="../../assets/img/tabbar/statistics_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>统计</div>
        </template>
      </tar-bar-item>

      <tar-bar-item path="/" class="tab-bar-item-add">
        <template v-slot:item-icon>
          <img class="tab-bar-add" src="../../assets/img/tabbar/add.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-add" src="../../assets/img/tabbar/add_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div slot="item-text">添加</div>
        </template>
      </tar-bar-item>


      <tar-bar-item path="/share">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="../../assets/img/tabbar/share.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="../../assets/img/tabbar/share_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div slot="item-text">共享</div>
        </template>
      </tar-bar-item>

      <tar-bar-item path="/user">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="../../assets/img/tabbar/help.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="../../assets/img/tabbar/help_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div slot="item-text">我的</div>
        </template>
      </tar-bar-item>
    </div> -->


    <div id="tabContainer">
    <div id="tabBar">
      <div class="barItem" v-for="(item,index) in barItem" @click="handleClick(index)">
        <!-- <img :src=item.img class="tab-bar-img"> -->
        <i :class=item.class class="icon"></i>
        <div class="iconName">{{item.name}}</div>
        </div>
       </div>
    </div>

  </div>
</template>

<script>
import TarBarItem from "./TarBarItem";

export default {
  name: "TabBar",
  components: {TarBarItem},
  data() {
    return {
      drawer: false,
      barItem:[
        {
          name:'账单',
          img:require("../../assets/img/tabbar/list.svg"),
          class:'el-icon-notebook-2'
        },{
          name:'添加',
          img:require('@/assets/img/tabbar/add.svg'),
          class: "el-icon-circle-plus-outline"
        },{
          name:'统计',
          img:require('../../assets/img/tabbar/statistics.svg'),
          class:'el-icon-date'
        }
      ],
      path:[
        '/list',
        '/',
        '/analysis'
      ]
    }
  },
  methods:{
    handleClick(index){
       if (this.$route.path !== this.path[index]){
        this.$router.push(this.path[index]);
      }
    }
  }
}
</script>

<style scoped>
#tabBar{
  position: static;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
#tabContainer{
  position: fixed;
  left: 10%;
  right: 10%;
  bottom: 0;
  text-align: center;
  font-size: 10px;
}
.icon{
  font-size: 35px;
  color: grey;
}
.iconName{
  color:grey;
  font-size: 15px;
}
.tab-bar-img {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  vertical-align: middle;
}

</style>

