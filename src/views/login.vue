<template>
  <div>

  <div class="textContainer">
    登录
    <p style="font-size:20px">（无账号请点击注册）</p>
  </div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20%" class="demo-ruleForm form">
  <el-form-item label="用户名" prop="name">
    <el-input class="input_item" v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input class="input_item" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit" :disabled="!is_satisfied">创建/登录</el-button>
    <el-button :disabled="not_empty" @click="clear" >清空</el-button>
    
  </el-form-item>
</el-form>

  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [
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
        return (this.ruleForm.name !== "") && (this.ruleForm.password !== "");
    },
    not_empty(){
      return this.ruleForm.name === "" && this.ruleForm.password === "";
    }
  },
  methods:{
    submit(){
      console.log(this.ruleForm.name);
      console.log(this.ruleForm.password);
    },
    clear(){
      this.ruleForm.name = "";
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