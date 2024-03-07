<template>
  <div class="search-type" >
        <el-row v-for="alldata in searchTypes" :key="alldata.key" style="margin: 10px;" :gutter="20">
          <span style="margin: 5px 10px; font-size: 16px; font-weight: bold; line-height: 20px;">{{ alldata.name }}:</span>
            <a v-for="d in alldata.data" :key="alldata.key + '-' + d" :name="alldata.key + '-' + d"
             @click="chooseFliter" 
             style="margin: 0 5px; padding: 5px 5px; line-height: 20px;" 
             class="search-type"
             :class="[{active: activeName[alldata.key] == d}]"
            >{{ d }}</a>
        </el-row>
  </div>
  
  <el-row alignment="flex-start" 
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="disabled"
            infinite-scroll-distance="30"
            :infinite-scroll-immediate="true"
            class="mov-card-row"
            v-show="contenshow">
      <el-col       v-for="alldata in videoList"     :key="alldata.vod_id"     :xs="8" :sm="4" :md="4"      style="padding: 9px;"> 
          <!--设置element栅格中的排布方式  -->
        <router-link :to="'/movdetail/'+ alldata.vod_id" style="text-decoration: none;" target="_blank">
          <!-- 移除下划线，并在新窗口打开连接 -->
        <el-card  class="box-card"  @click.stop="selectvideo"  shadow="hover" :body-style="{ padding: '8px 5px' }">
          <div class="card-div">
  <img :src="alldata.vod_pic" class="card-image"/>
  <span class="card-remark">{{ alldata.vod_remarks }}</span>
  <div class="card-icons">
    <el-icon class="play-icon" name="el-icon-play" size="20"></el-icon>
    <el-icon class="comment-icon" name="el-icon-chat-dot-round" size="20"></el-icon>
  </div>
  <p class="card-text">播放量: {{ alldata.views }} 推荐指数: {{ alldata.recommendation }}</p>
</div>
    
        <div style="display: flex; justify-content: flex-start;">
  <span style="line-height: 26px; font-size: 15px; color:#777; margin-top: 4px; text-overflow: ellipsis; overflow: hidden; width: 80%; white-space: nowrap;">
  <!-- 控制span元素的显示方法 -->
    <el-tooltip class="box-item" effect="dark" :content="alldata.vod_name" placement="bottom-end" :show-after="1000">
      {{ alldata.vod_name }}
    </el-tooltip>
  </span>
  
  <p class="des-content"> 
    <!-- 需要调整收藏按钮的显示 -->
   <el-icon :size="26" style="vertical-align: middle;" v-if="!isCollect" color="#999" @click.stop="addCollect"><StarFilled /></el-icon>
  <el-icon :size="26" style="vertical-align: middle" v-else color="yellow" @click.stop="removeCollect"><StarFilled /></el-icon>  
 
</p>
</div>


      </el-card>
      </router-link>
      </el-col>
  </el-row>
  <el-backtop :right="50" :bottom="80" />
  <p v-show="infiniteMsgShow" class="tips" style="font-size:smaller; color:#777;">Loading...</p>
  <p v-show="!infiniteMsgShow" class="tips" style="font-size:smaller; color:#777;">到底啦</p>
</template>

<script>
import { ref } from 'vue'
import apiGetMovList from '../apis/getMovInfo'
import sceneBigImg from './sceneBigImg.vue'
// import sceneTypeButton from './sceneTypeButton.vue'
import { useStore } from 'vuex'
import { isCollectVideo, addCollectVideo, removeCollectVideo } from '../apis/videoCollection'
export default {
  // 无限滚动展示视频列表
    name: "videoCardList",
    props: {
        movtype: String,
        keyword: String
    },
    components: {
      sceneBigImg,
    },

    setup() {
      const store = useStore()  // 该方法用于返回store 实例
      return {
            store
        }
    },

    data() {
      return {
        disabled: false,
        page: 1,
        contenshow: true,
        infiniteMsgShow: true,
        vod_class: '',
        vod_area: '',
        vod_year: '',
        videoList: [
            ],
        searchTypes: [
                {name: "类型", key: "vod_class", data: []},
                {name: "地区", key: "vod_area", data: ["中国", "内地", "美国", "日本", "韩国", "英国", "法国", "香港", "泰国", "more"]},
                {name: "年份", key: "vod_year", data: ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "more"]}
            ],
        activeName: {
          vod_class: '',
          vod_area: '',
          vod_year: ''
        }
      }
    },

    methods: {
        selectvideo(h) {
            console.log(h)
        },
        addCollect() {
        // 将此视频添加收藏
        console.log("add collect")
        if (this.store.state.appStore.isLogining) {
            var params = {
                vod_id: this.vod_id,
                user_id: this.store.state.appStore.user.id
            }
            addCollectVideo(params).then(
                (res) => {
                    if (res.data.code == 200) {
                        this.isCollect = 1
                    } else {
                        ElMessage({
                                message: res.data.message,
                                type: 'warning',
                            })
                    }
                }
            )
        } else {
            ElMessage({
                        message: '请先登录',
                        type: 'warning',
                            })
        }
    },

    removeCollect() {
        console.log("remove collect")
        if (this.store.state.appStore.isLogining) {
            var params = {
                vod_id: this.vod_id,
                user_id: this.store.state.appStore.user.id
            }
            removeCollectVideo(params).then(
                (res) => {
                    if (res.data.code == 200) {
                        this.isCollect = 0
                    } else {
                        ElMessage({
                                message: res.data.message,
                                type: 'warning',
                            })
                    }
                }
            )
        } else {
            ElMessage({
                        message: '请先登录',
                        type: 'warning',
                            })
        }
    },
        chooseFliter(v) {
          // 点击筛选标签后 获取想要筛选的 视频类型
          var cho_fliter = v.currentTarget.attributes.name.value
          // console.log(cho_fliter)
          var name = cho_fliter.split('-')[0]
          var value = cho_fliter.split('-')[1]
          this.activeName[name] = value
          if (name == "vod_class") {
            this.vod_class = value
          } else if (name == "vod_area") {
            this.vod_area = value
          } else if (name == "vod_year") {
            this.vod_year = value
          }
          this.page = 1
          this.videoList = []
          this.getMovList()
        },

        // 当属性滚动的时候  加载  滚动加载
        loadMore () {
          this.disabled = true // 将无限滚动给禁用
          setTimeout(
            () => {
              this.page++ // 增加页数
              this.getMovList() // 请求数据
            }, 500)  // 间隔500毫秒后发送请求
           },

        getMovList() {
          const param =  { 
              page: this.page,
              movtype: this.movtype || 0,
              keyword: this.keyword || '',
              vod_area: this.vod_area,
              vod_class: this.vod_class,
              vod_year: this.vod_year }

          // console.log(param)
          apiGetMovList(param).then(
            (res) => { 
              // console.log(res)
              if (res.data.length > 0) {
                this.contentShow = true
                this.infiniteMsgShow = true
                  for (var i in res.data) {
                    this.videoList.push(res.data[i])
                 }
                  this.disabled = false // 还有多余数据时 无限滚动打开
              } else {
                this.contentShow = false
                this.infiniteMsgShow = false
                this.disabled = true
                
              }
             }
          ).catch(
            () => {
                this.contentShow = false
                this.infiniteMsgShow = false
                this.disabled = true
            }
          )
      },

      getMovTypeNames() {
        // 获取此 movtype 对应的视频类型
        var type_id = this.movtype
        var type_names = this.store.state.appStore.type_names[type_id]
        this.searchTypes[0].data = type_names
        // console.log(type_names)
        // console.log(this.searchTypes)
      }
   },

   created() {
    this.getMovTypeNames()
    this.getMovList()
   }

}

</script>

<style>

a.search-type:hover {
    color: rgb(36, 184, 242);
}

a.search-type.active {
  background-color: rgb(36, 184, 242);
  color: white;
  border-radius: 4px;
}

.bottom {
  margin-top: 0px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-div {
  position: relative;
  background-color: rgba(242, 242, 242, 0.3);
  border-radius: 5px;
  padding: 3px;
  border: 1px solid black;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.4);
  transition: all 0.1s;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.card-div:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.card-image {
  width: 95%;
  height: auto;
  display: block;
  object-fit: cover;
}

.card-remark {
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
  font-size: 13px;
}

.card-icons {
  position: absolute;
  bottom: 4px;
  right: 4px;
  display: flex;
}

.card-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  margin: 0;
  font-size: 12px;
}

.el-card.box-card {
  width: 100%;
  border-radius: 4px 4px 0 0;
  /* margin: 11px; */
  background-color: white;
  /* border-style: none; */
}

/* .el-col.col-card-class {
    margin: 0px 20px 40px 20px;
} */
</style>./SceneBigImg.vue
