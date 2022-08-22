<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
require('echarts/theme/macarons')

export default {
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
      default: '240px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    isMultiValue: {
      type: Boolean,
      default: false
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
      chart: null
    }
  },
  mounted () {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler (e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions () {
      const series = []
      if (this.isMultiValue) {
        const seriesName = this.legend
        const colors = this.color
        this.value.forEach((element, index) => {
          series.push({
            name: seriesName[index],
            itemStyle: {
              normal: {
                color: colors[index],
                lineStyle: {
                  color: colors[index],
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: element,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          })
        })
      } else {
        const color = this.color ? this.color[0] : '#5ccdbb'
        series.push({
          name: this.seriesName,
          itemStyle: {
            normal: {
              color: color,
              lineStyle: {
                color: color,
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: this.value,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        })
      }
      this.chart.setOption({
        xAxis: {
          data: this.label,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          splitLine: false,
          axisLine: {
            'show': false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          splitLine: false,
          axisLine: {
            'show': false
          }
        },
        legend: {
          data: this.legend
        },
        series: series
      })
    },
    refreshChart () {
      const that = this
      setTimeout(function () {
        that.chart.resize()
      }, 100)
    },
    reInitChart () {
      const that = this
      this.chart.dispose()
      this.chart = null
      setTimeout(function () {
        that.initChart()
        that.chart.resize()
      }, 100)
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
    }
  }
}
</script>
