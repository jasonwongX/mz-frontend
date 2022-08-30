<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="项目名称">
                <a-input v-model="queryParam.title" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="项目状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">调研</a-select-option>
                  <a-select-option value="2">设计</a-select-option>
                  <a-select-option value="3">开发</a-select-option>
                  <a-select-option value="4">测试</a-select-option>
                  <a-select-option value="5">上线</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="项目经理">
                <a-input v-model="queryParam.pm" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="24">
              <span class="table-page-search-submitButtons" style="float: 'right', overflow: 'hidden'">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="false"
        showPagination="auto"
      >
        <span slot="no" slot-scope="text">
          {{ text }}
        </span>
        <span slot="title" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="pm" slot-scope="text">
          {{ text }}
        </span>
        <span slot="stage" slot-scope="text">
          {{ text | statusFilter }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleCheckProject(record)">详情</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getProjectList } from '@/api/manage'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

const columns = [

  {
    title: '项目编号',
    dataIndex: 'no'
  },
  {
    title: '项目名称',
    dataIndex: 'title',
    scopedSlots: { customRender: 'title' }
  },
  {
    title: '项目经理',
    dataIndex: 'pm'
  },
  {
    title: '状态',
    dataIndex: 'stage',
    scopedSlots: { customRender: 'stage' }
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: '调研',
    text: '调研'
  },
  1: {
    status: '设计',
    text: '设计'
  },
  2: {
    status: '开发',
    text: '开发'
  },
  3: {
    status: '测试',
    text: '测试'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    PageHeaderWrapper
  },
  data () {
    this.columns = columns
    return {
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getProjectList(requestParameters)
          .then(res => {
            return res.result
          })
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    }
  },
  created () {
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleCheckProject (record) {
      this.$router.push({ path: '/settings/project-list/detail' })
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
