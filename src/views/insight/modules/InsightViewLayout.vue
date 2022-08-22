<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <template v-slot:extra>
      <a-select
        v-if="tabActiveKey === '2'"
        mode="tags"
        placeholder="请选择所属团队"
        :default-value="['墨子工程研发团队']"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option v-for="i in 5" :key="(i + 9).toString(36) + i">
          {{ "研发团队" + i }}
        </a-select-option>
      </a-select>
      <a-dropdown >
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1"> 近七天内 </a-menu-item>
          <a-menu-item key="2"> 近两周内 </a-menu-item>
          <a-menu-item key="3"> 近一个月内 </a-menu-item>
          <a-menu-item key="4"> 近三个月内 </a-menu-item>
          <a-menu-item key="4"> 近半年内 </a-menu-item>
          <a-menu-item key="4"> 近一年内 </a-menu-item>
        </a-menu>
        <a-button > 筛选时间范围 <a-icon type="down" /> </a-button>
      </a-dropdown>
    </template>
    <router-view />
  </page-header-wrapper>
</template>

<script>
const getActiveKey = (path) => {
  switch (path) {
    case '/insignt/my':
      return '1'
    case '/insignt/team':
      return '2'
    case '/insignt/company':
      return '3'
    default:
      return '1'
  }
}
export default {
  name: 'InsightViewLayout',
  data () {
    return {
      tabList: [
        { key: '1', tab: '个人视图' },
        { key: '2', tab: '团队视图' },
        { key: '3', tab: '组织视图' }
      ],
      tabActiveKey: '1',
      search: true
    }
  },
  created () {
    this.tabActiveKey = getActiveKey(this.$route.path)

    this.$watch('$route', (val) => {
      this.tabActiveKey = getActiveKey(val.path)
    })
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
      switch (key) {
        case '1':
          this.$router.push('/insignt/my')
          break
        case '2':
          this.$router.push('/insignt/team')
          break
        case '3':
          this.$router.push('/insignt/company')
          break
        default:
          this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-page-header-search {
  text-align: center;
  margin-bottom: 16px;
}
</style>
