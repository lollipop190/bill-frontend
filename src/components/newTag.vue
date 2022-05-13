<template>
  <div>
    <n-popover
      placement="bottom"
      :width="50"
      trigger="click"
      :show-arrow="false"
    >
      <template #trigger>
        <i style="font-size:30px; margin-top:5px" class="el-icon-collection"></i>
      </template>
      <div>
        <input
          class="newtag"
          type="text"
          placeholder="添加标签"
          v-model="newTag"
        />

        <i class="el-icon-check" style="font-size: 20px" @click="addNewTag"></i>
      </div>
    </n-popover>
  </div>
</template>

<script>
export default {
  name: "newTag",
  emits:['addTag'],
  data() {
    return {
      newTag: "",
    };
  },
  components: {},
  computed: {
    isAdd() {
      return this.$route.path === "/";
    },
  },
  methods:{
      addNewTag() {
      if (this.newTag === "") return;
      this.$emit('addTag',this.newTag);
      this.newTag = "";
    },
  },
};
</script>

<style scoped>
.newtag {
  font-size: 15px;
  width: 80%;
}
</style>