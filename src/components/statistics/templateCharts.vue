<template>
  <div>
    <div style="margin-left: 3px">总支出：{{ all.toFixed(2) }}</div>
    <div style="margin-left: 3px">平均值：{{ average }}</div>
    <v-chart id="chart_year" class="chart" :option="option"></v-chart>

    <div class="sort">
      <div>支出排行榜</div>
      <v-chart class="chart" :option="option_sort"></v-chart>
    </div>
  </div>
</template>


<script>
import * as echarts from "echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default {
  name: "templateCharts",
  data() {
    return {
      all: 0,
      option_sort: "",
      option: {
        dataset: {
          source: [],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          {
            type: "line",
            encode: { x: 0, y: 1 },
            label: {
              show: false,
              position: "right",
        
              // formatter: function (param) {
              //   if(param["value"][1] === 0) return '';
              //   else 
              //   return param["value"][1].toFixed(0);

              // },
            },
          },
        ],
        grid: {
          top: "10%",
          left: "3%",
          right: "10%",
          bottom: "10%",
          containLabel: true,
        },
      },
      option_sort: {
        dataset: {
          source: [],
        },
        xAxis: {
          max: "dataMax",
        },
        yAxis: {
          type: "category",
          inverse: true,
          max: 4,
        },
        series: [
          {
            type: "bar",
            realtimeSort: true,
            label: {
              show: false,
              position: "right",
          
  
              // formatter: function (param) {
              //   return  param["value"][1].toFixed(0);
            
              // },
            },
            encode: { x: 1, y: 0 },
          },
        ],
        grid: {
          top: "10%",
          left: "3%",
          right: "10%",
          bottom: "10%",
          containLabel: true,
        },
        animationDuration: 0,
      },
    };
  },
  components: {
    VChart,
  },
  computed: {
    averageYear() {
      let date = new Date();
      return (
        this.all / (date.getMonth() === 0 ? 12 : date.getMonth() + 1)
      ).toFixed(2);
    },
    averageWeek() {
      return (
        this.all / (new Date().getDay() === 0 ? 7 : new Date().getDay())
      ).toFixed(2);
    },
    averageMonth() {
      return (this.all / new Date().getDate()).toFixed(2);
    },
  },
  methods: {
    drawYear(list) {
      this.all = 0;
      this.option.dataset.source = [];
      this.option_sort.dataset.source = [];
      let sort_data = {};
      let date = new Date();
      for (let i = 0; i < 12; i++) {
        this.option.dataset.source.push([i + 1, 0]);
      }
      for (let i = 0; i < list.length; i++) {
        let itemDate = new Date(list[i].bill.date);
        if (this.isSameYear(list[i].bill.date, date)) {
          let month = itemDate.getMonth();
          this.option.dataset.source[month][1] += list[i].bill.amount;
          this.all += list[i].bill.amount;
          for (let k = 0; k < list[i].tags.length; k++) {
            if (!sort_data.hasOwnProperty(list[i].tags[k].name)) {
              sort_data[list[i].tags[k].name] = list[i].bill.amount;
            } else {
              sort_data[list[i].tags[k].name] += list[i].bill.amount;
            }
          }
        }
      }
      for (let i = 0; i < Object.keys(sort_data).length; i++) {
        this.option_sort.dataset.source.push([
          Object.keys(sort_data)[i],
          sort_data[Object.keys(sort_data)[i]],
        ]);
      }
    },
    drawWeek(list) {
      this.all = 0;
      let days = [];
      let sort_data = {};
      let date = new Date();
      let weekday = date.getDay();
      let dateCurPar = Date.parse(new Date(date)) / 1000;
      this.option.dataset.source = [];
      this.option_sort.dataset.source = [];
      for (let i = 0; i < 7; i++) {
        let dayPar = new Date(
          (dateCurPar + 86400 * (-(weekday === 0 ? 7 : weekday) + i + 1)) * 1000
        );
        this.option.dataset.source.push([
          dayPar.getMonth() + 1 + "-" + dayPar.getDate(),
          0,
        ]);
        days.push(
          dayPar.getFullYear() +
            "-" +
            (dayPar.getMonth() + 1) +
            "-" +
            dayPar.getDate()
        );
      }

      for (let i = 0; i < list.length; i++) {
        let itemDate = new Date(list[i].bill.date);
        if (this.isThisWeek(list[i].bill.date)) {
          for (let j = 0; j < 7; j++) {
            if (this.isSameDay(itemDate, days[j])) {
              this.option.dataset.source[j][1] += list[i].bill.amount;
              this.all += list[i].bill.amount;
              for (let k = 0; k < list[i].tags.length; k++) {
                if (!sort_data.hasOwnProperty(list[i].tags[k].name)) {
                  sort_data[list[i].tags[k].name] = list[i].bill.amount;
                } else {
                  sort_data[list[i].tags[k].name] += list[i].bill.amount;
                }
                console.log();
              }
            }
          }
        }
      }
      for (let i = 0; i < Object.keys(sort_data).length; i++) {
        this.option_sort.dataset.source.push([
          Object.keys(sort_data)[i],
          sort_data[Object.keys(sort_data)[i]],
        ]);
      }
    },
    drawMonth(list) {
      this.all = 0;
      let days = [];
      this.option.dataset.source = [];
      this.option_sort.dataset.source = [];
      let sort_data = {};
      let date = new Date();
      let month = date.getMonth() + 1;
      let day_count = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
      for (let i = 0; i < day_count; i++) {
        this.option.dataset.source.push([i, 0]);
        days.push(date.getFullYear() + "-" + month + "-" + i);
      }

      for (let i = 0; i < list.length; i++) {
        let itemDate = new Date(list[i].bill.date);
        if (this.isSameMonth(list[i].bill.date, date)) {
          for (let j = 0; j < day_count; j++) {
            if (this.isSameDay(itemDate, days[j])) {
              this.option.dataset.source[j][1] += list[i].bill.amount;
              this.all += list[i].bill.amount;
              for (let k = 0; k < list[i].tags.length; k++) {
                if (!sort_data.hasOwnProperty(list[i].tags[k].name)) {
                  sort_data[list[i].tags[k].name] = list[i].bill.amount;
                } else {
                  sort_data[list[i].tags[k].name] += list[i].bill.amount;
                }
              }
            }
          }
        }
      }
      for (let i = 0; i < Object.keys(sort_data).length; i++) {
        this.option_sort.dataset.source.push([
          Object.keys(sort_data)[i],
          sort_data[Object.keys(sort_data)[i]].toFixed(2),
        ]);
      }
    },
    isSameMonth(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = Date.parse(
        nextDate.getFullYear() + "-" + (nextDate.getMonth() + 1)
      );
      let _lastDate = Date.parse(
        lastDate.getFullYear() + "-" + (lastDate.getMonth() + 1)
      );
      return _lastDate === _nextDate;
    },
    isSameYear(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = Date.parse(nextDate.getFullYear() + "-1-1");
      let _lastDate = Date.parse(lastDate.getFullYear() + "-1-1");
      return _lastDate === _nextDate;
    },
    isSameDay(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = Date.parse(
        nextDate.getFullYear() +
          "-" +
          (nextDate.getMonth() + 1) +
          "-" +
          nextDate.getDate()
      );
      let _lastDate = Date.parse(
        lastDate.getFullYear() +
          "-" +
          (lastDate.getMonth() + 1) +
          "-" +
          lastDate.getDate()
      );
      return _lastDate === _nextDate;
    },
    isThisWeek(date) {
      let today = new Date();
      date = new Date(date);
      let weekday = today.getDay() === 0 ? 7 : today.getDay();
      let _today = Date.parse(
        today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate()
      );
      let _date = Date.parse(
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
      return (_today - _date) / (24 * 60 * 60 * 1000) < weekday;
    },
  },
};
</script>

<style scoped>
.chart {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.sort {
  margin-left: 3px;
  margin-top: 10px;
}
</style>