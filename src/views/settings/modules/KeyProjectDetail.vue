<template>

  <page-header-wrapper
    class="key-project-detail-container"
    title="分布式核心建设工程"
  >
    <template v-slot:content>
      <a-descriptions size="small" column="2">
        <a-descriptions-item label="业务板块">{{ projectInfo.business_line | businessLineFilter }}</a-descriptions-item>
        <a-descriptions-item label="项目联系人">{{ projectInfo.project_contact }}</a-descriptions-item>
        <a-descriptions-item label="PMO联系人">{{ projectInfo.pmo_contact }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" column="1">
        <a-descriptions-item label="工程概述">
          {{ projectInfo.generality }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" column="1">
        <a-descriptions-item label="实施计划">
          {{ projectInfo.plan }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" column="1">
        <a-descriptions-item label="当前进展">
          {{ projectInfo.progress }}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" column="1">
        <a-descriptions-item label="备注">{{ projectInfo.remark }}</a-descriptions-item>
      </a-descriptions>
    </template>
    <!-- actions -->
    <template v-slot:extra>
      <a-button type="primary" >编辑</a-button>
    </template>
    <template v-slot:extraContent>
      <a-row class="status-list">
        <a-col :xs="24" :sm="24">
          <div class="text">状态</div>
          <div class="heading">{{ projectInfo.status | projectStatusFilter }}</div>
        </a-col>
      </a-row>
    </template>

    <a-card :bordered="false" title="关键事项" >
      <a-steps direction="vertical" :current="4" progressDot class="event-steps">
        <a-step v-for="(item,index) in events" :key="index">
          <template v-slot:title>
            <span class="time">{{ item.time }}</span>
          </template>
          <template v-slot:description>
            <div class="title">
              {{ item.title }}
            </div>
            <div class="description">{{ item.description }}</div>
          </template>
        </a-step>
      </a-steps>
    </a-card>

    <a-card :bordered="false" title="待解决问题" style="margin-top: 24px">
      <a-table
        :columns="questionColumns"
        :dataSource="questions"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
    </a-card>

  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
const projectStatusMap = {
  0: {
    status: 'default',
    text: '--'
  },
  1: {
    status: 'default',
    text: '调研'
  },
  2: {
    status: 'processing',
    text: '在建'
  },
  3: {
    status: 'success',
    text: '已上线'
  }
}
const businessLineMap = {
  0: {
    text: '其他'
  },
  1: {
    text: '中后台'
  },
  2: {
    text: '企金'
  },
  3: {
    text: '零售'
  },
  4: {
    text: '同业与金融市场'
  }
}
export default {
  name: 'Advanced',
  mixins: [baseMixin],
  data () {
    return {
      projectInfo: {
        name: '分布式核心建设工程',
        status: 1,
        business_line: 2,
        pmo_contact: '曲丽丽',
        project_contact: '邱小鹏',
        generality: '为满足监管单位信创要求，基于开源组件、PC服务器，采用分布式架构、分布式数据库、单元化部署等技术能力建设分布式核心系统。项目分两阶段上线，于2022年5月份成立预研工作组。',
        progress: '发布工程领导小组和工作小组成立通知；组建工作群，拟定“架构规划”“总账”“零售CIF”三个工作计划和双周报模板',
        plan: '一阶段于2024年7月投产，暂定为资产业务；二阶段于2025年8月投产，系统整体上线。',
        remark: '暂无'
      },
      events: [
        {
          time: '2022-08-08',
          title: '成立领导小组和工作组',
          description: '发布工程领导小组和工作小组成立通知；组建工作群，拟定“架构规划”“总账”“零售CIF”三个工作计划和双周报模板；'
        },
        {
          time: '2022-05-01',
          title: '成立研发工作组',
          description: '成立预研工作组，发布关于成立“企业级业务中台暨分布式核心工程”技术工作小组的通知。'
        }
      ],
      tabList: [
        { key: 'detail', tab: '详情' },
        { key: 'rule', tab: '规则' }
      ],
      tabActiveKey: 'detail',

      questionColumns: [
        {
          title: '问题描述',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: '负责人',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: '当前进展',
          dataIndex: 'progress',
          key: 'progress'
        }
      ],
      questions: [
        {
          description: '加快数据入湖进度',
          name: '高小鹏',
          status: 2,
          progress: '计划开专题会议推进',
          updatedAt: '2022/6/17'
        },
        {
          description: '大数据平台等重要数据系统异地灾备问题研究',
          name: '高小鹏',
          status: 1,
          progress: '计划开展专题会议进行研究',
          updatedAt: '2022/8/17'
        }
      ]
    }
  },
  filters: {
    projectStatusFilter (type) {
      return projectStatusMap[type].text
    },
    businessLineFilter (type) {
      return businessLineMap[type].text
    },
    statusFilter (status) {
      const statusMap = {
        1: '进行中',
        2: '已完成'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        1: 'primary',
        2: 'success'
      }
      return statusTypeMap[type]
    }
  },
  methods: {

  }
}
</script>
<style lang="less">
.key-project-detail-container {
 .ant-steps-item-content {
      width: 640px;
  }
}
</style>
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

  .event-steps {
    .time {
      font-size: 16px;
      font-weight: 600;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
    }
    .description {
      font-size: 14px;
    }
  }

</style>
