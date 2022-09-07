<template>
  <a-form-model @submit="handleSubmit" :form="form" layout="vertical" class="basic-project-info-form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-model-item label="工程名称" prop="name">
          <a-input
            v-model="form.name"
            placeholder="请输入工程名称"
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入工程名称', whitespace: true}]}
            ]" />
        </a-form-model-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-model-item label="项目联系人">
          <a-input
            v-model="form.project_contact"
            placeholder="请输入项目联系人"
            v-decorator="[
              'project_contact',
              {rules: [{ required: true, message: '请输入项目联系人', whitespace: true}]}
            ]" />
        </a-form-model-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-model-item label="PMO联系人">
          <a-input
            v-model="form.pmo_contact"
            placeholder="请输入PMO联系人"
            v-decorator="[
              'pmo_contact',
              {rules: [{ required: true, message: '请输入PMO联系人', whitespace: true}]}
            ]" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-model-item
          label="项目状态">
          <a-select v-model="form.status" placeholder="请选择项目状态" v-decorator="[ 'status', {rules: [{ required: true, message: '请选择项目状态'}]} ]">
            <a-select-option
              v-for="(item,index) in projectStatusMap"
              :key="index"
              :value="index">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :lg="8" :md="12" :sm="24">
        <a-form-model-item
          label="业务板块">
          <a-select v-model="form.business_line" placeholder="请选择业务板块" v-decorator="[ 'business_line', {rules: [{ required: true, message: '请选择业务板块'}]} ]">
            <a-select-option
              v-for="(item,index) in businessLineMap"
              :key="index"
              :value="index">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="24" :md="24" :sm="24">
        <a-form-model-item label="工程概括" prop="generality">
          <a-textarea
            v-model="form.generality"
            placeholder="请输入工程概括"
            v-decorator="[
              'generality',
              {rules: [{ required: true, message: '请输入工程概括', whitespace: true}]}
            ]" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="24" :md="24" :sm="24">
        <a-form-model-item label="实施计划" prop="plan">
          <a-textarea
            v-model="form.plan"
            placeholder="请输入实施计划"
            v-decorator="[
              'plan',
              {rules: [{ required: true, message: '请输入实施计划', whitespace: true}]}
            ]" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="24" :md="24" :sm="24">
        <a-form-model-item label="当前进展" prop="progress">
          <a-textarea
            v-model="form.progress"
            placeholder="请输入当前进展"
            v-decorator="[
              'progress',
              {rules: [{ required: true, message: '请输入当前进展', whitespace: true}]}
            ]" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="24" :md="24" :sm="24">
        <a-form-model-item label="备注" prop="remark">
          <a-textarea
            v-model="form.remark"
            placeholder="请输入备注"
            v-decorator="[
              'remark',
              {rules: [{ required: true, message: '请输入备注', whitespace: true}]}
            ]" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" type="primary" style="float:right">提交</a-button>
    </a-form-item>
  </a-form-model>
</template>

<script>
const projectStatusMap = {
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
  name: 'BasicProjectInfoForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      projectStatusMap: projectStatusMap,
      businessLineMap: businessLineMap,
        form: {
          name: '分布式核心建设工程',
          status: '1',
          business_line: '2',
          pmo_contact: '曲丽丽',
          project_contact: '邱小鹏',
          generality: '为满足监管单位信创要求，基于开源组件、PC服务器，采用分布式架构、分布式数据库、单元化部署等技术能力建设分布式核心系统。项目分两阶段上线，于2022年5月份成立预研工作组。',
          progress: '发布工程领导小组和工作小组成立通知；组建工作群，拟定“架构规划”“总账”“零售CIF”三个工作计划和双周报模板',
          plan: '一阶段于2024年7月投产，暂定为资产业务；二阶段于2025年8月投产，系统整体上线。',
          remark: '暂无'
      }
    }
  },
  filters: {
    projectStatusFilter (type) {
      return projectStatusMap[type].text
    },
    businessLineFilter (type) {
      return businessLineMap[type].text
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          })
        }
      })
    },
    validate (rule, value, callback) {
      const regex = /^user-(.*)$/
      if (!regex.test(value)) {
        callback(new Error('需要以 user- 开头'))
      }
      callback()
    }
  }
}
</script>

<style lang="less">
.basic-project-info-form {
  .ant-card-body {
    padding-bottom:12px!important;
  }
  .ant-form-item {
    margin-bottom:8px!important ;
  }
}
</style>
