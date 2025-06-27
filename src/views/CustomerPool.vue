<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// mock客户数据
const customerPool = ref([
  { id: '1', name: '张三', owner: '', status: '在公海' },
  { id: '2', name: '李四', owner: '', status: '在公海' },
  { id: '3', name: '王五', owner: '', status: '在公海' }
])

const search = ref('')
const selectedRows = ref([])
const showPool = ref(false)

// 搜索过滤
const filteredList = computed(() =>
  customerPool.value.filter(item =>
    item.name.includes(search.value)
  )
)

// 选中行
function onSelect(rows) {
  selectedRows.value = rows
}

// 认领
function claim(row) {
  row.owner = '当前用户'
  row.status = '已认领'
  ElMessage.success(`认领成功：${row.name}`)
}

// 分配弹窗
const assignDialogVisible = ref(false)
const assignTargetRows = ref([])
const selectedUser = ref('')

function assign(row) {
  assignTargetRows.value = [row]
  assignDialogVisible.value = true
}
function batchAssign() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要分配的客户')
    return
  }
  assignTargetRows.value = [...selectedRows.value]
  assignDialogVisible.value = true
}
function doAssign() {
  assignTargetRows.value.forEach(row => {
    row.owner = selectedUser.value
    row.status = '已分配'
  })
  assignDialogVisible.value = false
  ElMessage.success('分配成功')
  selectedUser.value = ''
}

// 释放
function release(row) {
  row.owner = ''
  row.status = '在公海'
  ElMessage.success(`已释放：${row.name}`)
}
function batchClaim() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要认领的客户')
    return
  }
  selectedRows.value.forEach(row => {
    row.owner = '当前用户'
    row.status = '已认领'
  })
  ElMessage.success('批量认领成功')
}
function batchRelease() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要释放的客户')
    return
  }
  selectedRows.value.forEach(row => {
    row.owner = ''
    row.status = '在公海'
  })
  ElMessage.success('批量释放成功')
}
</script>

<template>
  <div class="customer-pool-page">
    <h1 class="pool-title">客户管理</h1>
    <div class="pool-desc">统一管理客户资源，支持客户公海、分配、认领等操作。</div>
    <el-row :gutter="24" style="margin-bottom: 24px;">
      <el-col :span="6">
        <el-card shadow="hover" class="pool-app-card" @click="showPool = true">
          <div class="card-header">
            <span class="card-icon">🌊</span>
            <span class="card-title">客户公海</span>
          </div>
          <div class="card-desc">未分配客户统一管理，支持认领、分配、释放等操作</div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="showPool" title="客户公海" width="900px">
      <el-card class="pool-table-card">
        <el-table :data="filteredList" @selection-change="onSelect" style="width: 100%">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="客户名称" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="owner" label="归属人" />
          <el-table-column label="操作" width="220">
            <template #default="scope">
              <el-button @click="claim(scope.row)" size="small">认领</el-button>
              <el-button @click="assign(scope.row)" size="small" type="success">分配</el-button>
              <el-button @click="release(scope.row)" size="small" type="danger">释放</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <template #footer>
        <el-button @click="showPool = false">关闭</el-button>
      </template>
    </el-dialog>
    <!-- 分配弹窗 -->
    <el-dialog v-model="assignDialogVisible" title="分配给用户" width="300px">
      <el-select v-model="selectedUser" placeholder="选择用户" style="width: 100%;">
        <el-option label="张主管" value="张主管" />
        <el-option label="李经理" value="李经理" />
      </el-select>
      <template #footer>
        <el-button @click="assignDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="doAssign" :disabled="!selectedUser">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.customer-pool-page {
  margin: 32px 24px 0 24px;
}
.pool-title {
  font-size: 28px;
  font-weight: bold;
  color: #1677ff;
  margin-bottom: 8px;
}
.pool-desc {
  color: #888;
  margin-bottom: 18px;
}
.pool-app-card {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s;
}
.pool-app-card:hover {
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
.pool-table-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(22,119,255,0.06);
  padding: 18px 18px 24px 18px;
}
@media (max-width: 900px) {
  .customer-pool-page { margin: 12px 2vw 0 2vw; }
  .pool-title { font-size: 20px; }
}
</style> 