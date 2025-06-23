<template>
  <div>
    <div class="property-title">属性面板</div>
    <div v-if="!selectedComponent" class="property-placeholder">请选择画布中的组件</div>
    <form v-else class="property-form" @submit.prevent>
      <div class="property-group">
        <label>组件类型：</label>
        <span>{{ selectedComponent.type }}</span>
      </div>
      <template v-if="selectedComponent.type === 'input'">
        <div class="property-group">
          <label>占位符：</label>
          <input v-model="form.placeholder" @input="updateProps" placeholder="请输入占位符" />
        </div>
      </template>
      <template v-else-if="selectedComponent.type === 'button'">
        <div class="property-group">
          <label>按钮文字：</label>
          <input v-model="form.text" @input="updateProps" placeholder="按钮文字" />
        </div>
      </template>
      <template v-else-if="selectedComponent.type === 'select'">
        <div class="property-group">
          <label>数据源类型：</label>
          <select v-model="form.dataSourceType" @change="updateProps">
            <option value="static">静态</option>
            <option value="api">接口</option>
          </select>
        </div>
        <div class="property-group" v-if="form.dataSourceType === 'static'">
          <label>选项（逗号分隔）：</label>
          <input v-model="form.options" @input="updateProps" placeholder="如 选项1,选项2" />
        </div>
        <div class="property-group" v-else>
          <label>API地址：</label>
          <input v-model="form.apiUrl" @input="updateProps" placeholder="如 https://api.xxx.com/options" />
        </div>
      </template>
      <template v-else-if="selectedComponent.type === 'date'">
        <div class="property-group">
          <label>占位符：</label>
          <input v-model="form.placeholder" @input="updateProps" placeholder="请选择日期" />
        </div>
      </template>
      <div class="property-group">
        <button class="property-delete" type="button" @click="deleteComponent(selectedComponent.id)">删除组件</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { inject, computed, reactive, watch } from 'vue'
const state = inject('canvasState')
const updateComponentProps = inject('updateComponentProps')
const deleteComponent = inject('deleteComponent')

const selectedComponent = computed(() =>
  state.selectedId ? state.canvasList.find(c => c.id === state.selectedId) : null
)

const form = reactive({})

watch(selectedComponent, (comp) => {
  if (!comp) return
  if (comp.type === 'input' || comp.type === 'date') {
    form.placeholder = comp.props.placeholder || ''
  } else if (comp.type === 'button') {
    form.text = comp.props.text || '按钮'
  } else if (comp.type === 'select') {
    form.dataSourceType = comp.props.dataSourceType || 'static'
    form.options = (comp.props.options || []).join(',')
    form.apiUrl = comp.props.apiUrl || ''
  }
}, { immediate: true })

function updateProps() {
  if (!selectedComponent.value) return
  if (selectedComponent.value.type === 'input' || selectedComponent.value.type === 'date') {
    updateComponentProps(selectedComponent.value.id, { placeholder: form.placeholder })
  } else if (selectedComponent.value.type === 'button') {
    updateComponentProps(selectedComponent.value.id, { text: form.text })
  } else if (selectedComponent.value.type === 'select') {
    updateComponentProps(selectedComponent.value.id, {
      dataSourceType: form.dataSourceType,
      options: form.dataSourceType === 'static' ? form.options.split(',').map(s => s.trim()) : [],
      apiUrl: form.dataSourceType === 'api' ? form.apiUrl : ''
    })
  }
}
</script>

<style>
.property-title {
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 16px 0;
  color: #1677ff;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
  width: 100%;
  padding: 8px 0 8px 0;
}
.property-placeholder {
  color: #bfbfbf;
  font-size: 15px;
  margin-top: 32px;
}
.property-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 12px;
}
.property-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.property-group label {
  min-width: 70px;
  color: #888;
  font-size: 15px;
}
.property-group input, .property-group select {
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
.property-group input:focus, .property-group select:focus {
  border: 1.5px solid #1677ff;
  background: #fff;
}
.property-delete {
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 10px;
  transition: background 0.2s;
}
.property-delete:hover {
  background: #d9363e;
}
</style> 