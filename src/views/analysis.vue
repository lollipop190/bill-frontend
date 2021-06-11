<template>
  <div>
    <router-link to="/login" @click="logout" class="logout">
    <el-button type="" icon="el-icon-arrow-right" class="logout">登出</el-button>
    </router-link>
 
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