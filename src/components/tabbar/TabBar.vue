<template>
  <div>
    <!--    <el-drawer-->
    <!--        v-model="drawer"-->
    <!--        direction="btt"-->
    <!--        destroy-on-close-->
    <!--        size="100%"-->
    <!--        custom-class="add-drawer">-->
    <!--      <money-counter style="background-color: #40E0D0"></money-counter>-->
    <!--    </el-drawer>-->

    <div id="tab-bar">
      <tar-bar-item path="/list">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="@/assets/img/tabbar/list.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="@/assets/img/tabbar/list_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>明细</div>
        </template>
      </tar-bar-item>

      <tar-bar-item path="/statistics">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="@/assets/img/tabbar/statistics.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="@/assets/img/tabbar/statistics_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>统计</div>
        </template>
      </tar-bar-item>

      <tar-bar-item path="/" class="tab-bar-item-add">
        <template v-slot:item-icon>
          <img class="tab-bar-add" src="@/assets/img/tabbar/add.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-add" src="@/assets/img/tabbar/add_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div slot="item-text">添加</div>
        </template>
      </tar-bar-item>

      <!--      <tar-bar-item @click="drawer=true">-->
      <!--        <template v-slot:item-icon>-->
      <!--          <img class="tab-bar-add" src="@/assets/img/tabbar/add_active.svg" alt="">-->
      <!--        </template>-->
      <!--        <template v-slot:item-icon-active>-->
      <!--          <img class="tab-bar-add" src="@/assets/img/tabbar/add_active.svg" alt="">-->
      <!--        </template>-->
      <!--        <template v-slot:item-text>-->
      <!--          <div slot="item-text">添加</div>-->
      <!--        </template>-->
      <!--      </tar-bar-item>-->

      <tar-bar-item path="/share">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="@/assets/img/tabbar/share.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="@/assets/img/tabbar/share_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div slot="item-text">共享</div>
        </template>
      </tar-bar-item>

      <tar-bar-item path="/user">
        <template v-slot:item-icon>
          <img class="tab-bar-img" src="@/assets/img/tabbar/help.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img class="tab-bar-img" src="@/assets/img/tabbar/help_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div slot="item-text">我的</div>
        </template>
      </tar-bar-item>
    </div>
  </div>
</template>

<script>
import TarBarItem from "./TarBarItem";
import MoneyCounter from "../../views/moneyCounter";

export default {
  name: "TabBar",
  components: {MoneyCounter, TarBarItem},
  data() {
    return {
      drawer: false,
    }
  }
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  align-items: flex-end;
  background-color: #fffab3;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 999;

  /*box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.2);*/
}

.tab-bar-img {
  width: 35px;
  height: 35px;
  margin-top: 17px;
  vertical-align: middle;
}

.tab-bar-add {
  width: 50px;
  height: 50px;
  margin-top: 2px;
  vertical-align: middle;
  /*box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.2);*/
}
</style>
<style>
.add-drawer {
  background-color: #40E0D0;
}

.el-drawer__header {
  height: 20px;
}

body {
  margin-bottom: 80px;
}
</style>
