<template>
  <div class="tree-panel">
    <div class="tree-title">组件树</div>
    <div v-if="state.canvasList.length === 0" class="tree-empty">暂无组件</div>
    <ul class="tree-list">
      <li v-for="item in state.canvasList" :key="item.id" :class="{selected: state.selectedId === item.id}">
        <span class="tree-type">{{ getLabel(item.type) }}</span>
        <span class="tree-id">({{ item.id.slice(-6) }})</span>
        <span class="tree-action" @click.stop="setSelectedId(item.id)">选中</span>
        <span class="tree-action del" @click.stop="deleteComponent(item.id)">删除</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const state = inject('canvasState')
const setSelectedId = inject('setSelectedId')
const deleteComponent = inject('deleteComponent')
function getLabel(type) {
  if (type === 'input') return '输入框'
  if (type === 'button') return '按钮'
  if (type === 'select') return '下拉框'
  if (type === 'date') return '日期选择'
  return type
}
</script>

<style>
.tree-panel {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.04);
  padding: 18px 12px 12px 12px;
  margin-bottom: 18px;
}
.tree-title {
  font-size: 16px;
  font-weight: 600;
  color: #1677ff;
  margin-bottom: 10px;
}
.tree-empty {
  color: #bfbfbf;
  font-size: 14px;
  text-align: center;
  margin: 12px 0;
}
.tree-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tree-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-radius: 4px;
  font-size: 15px;
  transition: background 0.2s;
}
.tree-list li.selected {
  background: #e6f7ff;
  color: #1677ff;
}
.tree-type {
  font-weight: 500;
}
.tree-id {
  color: #bbb;
  font-size: 13px;
}
.tree-action {
  margin-left: 8px;
  color: #1677ff;
  cursor: pointer;
  font-size: 13px;
  border-radius: 3px;
  padding: 1px 6px;
  transition: background 0.2s;
}
.tree-action:hover {
  background: #e6f7ff;
}
.tree-action.del {
  color: #ff4d4f;
}
.tree-action.del:hover {
  background: #fff1f0;
}
</style> 