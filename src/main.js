import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'element-plus/dist/index.css'
import './index.css'//当前目录index.js
import 'vue3-video-play/dist/style.css' // 引入css
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}//组件注册
app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(vue3videoPlay)//引入编写的js文件，开始嵌入回溯
app.mount('#app')//挂载app
