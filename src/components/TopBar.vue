<template>
  <div class="topbar">
    <button class="topbar-btn" @click="onNew">新建页面</button>
    <button class="topbar-btn" @click="onSave">保存</button>
    <button class="topbar-btn" @click="onExport">导出JSON</button>
    <button class="topbar-btn" @click="onPreview">预览</button>
    <input ref="downloadRef" type="hidden" />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
const state = inject('canvasState')
const downloadRef = ref(null)

function onNew() {
  if (confirm('确定要新建页面吗？当前内容将被清空。')) {
    state.canvasList.splice(0)
    state.selectedId = null
  }
}
function onSave() {
  alert('保存成功！（本地演示，未接入后端）')
}
function onExport() {
  const data = JSON.stringify(state.canvasList, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'page.json'
  a.click()
  URL.revokeObjectURL(url)
}
function onPreview() {
  alert('预览功能可根据需求自定义实现')
}
</script>

<style>
.topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.04);
  position: sticky;
  top: 0;
  z-index: 20;
}
.topbar-btn {
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
}
.topbar-btn:hover {
  background: linear-gradient(90deg, #40a9ff 0%, #1677ff 100%);
}
</style> 