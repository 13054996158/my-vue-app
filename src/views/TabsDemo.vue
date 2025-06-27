<template>
  <div class="app">
    <!-- 多标签页 -->
    <el-tabs
      v-model="activeTab"
      type="card"
      closable
      @tab-click="onTabClick"
      @tab-remove="removeTab"
      class="page-tabs"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.path"
        :label="tab.title"
        :name="tab.path"
      />
    </el-tabs>

    <!-- 路由视图，key用fullPath强制刷新 -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 标签页列表，初始化首页标签
const tabs = ref([
  { title: '首页', path: '/dashboard', affix: true }
])

// 激活标签，绑定到el-tabs的v-model
const activeTab = ref(route.fullPath)

// 监听路由变化，动态添加标签页
watch(() => route.fullPath, (newFullPath) => {
  activeTab.value = newFullPath
  if (!tabs.value.find(tab => tab.path === newFullPath)) {
    tabs.value.push({
      title: route.meta.title || '未命名页',
      path: newFullPath
    })
  }
})

// 点击标签切换路由
function onTabClick(path) {
  if (path !== route.fullPath) {
    router.push(path)
  }
}

// 关闭标签页
function removeTab(targetPath) {
  const index = tabs.value.findIndex(tab => tab.path === targetPath)
  if (index === -1) return
  // 防止关闭固定页
  if (tabs.value[index].affix) return

  tabs.value.splice(index, 1)
  // 如果关闭的是当前激活标签，切换到前一个标签或首页
  if (activeTab.value === targetPath) {
    const nextTab = tabs.value[index - 1] || tabs.value[0]
    if (nextTab) {
      router.push(nextTab.path)
    }
  }
}
</script>

<style>
.app {
  padding: 20px;
}
.page-tabs {
  margin-bottom: 20px;
}
</style> 