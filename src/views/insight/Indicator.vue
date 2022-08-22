<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="(key)=>tabChange(key)"
    content="从交付效率、交付质量和工程能力三个维度设置对应指标，作为研发效能度量指标。"
  >
    <a-list
      rowKey="id"
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource"
      class="card-list"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template >
          <a-card :hoverable="true">
            <img
              class="img-cls"
              slot="cover"
              :alt="item.title"
              :src="item.img"
            />
            <a-card-meta>
              <a slot="title">{{ item.title }}</a>
              <div class="meta-content" slot="description">{{ item.content }}</div>
            </a-card-meta>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </page-header-wrapper>
</template>

<script>
const dataSource = [
  {
    id: 1,
    title: '需求前置时间',
    img: require('@/assets/images/requirement-lead-time.png'),
    content: '需求从受理状态到进入开发阶段的时长（单位：天）。',
    type: 1
  },
  {
    id: 2,
    title: '需求交付周期',
    img: require('@/assets/images/requirement-delivery-cycle.png'),
    content: '描述从需求受理到发布的时间（单位：天）。',
    type: 1
  },
  {
    id: 3,
    title: '需求投产数量',
    img: require('@/assets/images/requirement-delivery-count.png'),
    content: '描述交付版本的已下发的需求数量（单位：个）。',
    type: 1
  },
  {
    id: 4,
    title: '线上故障数',
    img: require('@/assets/images/quality-online-bug-count.png'),
    content: '描述已下发的需求中出现故障的数量（单位：个）。',
    type: 2
  },
  {
    id: 5,
    title: '故障恢复时间',
    img: require('@/assets/images/quality-bug-fix-time.png'),
    content: '描述从故障发生到故障修复所需的时间（单位：分钟）。',
    type: 2
  },
  {
    id: 6,
    title: '构建频率',
    img: require('@/assets/images/capability-build-frequency.png'),
    content: '单位时间内（每日）的构建次数（单位：次）。',
    type: 3
  },
  {
    id: 7,
    title: '单元测试覆盖率',
    img: require('@/assets/images/capability-unit-test-cover.png'),
    content: '包含类、方法和行的单元测试覆盖率（单位：%）。',
    type: 3
  }
]

const _ = require('lodash')
export default {
  name: 'CardList',
  data () {
    this.tabList = [
      { key: 'all', tab: '全部指标库' },
      { key: 'efficiency', tab: '交付效率' },
      { key: 'quality', tab: '交付质量' },
      { key: 'capability', tab: '工程能力' }
    ]
    return {
      tabActiveKey: 'all',
      dataSource
    }
  },
  methods: {
    tabChange (key) {
      this.tabActiveKey = key
      this.dataSource = _.filter(dataSource, (item) => {
        if (key === 'efficiency') {
          return item.type === 1
        } else if (key === 'quality') {
          return item.type === 2
        } else if (key === 'capability') {
          return item.type === 3
        } else {
          return item.type !== 0
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/components/index.less";

  .card-list {
    /deep/ .ant-card-body:hover {
      .ant-card-meta-title>a {
        color: @primary-color;
      }
    }
    /deep/ .ant-card-body {
      padding: 12px 16px;
    }

    /deep/ .ant-card-meta-title {
      margin-bottom: 8px;

      &>a {
        display: inline-block;
        max-width: 100%;
        color: rgba(0,0,0,.85);
      }
    }

    /deep/ .meta-content {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      height: 40px;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .img-cls {
      min-height: 280px;
    }
  }

  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

</style>
