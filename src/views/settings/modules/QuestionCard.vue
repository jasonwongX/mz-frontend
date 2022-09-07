<template>
  <div>
    <a-card :title="questionItem.description" class="event-card">
      <template slot="extra">
        <a href="#" @click="handleEdit(questionItem)">编辑</a>
        <a href="#" class="delete-btn">删除</a>
      </template>
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="负责人">{{ questionItem.name }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{ questionItem.status | statusFilter }}</a-descriptions-item>
        <a-descriptions-item label="更新时间">{{ questionItem.updatedAt }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :column="1">
        <a-descriptions-item label="进展">{{ questionItem.progress }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <question-form
      ref="questionForm"
      :visible="visible"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </div>
</template>
<script>
import QuestionForm from './QuestionForm'

export default {
  name: 'EventCard',
   props: {
    questionItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      visible: false,
      mdl: {}
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: '进行中',
        2: '已完成'
      }
      return statusMap[status]
    }
  },
  components: {
    QuestionForm
  },
  methods: {
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleCancel () {
      this.visible = false
      const form = this.$refs.questionForm.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleOk () {
      this.visible = false
      const form = this.$refs.questionForm.form
      form.resetFields() // 清理表单数据（可不做）
    }
  }

}
</script>
<style lang="less" scoped>
.event-card {
  .delete-btn {
    color:#eb664b;
    margin-left:8px;
  }
}
</style>
