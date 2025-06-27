<template>
  <div class="main-menu">
    <h1 class="menu-title">主菜单</h1>
    <div class="menu-list">
      <div class="menu-item" v-for="item in menus" :key="item.key" @click="go(item)">
        <div class="menu-icon">{{ item.icon }}</div>
        <div class="menu-info">
          <div class="menu-name">{{ item.name }}</div>
          <div class="menu-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const menus = [
  { key: 'purchase', name: '采购管理', icon: '🛒', desc: '采购订单、供应商、入库等', path: '/main/purchase' },
  { key: 'sale', name: '销售管理', icon: '💼', desc: '销售订单、客户、出库等', path: '/main/sale' },
  { key: 'stock', name: '库存管理', icon: '📦', desc: '库存查询、调拨、盘点等', path: '/main/stock' },
  { key: 'finance', name: '财务管理', icon: '💰', desc: '收付款、发票、账务等', path: '/main/finance' },
  { key: 'base', name: '基础资料', icon: '📋', desc: '物料、客户、供应商等', path: '/main/base' },
  { key: 'system', name: '系统设置', icon: '⚙️', desc: '用户、权限、参数配置', path: '/main/system' }
]
function go(item) {
  if (item.path) router.push(item.path)
}
</script>

<style>
.main-menu {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100vw;
  background: #fffbe6;
  box-sizing: border-box;
}
.menu-title {
  font-size: 32px;
  font-weight: bold;
  color: #1677ff;
  text-align: left;
  margin: 36px 0 24px 0;
  letter-spacing: 2px;
}
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: flex-start;
  margin: 0;
  width: 100%;
  max-width: 100vw;
  background: #fffbe6;
}
.menu-item {
  background: #fff;
  border-radius: 0;
  box-shadow: none;
  padding: 18px 0 18px 0;
  width: 100%;
  min-width: 0;
  max-width: 100vw;
  margin: 0;
  border-right: none;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: left;
}
.menu-item:hover {
  box-shadow: 0 8px 32px 0 rgba(22,119,255,0.16);
  transform: translateY(-4px) scale(1.03);
}
.menu-icon {
  font-size: 22px;
  width: 38px;
  text-align: center;
  margin-right: 0;
}
.menu-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.menu-name {
  font-size: 18px;
  font-weight: 500;
  color: #222;
  margin-bottom: 2px;
}
.menu-desc {
  font-size: 14px;
  color: #888;
}
@media (max-width: 700px) {
  .menu-list {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
  .menu-item {
    width: 98vw;
    max-width: 98vw;
    min-width: 0;
    padding: 22px 10vw;
  }
}
</style> 