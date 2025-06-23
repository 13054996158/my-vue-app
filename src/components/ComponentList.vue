<template>
  <div class="component-list">
    <div class="list-group">
      <div class="list-title"><span class="group-icon">🧩</span> 基础组件</div>
      <div
        v-for="item in baseComponents"
        :key="item.type"
        class="component-item"
        draggable
        @dragstart="onDragStart(item, $event)"
      >
        <span class="item-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="list-group">
      <div class="list-title"><span class="group-icon">⚡</span> 高级组件</div>
      <div
        v-for="item in advancedComponents"
        :key="item.type"
        class="component-item advanced"
        draggable
        @dragstart="onDragStart(item, $event)"
      >
        <span class="item-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="list-group">
      <div class="list-title"><span class="group-icon">📦</span> 布局容器</div>
      <div
        class="component-item"
        draggable
        @dragstart="onDragStart(groupComponent, $event)"
      >
        <span class="item-icon">📦</span>
        <span>分组容器</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const baseComponents = ref([
  { type: 'input', label: '输入框', icon: '📝' },
  { type: 'button', label: '按钮', icon: '🔘' },
])
const advancedComponents = ref([
  { type: 'select', label: '下拉框', icon: '⬇️' },
  { type: 'date', label: '日期选择', icon: '📅' },
])
const groupComponent = { type: 'group', label: '分组容器', icon: '📦' }
function onDragStart(item, event) {
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData('component', JSON.stringify(item))
}
</script>

<style>
.component-list {
  padding: 0 16px;
}
.list-group {
  margin-bottom: 32px;
}
.list-title {
  color: #8fa4c8;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 18px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.group-icon {
  font-size: 18px;
}
.component-item {
  background: #23272e;
  color: #fff;
  margin-bottom: 16px;
  padding: 12px 0 12px 8px;
  border-radius: 6px;
  cursor: grab;
  text-align: left;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  border: 1px solid transparent;
  box-shadow: none;
}
.component-item:hover {
  background: #1677ff;
  color: #fff;
  border: 1px solid #1677ff;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.12);
  z-index: 2;
}
.component-item.advanced {
  background: #23272e;
  color: #ffd666;
}
.component-item.advanced:hover {
  background: #faad14;
  color: #23272e;
  border: 1px solid #faad14;
}
.item-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}
</style> 