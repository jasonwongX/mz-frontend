<template>
  <page-header-wrapper>
    <a-card
      class="metric-card"
      :bordered="false"
      title="度量报表列表">
      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">所有</a-radio-button>
          <a-radio-button value="my">我创建的</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 200px;" />
        <a-button type="primary" icon="plus" @click="add" style="margin-left: 6px; ">添加</a-button>
      </div>
      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a slot="title" class="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="edit(item)">编辑</a>
          </div>
          <div slot="actions">
            <a @click="edit(item)">详情</a>
          </div>

          <div class="list-content">
            <div class="list-content-item">
              <p>{{ getIndicatorsName(item) }}</p>
            </div>
            <div class="list-content-item">
              <p>{{ getTimeRange(item) }} | {{ getType(item) }}</p>
            </div>
            <div class="list-content-item">
              <span>{{ item.owner }} 创建于 </span>
              <p>{{ item.startAt }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
// 演示如何使用 this.$dialog 封装 modal 组件
import TaskForm from './modules/MetricReportForm'
import Info from './components/Info'
const _ = require('lodash')
const data = []
data.push({
  title: '工程能力度量',
  description: '度量研发团队的开发效率、质量数值，并以团队形式输出度量结果',
  timeRange: 1,
  type: 'my',
  projectRange: ['mozi'],
  owner: '付晓晓',
  indicators: [1, 2, 3],
  startAt: '2018-07-26 22:44'
})
data.push({
  title: '交付价值度量',
  description: '从需求维度度量交付版本的价值，包含：需求前置时间、需求交付周期等关键指标',
  owner: '曲丽丽',
  startAt: '2018-07-26 22:44',
  timeRange: 2,
  type: 'all',
  indicators: [2, 3],
  projectRange: ['mozi', 'ITSystem']
})
data.push({
  title: '敏捷交付项目度量',
  description: '从用户故事点数、敏捷交付速率等维度度量敏捷开发类项目',
  owner: '林东东',
  startAt: '2018-07-26 22:44',
  timeRange: 4,
  type: 'my',
  indicators: [1, 2, 3],
  projectRange: ['mozi']
})
data.push({
  title: '多项目度量',
  description: '聚合多个项目数据，统一度量，对比结果',
  owner: '周星星',
  startAt: '2018-07-26 22:44',
  timeRange: 3,
  type: 'team',
  indicators: [4, 5],
  projectRange: ['mozi']
})
data.push({
  title: '交付质量度量',
  description: '度量交付项目的缺陷数、回退率等质量维度指标数据',
  owner: '吴加好',
  startAt: '2018-07-26 22:44',
  timeRange: 2,
  type: 'my',
  indicators: [6, 7],
  projectRange: ['devops']
})

export default {
  name: 'MetricReport',
  components: {
    TaskForm,
    Info
  },
  data () {
    return {
      data,
      status: 'all',
      indicators: [
        {
          name: '需求前置时间',
          value: 1
        }, {
          name: '需求交付周期',
          value: 2
        }, {
          name: '需求投产数量',
          value: 3
        }, {
          name: '线上故障数',
          value: 4
        }, {
          name: '故障恢复时间',
          value: 5
        }, {
          name: '构建频率',
          value: 6
        }, {
          name: '单元测试覆盖率',
          value: 7
        }
      ],
      timeRange: [
        {
          name: '近7日内',
          value: 1
        }, {
          name: '近两周内',
          value: 2
        }, {
          name: '近一个月内',
          value: 3
        }, {
          name: '近三个月内',
          value: 4
        }, {
          name: '近半年内',
          value: 5
        }, {
          name: '近一年内',
          value: 6
        }
      ],
      type: [{
          name: '所有人',
          value: 'all'
        }, {
          name: '仅我可见',
          value: 'my'
        }, {
          name: '团队可见',
          value: 'team'
        }
      ]
    }
  },
  methods: {
    add () {
      this.$dialog(TaskForm,
        // component props
        {
          record: {},
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '新增',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    edit (record) {
      console.log('record', record)
      this.$dialog(TaskForm,
        // component props
        {
          record,
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '操作',
          width: 700,
          centered: true,
          maskClosable: false
        })
    },
    getType (item) {
      const result = _.find(this.type, ['value', item.type])
      return result.name
    },
    getTimeRange (item) {
      const result = _.find(this.timeRange, ['value', item.timeRange])
      return result.name
    },
    getIndicatorsName (item) {
      const result = _.filter(this.indicators, (o) => {
        return item.indicators.indexOf(o.value) !== -1
      })
      const resultVal = _.map(result, (o) => {
        return o.name
      })

      return _.join(resultVal, ',')
    }
  }
}
</script>

<style lang="less" scoped>
.metric-card {
  margin-top: 24px;
  .title {
    color: rgba(0, 0, 0, .85);
  }
}
.list-content-item {
  color: rgba(0, 0, 0, .45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
