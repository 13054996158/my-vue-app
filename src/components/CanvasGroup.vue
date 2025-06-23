<template>
  <Draggable
    v-model:modelValue="innerList"
    item-key="id"
    handle=".canvas-drag-handle"
    :animation="180"
    ghost-class="canvas-item-ghost"
    chosen-class="canvas-item-chosen"
    group="canvas"
  >
    <template #item="{ element: item }">
      <div
        v-if="item.type === 'group'"
        class="canvas-item group-item"
        :class="{ selected: state.selectedId === item.id }"
        @click.stop="selectComponent(item.id)"
      >
        <span class="canvas-drag-handle" title="拖拽排序">☰</span>
        <div class="group-title">{{ item.props.title || '分组容器' }}</div>
        <div class="group-children">
          <CanvasGroup v-model:modelValue="item.children" :parent-id="item.id" />
        </div>
        <span class="canvas-delete" @click.stop="deleteComponent(item.id)">✖</span>
      </div>
      <div
        v-else
        class="canvas-item"
        :class="{ selected: state.selectedId === item.id }"
        @click.stop="selectComponent(item.id)"
      >
        <span class="canvas-drag-handle" title="拖拽排序">☰</span>
        <component
          v-if="item.type !== 'select'"
          :is="getComponentType(item.type)"
          v-bind="item.props"
          class="canvas-component"
        />
        <select
          v-else
          class="canvas-component"
          :placeholder="item.props.placeholder || '请选择'"
        >
          <option v-if="item.props.dataSourceType === 'api' && item.apiOptionsLoading">加载中...</option>
          <option v-for="opt in getSelectOptions(item)" :key="opt" :value="opt">{{ opt }}</option>
        </select>
        <span class="canvas-delete" @click.stop="deleteComponent(item.id)">✖</span>
      </div>
    </template>
  </Draggable>
</template>

<script setup>
import { inject, computed, watch } from 'vue'
import Draggable from 'vuedraggable'
const props = defineProps({
  modelValue: Array,
  parentId: [String, null]
})
const emit = defineEmits(['update:modelValue'])
const innerList = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
const state = inject('canvasState')
const setSelectedId = inject('setSelectedId')
const deleteComponent = inject('deleteComponent')
function selectComponent(id) {
  setSelectedId(id)
}
function getComponentType(type) {
  if (type === 'input') return 'input'
  if (type === 'button') return 'button'
  if (type === 'select') return 'select'
  if (type === 'date') return 'input'
  return 'div'
}
// select数据源支持
function getSelectOptions(item) {
  if (item.props.dataSourceType === 'api' && item.props.apiUrl) {
    if (!item.apiOptions && !item.apiOptionsLoading) {
      item.apiOptionsLoading = true
      fetch(item.props.apiUrl)
        .then(r => r.json())
        .then(data => {
          item.apiOptions = Array.isArray(data) ? data : (data.options || [])
        })
        .catch(() => { item.apiOptions = ['接口异常'] })
        .finally(() => { item.apiOptionsLoading = false })
    }
    return item.apiOptions || []
  }
  return item.props.options || []
}
</script>

<style>
.group-item {
  border: 1.5px dashed #91d5ff;
  background: #f8fbff;
  padding: 18px 12px 12px 12px;
  margin-bottom: 24px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.04);
}
.group-title {
  font-size: 15px;
  font-weight: 600;
  color: #1677ff;
  margin-bottom: 10px;
}
.group-children {
  min-height: 36px;
  margin-top: 8px;
}
</style> 