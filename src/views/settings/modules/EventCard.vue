<template>
  <div>
    <a-card :title="eventItem.title" class="event-card">
      <template slot="extra">
        <a href="#" @click="handleEdit(eventItem)">编辑</a>
        <a href="#" class="delete-btn">删除</a>
      </template>
      <a-descriptions size="small" :column="1">
        <a-descriptions-item label="更新时间">{{ eventItem.time }}</a-descriptions-item>
        <a-descriptions-item label="描述">{{ eventItem.description }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <event-form
      ref="eventForm"
      :visible="visible"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />
  </div>
</template>
<script>
import EventForm from './EventForm'

export default {
  name: 'EventCard',
   props: {
    eventItem: {
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
  components: {
    EventForm
  },
  methods: {
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleCancel () {
      this.visible = false
      const form = this.$refs.eventForm.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleOk () {
      this.visible = false
      const form = this.$refs.eventForm.form
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
