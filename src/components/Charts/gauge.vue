<template>
  <div>
<!-- <dv-water-level-pond :config="config" style="width:150px;height:200px" />
<dv-loading>Loading...</dv-loading> -->

    <div class="headContainer">
        <div class="head" v-for="(item,index) in ['周','月','年']" @click="changeTime(index)" 
        :class="{headNotActive: !isActive[timeClass[index]], headActive:isActive[timeClass[index]]}"
        >{{item}}</div>
    </div>


    <dv-charts :option="option1" style="width:100%;height:400px"  />
    <dv-charts :option="option2" style="width:100%;height:300px"  />
   
  </div>
</template>

<script>
// import Charts from '@jiaminghi/charts'
// const container = document.getElementById('container')
// const myChart = new Charts(container)
export default {
name: 'gauge',
  data() {
    return {
        isActive:{
            'week':true,
            'month':false,
            'year':false
        },
        timeClass:['week','month','year'],
        config:{
            data:[66],
            shape: 'roundRect'
        },
      option1:{
  title: {
  },
  xAxis: {
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],

  },
  yAxis: {
    data: 'value',
  
  },
  series: [
    {
      data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
      type: 'line',
      linePoint: {
        radius: 4
      },
      color: '#a9913c',
      label: {
        show: true,
        formatter: '{value} 元',
        color:'#000',
      }
    }
  ],
  
      },
      option2:{
  series: [
    {
      type: 'pie',
      data: [
        { name: '可口可乐', value: 93 },
        { name: '百事可乐', value: 32 },
        { name: '哇哈哈', value: 65 },
        { name: '康师傅', value: 44 },
        { name: '统一', value: 52 },
      ],
      insideLabel: {
        show: true
      }
    }
  ]
}
    }
  },
  methods:{
      changeTime(index){
        this.isActive[this.timeClass[0]] = false;
        this.isActive[this.timeClass[1]] = false;
        this.isActive[this.timeClass[2]] = false;
        this.isActive[this.timeClass[index]] = true;

      }
  },
 
}
</script>

<style scoped>
#container{
  color: white;
}
.headContainer{
     display: grid;
  grid-template-columns:  1fr 1fr 1fr;
  width: 80%;
  margin: auto;
}
.head{
    display: inline;
    text-align: center;
    
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 20px;
    padding: 2px;
}
.headNotActive{
    
  border: 2px  gray solid;
  color: gray;
}
.headActive{
 font-weight: bold;
  color: black;
  border: 2px  black solid;
}

</style>