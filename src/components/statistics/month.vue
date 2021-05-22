<template>
  <div>
    <div style="margin-left: 3px">
      总支出：{{ all }}
    </div>
    <div style="margin-left: 3px">
      平均值：{{ average }}
    </div>
    <v-chart id="chart_month" class="chart" :option="option"></v-chart>
  </div>
</template>

<script>
//虽然下面这一句是灰的，但是一定不要删
import * as echarts from 'echarts';
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart} from "echarts/charts";
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
    draw(id, list) {
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
        }]
      };
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
            }
          }
        }
      }
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
</style>