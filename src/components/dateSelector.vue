<template>
  <div>
    <el-popover
      placement="bottom"
      :width="310"
      trigger="click"
      :show-arrow="false"
    >
      <template #reference>
        <i class="el-icon-date" style="font-size: 20px"></i>
      </template>

      <div class="dateCon">
        <el-date-picker
          class="dateItem"
          type="date"
          placeholder="日期"
          v-model="date"
          style="width: 90%; margin: auto"
        ></el-date-picker>
        <el-time-picker
          class="dateItem"
          placeholder="时间"
          v-model="time"
          style="width: 90%; margin: auto"
        ></el-time-picker>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "dateSelector",
  emits:['setDate','setTime'],
  data() {
    return {
      date: "",
      time: "",
    };
  },
  components: {},
  watch:{
    date(newDate, oldDate){
      this.$emit('setDate',this.date);
    },
    time(newTime, oldTime){
      this.$emit('setTime',this.time);
    }
  },
};
</script>

<style scoped>
.dateCon {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}
.dateItem {
  margin: auto;
}
</style>
<style>
</style>