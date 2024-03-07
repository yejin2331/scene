<template>
  <videoCardListVue :movtype="'0'" :keyword="keyword"/>
</template>

<script>
// 根据关键词搜索的视频页
import videoCardListVue from '../components/videoCardList.vue'

export default {
  name: 'videoKeywordPage',
  data() {
    return {
      keyword: ''
    }
  },

  components: {
    videoCardListVue
  },

  created() {
    this.keyword = this.$route.query.keyword
  }
}
</script>
