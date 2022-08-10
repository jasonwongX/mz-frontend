<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
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
