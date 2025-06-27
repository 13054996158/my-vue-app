<template>
  <div class="app-root">
    <header class="app-header">
      <div class="logo-area">
        <!-- <el-tooltip content="首页" placement="bottom">
          <span class="header-icon" @click="goHome">🏠</span>
        </el-tooltip> -->
        <img class="logo-img" src="https://cdn.jsdelivr.net/gh/znimg/oss/logo-lowcode.svg" alt="logo" />
        <span class="logo-text">黄豆云 星空</span>
        <span class="company-name">黄豆</span>
        <span class="demo-tag">演示版</span>
      </div>
      <div class="header-actions">
        <el-tooltip content="设置" placement="bottom">
          <span class="header-icon" @click="goSetting">⚙️</span>
        </el-tooltip>
        <el-tooltip content="切换视图" placement="bottom">
          <span class="header-icon" @click="toggleViewMode">☰</span>
        </el-tooltip>
        <el-tooltip content="通知"><span class="header-icon">🔔</span></el-tooltip>
        <el-tooltip content="帮助"><span class="header-icon">❓</span></el-tooltip>
        <el-tooltip content="全屏"><span class="header-icon">⛶</span></el-tooltip>
        <el-tooltip content="主题切换"><span class="header-icon" @click="toggleTheme">🌓</span></el-tooltip>
        <span class="user">王传龙</span>
        <div class="avatar-dropdown">
          <img class="avatar" src="https://api.dicebear.com/7.x/identicon/svg?seed=admin" alt="avatar" />
          <div class="dropdown-menu">个人中心 / 退出</div>
        </div>
      </div>
    </header>
    <div class="header-divider"></div>
    <div class="main-layout">
      <aside class="sidebar sidebar-grouped">
        <div v-for="(group, groupIdx) in menuGroups" :key="group.group" class="menu-group">
          <div class="menu-group-title" @click="toggleGroup(groupIdx)">
            <span class="menu-group-icon">{{ group.icon }}</span>{{ group.group }}
            <span class="menu-arrow" v-if="group.menus && group.menus.length">{{ openGroupIdx === groupIdx ? '▼' : '▶' }}</span>
          </div>
          <ul v-show="openGroupIdx === groupIdx" class="menu-list">
            <li v-for="item in group.menus" :key="item.key" :class="['menu-item', {active: isActive(item)}]" @click="go(item)">
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-name">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </aside>
      <main class="content content-watermark">
        <!-- 页签式导航栏 -->
        <div class="tab-bar">
          <el-tabs
            v-model="activeTab"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="onTabClick"
            class="page-tabs"
          >
            <el-tab-pane
              v-for="tab in tabs"
              :key="tab.path"
              :label="tab.title"
              :name="tab.path"
            />
          </el-tabs>
        </div>
        <div class="content-header content-header-3col">
          <div class="content-header-toolbar">
            <slot name="toolbar"></slot>
          </div>
        </div>
        <router-view :key="$route.fullPath" />
      </main>
    </div>
    <el-dialog v-model="appMenuVisible" title="全部应用" width="400px" append-to-body>
      <div class="app-menu-list">
        <div class="app-menu-item">进销存</div>
        <div class="app-menu-item">CRM</div>
        <div class="app-menu-item">财务</div>
        <div class="app-menu-item">报表</div>
        <div class="app-menu-item">流程中心</div>
        <div class="app-menu-item">基础管理</div>
        <!-- 可扩展更多应用入口 -->
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, ref, onMounted, watch } from 'vue'
const router = useRouter()
const $route = useRoute()
// 主题切换
const theme = ref(localStorage.getItem('theme') || 'light')
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}
document.documentElement.setAttribute('data-theme', theme.value)
const menuGroups = [
  {
    group: '我的', icon: '🏠', menus: [
      { key: 'dashboard', name: '主页', icon: '🏠', path: '/main/dashboard' }
    ]
  },
  {
    group: '进销存', icon: '📦', menus: [
      { key: 'sale', name: '销售', icon: '💼', path: '/main/sale' },
      { key: 'purchase', name: '采购', icon: '🛒', path: '/main/purchase' },
      { key: 'stock', name: '仓库', icon: '🏬', path: '/main/stock' }
    ]
  },
  {
    group: 'CRM', icon: '👥', menus: [
      { key: 'customer-pool', name: '客户公海', icon: '🌊', path: '/main/customer-pool' }
    ]
  },
  {
    group: '财务', icon: '💰', menus: [
      { key: 'finance', name: '财务管理', icon: '💰', path: '/main/finance' },
      { key: 'voucher', name: '凭证管理', icon: '📑', path: '/main/voucher' }
    ]
  },
  {
    group: '报表', icon: '📊', menus: [
      { key: 'report', name: '报表中心', icon: '📊', path: '/main/report' }
    ]
  },
  {
    group: '流程中心', icon: '🔄', menus: [
      { key: 'workflow', name: '流程管理', icon: '🔄', path: '/main/workflow' }
    ]
  },
  {
    group: '基础管理', icon: '⚙️', menus: [
      { key: 'base', name: '基础资料', icon: '📋', path: '/main/base' },
      { key: 'system', name: '系统设置', icon: '⚙️', path: '/main/system' }
    ]
  }
]

function isActive(item) {
  return item.path === $route.path
}
function go(item) {
  if (item.path && $route.path !== item.path) router.push(item.path)
}
// 面包屑和标题逻辑
const findMenuPath = (groups, path) => {
  for (const group of groups) {
    for (const item of group.menus) {
      if (item.path === path) return [group.group, item.name]
    }
  }
  return []
}
const currentMenuPath = computed(() => findMenuPath(menuGroups, $route.path))
const currentMenuName = computed(() => currentMenuPath.value.length ? currentMenuPath.value.slice(-1)[0] : '')
const breadcrumbs = computed(() => currentMenuPath.value)

const openGroupIdx = ref(null)
function toggleGroup(idx) {
  openGroupIdx.value = openGroupIdx.value === idx ? null : idx
}
// 默认展开当前路由所在分组
function findGroupIdxByPath(path) {
  return menuGroups.findIndex(group => group.menus.some(item => item.path === path))
}
onMounted(() => {
  openGroupIdx.value = findGroupIdxByPath($route.path)
})
watch(() => $route.path, (newPath) => {
  openGroupIdx.value = findGroupIdxByPath(newPath)
})

const viewMode = ref('card')
function goHome() {
  router.push('/main/dashboard')
}
const appMenuVisible = ref(false)
function goSetting() {
  router.push('/main/system')
}
function toggleViewMode() {
  viewMode.value = viewMode.value === 'card' ? 'list' : 'card'
  // 可根据viewMode切换内容区展示方式
}

// tabs数据结构：{ title, path }
const tabs = ref([
  { title: '首页', path: '/main/dashboard', affix: true }
])
const activeTab = ref($route.fullPath)
watch(() => $route.fullPath, (newFullPath) => {
  activeTab.value = newFullPath
  const existIdx = tabs.value.findIndex(tab => tab.path === newFullPath)
  if (existIdx === -1) {
    let title = ''
    if (newFullPath.startsWith('/main/voucher/edit')) {
      title = $route.query.id ? '编辑凭证' : '新增凭证'
    } else if (tabTitleMap[$route.path]) {
      title = typeof tabTitleMap[$route.path] === 'function' ? tabTitleMap[$route.path]() : tabTitleMap[$route.path]
    } else {
      title = $route.meta?.title || $route.name || '未命名'
    }
    tabs.value.push({ title, path: newFullPath })
  }
})
function onTabClick(name) {
  if (name) router.replace(name)
}
function removeTab(targetPath) {
  const idx = tabs.value.findIndex(tab => tab.path === targetPath)
  if (tabs.value[idx]?.affix) return
  tabs.value.splice(idx, 1)
  if (activeTab.value === targetPath) {
    const next = tabs.value[idx - 1] || tabs.value[0]
    if (next) router.replace(next.path)
  }
}
// el-tabs v-model="activeTab"，el-tab-pane :name="tab.path" :label="tab.title" :key="tab.path"

// tab标题映射
const tabTitleMap = {
  '/main/voucher': '凭证列表',
  '/main/voucher/edit': () => $route.query.id ? '编辑凭证' : '新增凭证',
  '/main/sale': '销售管理',
  '/main/finance': '财务管理',
  // ...可扩展
}

// 右键菜单
const contextMenu = ref({ visible: false, x: 0, y: 0, tab: null })
function onTabContextMenu(e, tab) {
  contextMenu.value = { visible: true, x: e.clientX, y: e.clientY, tab }
  document.addEventListener('click', closeContextMenu)
}
function closeContextMenu() {
  contextMenu.value.visible = false
  document.removeEventListener('click', closeContextMenu)
}
function closeOtherTabs() {
  tabs.value = tabs.value.filter(tab => tab.path === '/main/dashboard' || tab.path === contextMenu.value.tab.path)
  router.push(contextMenu.value.tab.path)
  closeContextMenu()
}
function closeAllTabs() {
  tabs.value = tabs.value.filter(tab => tab.path === '/main/dashboard')
  router.push('/main/dashboard')
  closeContextMenu()
}
</script>

<style>
:root {
  --primary: #1677ff;
  --header-height: 56px;
  --sidebar-bg: #23272e;
  --sidebar-width: 220px;
  --property-width: 260px;
  --content-bg: #f5f7fa;
  --font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
body, .app-root {
  font-family: var(--font-family);
  color: #222;
}
.app-root {
  min-height: 100vh;
  background: var(--content-bg);
}
.app-header {
  height: var(--header-height);
  background: #1677ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
  z-index: 10;
  position: relative;
}
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.08);
}
.logo-text {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-right: 10px;
}
.company-name {
  font-size: 15px;
  color: #e0e6f6;
  margin-right: 10px;
}
.demo-tag {
  background: #fff;
  color: #1677ff;
  font-size: 13px;
  border-radius: 6px;
  padding: 2px 10px;
  margin-right: 18px;
  font-weight: 500;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: 20px;
  background: transparent;
  border-radius: 8px;
  margin-right: 8px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1.5px solid transparent;
}
.header-icon:hover {
  background: #e6f7ff;
  color: #1677ff;
  border: 1.5px solid #1677ff;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.08);
}
.user {
  font-size: 16px;
  font-weight: 400;
  margin-right: 6px;
}
.avatar-dropdown {
  position: relative;
  display: flex;
  align-items: center;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.avatar:hover {
  box-shadow: 0 0 0 2px #ffd666;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 40px;
  right: 0;
  background: #fff;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
  min-width: 120px;
  padding: 12px 0;
  z-index: 100;
}
.avatar-dropdown:hover .dropdown-menu {
  display: block;
}
.header-divider {
  height: 1px;
  background: #e5e6eb;
  width: 100vw;
  min-width: 100%;
  box-shadow: 0 1px 0 #f0f1f2;
}
.main-layout {
  display: flex;
  height: calc(100vh - var(--header-height) - 1px);
  min-width: 0;
}
.sidebar-grouped {
  background: #f5f7fa;
  color: #222;
  box-shadow: 2px 0 8px #f0f1f2;
  padding-top: 0;
}
.menu-group {
  margin-bottom: 18px;
}
.menu-group-title {
  font-size: 15px;
  font-weight: bold;
  color: #1677ff;
  padding: 18px 0 6px 32px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.menu-group-icon {
  font-size: 18px;
}
.menu-list {
  list-style: none;
  padding: 0 0 0 16px;
  margin: 0;
  transition: max-height 0.2s;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  color: #1677ff;
  background: none;
  margin-bottom: 4px;
  transition: background 0.2s, color 0.2s;
}
.menu-item.active, .menu-item:hover {
  background: #1677ff;
  color: #fff;
}
.menu-icon {
  font-size: 20px;
  width: 28px;
  text-align: center;
}
.menu-name {
  font-size: 16px;
  font-weight: 500;
}
.content {
  flex: 1;
  min-width: 0;
  background: #eaf4ff;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow-y: auto;
}
.content-watermark {
  position: relative;
  background: #fff;
  min-height: 100%;
}
.content-watermark::after {
  content: '演示版';
  position: fixed;
  left: 0; top: 0; width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 0;
  font-size: 60px;
  color: #1677ff22;
  font-weight: bold;
  text-align: center;
  line-height: 100vh;
  letter-spacing: 16px;
  user-select: none;
  transform: rotate(-20deg);
  white-space: pre;
  background: none;
}
.content-header-3col {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px 0 24px;
  background: #fff;
  min-height: 56px;
  border-bottom: 1.5px solid #f0f1f2;
  gap: 18px;
}
.content-header-toolbar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
}
.menu-arrow {
  margin-left: auto;
  font-size: 13px;
  color: #bbb;
}
.submenu-list {
  list-style: none;
  padding: 0 0 0 32px;
  margin: 0;
}
.submenu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0 10px 8px;
  font-size: 15px;
  cursor: pointer;
  border-left: 3px solid transparent;
  background: #23272e;
  color: #fff;
  border-radius: 4px;
  margin-bottom: 2px;
  transition: background 0.2s, border-color 0.2s;
}
.submenu-item.active, .submenu-item:hover {
  background: #1677ff;
  color: #fff;
  border-left: 3px solid #fff;
}
.menu-item.open {
  background: #1a1d23;
}
.content-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(22,119,255,0.06);
  padding: 32px 28px;
  margin: 32px 0;
}
@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar-grouped {
    width: 100vw;
    min-width: 0;
    flex-direction: row;
    padding-top: 0;
    box-shadow: none;
    border: none;
  }
  .menu-group {
    margin-bottom: 0;
    padding: 0 8px;
  }
  .menu-group-title {
    padding: 8px 0 4px 8px;
    font-size: 13px;
  }
  .menu-list {
    padding: 0 0 0 4px;
  }
  .menu-item {
    padding: 8px 8px;
    font-size: 14px;
  }
  .content-header-3col {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 8px 0 8px;
  }
  .content-header-title {
    margin: 0 0 0 0;
    font-size: 20px;
  }
}
@media (max-width: 600px) {
  .app-header {
    padding: 0 8px;
    font-size: 16px;
  }
  .logo-text {
    font-size: 16px;
  }
  .user {
    font-size: 12px;
  }
  .avatar {
    width: 24px;
    height: 24px;
  }
}
@media (max-width: 700px) {
  .logo-area {
    gap: 4px;
  }
  .header-icon {
    width: 30px;
    height: 30px;
    font-size: 16px;
    margin-right: 4px;
  }
}
.app-menu-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px 0;
}
.app-menu-item {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  color: #1677ff;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.app-menu-item:hover {
  background: #e6f7ff;
  color: #222;
}
.tab-bar {
  background: #fff;
  border-bottom: 1.5px solid #f0f1f2;
  padding: 0 12px;
  position: relative;
  z-index: 5;
}
.page-tabs {
  min-height: 40px;
  max-width: 100vw;
  overflow-x: auto;
}
.tab-context-menu {
  position: fixed;
  z-index: 9999;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.08);
  padding: 8px 0;
}
.tab-context-menu > div {
  padding: 8px 24px;
  cursor: pointer;
}
.tab-context-menu > div:hover {
  background: #e6f7ff;
  color: #1677ff;
}
</style> 