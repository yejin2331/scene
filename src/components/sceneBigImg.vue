<template>
 <div class="container">
    <div class="carousel-container">
      <el-carousel :height="bannerHeight+'px'" indicator-position="outside">
        <el-carousel-item v-for="i in imgs" :key="i">
          <img :src="i" class="carousel-image" @load="imgLoad">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="thumbnails">
      <div v-for="index in 6" :key="index" class="thumbnail" @click="navigate(index)">
        <img :src="getThumbnailSrc(index)" alt="">
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "SsceneBigImg",
  props: {
      movtype: Number
  },
  data() {
      return {
          bannerHeight: "",
          imgs: [
              "src/assets/bigImg/b1.webp",
              "src/assets/bigImg/b2.webp",
              "src/assets/bigImg/b3.webp",
              "src/assets/bigImg/b4.webp"
          ]  ,images: [
        'src/assets/bigImg/b1.webp',
        'src/assets/bigImg/b1.webp',
        'src/assets/bigImg/b1.webp',
        'src/assets/bigImg/b1.webp',
        'src/assets/bigImg/b1.webp',
        'src/assets/bigImg/b1.webp'
      ]
      }
  },
  mounted() {
      this.imgLoad();
      window.addEventListener('resize', () => {
          this.bannerHeight = this.$refs.bannerHeight[0].height;
          this.imgLoad();
      }, false);
  },
  methods: {
      imgLoad(){
          this.$nextTick(() => {
              this.bannerHeight = this.$refs.bannerHeight[0].height;
          });
      },
      navigate(index) {
          // 在这里根据index执行不同的跳转逻辑
          console.log("Navigate to:", index);
          // 示例跳转逻辑
          // if (index === 1) {
          //     window.location.href = 'http://example.com/path1';
          // } else if (index === 2) {
          //     window.location.href = 'http://example.com/path2';
          // }
          // 更多跳转逻辑...
      },
      getThumbnailSrc(index) {
          // 返回对应index的图片路径
          return this.images[index - 1];// 假设路径
      }
  }
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.carousel-container {
  width: 60%; /* 根据需要调整轮播图容器宽度 */
}

.carousel-image {
  width: 100%;
  height: auto;
}

.thumbnails {
  display: flex;
  flex-wrap: wrap; /* 允许内容换行 */
  justify-content: space-between; /* 在项目之间添加一些间距 */
  width: 35%; /* 根据实际需要调整 */
}

.thumbnail {
  width: calc(33.33% - 10px); /* 每个缩略图占据行宽的三分之一，减去间距 */
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-bottom: 15px; /* 添加底部间距 */
}

.thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>

