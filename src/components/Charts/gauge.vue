<template>
  <div>
    <div class="headContainer">
      <div
        class="head"
        v-for="(item, index) in ['周', '月', '年']"
        @click="changeTime(index)"
        :class="{
          headNotActive: !isActive[timeClass[index]],
          headActive: isActive[timeClass[index]],
        }"
      >
        {{ item }}
      </div>
    </div>
    <div style="margin-left: 3px">总支出：{{ all.toFixed(2) }}</div>
    <div style="margin-left: 3px">
      平均值：{{ (all / upDetail.xAxis.data.length).toFixed(2) }}
    </div>

    <dv-charts :option="upDetail" style="width: 100%; height: 280px" />
    <dv-charts :option="sortDetail" style="width: 100%; height: 330px" />
  </div>
</template>

<script>
import { getRes } from "../../util/axiosAPI";
export default {
  name: "gauge",
  mounted() {
    const _this = this;
    getRes("/bill/allBills", (res) => {
      _this.list = res.data;

      _this.drawWeek(_this.list, _this.upDetailWeek, _this.sortDetailWeek);
      _this.drawMonth(_this.list, _this.upDetailMonth, _this.sortDetailMonth);
      _this.drawYear(_this.list, _this.upDetailYear, _this.sortDetailYear);
      _this.upDetail = _this.upDetailWeek;

      _this.sortDetail = _this.sortDetailWeek;
      _this.all = _this.allWeek;
      _this.refresh();
    });
  },
  data() {
    return {
      all: 0,
      allWeek: 0,
      allMonth: 0,
      allYear: 0,
      list: [],
      isActive: {
        week: true,
        month: false,
        year: false,
      },
      timeClass: ["week", "month", "year"],
      upDetail: {
        title: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          data: "value",
        },
        series: [
          {
            // data: [],
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "line",
            linePoint: {
              radius: 4,
            },
            color: "#a9913c",
            label: {
              show: false,
            },
          },
        ],
      },
      sortDetail: {
        series: [
          {
            type: "pie",
            data: [
              { name: "可口可乐", value: 93 },
              { name: "百事可乐", value: 32 },
              { name: "哇哈哈", value: 65 },
              { name: "康师傅", value: 44 },
              { name: "统一", value: 52 },
            ],
            insideLabel: {
              show: false,
            },
          },
        ],
      },
      upDetailWeek: {
        title: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          data: "value",
        },
        series: [
          {
            // data: [],
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "line",
            linePoint: {
              radius: 4,
            },
            color: "#a9913c",
            label: {
              show: false,
              //  formatter: function (param) {
              //     console.log(param);
              //     if(param["value"][1] === 0) return '';
              //     else
              //     return parseFloat(param["value"][1]).toFixed(2);
              //  },
              color: "#000",
            },
          },
        ],
      },
      upDetailMonth: {
        color: ["#fff"],
        title: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          data: "value",
        },
        series: [
          {
            // data: [],
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "line",
            linePoint: {
              radius: 4,
            },
            color: "#000",
            label: {
              show: false,
              //  formatter: function (param) {
              //     console.log(param);
              //     if(param["value"][1] === 0) return '';
              //     else
              //     return parseFloat(param["value"][1]).toFixed(2);
              //  },
              color: "#000",
            },
          },
        ],
      },
      upDetailYear: {
        title: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          data: "value",
        },
        series: [
          {
            // data: [],
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "line",
            linePoint: {
              radius: 4,
            },
            color: "#a9913c",
            label: {
              show: false,
              //  formatter: function (param) {
              //     console.log(param);
              //     if(param["value"][1] === 0) return '';
              //     else
              //     return parseFloat(param["value"][1]).toFixed(2);
              //  },
              color: "#000",
            },
          },
        ],
      },
      sortDetailWeek: {
        color: ["#37a2da", "#FFFF00", "#e062ae", "#9400D3", "#00FF00"],
        series: [
          {
            type: "pie",
            data: [
              { name: "可口可乐", value: 93 },
              { name: "百事可乐", value: 32 },
              { name: "哇哈哈", value: 65 },
              { name: "康师傅", value: 44 },
              { name: "统一", value: 52 },
            ],
            radius: ["40%", "50%"],
            insideLabel: {
              show: false,
            },
          },
        ],
      },
      sortDetailMonth: {
        color: ["#37a2da", "#FFFF00", "#e062ae", "#9400D3", "#00FF00"],
        series: [
          {
            type: "pie",
            data: [
              { name: "可口可乐", value: 93 },
              { name: "百事可乐", value: 32 },
              { name: "哇哈哈", value: 65 },
              { name: "康师傅", value: 44 },
              { name: "统一", value: 52 },
            ],
            radius: ["40%", "50%"],
            insideLabel: {
              show: false,
            },
          },
        ],
      },
      sortDetailYear: {
        color: ["#37a2da", "#FFFF00", "#e062ae", "#9400D3", "#00FF00"],
        series: [
          {
            type: "pie",
            data: [
              { name: "可口可乐", value: 93 },
              { name: "百事可乐", value: 32 },
              { name: "哇哈哈", value: 65 },
              { name: "康师傅", value: 44 },
              { name: "统一", value: 52 },
            ],
            radius: ["40%", "50%"],
            insideLabel: {
              show: false,
            },
          },
        ],
        outsideLabel:{
          labelLineEndLength: 20
        }
      },
    };
  },
  methods: {
    sortFilter(sort) {
      let obj = sort.series[0].data;
      obj = obj.sort(this.compare("value"));

      if (obj.length > 5) {
        for (let i = obj.length - 1; i >= 4; i--) {
          obj[3].value += obj[i].value;
          obj.pop();
        }
        obj[3]["name"] = "其它";
      }
      return obj;
    },
    compare(value) {
      return function (a, b) {
        var value1 = a[value];
        var value2 = b[value];
        return value2 - value1;
      };
    },
    changeTime(index) {
      this.isActive[this.timeClass[0]] = false;
      this.isActive[this.timeClass[1]] = false;
      this.isActive[this.timeClass[2]] = false;
      this.isActive[this.timeClass[index]] = true;
      switch (index) {
        case 0:
          this.upDetail = this.upDetailWeek;
          this.sortDetail = this.sortDetailWeek;
          this.all = this.allWeek;
          this.refresh();
          break;
        case 1:
          this.upDetail = this.upDetailMonth;
          this.sortDetail = this.sortDetailMonth;
          this.all = this.allMonth;
          this.refresh();
          break;
        case 2:
          this.upDetail = this.upDetailYear;
          this.sortDetail = this.sortDetailYear;
          this.all = this.allYear;
          this.refresh();
          break;
      }

      console.log(this.sortDetail.series[0].data);
    },
    refresh() {
      this.upDetail = { ...this.upDetail };
      this.sortDetail = { ...this.sortDetail };
    },
    clear(up, sort) {
      this.all = 0;
      up.xAxis.data = [];
      up.series[0]["data"] = [];
      sort.series[0]["data"] = [];
    },
    drawYear(list, up, sort) {
      this.clear(up, sort);
      let sort_data = {};
      let date = new Date();

      for (let i = 0; i < 12; i++) {
        up.xAxis.data.push(i + 1);
        up.series[0]["data"].push(0);
      }
      let reg = new RegExp("-", "g");
      for (let i = 0; i < list.length; i++) {
        list[i].bill.date = list[i].bill.date.replace(reg, "/");
        let itemDate = new Date(list[i].bill.date);

        if (this.isSameYear(list[i].bill.date, date)) {
          let month = itemDate.getMonth();
          up.series[0]["data"][parseInt(month)] += list[i].bill.amount;
          this.allYear += list[i].bill.amount;
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
        sort.series[0]["data"].push({
          name: Object.keys(sort_data)[i],
          value: sort_data[Object.keys(sort_data)[i]],
        });
        sort.series[0].data = this.sortFilter(sort);
        up = { ...up };
        sort = { ...sort };
      }
    },
    drawWeek(list, up, sort) {
      this.clear(up, sort);
      let days = [];
      let sort_data = {};
      let date = new Date();
      let weekday = date.getDay();
      let dateCurPar = Date.parse(new Date(date)) / 1000;
      for (let i = 0; i < 7; i++) {
        let dayPar = new Date(
          (dateCurPar + 86400 * (-(weekday === 0 ? 7 : weekday) + i + 1)) * 1000
        );
        up.xAxis.data.push([dayPar.getMonth() + 1 + "/" + dayPar.getDate()]);
        up.series[0]["data"].push(0);
        days.push(
          dayPar.getFullYear() +
            "/" +
            (dayPar.getMonth() + 1) +
            "/" +
            dayPar.getDate()
        );
      }
      let reg = new RegExp("-", "g");
      for (let i = 0; i < list.length; i++) {
        list[i].bill.date = list[i].bill.date.replace(reg, "/");
        let itemDate = new Date(list[i].bill.date);

        if (this.isThisWeek(list[i].bill.date)) {
          for (let j = 0; j < 7; j++) {
            if (this.isSameDay(itemDate, days[j])) {
              up.series[0]["data"][j] += list[i].bill["amount"];
              this.allWeek += list[i].bill.amount;
              for (let k = 0; k < list[i].tags.length; k++) {
                if (!sort_data.hasOwnProperty(list[i].tags[k].name)) {
                  sort_data[list[i].tags[k]["name"]] = list[i].bill["amount"];
                } else {
                  sort_data[list[i].tags[k]["name"]] += list[i].bill["amount"];
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < Object.keys(sort_data).length; i++) {
        sort.series[0]["data"].push({
          name: Object.keys(sort_data)[i],
          value: sort_data[Object.keys(sort_data)[i]],
        });
        sort.series[0].data = this.sortFilter(sort);
        up = { ...up };
        sort = { ...sort };
      }
    },
    drawMonth(list, up, sort) {
      this.clear(up, sort);
      let days = [];
      let sort_data = {};
      let date = new Date();
      let month = date.getMonth() + 1;
      let day_count = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
      for (let i = 0; i < day_count; i++) {
        up.xAxis.data.push(i);
        days.push(date.getFullYear() + "/" + month + "/" + i);
        up.series[0]["data"].push(0);
      }

      let reg = new RegExp("-", "g");
      for (let i = 0; i < list.length; i++) {
        list[i].bill.date = list[i].bill.date.replace(reg, "/");
        let itemDate = new Date(list[i].bill.date);

        if (this.isSameMonth(list[i].bill.date, date)) {
          for (let j = 0; j < day_count; j++) {
            if (this.isSameDay(itemDate, days[j])) {
              up.series[0]["data"][j] += list[i].bill.amount;
              this.allMonth += list[i].bill.amount;
              for (let k = 0; k < list[i].tags.length; k++) {
                if (!sort_data.hasOwnProperty(list[i].tags[k].name)) {
                  sort_data[list[i].tags[k]["name"]] = list[i].bill["amount"];
                } else {
                  sort_data[list[i].tags[k]["name"]] += list[i].bill["amount"];
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < Object.keys(sort_data).length; i++) {
        sort.series[0]["data"].push({
          name: Object.keys(sort_data)[i],
          value: sort_data[Object.keys(sort_data)[i]],
        });
      }
      sort.series[0].data = this.sortFilter(sort);
    },
    isSameMonth(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = nextDate.getFullYear() + "/" + (nextDate.getMonth() + 1);
      let _lastDate = lastDate.getFullYear() + "/" + (lastDate.getMonth() + 1);
      return _lastDate === _nextDate;
    },
    isSameYear(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate = nextDate.getFullYear();
      let _lastDate = lastDate.getFullYear();
      return _lastDate === _nextDate;
    },
    isSameDay(nextDate, lastDate) {
      nextDate = new Date(nextDate);
      lastDate = new Date(lastDate);
      let _nextDate =
        nextDate.getFullYear() +
        "/" +
        (nextDate.getMonth() + 1) +
        "/" +
        nextDate.getDate();
      let _lastDate =
        lastDate.getFullYear() +
        "/" +
        (lastDate.getMonth() + 1) +
        "/" +
        lastDate.getDate();
      return _lastDate === _nextDate;
    },
    isThisWeek(date) {
      let today = new Date();
      date = new Date(date);
      let weekday = today.getDay() === 0 ? 7 : today.getDay();
      let _today = Date.parse(
        today.getFullYear() +
          "/" +
          (today.getMonth() + 1) +
          "/" +
          today.getDate()
      );
      let _date = Date.parse(
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
      return _today / _date / (24 * 60 * 60 * 1000) < weekday;
    },
  },
};
</script>

<style scoped>
#container {
  color: white;
}
.headContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 80%;
  margin: auto;
}
.head {
  display: inline;
  text-align: center;

  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 20px;
  padding: 2px;
}
.headNotActive {
  border: 2px gray solid;
  color: gray;
}
.headActive {
  font-weight: bold;
  color: black;
  border: 2px black solid;
}
</style>