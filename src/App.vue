<template>
  <div class="common-layout">
    <el-container >
    
      <el-header style="width: 100%; position: sticky; border-bottom: 1px solid #dcdfe6; top: 0; left: 0; z-index:1000; padding: 0">
      <!-- 固定置顶 -->
        <div class="scene-header">
        <sceneMenu/>
      </div>
      </el-header>
      <el-main style="overflow: hidden; top: 0; left: 0; padding: 0;">
        <!-- <videoCardListVue/> -->
        <!-- <router-view /> -->
        <div class="scene-main">
          <!-- <router-view /> -->
          <router-view v-slot="{ Component }" :key="key">
          <keep-alive :exclude="['MovDetailPageVue', 'videoKeywordPageVue', 'LoginVue']">
            <component :is="Component"/>
          </keep-alive>
          </router-view>
        </div>
        
      </el-main>
      <el-footer style="padding: 0">
        <FooterVue/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import sceneMenu from './components/sceneMenu.vue'
import videoCardList from './components/videoCardList.vue'
import FooterVue from './components/Footer.vue'
import MovDetailPageVue from './views/MovDetailPage.vue'
import videoKeywordPageVue from './views/videoKeywordPage.vue'
import LoginVue from './views/Login.vue'

export default {
  name: 'App',
  components: {
    sceneMenu,
    videoCardList,
    FooterVue,
    MovDetailPageVue,
    videoKeywordPageVue,
    LoginVue
  },

  computed: {
    key() {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
       console.log(this.$route.fullPath);
      return this.$route.fullPath
    }
  },
}
</script>
