<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active: isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TarBarItem",
  props: {
    path: String,
  },
  computed:{
    isActive(){
      return this.$route.path===this.path;
    }
  },
  methods: {
    itemClick() {
      if (this.$route.path !== this.path){
        this.$router.replace(this.path);
      }
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 70px;
  font-size: 10px;
  background-color: #40E0D0;
  /*bottom: 0;*/
}

.active {
  font-weight: bold;
}
</style>
