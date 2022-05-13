<template>
  <div>
    <div class="headContainer">
      <div
        class="head"
        v-for="(item, index) in ['周', '月', '年']"
         
        @click="changeTime(index)"
        :class="{
          headNotActive: !headActiveFunc(index),
          headActive: headActiveFunc(index),
        }"
      >
        {{ item }}
      </div>
    </div>
    <div style="margin-left: 3px">总支出：{{ amountSum.toFixed(2) }}</div>
    <div style="margin-left: 3px">
      平均值：{{ average.toFixed(2) }}
    </div>
    <VueEcharts
      :option="dateAndAmount"
      style="height: 300px"
      ref="dateAndAmountRef"
    />
    <VueEcharts
      :option="tagAndPercent"
      style="width:300px;margin:auto; height: 300px"
      ref="tagAndPercentRef"
    />

<el-divider>Top 10 账单</el-divider>
      <div v-for="(item, index) in list">

    <div class="itemContainer">
    <div class="item">
    <div>
    <div class="titleAndTag">
      <div class="title">{{item.title}}</div>
      </div>
    <div class="date"><span>{{item.date}}</span></div>
    </div>
    <div class="amount">-{{item.amount}}</div>
    </div>
</div>
  </div>
  </div>
</template>

<script setup>
import { getRes, getResNew } from "../../util/axiosAPI";
import { computed, onMounted, ref } from "vue";
import { VueEcharts } from "vue3-echarts";
import { ElMessage } from "element-plus";
onMounted(() => {
  
  getResNew("/bill/week")
    .then((res) => {
      allData.value["week"] = res;
      changeTime(0);
    })
    .then(() => {
      getResNew("/bill/month").then((res) => {
      allData.value["month"] = res;
      });
    }).then( () =>{
      getResNew("/bill/year").then ((res) => {
        allData.value["year"] = res;
        ElMessage.success("年数据获取成功！");
      })
    })
});
const dateAndAmountRef = ref(null);
const tagAndPercentRef = ref(null);
const allData = ref({
  "week": {
    date: [],
    amount: [],
    tag: [],
    percent: [],
    largest: [],
  },
  "month": {
    date: [],
    amount: [],
    tag: [],
    percent: [],
    largest: [],
  },
});
const isActive = ref({
  week: true,
  month: false,
  year: false,
});
const timeClass = ["week", "month", "year"];
function headActiveFunc(index){
  return isActive.value[timeClass[index]]
  }
const amountSum = computed( () => {
  let amount = dateAndAmount.value.series[0].data;
  return eval(amount.join('+'));
})
const average = computed( () => {
  let amount = dateAndAmount.value.series[0].data;
  return eval(amount.join('+')) / amount.length;
})
const list = ref([])
const dateAndAmount = ref({
  title: {},
  xAxis: {
    type: 'category',
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    axisLabel: {
      show: true,
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
      type: "line",
      linePoint: {
        radius: 10,
      },
      color: "#a9913c",
      label: {
        show: true,
        fontSize: 8,
        formatter: (arg) => {
          if(arg.dataIndex % 2 === 0)
          return arg.data.toFixed(2);
          return ""
          }
      },
    },
  ],
});
const tagAndPercent = ref({
    tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
});

function changeTime(index) {
  isActive.value[timeClass[0]] = 0 === index;
  isActive.value[timeClass[2]] = 2 === index;
  isActive.value[timeClass[1]] = 1 === index;
  dateAndAmount.value.xAxis.data = allData.value[timeClass[index]].date;
  dateAndAmount.value.series[0].data = allData.value[timeClass[index]].amount;
  let tag = allData.value[timeClass[index]].tag;
  let percent = allData.value[timeClass[index]].percent;
  let tagAndPercentArr = [];
  for (let i = 0; i < tag.length; i++) {
    tagAndPercentArr.push({
      name: tag[i],
      value: parseInt((percent[i] * 100).toFixed(0)),
    });
  }
  list.value = allData.value[timeClass[index]].largest;
  tagAndPercent.value.series[0].data = tagAndPercentArr;
  refresh();
}
function refresh() {
  dateAndAmountRef.value.refreshOption();
  tagAndPercentRef.value.refreshOption();
}
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




.item{
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 5px;

  border-radius: 30px;
  background-color: #FFF;

  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  display: grid;
  grid-template-columns: 73% 27%;
  padding: 13px;/*字和边框的距离*/
  z-index: 1;
}

.title{
  font-weight: bold;
  font-size: 16px;
  display: inline-block;
}

.amount{
  color: #40E0D0;
  font-size: 23px;
  padding: 7px;
  text-align: right;
  font-weight: bolder;
}

.date{
  margin-top: 7px;
}


.itemContainer{
  position: relative;
}

</style>