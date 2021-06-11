<template>
  <div>
    <div style="margin-left: 3px">
      总支出：{{ all.toFixed(2) }}
    </div>
    <div style="margin-left: 3px">
      平均值：{{ average }}
    </div>
    <v-chart id="chart" class="chart" :option="option"></v-chart>

    <div class="sort">
      <div>支出排行榜</div>
      <v-chart class="chart" :option="option_sort"></v-chart>
    </div>
  </div>
</template>

<script>
//虽然下面这一句是灰的，但是一定不要删，删了会有莫名的错误:（
import * as echarts from 'echarts';
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart, BarChart} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";
import {ref, defineComponent} from "vue";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default {
  name: "week",
  data() {
    return {
      all: 0,
      option: "",
      option_sort: "",
    }
  },
  components: {
    VChart
  },
  computed: {
    average() {
      return (this.all / (new Date().getDay() === 0 ? 7 : new Date().getDay())).toFixed(2);
    }
  },


  methods: {
    draw(list) {
      this.all = 0;
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
        }],
        grid: {
          top: '10%',
          left: '3%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
      };

      let option_sort = {
        dataset: {
          source: [
          ]
        },
        xAxis: {
          max: 'dataMax',
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 4
        },
        series: [{
          type: 'bar',
          realtimeSort: true,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          },
          encode: {x: 1, y: 0}
        }],
        grid: {
          top: '10%',
          left: '3%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        animationDuration: 0,
      }

      let sort_data = {};

      let date = new Date();
      let weekday = date.getDay();
      let dateCurPar = Date.parse(new Date(date)) / 1000;
      for (let i = 0; i < 7; i++) {
        let dayPar = new Date((dateCurPar + 86400 * (-(weekday === 0 ? 7 : weekday) + i + 1)) * 1000);
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
              for (let k = 0; k < list[i].tags.length; k++) {
                if (!sort_data.hasOwnProperty(list[i].tags[k].name)) {
                  sort_data[list[i].tags[k].name] = list[i].bill.amount;
                } else {
                  sort_data[list[i].tags[k].name] += list[i].bill.amount;
                }
                console.log()
              }
            }
          }
        }
      }
      for (let i = 0; i < Object.keys(sort_data).length; i++) {
        option_sort.dataset.source.push([Object.keys(sort_data)[i], sort_data[Object.keys(sort_data)[i]]]);
      }
      this.option = option;
      this.option_sort = option_sort;
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

.sort {
  margin-left: 3px;
  margin-top: 10px;
}
</style>