<template>
  <div>

    <div class="input_container">
      <input class="title" type="text" placeholder="账单标题" v-model="title">
    </div>

    <div class="tagContainerCon">
      <div class="tagContainer">
        <div v-for="(tag, index) in tags" class="tag"
             :class="{tagSelected: tagSelectedArray[index] === 1 , tagNotSelected: tagSelectedArray[index] === 0}"
             @click="handleTagClick(index)">{{ tag }}
        </div>
      </div>
    </div>
    <div class="input_container">
      <input class="newtag" type="text" placeholder="添加标签" v-model="newTag">

      <i class="el-icon-check" style="font-size: 20px;" @click="addNewTag"></i>


    </div>


    <div class="numContainer">
      <div v-for="(item,index) in items" class="item" :class="{wider_item:index === 0, ripple:index !== 0}"
           @click="handleNumClick(index)">{{ item }}
      </div>
    </div>

<!--    <router-link to="/list">-->
<!--      <el-button style="margin-top: 10px" type="primary" round>账单</el-button>-->
<!--    </router-link>-->

<!--    <el-button style="margin-top: 10px;margin-left: 10px;margin-right: 10px" type="success" round-->
<!--               :disabled="title_is_null" @click="upload">提交-->
<!--    </el-button>-->

<!--    <router-link to="/user">-->
<!--      <el-button style="margin-top: 10px" type="info" round>-->
<!--        帮助-->
<!--      </el-button>-->
<!--    </router-link>-->

  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {getRes, postRes} from "../util/axiosAPI";

export default {
  name: "inputPanel",
  mounted() {
    //标签数据
    let _this = this;
    for (let i = 0; i < this.tags.length; i++) {
      _this.tagSelectedArray.push(0);
    }

    getRes(
        '/tag/allTags',
        res => {
          let tags = res.data;
          console.log();
          for (let i = 0; i < tags.length; i++) {
            if (!_this.tags.includes(tags[i]['name'])) {
              _this.tags.push(tags[i]['name']);
              _this.tagSelectedArray.push(0);
            }
          }

        }
    )

  },
  data() {
    return {
      tags:
          [
            '餐饮',
            '交通',
            '学习', '医疗'
          ]
      ,
      title: "",
      newTag: "",
      tagSelectedArray: [],
      items: ['0', '<', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'c', 0, '.']
    }
  },
  methods: {
    handleNumClick(index) {
      if (this.items[0].indexOf('.') !== -1 && (this.items[0].length > this.items[0].indexOf('.') + 2) && index !== 11 && index !== 1) {
        ElMessage.warning({
          message: "最多输入两位小数：）",
          type: "warning",
          duration: 1000,
          center: true,
          offset: 10,
        });

        return;
      }
      switch (index) {
        case 0:
          break;
        case 1:
          if (this.items[0].length === 1) {
            this.items[0] = '0';
            break;
          }
          this.items[0] = this.items[0].slice(0, this.items[0].length - 1);
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          if (this.items[0] === '0')
            this.items[0] = '' + this.items[index];
          else
            this.items[0] += this.items[index];
          break;
        case 11:
          this.items[0] = '0'
          break;
        case 12:
          if (this.items[0] !== '0')
            this.items[0] += this.items[index];
          break;
        case 13:
          if (!this.items[0].includes(this.items[index]))
            this.items[0] += this.items[index];
          break;


      }
    },
    addNewTag() {
      if (this.newTag === "") return;
      if (this.tags.includes(this.newTag)) {
        ElMessage.warning({
          message: "标签已存在",
          type: "warning",
          duration: 1000,
          center: true,
          offset: 10,
        });
      } else {
        this.tags.push(this.newTag);
        this.tagSelectedArray.push(0);
        this.tagSelectedArray[this.tagSelectedArray.length - 1] = 1;
      }
      this.newTag = "";
    },
    handleTagClick(index) {
      this.tagSelectedArray[index] = (this.tagSelectedArray[index] === 0) ? 1 : 0;
    },
    upload() {
      const _this = this;

      let tagSelected = [];
      for (let i = 0; i < _this.tags.length; i++) {
        if (_this.tagSelectedArray[i])
          tagSelected.push(_this.tags[i])
      }
      postRes(
          '/bill/newBill',
          {
            title: _this.title,
            amount: _this.items[0],
            tagSelected: tagSelected
          }, res => {
            if (res.data.code === 200) {

              _this.$message({
                message: '添加成功！',
                type: 'success'
              })
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          }
      );

    }
  },
  computed: {
    title_is_null() {
      return this.title === "" || this.items[0] === '0';
    }
  },
}
</script>

<style scoped>
.tagContainerCon {
  margin-top: 10px;
}

.tagSelected {
  font-weight: bold;
  color: black;
  border: 2px black solid;

}

.tagNotSelected {
  border: 2px gray solid;
  color: gray;
}

.tagContainer {
  margin: auto;
  width: 60%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.tag {

  border-radius: 10px;
  margin: 2px;
  overflow: hidden;

}

input {
  border: 2px solid white;
  border-radius: 10px;
  font-size: 20px;
}

.title {
  width: 40%;
}

.newtag {
  font-size: 15px;
  width: 20%;

}

input::placeholder {
  color: forestgreen;
}

.input_container {
  margin-top: 10px;
}


.numContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 80%;
  margin: auto;

}

.wider_item {
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: right;
  padding: 0;
}

.item {
  border: 2px solid black;
  margin: 1px 1px 1px 1px;
  border-radius: 10px;
  font-size: 50px;
  font-family: "Space Mono", monospace;
  overflow: auto;
}


.ripple {
  position: relative;
  overflow: hidden;
}

.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .1s, opacity .5s;
}

.ripple:active:after {
  transform: scale(10, 10);
  opacity: .3;
  transition: 0s;
}


</style>