<template>
  <page-header-wrapper
    title="度量结果"
  >
    <template v-slot:extra>
      <a-select
        mode="tags"
        placeholder="请选择所属团队"
        :default-value="['墨子工程研发团队']"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option v-for="i in 5" :key="(i + 9).toString(36) + i">
          {{ "研发团队" + i }}
        </a-select-option>
      </a-select>
      <a-dropdown >
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1"> 近七天内 </a-menu-item>
          <a-menu-item key="2"> 近两周内 </a-menu-item>
          <a-menu-item key="3"> 近一个月内 </a-menu-item>
          <a-menu-item key="4"> 近三个月内 </a-menu-item>
          <a-menu-item key="4"> 近半年内 </a-menu-item>
          <a-menu-item key="4"> 近一年内 </a-menu-item>
        </a-menu>
        <a-button > 筛选时间范围 <a-icon type="down" /> </a-button>
      </a-dropdown>
    </template>
    <div class="insight-view-container">
      <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="8" >
          <a-card title="需求任务概览" >
            <a-tooltip title="统计任务状态个数" slot="extra">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <a-row :gutter="24" >
              <a-col :sm="24" :md="12" :xl="8" class="col-container border-col">
                <div >
                  <span class="title black-color">0</span><span>个</span>
                </div>
                <div class="status">
                  <span>待处理</span>
                </div>
              </a-col>
              <a-col :sm="24" :md="12" :xl="8" class="col-container border-col">
                <div >
                  <span class="title blue-color">2</span><span>个</span>
                </div>
                <div class="status">
                  <span>进行中</span>
                </div>
              </a-col>
              <a-col :sm="24" :md="12" :xl="8" class="col-container">
                <div>
                  <span class="title green-color">1</span><span>个</span>
                </div>
                <div class="status">
                  <span>已完成</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="8" >
          <a-card title="线上故障状态" >
            <a-tooltip title="统计线上故障解决状态个数" slot="extra">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <a-row :gutter="24" >
              <a-col :sm="24" :md="12" :xl="8" class="col-container border-col">
                <div >
                  <span class="title black-color">0</span><span>个</span>
                </div>
                <div class="status">
                  <span>待处理</span>
                </div>
              </a-col>
              <a-col :sm="24" :md="12" :xl="8" class="col-container border-col">
                <div >
                  <span class="title blue-color">0</span><span>个</span>
                </div>
                <div class="status">
                  <span>进行中</span>
                </div>
              </a-col>
              <a-col :sm="24" :md="12" :xl="8" class="col-container">
                <div>
                  <span class="title green-color">1</span><span>个</span>
                </div>
                <div class="status">
                  <span>已完成</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="8">
          <a-card title="构建情况" >
            <a-tooltip title="统计构建成功和构建失败次数" slot="extra">
              <a-icon type="info-circle-o" class="card-title-icon"/>
            </a-tooltip>
            <a-row :gutter="24" >
              <a-col :sm="24" :md="12" :xl="12" class="col-container border-col">
                <div >
                  <span class="title green-color">6</span><span>个</span>
                </div>
                <div class="status">
                  <span>构建成功</span>
                </div>
              </a-col>
              <a-col :sm="24" :md="12" :xl="12" class="col-container">
                <div>
                  <span class="title red-color">1</span><span>个</span>
                </div>
                <div class="status">
                  <span>构建失败</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
        <a-row :gutter="24" type="flex" :style="{ marginTop: '8px' }">
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" :style="{ height: '100%' }">
              <div slot="title">
                <span class="card-title">需求前置时间</span>
                <a-tooltip title="需求从受理状态到进入开发阶段的时长" slot="extra">
                  <a-icon type="info-circle-o" class="card-title-icon"/>
                </a-tooltip>
              </div>
              <stack-bar-chart
                ref="qeruirementExpendTimeChart"
                :legend="qeruirementExpendTime.legend"
                :color="qeruirementExpendTime.color"
                :label="qeruirementExpendTime.label"
                :value="qeruirementExpendTime.value" />
            </a-card>
          </a-col>
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" :style="{ height: '100%' }">
              <div slot="title">
                <span class="card-title">需求交付周期</span>
                <a-tooltip title="从需求受理到发布的时间" slot="extra">
                  <a-icon type="info-circle-o" class="card-title-icon"/>
                </a-tooltip>
              </div>
              <stack-bar-chart
                ref="requirementDeliveryCycleChart"
                :legend="requirementDeliveryCycle.legend"
                :color="requirementDeliveryCycle.color"
                :label="requirementDeliveryCycle.label"
                :value="requirementDeliveryCycle.value" />
            </a-card>
          </a-col>
        </a-row>
      </div>

      <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
        <a-row :gutter="24" type="flex" :style="{ marginTop: '8px' }">
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" :style="{ height: '100%' }">
              <div slot="title">
                <span class="card-title">需求投产数量</span>
                <a-tooltip title="投产版本的已下发的需求数量" slot="extra">
                  <a-icon type="info-circle-o" class="card-title-icon"/>
                </a-tooltip>
              </div>
              <bar-chart ref="reuirementCountChart" :label="requirementCount.label" :value="requirementCount.value" />
            </a-card>
          </a-col>
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" :style="{ height: '100%' }">
              <div slot="title">
                <span class="card-title">单元测试覆盖率</span>
                <a-tooltip title="包含类、方法和行的单元测试覆盖率" slot="extra">
                  <a-icon type="info-circle-o" class="card-title-icon"/>
                </a-tooltip>
              </div>
              <line-chart
                ref="unitTestChart"
                :is-multi-value="true"
                :legend="unitTest.legend"
                :color="unitTest.color"
                :label="unitTest.label"
                :value="unitTest.value" />

            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
        <a-row :gutter="24" type="flex" :style="{ marginTop: '8px' }">
          <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card :loading="loading" :bordered="false" :style="{ height: '100%' }">
              <div slot="title">
                <span class="card-title">构建频率</span>
                <a-tooltip title="单位时间内（每日）的构建次数（含成功和失败次数）" slot="extra">
                  <a-icon type="info-circle-o" class="card-title-icon"/>
                </a-tooltip>
              </div>
              <multi-bar-chart
                ref="buildFrequencyChart"
                :legend="buildFrequency.legend"
                :color="buildFrequency.color"
                :label="buildFrequency.label"
                :value="buildFrequency.value" />
            </a-card>
          </a-col>
        </a-row>
      </div>

    </div>
  </page-header-wrapper>
</template>

<script>
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import StackBarChart from './components/StackBarChart'
import MultiBarChart from './components/MultiBarChart'

import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'MetricReportView',
  mixins: [baseMixin],
  components: {
    BarChart,
    LineChart,
    StackBarChart,
    MultiBarChart
  },
  data () {
    return {
      loading: true,

      requirementCount: {
        color: ['#5ccdbb'],
        legend: ['需求投产数量'],
        label: ['07-01', '07-02', '07-03', '07-04', '07-05', '07-06', '07-07', '07-08', '07-09', '07-10', '07-11', '07-12', '07-13', '07-13'],
        value: [12, 8, 10, 21, 25, 20, 12, 23, 20, 12, 23, 12, 23, 20, 12]
      },
      unitTest: {
        legend: ['行覆盖率', '方法覆盖率', '类覆盖率'],
        color: ['#5ccdbb', '#3f90ff', '#cfeebb'],
        label: ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17'],
        value: [[50, 60, 65, 64, 60, 50, 54], [90, 80, 85, 84, 90, 95, 90], [90, 90, 95, 94, 90, 95, 99]]
      },
      qeruirementExpendTime: {
        legend: ['1周以内', '1-2周', '2-4周', '4周以上'],
        color: ['#017fc6', '#5ccdbb', '#3f90ff', '#cfeebb'],
        label: ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17'],
        value: [[50, 60, 65, 64, 60, 50, 54], [90, 80, 85, 84, 90, 95, 90], [90, 90, 95, 94, 90, 95, 99], [40, 50, 35, 44, 30, 50, 54]]
      },
      requirementDeliveryCycle: {
        legend: ['1周以内', '1-2周', '2-4周', '4周以上'],
        color: ['#017fc6', '#5ccdbb', '#3f90ff', '#cfeebb'],
        label: ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17'],
        value: [[50, 60, 65, 64, 60, 50, 54], [90, 80, 85, 84, 90, 95, 90], [90, 90, 95, 94, 90, 95, 99], [40, 50, 35, 44, 30, 50, 54]]
      },
      buildFrequency: {
        legend: ['构建成功', '构建失败'],
        color: ['#ee7255', '#5ccdbb'],
        label: ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17'],
        value: [[90, 80, 85, 84, 90, 95, 90], [50, 60, 65, 64, 60, 50, 54]]
      }
    }
  },
  computed: {
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style lang="less">
.insight-view-container {
  .ant-card-head {
    border-bottom:none!important;
  }
  .ant-card-body {
    padding: 16px!important;
  }
}
</style>
<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }

  .card-title {
    margin-right:6px;
  }
  .card-title-icon {
    color: rgba(0,0,0,.65);
    font-size: 14px;
  }

  .col-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 32px;
      font-weight: 500;
    }
  }
  .border-col {
    border-right: 1px solid #e8e8e8;
  }
  .black-color {
    color:#000000;
  }
  .green-color {
    color:#13c2c2;
  }
  .blue-color {
    color:#1890ff;
  }
  .red-color {
    color:#ee7255;
  }
</style>
