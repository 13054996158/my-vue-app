<template>
  <div class="sale-index">
    <h1 class="sale-title">销售</h1>
    <el-row :gutter="24">
      <el-col :span="6" v-for="item in modules" :key="item.key">
        <el-card shadow="hover" class="sale-card" @click="go(item.path)">
          <div class="card-header">
            <span class="card-icon">{{ item.icon }}</span>
            <span class="card-title">{{ item.title }}</span>
          </div>
          <div class="card-desc">{{ item.desc }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const modules = [
  { key: 'quote', title: '报价单', icon: '💰', desc: '报价单管理，支持报价、审批、归档', path: '/main/sale/quote' },
  { key: 'order', title: '销售订单', icon: '📄', desc: '管理所有销售订单，支持新建、审核、导出等操作', path: '/main/sale/order' },
  { key: 'out', title: '销售出库单', icon: '📦', desc: '出库单管理，支持出库、发货、统计', path: '/main/sale/out' },
  { key: 'return', title: '销售退货', icon: '↩️', desc: '退货单管理，支持退货登记、审核、统计', path: '/main/sale/return' }
]
function go(path) {
  router.push(path)
}
</script>

<style scoped>
.sale-index {
  margin: 32px 24px 0 24px;
}
.sale-title {
  font-size: 28px;
  font-weight: bold;
  color: #1677ff;
  margin-bottom: 32px;
  letter-spacing: 2px;
}
.sale-card {
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 24px;
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s;
}
.sale-card:hover {
  box-shadow: 0 4px 16px 0 rgba(22,119,255,0.12);
  border: 1.5px solid #1677ff;
}
.card-header {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 8px;
}
.card-icon {
  font-size: 28px;
  margin-right: 10px;
}
.card-title {
  font-weight: bold;
}
.card-desc {
  color: #888;
  margin-bottom: 16px;
}
@media (max-width: 900px) {
  .el-col {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
}
</style> 