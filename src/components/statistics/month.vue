<template>
  <div>
    <div style="margin-left: 3px">
      总支出：{{ all.toFixed(2) }}
    </div>
    <div style="margin-left: 3px">
      平均值：{{ average }}
    </div>
    <v-chart id="chart_month" class="chart" :option="option"></v-chart>

    <div class="sort">
      <div>支出排行榜</div>
      <v-chart class="chart" :option="option_sort"></v-chart>
    </div>
  </div>
</template>

<script>
//虽然下面这一句是灰的，但是一定不要删
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
  LegendComponent
]);

export default {
  name: "month",
  data() {
    return {
      all: 0,
      // average: 0,
      // list: [],
      option: "",
      option_sort: "",
    }
  },
  components: {
    VChart
  },
  computed: {
    average(){
      return (this.all / (new Date().getDate())).toFixed(2);
    }
  },
  // mounted() {
  //   const _this = this;
  //   getRes(
  //       '/bill/allBills',
  //       res => {
  //         _this.list = res.data;
  //         _this.$nextTick(function() {
  //           this.draw('chart_month');
  //         })
  //       }
  //   )
  // },
  methods: {
    draw(list) {
      this.all = 0;
      // let dom = document.getElementById(id);
      // let instance = echarts.init(dom);
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
      }

      let option_sort = {
        dataset: {
          source: [
            // ["医疗", 50],
            // ["饮食", 20],
            // ["学习", 65],
            // ["工作", 90]
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
      let month = date.getMonth() + 1;
      let day_count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      for (let i = 0; i < day_count; i++) {
        option.dataset.source.push([i, 0]);
        days.push(date.getFullYear() + '-' + month + '-' + i);
      }

      for (let i = 0; i < list.length; i++) {
        let itemDate = new Date(list[i].bill.date);
        if (this.isSameMonth(list[i].bill.date, date)){
          for (let j = 0; j < day_count; j++) {
            if (this.isSameDay(itemDate, days[j])) {
              option.dataset.source[j][1] += list[i].bill.amount;
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
        option_sort.dataset.source.push([Object.keys(sort_data)[i], sort_data[Object.keys(sort_data)[i]]]);
      }
      // console.log(sort_data);
      this.option_sort = option_sort;
      // instance.setOption(option);
      this.option = option;
    },
    isSameMonth(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = Date.parse(nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1));
      let _lastDate = Date.parse(lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1));
      return _lastDate === _nextDate;
    },
    isSameDay(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = Date.parse(nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getDate());
      let _lastDate = Date.parse(lastDate.getFullYear() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getDate());
      return _lastDate === _nextDate;
    },
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