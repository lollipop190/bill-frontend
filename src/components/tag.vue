<template>
  <div>
    <div class="tagContainerCon">
      <div class="tagContainer">
        <div
          v-for="(tag, index) in tags"
          class="tag"
          :class="{
            tagSelected: tagSelectedArray[index] === 1,
            tagNotSelected: tagSelectedArray[index] === 0,
          }"
          @click="handleTagClick(index)"
        >
          {{ tag }}
        </div>
      </div>
    </div>
      <new-tag @add-tag="addNewTag"  v-if="isAdd"></new-tag>
    
  </div>
</template>

<script>
import { getRes, postRes } from "../util/axiosAPI";


import NewTag from './newTag.vue';
export default {
  name: "tag",
  mounted() {
    //标签数据
    let _this = this;
    for (let i = 0; i < this.tags.length; i++) {
      _this.tagSelectedArray.push(0);
    }

    getRes("/tag/allTags", (res) => {
      let tags = res.data;
      for (let i = 0; i < tags.length; i++) {
        if (!_this.tags.includes(tags[i]["name"])) {
          _this.tags.push(tags[i]["name"]);
          _this.tagSelectedArray.push(0);
        }
      }
    });
  },
  emits: ["tagSelected"],
  data() {
    return {
      tags: ["餐饮", "交通", "学习", "医疗"],
      tagSelectedArray: [],
      
    };
  },
  methods: {
    handleTagClick(index) {
      this.$emit(
        "tagSelected",
        this.tags[index],
        this.tagSelectedArray[index] === 0
      );
      //如果后面为true，说明是没有选中，如果是false说明是取消
      this.tagSelectedArray[index] = this.tagSelectedArray[index] === 0 ? 1 : 0;
    },
    addNewTag(newTag) {
      if (this.tags.includes(newTag)) {
        ElMessage.warning({
          message: "标签已存在",
          type: "warning",
          duration: 1000,
          center: true,
          offset: 10,
        });
      } else {
        this.tags.push(newTag);
        this.tagSelectedArray.push(0);
        this.tagSelectedArray[this.tagSelectedArray.length - 1] = 1;
        this.$emit("tagSelected", this.tags[this.tags.length - 1], true);
      }
    
    },
  },
  computed: {
    isAdd() {
      return this.$route.path === "/";
    },
  },
  components: {
    NewTag,
  },
};
</script>

<style scoped>
input {
  border: 2px solid white;
  border-radius: 10px;
  font-size: 20px;
}
.tagContainerCon {
  margin-top: 10px;
  text-align: center;
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
  width: 85%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.tag {
  border-radius: 10px;
  margin: 2px;
  overflow: hidden;
}
.newtag {
  font-size: 15px;
  width: 80%;
}
</style>
<style>
.el-popover.el-popper {
  border-radius: 10%;
}
</style>