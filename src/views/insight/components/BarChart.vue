<template>
  <div ref="bar-chart-container" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
require('echarts/theme/macarons')
const animationDuration = 6000

export default {
  name: 'BarChart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    color: {
      type: Array,
      default: () => ['#bae7ff', '#91d5ff', '#69c0ff', '#40a9ff', '#1890ff', '#096dd9', '#0050b3', '#003a8c', '#002766']
    },
    month: {
      type: String,
      default: ''
    },
    seriesName: {
      type: String,
      default: ''
    },
    label: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }

  },
  data () {
    return {
      chart: null
    }
  },

  mounted () {
    // this.fetchData()
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    refreshChart () {
      const that = this
      setTimeout(function () {
        that.chart.resize()
      }, 100)
    },
    fetchData () {
      // projectMonthStage(this.month).then(response => {
      //   this.list = response.data
      //   this.label = this.list.map(function(value, index) {
      //     return value['name']
      //   })
      //   this.listValue = this.list.map(function(value, index) {
      //     return value['value']
      //   })
      //   this.initChart()
      // })
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        // title: {
        //   show: true,
        //   text: '项目阶段分布',
        //   x: 'center',
        //   y: 'top',
        //   // padding: 10,
        //   textStyle: {
        //     fontSize: 16,
        //     fontStyle: 'normal',
        //     fontWeight: 'bolder',
        //     color: '#666'
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.label,
          axisTick: {
            alignWithLabel: true
          },
          splitLine: false,
          axisLine: { // y轴
            'show': false
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          splitLine: false,
          axisLine: {
            'show': false
          }
        }],
        series: [{
          name: this.seriesName,
          type: 'bar',
          // stack: 'vistors',
          barWidth: '25%',
          itemStyle: {
            emphasis: {
              // barBorderRadius: 7
            },
            normal: {
              // 定制显示（按顺序）
              color: '#1890ff'
              // barBorderRadius: 7
            }
          },
          data: this.value,
          animationDuration
        }]
      })
    }
  }
}
</script>
