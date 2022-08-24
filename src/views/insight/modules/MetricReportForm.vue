<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="报表名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['title', {rules:[{required: true, message: '请输入报表名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="可见范围"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-radio-group default-value="all" button-style="solid" v-decorator="['type', {rules:[{required: true, message: '请选择报表类型'}]}]">
        <a-radio-button value="all">
          所有人
        </a-radio-button>
        <a-radio-button value="my">
          仅我可见
        </a-radio-button>
        <a-radio-button value="team">
          团队可见
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="项目范围"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select
        mode="multiple"
        show-search
        placeholder="选择度量项目"
        option-filter-prop="children"
        style="width: 200px"
        :filter-option="filterOption"
        v-decorator="['projectRange', {rules:[{required: true, message: '请选择度量项目范围'}]}]"
      >
        <a-select-option value="mozi">
          墨子工程项目
        </a-select-option>
        <a-select-option value="ITSystem">
          IT综合管理系统
        </a-select-option>
        <a-select-option value="devops">
          DevOps平台
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="度量指标"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select mode="multiple" v-decorator="['indicators', {rules:[{required: true, message: '请选择度量指标'}]}]">
        <a-select-option v-for="(item,index) in indicators" :key="index" :value="item.value">{{ item.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="时间范围"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select v-decorator="['timeRange', {rules:[{required: true, message: '请选择度量时间维度'}]}]">
        <a-select-option v-for="(item,index) in timeRange" :key="index" :value="item.value">{{ item.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="报表描述"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-textarea v-decorator="['description']"></a-textarea>
    </a-form-item>
  </a-form>
</template>

<script>
import pick from 'lodash.pick'

const fields = ['title', 'startAt', 'owner', 'description']

export default {
  name: 'MetricReportForm',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
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
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.record && this.form.setFieldsValue(pick(this.record, fields))
  },
  methods: {
    onOk () {
      console.log('监听了 modal ok 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    onCancel () {
      console.log('监听了 modal cancel 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        }
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>
