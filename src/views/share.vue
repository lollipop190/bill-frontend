<template>
  <div>
    <div v-if="hasShare" class="share-panel">
      <!--      <el-collapse v-for="(item, index) in list" v-model="activeNames" @change="handleChange">-->
      <!--        <el-collapse-item :name="index" class="share-panel-item">-->
      <!--          <template #title>-->
      <!--            {{ item.username }}-->
      <!--          </template>-->
      <!--          <div>-->
      <!--            <shared-chart :list="item.detail"></shared-chart>-->
      <!--          </div>-->
      <!--        </el-collapse-item>-->
      <!--      </el-collapse>-->
      <div>
        <h2 style="text-align: center">
          共享成员账单
        </h2>
      </div>
      <div v-for="(item, index) in list" class="share-panel">
        <div class="share-panel-item">
          <div class="share-item-title" @click="handleChange(index)">
            {{ item.username }}
            <span v-if="isThisUser(item.uid)">(我)</span>
            <div style="float: right;margin-right: 5px" v-if="activeNames.indexOf(index)!==-1"
                 class="el-icon-arrow-down"></div>
            <div style="float: right;margin-right: 5px" v-else class="el-icon-arrow-right"></div>
          </div>
          <transition name="el-zoom-in-top">
            <div v-if="activeNames.indexOf(index)!==-1">
              <shared-chart :list="item.detail"></shared-chart>
              <div class="share-item-button" @click="showDetail(index)" v-if="showDialog.indexOf(index)===-1">查看成员明细>>
              </div>
              <div class="share-item-button" @click="showDetail(index)" v-else>收起成员明细>></div>

              <share-list :list="item.bills" v-if="showDialog.indexOf(index)!==-1"></share-list>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="textContainer">
        加入共享
        <p style="font-size:20px">（无共享自动创建）</p>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="20%" class="demo-ruleForm form">
        <el-form-item label="共享名" prop="sharename">
          <el-input class="input_item" v-model="ruleForm.sharename"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input class="input_item" v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="!is_satisfied">创建/加入</el-button>
          <el-button :disabled="not_empty" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import {postRes, getRes} from "../util/axiosAPI";
import {ElMessage} from "element-plus/es";
import SharedChart from "../components/share/sharedChart";
import jwt_decode from 'jwt-decode'
import ShareList from "../components/share/shareList";

export default {
  name: "share",
  components: {ShareList, SharedChart},
  data() {
    return {
      ruleForm: {
        sharename: '',
        password: '',
      },
      rules: {
        sharename: [
          {required: true, message: '请输入共享名', trigger: 'blur'},
          {max: 10, message: '共享名过长，大于10个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 10, message: '密码过长，大于10个字符', trigger: 'blur'}
        ]
      },
      hasShare: true,
      activeNames: [0],
      list: [],
      // showBills: [],
      showDialog: [],
    }
  },
  computed: {
    is_satisfied() {
      return (this.ruleForm.sharename !== "") && (this.ruleForm.password !== "");
    },
    not_empty() {
      return this.ruleForm.sharename === "" && this.ruleForm.password === "";
    }
  },
  mounted() {
    this.getShare();
  },
  methods: {
    isThisUser(id) {
      return jwt_decode(localStorage.getItem('Authorization'))["aud"] === id.toString();
    },
    submit() {
      let _this = this;
      postRes('/share/newShare', _this.ruleForm, res => {
        if (res.data.data.msg === 'error') {
          _this.$message({
            message: '密码错误!',
            type: 'error'
          })
          return
        }
        ElMessage.success({
          message: '加入成功：）',
          type: 'success'
        });
        this.getShare();
      })
    },
    clear() {
      this.ruleForm.sharename = "";
      this.ruleForm.password = "";
    },
    getShare() {
      let _this = this;
      getRes('share/getShare', res => {
        if (res.data.data !== "null") {
          _this.hasShare = true;
          _this.list = res.data.data;
        } else {
          _this.hasShare = false;
        }
        // console.log(res.data.data);
      })
    },
    handleChange(index) {
      if (this.activeNames.indexOf(index) === -1) {
        this.activeNames.push(index);
      } else {
        this.activeNames.splice(this.activeNames.indexOf(index), 1);
      }
    },
    showDetail(index) {
      if (this.list[index].allow === 1) {
        // this.showBills = this.list[index].bills;
        if (this.showDialog.indexOf(index) === -1) {
          // console.log("add" + index);
          this.showDialog.push(index);
        } else {
          this.showDialog.splice(this.showDialog.indexOf(index), 1);
          // console.log("remove" + index);
        }
        // layer.open({
        //   type: 2,
        //   title: this.list[index].username,
        //   shadeClose: true,
        //   shade: 0.8,
        //   area: ['80%', '90%'],
        //   content: '/shareBills/' + this.list[index].uid,
        // });
      } else {
        this.$alert('该成员为隐私用户，无法查看', {
          confirmButtonText: '确定',
          customClass: 'notAllow',
        });
      }
    }
  }
}
</script>

<style scoped>
.textContainer {
  text-align: center;
  margin-top: 10%;
  font-size: 30px;
}

.input_item {
  width: 85%;
}

.form {
  margin-top: 5%;
}

.share-panel {
  margin-top: 20px;
}

.share-panel-item {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.share-item-title {
  font-size: 20px;
  padding-left: 8px;
  padding-top: 5px;
  height: 35px;
}

.share-item-button {
  text-align: right;
  font-size: 15px;
  padding-top: 20px;
  height: 25px;
}

</style>
<style>
.notAllow {
  max-width: 80%;
  /*color: #40E0D0;*/
}
</style>