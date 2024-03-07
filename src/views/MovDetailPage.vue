<template>
  <MovDetail :vod_id="vod_id"/>
  <CommentVue :vod_id="vod_id"/>
  <el-backtop :right="50" :bottom="80" />
  <!-- 用于快速返回页面顶部 -->
</template>

<script>
// 详情页
import MovDetail from '../components/MovDetail.vue'
import CommentVue from '../components/Comments.vue'

export default {
  name: 'MovDetailPage',
  props: {
        vod_id: String
    },
    //接受父组件传来的p-rops信息，控制为字符串类型
  components: {
    MovDetail,
    CommentVue
  }
}
</script>
