<template>
  <videoCardListVue :movtype="movtype"/>
</template>

<script>
// 无限滚动条的视频列表页
import videoCardListVue from '../components/videoCardList.vue'

export default {
  name: 'videoPage',
  props: {
        movtype: String
    },
  components: {
    videoCardListVue
  }
}
</script>
