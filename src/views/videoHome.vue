<template>
  <div style="padding: 20px 10px 0 10px">
    <sceneBigImgVue/>
  </div>
  
  <MovLimitCardVue :movtype="4"/>
  <MovLimitCardVue :movtype="1"/>
  <MovLimitCardVue :movtype="2"/>
  <MovLimitCardVue :movtype="3"/>
  <el-backtop :right="50" :bottom="80" />
</template>

<script>
// 首页

import MovLimitCardVue from '../components/MovLimitCard.vue'
import sceneBigImgVue from '../components/sceneBigImg.vue'
export default {
  name: 'videoHome',
  components: {
    MovLimitCardVue,
    sceneBigImgVue
  }
}
</script>
