<template>
  <div class="publish-menu-root">
    <div class="publish-menu-header">
      <div class="publish-menu-title">发布菜单</div>
      <div class="publish-menu-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['publish-menu-tab', {active: currentTab === tab.key}]"
          @click="switchTab(tab.key)"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>
    <div class="publish-menu-content">
      <div class="publish-menu-actions">
        <button class="pm-btn" @click="openAdd">新增{{ currentTabLabel }}</button>
      </div>
      <table class="publish-menu-table">
        <thead>
          <tr>
            <th v-for="col in currentCols" :key="col.key">{{ col.label }}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in currentList" :key="row.id">
            <td v-for="col in currentCols" :key="col.key">{{ row[col.key] }}</td>
            <td>
              <button class="pm-link" @click="openEdit(row)">编辑</button>
              <button class="pm-link del" @click="delRow(row)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 弹窗表单 -->
    <div v-if="showModal" class="pm-modal-mask">
      <div class="pm-modal">
        <div class="pm-modal-title">{{ modalType === 'add' ? '新增' : '编辑' }}{{ currentTabLabel }}</div>
        <form class="pm-modal-form" @submit.prevent="onSubmit">
          <div class="pm-modal-group" v-for="col in currentCols" :key="col.key">
            <label>{{ col.label }}</label>
            <input v-model="modalForm[col.key]" :placeholder="'请输入' + col.label" required />
          </div>
          <div class="pm-modal-actions">
            <button class="pm-btn primary" type="submit">保存</button>
            <button class="pm-btn" type="button" @click="closeModal">取消</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 删除确认 -->
    <div v-if="showDelConfirm" class="pm-modal-mask">
      <div class="pm-modal pm-modal-confirm">
        <div class="pm-modal-title">确认删除</div>
        <div class="pm-modal-content">确定要删除该{{ currentTabLabel }}吗？</div>
        <div class="pm-modal-actions">
          <button class="pm-btn del" @click="confirmDel">删除</button>
          <button class="pm-btn" @click="showDelConfirm=false">取消</button>
        </div>
      </div>
    </div>
    <!-- 操作提示 -->
    <div v-if="toast" class="pm-toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const tabs = [
  { key: 'objecttype', label: '业务对象', cols: [
    { key: 'id', label: '业务对象ID' },
    { key: 'name', label: '业务对象名称' }
  ] },
  { key: 'consoledetail', label: '功能菜单', cols: [
    { key: 'id', label: '功能菜单ID' },
    { key: 'name', label: '功能菜单名称' }
  ] },
  { key: 'subfunc', label: '二级菜单', cols: [
    { key: 'id', label: '二级菜单ID' },
    { key: 'name', label: '二级菜单名称' }
  ] },
  { key: 'subsystem', label: '子系统', cols: [
    { key: 'id', label: '子系统ID' },
    { key: 'name', label: '子系统名称' }
  ] }
]
const currentTab = ref('objecttype')
const currentTabLabel = computed(() => tabs.find(t => t.key === currentTab.value)?.label || '')
const currentCols = computed(() => tabs.find(t => t.key === currentTab.value)?.cols || [])

// mock数据
const dataMap = {
  objecttype: ref([
    { id: 'OBJ001', name: '客户' },
    { id: 'OBJ002', name: '订单' }
  ]),
  consoledetail: ref([
    { id: 'MENU001', name: '客户管理' },
    { id: 'MENU002', name: '订单管理' }
  ]),
  subfunc: ref([
    { id: 'SUB001', name: '客户查询' },
    { id: 'SUB002', name: '订单审核' }
  ]),
  subsystem: ref([
    { id: 'SYS001', name: 'CRM系统' },
    { id: 'SYS002', name: 'ERP系统' }
  ])
}
const currentList = computed(() => dataMap[currentTab.value].value)

// 弹窗表单
const showModal = ref(false)
const modalType = ref('add') // add/edit
const modalForm = ref({})
function openAdd() {
  modalType.value = 'add'
  modalForm.value = { id: '', name: '' }
  showModal.value = true
}
function openEdit(row) {
  modalType.value = 'edit'
  modalForm.value = { ...row }
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
function onSubmit() {
  const list = dataMap[currentTab.value].value
  if (modalType.value === 'add') {
    // 模拟异步
    setTimeout(() => {
      list.push({ ...modalForm.value })
      showModal.value = false
      showToast('新增成功')
    }, 400)
  } else {
    setTimeout(() => {
      const idx = list.findIndex(i => i.id === modalForm.value.id)
      if (idx !== -1) list[idx] = { ...modalForm.value }
      showModal.value = false
      showToast('编辑成功')
    }, 400)
  }
}
// 删除
const showDelConfirm = ref(false)
let delRowCache = null
function delRow(row) {
  delRowCache = row
  showDelConfirm.value = true
}
function confirmDel() {
  const list = dataMap[currentTab.value].value
  setTimeout(() => {
    const idx = list.findIndex(i => i.id === delRowCache.id)
    if (idx !== -1) list.splice(idx, 1)
    showDelConfirm.value = false
    showToast('删除成功')
  }, 400)
}
// Tab切换时关闭弹窗
function switchTab(tabKey) {
  currentTab.value = tabKey
  showModal.value = false
  showDelConfirm.value = false
}
// 操作提示
const toast = ref('')
function showToast(msg) {
  toast.value = msg
  setTimeout(() => { toast.value = '' }, 1200)
}
</script>

<style>
.publish-menu-root {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 0 0 40px 0;
}
.publish-menu-header {
  background: #fff;
  padding: 32px 40px 0 40px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.publish-menu-title {
  font-size: 24px;
  font-weight: bold;
  color: #1677ff;
  margin-bottom: 18px;
  letter-spacing: 2px;
}
.publish-menu-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 0;
}
.publish-menu-tab {
  font-size: 16px;
  color: #888;
  padding: 8px 18px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.2s, background 0.2s;
}
.publish-menu-tab.active {
  color: #1677ff;
  background: #f0f7ff;
  font-weight: 600;
}
.publish-menu-content {
  background: #fff;
  margin: 0 auto;
  margin-top: 0;
  max-width: 900px;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.06);
  padding: 32px 40px 24px 40px;
}
.publish-menu-actions {
  margin-bottom: 18px;
}
.pm-btn {
  background: linear-gradient(90deg, #1677ff 0%, #40a9ff 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 22px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.08);
  margin-right: 10px;
}
.pm-btn.primary {
  background: linear-gradient(90deg, #40a9ff 0%, #1677ff 100%);
}
.pm-btn.del {
  background: #ff4d4f;
}
.pm-btn.del:hover {
  background: #d9363e;
}
.pm-link {
  background: none;
  border: none;
  color: #1677ff;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  padding: 0 4px;
  border-radius: 3px;
  transition: background 0.2s;
}
.pm-link:hover {
  background: #e6f7ff;
}
.pm-link.del {
  color: #ff4d4f;
}
.pm-link.del:hover {
  background: #fff1f0;
}
.publish-menu-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 15px;
}
.publish-menu-table th, .publish-menu-table td {
  border: 1px solid #e5e6eb;
  padding: 10px 16px;
  text-align: left;
}
.publish-menu-table th {
  background: #f0f7ff;
  color: #1677ff;
  font-weight: 600;
}
/* 弹窗 */
.pm-modal-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pm-modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(22,119,255,0.10);
  padding: 32px 32px 18px 32px;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pm-modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #1677ff;
  margin-bottom: 18px;
}
.pm-modal-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.pm-modal-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.pm-modal-group label {
  min-width: 90px;
  color: #888;
  font-size: 15px;
}
.pm-modal-group input {
  flex: 1;
  height: 32px;
  border: 1px solid #e5e6eb;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 15px;
  outline: none;
  background: #f7f8fa;
  transition: border 0.2s;
}
.pm-modal-group input:focus {
  border: 1.5px solid #1677ff;
  background: #fff;
}
.pm-modal-actions {
  display: flex;
  gap: 18px;
  margin-top: 18px;
  justify-content: flex-end;
}
/* 删除确认弹窗 */
.pm-modal-confirm {
  min-width: 260px;
  padding: 24px 24px 12px 24px;
}
.pm-modal-content {
  font-size: 15px;
  color: #222;
  margin-bottom: 18px;
}
/* 操作提示 */
.pm-toast {
  position: fixed;
  left: 50%;
  bottom: 60px;
  transform: translateX(-50%);
  background: #1677ff;
  color: #fff;
  padding: 10px 32px;
  border-radius: 8px;
  font-size: 15px;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.10);
  z-index: 2000;
}
</style> 