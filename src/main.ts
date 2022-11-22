import './styles/tailwind.css';
import { createApp } from 'vue';
import { setupNaive, setupDirectives } from '@/plugins';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from '@/store';
import VueCodemirror from 'vue-codemirror';
// code mirror style config
import codeMirrorConfig from './config/codemirror.config';
// The defaultConfig includes all of FormKit's inputs, validation rules, and the English language.
import { plugin, defaultConfig } from '@formkit/vue';
// Default formkit config.
import config from '../formkit.config';

// Star Vue instance function
async function bootstrap() {
  const app = createApp(App).use(plugin, defaultConfig(config));
  // Global VueCodemirro settings.
  app.use(VueCodemirror, codeMirrorConfig);
  // 注册全局常用的 naive-ui 组件
  setupNaive(app);

  // 注册全局自定义组件
  //setupCustomComponents();

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app);

  // 注册全局方法，如：app.config.globalProperties.$message = message
  //setupGlobalMethods(app);

  // 挂载状态管理
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
