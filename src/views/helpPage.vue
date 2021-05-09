<template>
  <div>
    <router-link to="/">
      <el-button type="" icon="el-icon-arrow-left" class="back">返回</el-button>

    </router-link>
    <router-link to="/login" @click="logout" class="logout">
    <el-button type="" icon="el-icon-arrow-right" class="logout">登出</el-button>
    </router-link>
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
  </div>

</template>

<script>
export default {
  name: "userPage",
  methods:{
    logout(){
      localStorage.clear("token");
    }
  }
}
</script>

<style scoped>
.back{
  border-radius: 20px;
  margin-left: 10px;
}
.logout{
  float: right;
  margin-right: 10px;
  border-radius: 20px;
}
.helpInfo{
  width: 90%;
  font-size: 20px;
  margin: 20px auto auto;
  padding: 0;
}
</style>