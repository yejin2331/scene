<template>
  <!-- 个人头像区 -->
  <div class="profile-header">
    <img class="profile-avatar" :src="avatarUrl" alt="用户头像"/>
    <div class="profile-info">
      <h2 class="profile-name">{{ userName }}</h2>
      <p class="profile-signature">{{ userSignature }}</p>
    </div>
  </div>
  
  <!-- 导航栏 -->
  <el-menu class="navigation" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="my-collections">
  <el-menu-item index="my-collections">我的收藏</el-menu-item>
  <el-menu-item index="my-videos">我的视频</el-menu-item>
  <el-menu-item index="my-profile">我的个人资料</el-menu-item>
</el-menu>

  <!-- 条件渲染的CollectVideosVue组件 -->
  <CollectVideosVue v-if="currentPage === 'my-collections'" :user_id="user_id"/>
</template>


<script>
import { ref } from 'vue';
import CollectVideosVue from '../components/CollectVideos.vue';

export default {
  name: 'PersonalSpacePage',
  components: {
    CollectVideosVue
  },
  props: {
    user_id: String
  },
  setup() {
    // 将currentPage的初始值设置为'my-collections'
    const currentPage = ref('my-collections');

    // 方法来处理选择事件
    const handleSelect = (key) => {
      currentPage.value = key;
    };

    return { currentPage, handleSelect };
  },
  data() {
    return {
      avatarUrl: 'path/to/avatar.jpg',
      userName: '夜景',
      userSignature: '敲代码',
    };
  },
};
</script>


<style>
.profile-header {
  display: flex;
  align-items: center; /* 确保内容垂直居中 */
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

/* 包裹姓名和签名的容器 */
.profile-info {
  display: flex;
  flex-direction: column; /* 使姓名和签名垂直排列 */
  justify-content: center;
  margin-left: 20px; /* 头像和信息之间的距离 */
}

.profile-name, .profile-signature {
  margin: 0; /* 移除默认的外边距 */
}

.profile-name {
  font-size: 24px;
  color: #333;
}

.profile-signature {
  font-size: 16px;
  color: #666;
  margin-top: 8px; /* 姓名和签名之间的距离 */
}
</style>
