<template>
  <div>
    <!-- <dv-water-level-pond :config="config" style="width:150px;height:200px" />
<dv-loading>Loading...</dv-loading> -->

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

    <dv-charts :option="upDetail" style="width: 100%; height: 400px" />
    <dv-charts :option="sortDetail" style="width: 100%; height: 300px" />
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
     
        _this.drawWeek(_this.list,_this.upDetailWeek,_this.sortDetailWeek);
        _this.drawMonth(_this.list,_this.upDetailMonth,_this.sortDetailMonth);
        _this.drawYear(_this.list,_this.upDetailYear,_this.sortDetailYear);
        _this.upDetail = _this.upDetailWeek;
    
        _this.sortDetail = _this.sortDetailWeek;
        _this.refresh();
      
    
    });


  },
  data() {
    return {
      all: 0,
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
              show: true,
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
              show: true,
            },
          },
        ],
      },
      upDetailWeek:{
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
              show: true,
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
      upDetailMonth:{
        color:['#fff'],
        title: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          nameTextStyle: {
    fill: '#fff',
    fontSize: 20
        }
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
              show: true,
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
      upDetailYear:{
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
              show: true,
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
      sortDetailWeek:{
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
              show: true,
            },
          },
        ],
      },
      sortDetailMonth:{
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
              show: true,
            },
          },
        ],
      },
      sortDetailYear:{
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
              show: true,
            },
          },
        ],
      },
    };
  },
  methods: {
    changeTime(index) {
      this.isActive[this.timeClass[0]] = false;
      this.isActive[this.timeClass[1]] = false;
      this.isActive[this.timeClass[2]] = false;
      this.isActive[this.timeClass[index]] = true;
      switch (index) {
        case 0:
           this.upDetail = this.upDetailWeek;
        this.sortDetail = this.sortDetailWeek;
        this.refresh();
          break;
        case 1:
           this.upDetail = this.upDetailMonth;
        this.sortDetail = this.sortDetailMonth;
        this.refresh();
          break;
        case 2:
           this.upDetail = this.upDetailYear;
        this.sortDetail = this.sortDetailYear;
          this.refresh();
          break;
      }
    },
    refresh(){
         this.upDetail = { ...this.upDetail };
        this.sortDetail = { ...this.sortDetail };
    },
    clear(up, sort){
      this.all = 0;
           up.xAxis.data = [];
     up.series[0]["data"] = [];
      sort.series[0]["data"] = [];
    },
    drawYear(list,up,sort) {
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
          up.series[0]["data"][parseInt(month)] +=
            list[i].bill.amount;
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
        sort.series[0]["data"].push({
          name: Object.keys(sort_data)[i],
          value: sort_data[Object.keys(sort_data)[i]],
        });

        up = { ...up };
        sort = { ...sort };
      }
    },
    drawWeek(list,up,sort) {
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
        up.xAxis.data.push([
          dayPar.getMonth() + 1 + "/" + dayPar.getDate(),
        ]);
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
              this.all += list[i].bill.amount;
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

       up = { ...up };
        sort = { ...sort };
      }
    },
    drawMonth(list,up,sort) {
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
              this.all += list[i].bill.amount;
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