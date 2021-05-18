<template>
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

    <tar-bar-item path="/统计">
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

    <!--      <tar-bar-item path="/">-->
    <!--        <template v-slot:item-icon>-->
    <!--          <img class="tab-bar-img" slot="item-icon" src="@/assets/img/tabbar/add.svg" alt="">-->
    <!--        </template>-->
    <!--        <template v-slot:item-icon-active>-->
    <!--          <img class="tab-bar-img" slot="item-icon-active" src="@/assets/img/tabbar/add_active.svg" alt="">-->
    <!--        </template>-->
    <!--        <template v-slot:item-text>-->
    <!--          <div slot="item-text">添加</div>-->
    <!--        </template>-->
    <!--      </tar-bar-item>-->
    <tar-bar-item path="/">
      <template v-slot:item-icon>
        <img class="tab-bar-add" slot="item-icon" src="@/assets/img/tabbar/add.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img class="tab-bar-add" slot="item-icon-active" src="@/assets/img/tabbar/add_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">添加</div>
      </template>
    </tar-bar-item>

    <tar-bar-item path="/share">
      <template v-slot:item-icon>
        <img class="tab-bar-img" slot="item-icon" src="@/assets/img/tabbar/share.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img class="tab-bar-img" slot="item-icon-active" src="@/assets/img/tabbar/share_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">共享</div>
      </template>
    </tar-bar-item>

    <tar-bar-item path="/user">
      <template v-slot:item-icon>
        <img class="tab-bar-img" slot="item-icon" src="@/assets/img/tabbar/help.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img class="tab-bar-img" slot="item-icon-active" src="@/assets/img/tabbar/help_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div slot="item-text">我的</div>
      </template>
    </tar-bar-item>
  </div>
</template>

<script>
import TarBarItem from "./TarBarItem";
export default {
  name: "TabBar",
  components: {TarBarItem}
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #40E0D0;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /*box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.2);*/
}
.tab-bar-img {
  width: 35px;
  height: 35px;
  margin-top: 15px;
  vertical-align: middle;
}
.tab-bar-add {
  width: 50px;
  height: 50px;
  margin-top: 1px;
  vertical-align: middle;
  /*box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.2);*/
  /*mso-border-shadow: yes;*/
}
</style>
