<template>
  <page-header-wrapper title="重点工程编辑">
    <a-card class="card" title="基础信息" :bordered="false">
      <basic-project-info-form ref="basicInfo" :showSubmit="true" />
    </a-card>
    <!-- table -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="operationTabList"
      :activeTabKey="operationActiveTabKey"
      @tabChange="(key) => {this.operationActiveTabKey = key}"
    >
      <a-row v-if="operationActiveTabKey==='1'" :gutter="12">
        <a-col :span="8" v-for="(item,index) in events" :key="index" >
          <event-card :eventItem="item">
          </event-card>
        </a-col>
      </a-row>
      <a-row v-if="operationActiveTabKey==='2'" :gutter="12">
        <a-col :span="8" v-for="(item,index) in questions" :key="index" >
          <question-card :questionItem="item">
          </question-card>
        </a-col>
      </a-row>
    </a-card>

  </page-header-wrapper>
</template>

<script>
import BasicProjectInfoForm from './BasicProjectInfoForm'
import EventCard from './EventCard'
import QuestionCard from './QuestionCard'

import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型'
}

export default {
  name: 'EditKeyProject',
  mixins: [baseMixin],
  components: {
    FooterToolBar,
    BasicProjectInfoForm,
    EventCard,
    QuestionCard
  },
  data () {
    return {
      loading: false,
      memberLoading: false,
      operationTabList: [
        {
          key: '1',
          tab: '关键事项'
        },
        {
          key: '2',
          tab: '问题跟踪'
        }
      ],
      operationActiveTabKey: '1',
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
      ],
      // table
      columns: [
        {
          title: '成员姓名',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '工号',
          dataIndex: 'workId',
          key: 'workId',
          width: '20%',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '所属部门',
          dataIndex: 'department',
          key: 'department',
          width: '40%',
          scopedSlots: { customRender: 'department' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [
        {
          key: '1',
          name: '小明',
          workId: '001',
          editable: false,
          department: '行政部'
        },
        {
          key: '2',
          name: '李莉',
          workId: '002',
          editable: false,
          department: 'IT部'
        },
        {
          key: '3',
          name: '王小帅',
          workId: '003',
          editable: false,
          department: '财务部'
        }
      ],

      errors: []
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
    },
    handleTabChange (key) {
      this.tabActiveKey = key
    },
    newMember () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    saveRow (record) {
      this.memberLoading = true
      const { key, name, workId, department } = record
      if (!name || !workId || !department) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.data.find(item => item.key === key)
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    toggle (key) {
      const target = this.data.find(item => item.key === key)
      target._originalData = { ...target }
      target.editable = !target.editable
    },
    getRowByKey (key, newData) {
      const data = this.data
      return (newData || data).find(item => item.key === key)
    },
    cancel (key) {
      const target = this.data.find(item => item.key === key)
      Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
      target._originalData = undefined
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },

    // 最终全页面提交
    validate () {
      const { $refs: { repository, task }, $notification } = this
      const repositoryForm = new Promise((resolve, reject) => {
        repository.form.validateFields((err, values) => {
          if (err) {
            reject(err)
            return
          }
          resolve(values)
        })
      })
      const taskForm = new Promise((resolve, reject) => {
        task.form.validateFields((err, values) => {
          if (err) {
            reject(err)
            return
          }
          resolve(values)
        })
      })

      // clean this.errors
      this.errors = []
      Promise.all([repositoryForm, taskForm]).then(values => {
        $notification['error']({
          message: 'Received values of form:',
          description: JSON.stringify(values)
        })
      }).catch(() => {
        const errors = Object.assign({}, repository.form.getFieldsError(), task.form.getFieldsError())
        const tmp = { ...errors }
        this.errorList(tmp)
      })
    },
    errorList (errors) {
      if (!errors || errors.length === 0) {
        return
      }
      this.errors = Object.keys(errors)
        .filter(key => errors[key])
        .map(key => ({
          key: key,
          message: errors[key][0],
          fieldLabel: fieldLabels[key]
        }))
    },
    scrollToField (fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
  .popover-wrapper {
    /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }
  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;
    i {
          margin-right: 4px;
    }
  }
  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }
    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }
    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }
  }
</style>
