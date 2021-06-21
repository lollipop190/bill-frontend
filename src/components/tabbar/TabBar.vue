<template>
  <div>
    <div id="tabContainer">
      <div id="tabBar">
        <div
          class="barItem"
          v-for="(item, index) in barItem"
          @click="handleClick(index)"
        >
          <!-- <img :src=item.img class="tab-bar-img"> -->
          <i :class="item.class" class="icon"></i>
          <div class="iconName">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setColor } from "../../util/backgroundColor";
import TarBarItem from "./TarBarItem";

export default {
  name: "TabBar",
  components: { TarBarItem },
  data() {
    return {
      drawer: false,
      barItem: [
        {
          name: "账单",
          img: require("../../assets/img/tabbar/list.svg"),
          class: "el-icon-notebook-2",
        },
        {
          name: "添加",
          img: require("@/assets/img/tabbar/add.svg"),
          class: "el-icon-circle-plus-outline",
        },
        {
          name: "统计",
          img: require("../../assets/img/tabbar/statistics.svg"),
          class: "el-icon-date",
        },
      ],
      path: ["/list", "/", "/analysis"],
    };
  },
  methods: {
    handleClick(index) {
      if (this.$route.path !== this.path[index]) {
        switch (index) {
          case 0:
            setColor("#FFEFD5");
            break;
          case 1:
            setColor("#40E0D0");
            break;
          case 2:
            setColor("#e3e3e3");
            break;
        }

        this.$router.push(this.path[index]);
      }
    },
  },
};
</script>

<style scoped>
#tabBar {
  position: static;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
}
#tabContainer {
  position: fixed;
  left: 10%;
  right: 10%;
  bottom: 0;
  text-align: center;
  font-size: 10px;
}
.icon {
  font-size: 35px;
  color: grey;
}
.iconName {
  color: grey;
  font-size: 15px;
}
.tab-bar-img {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  vertical-align: middle;
}
</style>

