<template>
  <div>
    <!--    <router-link to="/">-->
    <!--      <el-button type="" icon="el-icon-arrow-left" class="back">返回</el-button>-->

    <!--    </router-link>-->
    <!--    <router-link to="/login" @click="logout" class="logout">-->
    <!--    <el-button type="" icon="el-icon-arrow-right" class="logout">登出</el-button>-->
    <!--    </router-link>-->
    <el-card class="box-card helpInfo">
      <template #header>
        <div class="card-header">
          <span>使用说明</span>
        </div>
      </template>
      <p>
        基于"不愿意把自己的数据透露给第三方记账app"的想法，
        这个记账项目诞生，页面简洁，功能保留最最精华的部分，采用网页开发，可将网页保存在桌面，使用时立即打开，延迟低，没有任何广告和附加功能。
      </p>
      <p>
        注册后登录，记账时填写标题，选择标签（标签可不选，标题必须填写）后点击下方提交即可。
      </p>
      <p>
        作者想借助这个小项目帮助自己和他人更好了解自己的财务情况，更好地安排自己的财务。
      </p>
    </el-card>

    <!--    <div class="user-button">-->
    <!--      <span>主题颜色</span>-->
    <!--    </div>-->
    <div class="user-button allow">
      隐私用户
      <el-switch v-model="allow" active-color="#ff4949" style="float: right" @change="updateAllow"></el-switch>
    </div>
    <span style="font-size: 10px;margin-left: 20px;margin-bottom: 20px">
      <div class="el-icon-warning"></div>
      开启后共享成员无法查看你的账单明细
    </span>
    <div class="user-button" @click="logout">退出登录</div>
  </div>

</template>

<script>
import axios from 'axios'
import {getRes} from "../util/axiosAPI";

export default {
  name: "userPage",
  data() {
    return {
      allow: false,
    }
  },
  mounted() {
    const _this = this;
    getRes("/share/getAllow", res => {
      this.allow = res.data.data !== 1;
    })
  },
  methods: {
    logout() {
      localStorage.clear("token");
      this.$router.replace("/login");
    },
    updateAllow() {
      console.log(this.allow);
      if (this.allow) {
        getRes("/share/setNotAllow", res => {
          console.log(res);
        })
      } else {
        getRes("/share/setAllow", res => {
          console.log(res);
        })
      }
    }
  }
}
</script>

<style scoped>
.back {
  border-radius: 20px;
  margin-left: 10px;
}

.logout {
  float: right;
  margin-right: 10px;
  border-radius: 20px;
}

.helpInfo {
  width: 90%;
  font-size: 20px;
  margin: 20px auto auto;
  padding: 0;
}

.user-button {
  height: 30px;
  width: 90%;
  text-align: center;
  padding-top: 10px;
  margin: 10px auto auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.allow {
  text-align: left;
}
</style>