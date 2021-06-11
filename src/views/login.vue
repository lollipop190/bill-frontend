<template>
  <div>

  <div class="textContainer">
    登录
    <p style="font-size:20px">（无账号自动注册）</p>
  </div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20%" class="demo-ruleForm form">
  <el-form-item label="用户名" prop="username">
    <el-input class="input_item" v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input class="input_item" v-model="ruleForm.password" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit" :disabled="!is_satisfied">创建/登录</el-button>
    <el-button :disabled="not_empty" @click="clear" >清空</el-button>
    
  </el-form-item>
</el-form>


   <el-card class="box-card helpInfo">
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
import axios from 'axios'
import {postRes} from "../util/axiosAPI";
import { ElMessage } from "element-plus/es";
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { max: 10, message: '用户名过长，大于10个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { max: 10, message: '密码过长，大于10个字符', trigger: 'blur' }
          ]
          
        }
    
    }
  },
  computed:{
    is_satisfied(){
        return (this.ruleForm.username !== "") && (this.ruleForm.password !== "");
    },
    not_empty(){
      return this.ruleForm.username === "" && this.ruleForm.password === "";
    }
  },
  methods:{
    submit(){
      let _this = this;
      postRes('/user/loginOrSign',_this.ruleForm,  res =>{
        if (res.data.msg === 'wrong'){
          _this.$message({
            message:'密码错误或者用户名已存在！',
            type:'error'
          })
          return
        }
        localStorage.setItem('Authorization', res.data.token);
        ElMessage.success({
          message: '登录成功：）',
          type: 'success'
        });
        _this.$router.push('/');
      })
    },
    clear(){
      this.ruleForm.username = "";
      this.ruleForm.password = "";
    }
  }
}
</script>

<style scoped>
.textContainer{
  text-align: center;
  margin-top: 10%;
  font-size: 30px;
}
.input_item{
  width: 85%;
}
.form{
  margin-top: 5%;
}
</style>