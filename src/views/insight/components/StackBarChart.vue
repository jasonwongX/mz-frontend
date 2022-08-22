<template>
  <div ref="stack-bar-chart-container" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
require('echarts/theme/macarons')
const animationDuration = 2800

export default {
  name: 'StackBarChart',
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
    // color: {
    //   type: Array,
    //   default: () => ['#bae7ff', '#91d5ff', '#69c0ff', '#40a9ff', '#1890ff', '#096dd9', '#0050b3', '#003a8c', '#002766']
    // },
    month: {
      type: String,
      default: ''
    },
    seriesName: {
      type: String,
      default: ''
    },
    legend: {
      type: Array,
      default: () => []
    },
    color: {
      type: Array,
      default: () => ['#5ccdbb']
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
      chart: null,
      series: []
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
    },
    setSeries () {
      const series = []
      const seriesName = this.legend
      const colors = this.color
      this.value.forEach((element, index) => {
          series.push({
            name: seriesName[index],
            itemStyle: {
              normal: {
                color: colors[index]
                // lineStyle: {
                //   color: colors[index],
                //   width: 2
                // }
              }
            },
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            barWidth: '20%',
            smooth: true,
            type: 'bar',
            data: element,
            animationDuration: animationDuration,
            animationEasing: 'cubicInOut'
          })
        })
        this.series = series
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setSeries()
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
        legend: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 25,
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
        series: this.series
      })
    }
  }
}
</script>
