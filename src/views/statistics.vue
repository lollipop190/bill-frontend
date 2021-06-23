<template>
  <div>
    <div class="statistics-container">
      <div @click="changeCharts(0)"
           :class="{'statistics-router':true, 'active': index===0}">
        周
      </div>
      <div @click="changeCharts(1)"
           :class="{'statistics-router':true, 'active': index===1}">
        月
      </div>
      <div @click="changeCharts(2)"
           :class="{'statistics-router':true, 'active': index===2}">
        年
      </div>
    </div>
    <!--    <div v-show="index===0">-->
    <!--      <week></week>-->
    <!--    </div>-->
    <!--    <div v-show="index===1">-->
    <!--      <month></month>-->
    <!--    </div>-->
    <!--    <div v-show="index===2">-->
    <!--      <year></year>-->
    <!--    </div>-->
    <week v-if="index===0" ref="week"></week>
    <month v-if="index===1" ref="month"></month>
    <year v-if="index===2" ref="year"></year>
  </div>
</template>

<script>
import Week from "../components/statistics/week";
import Month from "../components/statistics/month";
import Year from "../components/statistics/year";
import {getRes} from "../util/axiosAPI";

export default {
  name: "statistics",
  components: {Year, Month, Week},
  data() {
    return {
      index: 0,
      list: [],
    }
  },
  mounted() {
    const _this = this;
    getRes(
        '/bill/allBills',
        res => {
          _this.list = res.data;
          _this.$nextTick(() => {
            this.$refs.week.draw(this.list);
          })
        }
    )
  },
  methods: {
    changeCharts(index) {
      if (index !== this.index) {
        switch (index) {
          case 0:
            this.index = 0;
            this.$nextTick(() => {
              this.$refs.week.draw(this.list);
            })
            break;
          case 1:
            this.index = 1;
            this.$nextTick(() => {
              this.$refs.month.draw(this.list);
            })
            break;
          case 2:
            this.index = 2;
            this.$nextTick(() => {
              this.$refs.year.draw(this.list);
            })
            break;
        }
      }
    },
  }
}
</script>

<style scoped>
.statistics-router {
  margin: 10px 1px;
  flex: 1;
  text-align: center;
  color: black;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  text-decoration: none;
}

.statistics-container {
  display: flex;
}

.active {
  /*background-color: #25e09f*/
  background-color: #fff585;
}
</style>