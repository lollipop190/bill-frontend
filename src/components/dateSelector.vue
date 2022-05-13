<template>
  <div>
    <n-popover placement="bottom" :width="310" trigger="click">
      <template #trigger>
        <i class="el-icon-date" style="font-size: 20px"></i>
      </template>

      <div class="dateCon">
        <n-date-picker
          v-model:formatted-value="date"
          :input-readonly="readonly"
          value-format="yyyy/MM/dd"
          type="date"
          :size="size"
          :shortcuts="shortcuts"
          clearable
        />
         <n-time-picker v-model:formatted-value="time" value-format="HH:mm:ss" :input-readonly="readonly"/>
        <!-- <el-date-picker
          class="dateItem"
          type="date"
          placeholder="日期"
          v-model="date"
          style="width: 90%; margin: auto"
          @focus="clickFunc"
        ></el-date-picker>
        <el-time-picker
          class="dateItem"
          placeholder="时间"
          v-model="time"
          style="width: 90%; margin: auto"
          @focus="clickFunc"
        ></el-time-picker> -->
      </div>
    </n-popover>
  </div>
</template>

<script>
export default {
  mounted() {
    let date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    var second = date.getSeconds();
    second = second < 10 ? "0" + second : second;
    this.date = y + "/" + m + "/" + d;
    this.time = h + ":" + minute + ":" + second;
  },
  name: "dateSelector",
  emits: ["setDate", "setTime"],
  data() {
    return {
      readonly: true,
      size: 'small',
      date: "",
      time: '',
      shortcuts: {
        昨天: () => new Date().getTime() - 24 * 60 * 60 * 1e3,
        前天: () => new Date().getTime() - 2 * 24 * 60 * 60 * 1e3,
      },
    };
  },
  methods: {
    // clickFunc() {
    //   alert(1);
    //   document.activeElement.blur();
    // },
  },

  watch: {
    date(newDate, oldDate) {
      this.$emit("setDate", this.date);
    },
    time(newTime,oldTime){
      this.$emit("setTime", this.time);
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