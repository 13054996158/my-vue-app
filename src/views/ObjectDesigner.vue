<template>
  <div class="obj-designer-root">
    <div class="obj-designer-sidebar">
      <div class="obj-title">业务对象</div>
      <div class="obj-list">
        <div
          v-for="obj in objectList"
          :key="obj.id"
          :class="['obj-item', {active: obj.id === currentObjId}]"
          @click="selectObj(obj.id)"
        >
          <span>{{ obj.name }}</span>
          <span class="obj-actions">
            <span class="obj-link" @click.stop="openEditObj(obj)">编辑</span>
            <span class="obj-link del" @click.stop="delObj(obj)">删除</span>
          </span>
        </div>
      </div>
      <button class="obj-btn" @click="openAddObj">新建对象</button>
    </div>
    <div class="obj-designer-main">
      <div class="obj-main-header">
        <span class="obj-main-title">字段管理</span>
        <button class="obj-btn" @click="openAddField" :disabled="!currentObj">新增字段</button>
        <button class="obj-btn primary" @click="goFormDesigner" :disabled="!currentObj">进入表单设计器</button>
      </div>
      <table class="obj-table" v-if="currentObj">
        <thead>
          <tr>
            <th>字段编码</th><th>字段名称</th><th>类型</th><th>必填</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in currentObj.fields" :key="field.id">
            <td>{{ field.code }}</td>
            <td>{{ field.name }}</td>
            <td>{{ field.type }}</td>
            <td>{{ field.required ? '是' : '否' }}</td>
            <td>
              <button class="obj-link" @click="openEditField(field)">编辑</button>
              <button class="obj-link del" @click="delField(field)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="obj-empty">请选择业务对象</div>
    </div>
    <div class="obj-designer-prop">
      <div class="obj-prop-title">字段属性</div>
      <div v-if="currentField">
        <div class="obj-prop-group">
          <label>字段编码</label>
          <input v-model="fieldForm.code" />
        </div>
        <div class="obj-prop-group">
          <label>字段名称</label>
          <input v-model="fieldForm.name" />
        </div>
        <div class="obj-prop-group">
          <label>类型</label>
          <select v-model="fieldForm.type">
            <option value="string">文本</option>
            <option value="number">数字</option>
            <option value="date">日期</option>
            <option value="select">下拉</option>
            <option value="bool">布尔</option>
          </select>
        </div>
        <div class="obj-prop-group">
          <label>必填</label>
          <input type="checkbox" v-model="fieldForm.required" />
        </div>
        <div class="obj-prop-group">
          <label>默认值</label>
          <input v-model="fieldForm.defaultValue" />
        </div>
        <div class="obj-prop-group">
          <label>描述</label>
          <input v-model="fieldForm.desc" />
        </div>
      </div>
      <div v-else class="obj-empty">请选择字段</div>
    </div>
    <!-- 对象弹窗 -->
    <div v-if="showObjModal" class="obj-modal-mask">
      <div class="obj-modal">
        <div class="obj-modal-title">{{ objModalType==='add'?'新建':'编辑' }}业务对象</div>
        <form class="obj-modal-form" @submit.prevent="onObjSubmit">
          <div class="obj-modal-group">
            <label>对象编码</label>
            <input v-model="objForm.code" required />
          </div>
          <div class="obj-modal-group">
            <label>对象名称</label>
            <input v-model="objForm.name" required />
          </div>
          <div class="obj-modal-group">
            <label>描述</label>
            <input v-model="objForm.desc" />
          </div>
          <div class="obj-modal-actions">
            <button class="obj-btn primary" type="submit">保存</button>
            <button class="obj-btn" type="button" @click="closeObjModal">取消</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 字段弹窗 -->
    <div v-if="showFieldModal" class="obj-modal-mask">
      <div class="obj-modal">
        <div class="obj-modal-title">{{ fieldModalType==='add'?'新增':'编辑' }}字段</div>
        <form class="obj-modal-form" @submit.prevent="onFieldSubmit">
          <div class="obj-modal-group">
            <label>字段编码</label>
            <input v-model="fieldForm.code" required />
          </div>
          <div class="obj-modal-group">
            <label>字段名称</label>
            <input v-model="fieldForm.name" required />
          </div>
          <div class="obj-modal-group">
            <label>类型</label>
            <select v-model="fieldForm.type">
              <option value="string">文本</option>
              <option value="number">数字</option>
              <option value="date">日期</option>
              <option value="select">下拉</option>
              <option value="bool">布尔</option>
            </select>
          </div>
          <div class="obj-modal-group">
            <label>必填</label>
            <input type="checkbox" v-model="fieldForm.required" />
          </div>
          <div class="obj-modal-group">
            <label>默认值</label>
            <input v-model="fieldForm.defaultValue" />
          </div>
          <div class="obj-modal-group">
            <label>描述</label>
            <input v-model="fieldForm.desc" />
          </div>
          <div class="obj-modal-actions">
            <button class="obj-btn primary" type="submit">保存</button>
            <button class="obj-btn" type="button" @click="closeFieldModal">取消</button>
          </div>
        </form>
      </div>
    </div>
    <!-- 操作提示 -->
    <div v-if="toast" class="obj-toast">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// mock对象数据
const objectList = ref([
  { id: 'OBJ001', code: 'customer', name: '客户', desc: '客户对象', fields: [
    { id: 'F1', code: 'name', name: '客户名称', type: 'string', required: true, defaultValue: '', desc: '' },
    { id: 'F2', code: 'phone', name: '联系电话', type: 'string', required: false, defaultValue: '', desc: '' }
  ] },
  { id: 'OBJ002', code: 'order', name: '订单', desc: '订单对象', fields: [
    { id: 'F1', code: 'orderNo', name: '订单号', type: 'string', required: true, defaultValue: '', desc: '' },
    { id: 'F2', code: 'amount', name: '金额', type: 'number', required: true, defaultValue: '', desc: '' }
  ] }
])
const currentObjId = ref('OBJ001')
const currentObj = computed(() => objectList.value.find(o => o.id === currentObjId.value))
const currentFieldId = ref('')
const currentField = computed(() => currentObj.value?.fields.find(f => f.id === currentFieldId.value))

// 对象弹窗
const showObjModal = ref(false)
const objModalType = ref('add')
const objForm = ref({ code: '', name: '', desc: '' })
function openAddObj() {
  objModalType.value = 'add'; objForm.value = { code: '', name: '', desc: '' }; showObjModal.value = true
}
function openEditObj(obj) {
  objModalType.value = 'edit'; objForm.value = { ...obj }; showObjModal.value = true
}
function closeObjModal() { showObjModal.value = false }
function onObjSubmit() {
  if (objModalType.value === 'add') {
    const id = 'OBJ' + (Math.random()*100000|0)
    objectList.value.push({ id, ...objForm.value, fields: [] })
    currentObjId.value = id
    showObjModal.value = false
    showToast('新建成功')
  } else {
    const idx = objectList.value.findIndex(o => o.id === objForm.value.id)
    if (idx !== -1) objectList.value[idx] = { ...objectList.value[idx], ...objForm.value }
    showObjModal.value = false
    showToast('编辑成功')
  }
}
function delObj(obj) {
  if (confirm('确定删除该对象？')) {
    const idx = objectList.value.findIndex(o => o.id === obj.id)
    if (idx !== -1) objectList.value.splice(idx, 1)
    if (currentObjId.value === obj.id) currentObjId.value = objectList.value[0]?.id || ''
    showToast('删除成功')
  }
}
function selectObj(id) { currentObjId.value = id; currentFieldId.value = '' }

// 字段弹窗
const showFieldModal = ref(false)
const fieldModalType = ref('add')
const fieldForm = ref({ code: '', name: '', type: 'string', required: false, defaultValue: '', desc: '' })
function openAddField() {
  fieldModalType.value = 'add'; fieldForm.value = { code: '', name: '', type: 'string', required: false, defaultValue: '', desc: '' }; showFieldModal.value = true
}
function openEditField(field) {
  fieldModalType.value = 'edit'; fieldForm.value = { ...field }; showFieldModal.value = true; currentFieldId.value = field.id
}
function closeFieldModal() { showFieldModal.value = false }
function onFieldSubmit() {
  if (!currentObj.value) return
  if (fieldModalType.value === 'add') {
    const id = 'F' + (Math.random()*100000|0)
    currentObj.value.fields.push({ id, ...fieldForm.value })
    currentFieldId.value = id
    showFieldModal.value = false
    showToast('新建字段成功')
  } else {
    const idx = currentObj.value.fields.findIndex(f => f.id === fieldForm.value.id)
    if (idx !== -1) currentObj.value.fields[idx] = { ...fieldForm.value }
    showFieldModal.value = false
    showToast('编辑字段成功')
  }
}
function delField(field) {
  if (!currentObj.value) return
  if (confirm('确定删除该字段？')) {
    const idx = currentObj.value.fields.findIndex(f => f.id === field.id)
    if (idx !== -1) currentObj.value.fields.splice(idx, 1)
    if (currentFieldId.value === field.id) currentFieldId.value = ''
    showToast('删除成功')
  }
}
// 属性面板同步
watchEffect(() => {
  if (currentField.value) Object.assign(fieldForm.value, currentField.value)
})
// 进入表单设计器（预留）
function goFormDesigner() {
  alert('表单设计器开发中...')
}
// 操作提示
const toast = ref('')
function showToast(msg) { toast.value = msg; setTimeout(() => { toast.value = '' }, 1200) }
</script>

<style>
.obj-designer-root {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}
.obj-designer-sidebar {
  width: 220px;
  background: #fff;
  box-shadow: 2px 0 8px #f0f1f2;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.obj-title {
  font-size: 18px;
  font-weight: bold;
  color: #1677ff;
  margin-left: 24px;
  margin-bottom: 18px;
}
.obj-list {
  flex: 1;
  width: 100%;
  margin-bottom: 18px;
}
.obj-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  cursor: pointer;
  font-size: 15px;
  color: #333;
  border-left: 3px solid transparent;
  transition: background 0.2s, border 0.2s;
}
.obj-item.active {
  background: #f0f7ff;
  color: #1677ff;
  border-left: 3px solid #1677ff;
}
.obj-actions {
  display: flex;
  gap: 8px;
}
.obj-link {
  color: #1677ff;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-left: 4px;
  padding: 0 4px;
  border-radius: 3px;
  transition: background 0.2s;
}
.obj-link:hover {
  background: #e6f7ff;
}
.obj-link.del {
  color: #ff4d4f;
}
.obj-link.del:hover {
  background: #fff1f0;
}
.obj-btn {
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
  margin: 18px 0 0 24px;
}
.obj-btn.primary {
  background: linear-gradient(90deg, #40a9ff 0%, #1677ff 100%);
  margin-left: 12px;
}
.obj-designer-main {
  flex: 1;
  background: #fff;
  margin: 32px 24px 32px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.06);
  padding: 32px 32px 24px 32px;
  display: flex;
  flex-direction: column;
}
.obj-main-header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.obj-main-title {
  font-size: 18px;
  font-weight: 600;
  color: #1677ff;
  margin-right: 24px;
}
.obj-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 15px;
}
.obj-table th, .obj-table td {
  border: 1px solid #e5e6eb;
  padding: 10px 16px;
  text-align: left;
}
.obj-table th {
  background: #f0f7ff;
  color: #1677ff;
  font-weight: 600;
}
.obj-empty {
  color: #bfbfbf;
  font-size: 15px;
  text-align: center;
  margin-top: 60px;
}
.obj-designer-prop {
  width: 320px;
  background: #fff;
  box-shadow: -2px 0 8px #f0f1f2;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0 12px 12px 0;
}
.obj-prop-title {
  font-size: 17px;
  font-weight: 600;
  color: #1677ff;
  margin-bottom: 18px;
}
.obj-prop-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  width: 100%;
}
.obj-prop-group label {
  min-width: 70px;
  color: #888;
  font-size: 15px;
}
.obj-prop-group input, .obj-prop-group select {
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
.obj-prop-group input:focus, .obj-prop-group select:focus {
  border: 1.5px solid #1677ff;
  background: #fff;
}
/* 弹窗 */
.obj-modal-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.obj-modal {
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
.obj-modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #1677ff;
  margin-bottom: 18px;
}
.obj-modal-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.obj-modal-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.obj-modal-group label {
  min-width: 90px;
  color: #888;
  font-size: 15px;
}
.obj-modal-group input, .obj-modal-group select {
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
.obj-modal-group input:focus, .obj-modal-group select:focus {
  border: 1.5px solid #1677ff;
  background: #fff;
}
.obj-modal-actions {
  display: flex;
  gap: 18px;
  margin-top: 18px;
  justify-content: flex-end;
}
/* 操作提示 */
.obj-toast {
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