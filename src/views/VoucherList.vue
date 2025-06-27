<template>
  <div class="voucher-list-page">
    <div class="list-header">
      <el-button type="primary" @click="goAdd" class="add-btn">新增凭证</el-button>
    </div>
    <el-form :inline="true" :model="search" class="search-bar">
      <el-form-item label="凭证字">
        <el-select v-model="search.word" clearable style="width: 90px;">
          <el-option label="记" value="记" />
          <el-option label="收" value="收" />
          <el-option label="付" value="付" />
        </el-select>
      </el-form-item>
      <el-form-item label="凭证号">
        <el-input v-model="search.no" clearable style="width: 120px;" />
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker v-model="search.date" type="date" clearable style="width: 140px;" />
      </el-form-item>
      <el-form-item>
        <el-button @click="doSearch">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table-wrapper">
      <el-table :data="pagedList" border style="width: 100%;">
        <el-table-column prop="word" label="凭证字" width="70" />
        <el-table-column prop="no" label="凭证号" width="120" />
        <el-table-column prop="date" label="日期" width="110" />
        <el-table-column prop="period" label="会计期间" width="100" />
        <el-table-column prop="creator" label="制单人" width="90" />
        <el-table-column prop="status" label="状态" width="80" />
        <el-table-column prop="summary" label="摘要" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button size="small" @click="goEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin-top: 16px; text-align: right;"
      :current-page="page"
      :page-size="pageSize"
      :total="filteredList.length"
      layout="prev, pager, next"
      @current-change="onPageChange"
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const search = ref({ word: '', no: '', date: '' })
const list = ref([
  { id: 1, word: '记', no: '20240627-001', date: '2024-06-27', period: '2024-06', creator: '张三', status: '草稿', summary: '销售收入' },
  { id: 2, word: '收', no: '20240627-002', date: '2024-06-27', period: '2024-06', creator: '李四', status: '已审核', summary: '采购入库' }
])
const page = ref(1)
const pageSize = 10
const filteredList = computed(() => {
  return list.value.filter(item => {
    return (!search.value.word || item.word === search.value.word) &&
      (!search.value.no || item.no.includes(search.value.no)) &&
      (!search.value.date || item.date === search.value.date)
  })
})
const pagedList = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredList.value.slice(start, start + pageSize)
})
function onPageChange(val) { page.value = val }
function doSearch() { page.value = 1 }
function resetSearch() { search.value = { word: '', no: '', date: '' }; page.value = 1 }
function goAdd() { router.push('/main/voucher/edit') }
function goEdit(row) { router.push(`/main/voucher/edit?id=${row.id}`) }
function del(row) {
  list.value = list.value.filter(item => item.id !== row.id)
}
</script>
<style scoped>
.voucher-list-page {
  width: 100%;
  margin: 0;
  background: #fff;
  border-radius: 0;
  box-shadow: none;
  padding: 0 0 18px 0;
  box-sizing: border-box;
}
.list-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 18px;
  padding: 24px 24px 0 24px;
}
.add-btn {
  margin-right: 0;
}
.search-bar {
  margin-bottom: 10px;
  padding: 0 24px;
}
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  padding: 0 24px;
}
</style> 