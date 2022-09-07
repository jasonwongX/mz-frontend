<template>
  <page-header-wrapper
    title="这是项目一名称"
  >
    <template v-slot:content>
      <a-descriptions size="small" column="2">
        <a-descriptions-item label="项目编号">No16532481</a-descriptions-item>
        <a-descriptions-item label="项目经理">曲丽丽</a-descriptions-item>
        <a-descriptions-item label="创建时间">2017-07-07</a-descriptions-item>
        <a-descriptions-item label="项目描述">请于两个工作日内确认</a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button type="primary" >关联重点工程</a-button>
    </template>

    <template v-slot:extraContent>
      <a-row class="status-list">
        <a-col :xs="24" :sm="24">
          <div class="text">状态</div>
          <div class="heading">调研阶段</div>
        </a-col>
      </a-row>
    </template>

    <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
      <a-descriptions >
        <a-descriptions-item label="业务主办">付晓晓</a-descriptions-item>
        <a-descriptions-item label="架构师">付晓晓</a-descriptions-item>
        <a-descriptions-item label="测试经理">付晓晓</a-descriptions-item>
        <a-descriptions-item label="研发人员">付晓晓</a-descriptions-item>
        <a-descriptions-item label="联系地址">付晓晓</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'Advanced',
  mixins: [baseMixin],
  data () {
    return {
      tabList: [
        { key: 'detail', tab: '详情' },
        { key: 'rule', tab: '规则' }
      ],
      tabActiveKey: 'detail'
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: right;
    }
  }
</style>
