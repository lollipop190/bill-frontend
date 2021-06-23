<template>
  <div>
    <div style="margin-left: 3px">
      总支出：{{ all }}
    </div>
    <div style="margin-left: 3px">
      平均值：{{ average }}
    </div>
    <div id="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {getRes, postRes} from "../../util/axiosAPI";

export default {
  name: "week",
  data() {
    return {
      // list: [],
      all: 0,
      // average: 0,
    }
  },
  computed: {
    average() {
      return (this.all / (new Date().getDay() === 0 ? 7 : new Date().getDay())).toFixed(2);
    }
  },
  // mounted() {
  //   const _this = this;
  //   getRes(
  //       '/bill/allBills',
  //       res => {
  //         _this.list = res.data;
  //         _this.$nextTick(function() {
  //           this.draw('chart');
  //         })
  //       }
  //   )
  // },
  methods: {
    draw(id, list) {
      this.all = 0;
      let dom = document.getElementById(id);
      dom.style.display="block";
      let instance = echarts.init(dom);
      let days = [];
      let option = {
        dataset: {
          source: []
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [{
          type: 'line',
          encode: {x: 0, y: 1}
        }]
      };

      let date = new Date();
      let weekday = date.getDay();
      let dateCurPar = Date.parse(new Date(date)) / 1000;
      for (let i = 0; i < 7; i++) {
        let dayPar = new Date((dateCurPar + 86400 * (-weekday + i + 1)) * 1000);
        option.dataset.source.push([(dayPar.getMonth() + 1) + '-' + dayPar.getDate(), 0]);
        days.push(dayPar.getFullYear() + '-' + (dayPar.getMonth() + 1) + '-' + dayPar.getDate());
      }

      for (let i = 0; i < list.length; i++) {
        let itemDate = new Date(list[i].bill.date);
        if (this.isThisWeek(list[i].bill.date)) {
          for (let j = 0; j < 7; j++) {
            if (this.isSameDay(itemDate, days[j])) {
              option.dataset.source[j][1] += list[i].bill.amount;
              this.all += list[i].bill.amount;
            }
          }
        }
      }
      instance.setOption(option);
    },
    isSameDay(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = Date.parse(nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getDate());
      let _lastDate = Date.parse(lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getDate());
      return _lastDate === _nextDate;
    },
    isThisWeek(date) {
      let today = new Date();
      date = new Date(date);
      let weekday = today.getDay() === 0 ? 7 : today.getDay();
      let _today = Date.parse(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
      let _date = Date.parse(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
      return (_today - _date) / (24 * 60 * 60 * 1000) < weekday;
    }
  }
}
</script>

<style scoped>
.chart {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>