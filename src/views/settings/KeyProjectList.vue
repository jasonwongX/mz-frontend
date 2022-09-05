<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="工程名称">
                <a-input v-model="queryParam.name" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="工程状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">调研</a-select-option>
                  <a-select-option value="2">在建</a-select-option>
                  <a-select-option value="3">上线</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="业务板块">
                <a-select v-model="queryParam.business_line" placeholder="请选择" default-value="0">
                  <a-select-option value="-1">全部</a-select-option>
                  <a-select-option value="0">其他</a-select-option>
                  <a-select-option value="1">中后台</a-select-option>
                  <a-select-option value="2">企金</a-select-option>
                  <a-select-option value="3">零售</a-select-option>
                  <a-select-option value="4">同业与金融市场</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="pmo联系人">
                <a-input v-model="queryParam.pmo_contact" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="项目联系人">
                <a-input v-model="queryParam.project_contact" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="工程概括">
                <a-input v-model="queryParam.generality" placeholder=""/>
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

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-button type="primary" icon="download" @click="handleDownload" style="float:right">导出</a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="false"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="name" slot-scope="text">
          <ellipsis :length="32" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="business_line" slot-scope="text">
          {{ text | businessLineFilter }}
        </span>
        <span slot="pmo_contact" slot-scope="text">
          {{ text }}
        </span>
        <span slot="project_contact" slot-scope="text">
          {{ text }}
        </span>
        <span slot="generality" slot-scope="text">
          <ellipsis :length="40" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEditProject(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleCheckProject(record)">详情</a>
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <step-by-step-modal ref="modal" @ok="handleOk"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
// import axios from 'axios'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getKeyProjectList } from '@/api/manage'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
const columns = [

  {
    title: '工程名称',
    dataIndex: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '业务板块',
    dataIndex: 'business_line',
    scopedSlots: { customRender: 'business_line' }
  },
  {
    title: 'pmo联系人',
    dataIndex: 'pmo_contact'
  },
  {
    title: '项目联系人',
    dataIndex: 'project_contact'
  },
  {
    title: '工程概括',
    dataIndex: 'generality',
    scopedSlots: { customRender: 'generality' }
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
  name: 'KeyProjectList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal,
    PageHeaderWrapper
  },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getKeyProjectList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    businessLineFilter (type) {
      return businessLineMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getRoleList({ t: new Date() })
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
    handleEditProject (record) {
      this.$router.push({ path: '/settings/project-list/add' })
    },
    handleCheckProject (record) {
      this.$router.push({ path: '/settings/key-project/detail' })
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleDownload () {
      const link = document.createElement('a')
      link.setAttribute('download', '')
      link.href = `${process.env.BASE_URL}file/重点工程清单.xlsx`
      link.click()
      link.remove()
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
