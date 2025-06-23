<template>
  <div
    class="canvas"
    @drop="onDrop"
    @dragover="onDragOver"
    :class="{ 'canvas-dragover': isDragOver }"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <CanvasGroup
      :list="state.canvasList"
      :parent-id="null"
    />
    <div v-if="state.canvasList.length === 0" class="canvas-placeholder">
      <img class="canvas-empty-img" src="https://cdn.jsdelivr.net/gh/znimg/oss/empty-lowcode.svg" alt="empty" />
      <div class="canvas-empty-text">拖拽左侧组件到此处生成页面</div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, defineAsyncComponent } from 'vue'
const state = inject('canvasState')
const setSelectedId = inject('setSelectedId')
const deleteComponent = inject('deleteComponent')
const isDragOver = ref(false)

const CanvasGroup = defineAsyncComponent(() => import('./CanvasGroup.vue'))

function onDrop(event) {
  event.preventDefault()
  isDragOver.value = false
  const data = event.dataTransfer.getData('component')
  if (data) {
    const item = JSON.parse(data)
    const id = 'comp_' + Date.now() + '_' + Math.floor(Math.random()*10000)
    if (item.type === 'group') {
      state.canvasList.push({ id, type: 'group', props: { title: '分组容器' }, children: [] })
      setSelectedId(id)
    } else {
      state.canvasList.push({ id, type: item.type, props: {} })
      setSelectedId(id)
    }
  }
}
function onDragOver(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
}
function onDragEnter() {
  isDragOver.value = true
}
function onDragLeave() {
  isDragOver.value = false
}
</script>

<style>
.canvas {
  min-width: 400px;
  max-width: 700px;
  min-height: 500px;
  background: #fff;
  border: 2px dashed #91d5ff;
  margin: 0 20px;
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, border 0.2s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.canvas-dragover {
  border: 2.5px solid #1677ff;
  box-shadow: 0 0 0 4px #e6f7ff;
}
.canvas-item {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  background: #fff;
  border-radius: 8px;
  transition: box-shadow 0.2s, background 0.2s;
}
.canvas-placeholder {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}
.canvas-empty-img {
  width: 120px;
  margin-bottom: 18px;
  opacity: 0.7;
}
.canvas-empty-text {
  color: #bfbfbf;
  text-align: center;
  font-size: 18px;
  letter-spacing: 2px;
}
.canvas-component[type="input"] {
  width: 240px;
  height: 38px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 16px;
  outline: none;
  transition: border 0.2s;
  margin-right: 12px;
}
.canvas-component[type="input"]:focus {
  border: 1.5px solid #40a9ff;
}
.canvas-component[type="button"] {
  background: linear-gradient(90deg, #40a9ff 0%, #1890ff 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0 24px;
  height: 38px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(24,144,255,0.08);
  transition: background 0.2s;
}
.canvas-component[type="button"]:hover {
  background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%);
}
.canvas-component[type="select"] {
  width: 240px;
  height: 38px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 16px;
  margin-right: 12px;
  background: #fff;
}
.canvas-component[type="date"] {
  width: 240px;
  height: 38px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 16px;
  margin-right: 12px;
  background: #fff;
}
.canvas-item.selected {
  box-shadow: 0 0 0 2px #1677ff;
  background: #f0f7ff;
}
.canvas-drag-handle {
  cursor: grab;
  color: #bbb;
  font-size: 18px;
  margin-right: 10px;
  user-select: none;
  transition: color 0.2s;
}
.canvas-item.selected .canvas-drag-handle {
  color: #1677ff;
}
.canvas-delete {
  position: absolute;
  right: 8px;
  top: 8px;
  color: #ff4d4f;
  font-size: 16px;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  box-shadow: 0 2px 8px 0 rgba(255,77,79,0.08);
  display: none;
}
.canvas-item.selected .canvas-delete {
  display: inline-block;
}
.canvas-item-ghost {
  opacity: 0.5;
  background: #e6f7ff;
}
.canvas-item-chosen {
  box-shadow: 0 0 0 2px #1677ff;
}
</style> 