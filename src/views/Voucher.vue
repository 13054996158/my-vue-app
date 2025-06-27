<template>
  <div class="voucher-edit-page">
    <!-- 标题栏 -->
    <div class="header">
      <h2>新增凭证</h2>
    </div>
    <!-- 主表区 -->
    <div class="base-info-area">
      <el-form :model="baseInfo" class="base-info" label-width="80px">
        <el-row :gutter="16">
          <el-col :span="4">
            <el-form-item label="凭证字">
              <el-select v-model="baseInfo.word" placeholder="请选择">
                <el-option label="记" value="记" />
                <el-option label="收" value="收" />
                <el-option label="付" value="付" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="凭证号">
              <el-input v-model="baseInfo.no" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="日期">
              <el-date-picker v-model="baseInfo.date" type="date" @change="onDateChange" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="会计期间">
              <el-input v-model="baseInfo.period" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="附件张数">
              <el-input v-model="baseInfo.attachment" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="制单人">
              <el-input v-model="baseInfo.creator" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审核人">
              <el-input v-model="baseInfo.auditor" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态">
              <el-tag>{{ baseInfo.status }}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证摘要">
              <el-input v-model="baseInfo.summary" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 明细区 -->
    <div class="detail-area">
      <div class="detail-table-wrapper">
        <el-table :data="details" border style="min-width: 1200px;" height="320" :header-cell-style="{background:'#f5f7fa',fontWeight:'bold'}">
          <el-table-column label="行号" type="index" width="60" fixed />
          <el-table-column prop="desc" label="摘要" width="140" />
          <el-table-column label="科目" width="180">
            <template #default="scope">
              <el-input
                v-model="scope.row.subject"
                placeholder="输入科目代码或名称"
                @keyup.enter="onSubjectInput(scope.row)"
                style="width: 120px;"
                clearable
              >
                <template #append>
                  <el-button icon="el-icon-search" @click="openSubjectDialog(scope.$index)" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="debit" label="借方金额" width="120" />
          <el-table-column prop="credit" label="贷方金额" width="120" />
          <el-table-column prop="customer" label="客户" width="120">
            <template #default="scope">
              <el-input
                v-model="scope.row.customer"
                placeholder="输入客户名称"
                @keyup.enter="onAuxInput(scope.row, 'customer')"
                style="width: 90px;"
                clearable
              >
                <template #append>
                  <el-button icon="el-icon-search" @click="openAuxDialog(scope.$index, 'customer')" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="project" label="项目" width="120">
            <template #default="scope">
              <el-input
                v-model="scope.row.project"
                placeholder="输入项目名称"
                @keyup.enter="onAuxInput(scope.row, 'project')"
                style="width: 90px;"
                clearable
              >
                <template #append>
                  <el-button icon="el-icon-search" @click="openAuxDialog(scope.$index, 'project')" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="部门" width="120">
            <template #default="scope">
              <el-input
                v-model="scope.row.department"
                placeholder="输入部门名称"
                @keyup.enter="onAuxInput(scope.row, 'department')"
                style="width: 90px;"
                clearable
              >
                <template #append>
                  <el-button icon="el-icon-search" @click="openAuxDialog(scope.$index, 'department')" />
                </template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="currency" label="币别" width="90">
            <template #default="scope">
              <el-select v-model="scope.row.currency" placeholder="币别" style="width:70px;">
                <el-option label="人民币" value="CNY" />
                <el-option label="美元" value="USD" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="rate" label="汇率" width="80" />
          <el-table-column label="操作" width="140" fixed="right">
            <template #default="scope">
              <el-button @click="copyRow(scope.$index)" size="small">复制</el-button>
              <el-button @click="removeRow(scope.$index)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-actions">
          <el-button @click="addRow" style="margin-right:8px;">+ 添加分录行</el-button>
          <el-button @click="importTemplate">↓导入模板</el-button>
        </div>
        <div v-if="!isBalanced" class="balance-warning">借贷金额不平衡，不能保存！</div>
      </div>
    </div>
    <!-- 备注区 -->
    <div class="remark-area">
      <el-form-item label="备注" class="remark">
        <el-input v-model="remark" type="textarea" rows="2" />
      </el-form-item>
    </div>
    <!-- 操作区 -->
    <div class="toolbar-area">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="submit">提交</el-button>
      <el-button @click="audit">审核</el-button>
      <el-button @click="print">打印</el-button>
      <el-upload :show-file-list="false" :on-success="onUploadSuccess">
        <el-button>附件上传</el-button>
      </el-upload>
    </div>
    <!-- 科目选择弹窗 -->
    <el-dialog v-model="subjectDialog.visible" title="选择科目" width="520px" :center="true">
      <el-input v-model="subjectDialog.keyword" placeholder="搜索科目" style="margin-bottom: 12px;" />
      <el-table :data="filteredSubjects" @row-dblclick="selectSubject">
        <el-table-column prop="code" label="科目代码" width="120" />
        <el-table-column prop="name" label="科目名称" />
      </el-table>
      <template #footer>
        <el-pagination
          v-if="subjectDialog.total > subjectDialog.pageSize"
          :current-page="subjectDialog.page"
          :page-size="subjectDialog.pageSize"
          :total="subjectDialog.total"
          layout="prev, pager, next"
          @current-change="onSubjectPageChange"
        />
        <el-button @click="subjectDialog.visible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 辅助核算选择弹窗 -->
    <el-dialog v-model="auxDialog.visible" :title="auxDialog.title" width="400px" :center="true">
      <el-input v-model="auxDialog.keyword" placeholder="搜索" style="margin-bottom: 12px;" />
      <el-table :data="filteredAuxList" @row-dblclick="selectAux">
        <el-table-column prop="name" :label="auxDialog.title" />
      </el-table>
      <template #footer>
        <el-pagination
          v-if="auxDialog.total > auxDialog.pageSize"
          :current-page="auxDialog.page"
          :page-size="auxDialog.pageSize"
          :total="auxDialog.total"
          layout="prev, pager, next"
          @current-change="onAuxPageChange"
        />
        <el-button @click="auxDialog.visible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// 静态科目数据
const subjectList = ref([
  { code: '1001', name: '库存现金' },
  { code: '1002', name: '银行存款' },
  { code: '1122', name: '应收账款' },
  { code: '6001', name: '主营业务收入' },
  { code: '6601', name: '管理费用' },
  { code: '2202', name: '应付账款' },
  // ...可扩展
])
const baseInfo = ref({
  word: '记',
  no: '',
  date: '',
  period: '',
  attachment: 0,
  creator: '',
  auditor: '',
  status: '草稿',
  summary: ''
})
const details = ref([
  { desc: '', subject: '', debit: '', credit: '', customer: '', project: '', department: '', currency: 'CNY', rate: 1 }
])
const remark = ref('')
// 科目弹窗状态
const subjectDialog = ref({
  visible: false,
  rowIdx: 0,
  keyword: '',
  page: 1,
  pageSize: 5,
  total: 0
})
const filteredSubjects = computed(() => {
  let list = subjectList.value
  if (subjectDialog.value.keyword) {
    const kw = subjectDialog.value.keyword.trim()
    list = list.filter(s => s.code.includes(kw) || s.name.includes(kw))
  }
  subjectDialog.value.total = list.length
  const start = (subjectDialog.value.page - 1) * subjectDialog.value.pageSize
  return list.slice(start, start + subjectDialog.value.pageSize)
})
function onSubjectPageChange(page) {
  subjectDialog.value.page = page
}
function openSubjectDialog(idx) {
  subjectDialog.value.rowIdx = idx
  subjectDialog.value.visible = true
  subjectDialog.value.keyword = ''
  subjectDialog.value.page = 1
}
function selectSubject(row) {
  details.value[subjectDialog.value.rowIdx].subject = row.code + ' ' + row.name
  subjectDialog.value.visible = false
}
function onSubjectInput(row) {
  const val = row.subject.trim()
  if (!val) return
  const found = subjectList.value.find(s => s.code === val || s.name === val)
  if (found) {
    row.subject = found.code + ' ' + found.name
  } else {
    row.subject = ''
    window.$message?.error?.('未找到科目') || alert('未找到科目')
  }
}
// 自动带出当前用户和日期、自动编号、会计期间推导
onMounted(() => {
  baseInfo.value.creator = '张三' // TODO: 替换为实际登录用户
  const today = new Date()
  baseInfo.value.date = today.toISOString().slice(0, 10)
  baseInfo.value.period = today.toISOString().slice(0, 7)
  baseInfo.value.no = genVoucherNo(today)
})
function onDateChange(val) {
  if (val) {
    baseInfo.value.period = val.slice(0, 7)
    baseInfo.value.no = genVoucherNo(new Date(val))
  }
}
function genVoucherNo(date) {
  // 简单模拟：日期+三位序号
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().slice(0,10).replace(/-/g, '') + '-001'
}
function addRow() {
  details.value.push({ desc: '', subject: '', debit: '', credit: '', customer: '', project: '', department: '', currency: 'CNY', rate: 1 })
}
function removeRow(idx) {
  if (details.value.length > 1) details.value.splice(idx, 1)
}
function copyRow(idx) {
  details.value.splice(idx + 1, 0, { ...details.value[idx] })
}
function importTemplate() {
  alert('模板导入功能开发中...')
}
function print() {
  alert('打印功能开发中...')
}
function onUploadSuccess() {
  baseInfo.value.attachment++
}
// 借贷平衡校验
const isBalanced = computed(() => {
  let debit = 0, credit = 0
  details.value.forEach(row => {
    debit += Number(row.debit) || 0
    credit += Number(row.credit) || 0
  })
  return debit === credit && debit > 0
})
function save() {
  if (!isBalanced.value) return alert('借贷金额不平衡，不能保存！')
  alert('保存成功（模拟）')
}
function submit() {
  if (!isBalanced.value) return alert('借贷金额不平衡，不能提交！')
  alert('提交成功（模拟）')
}
function audit() {
  baseInfo.value.status = '已审核'
  baseInfo.value.auditor = '李四' // TODO: 替换为实际审核人
  alert('审核成功（模拟）')
}
// 辅助核算静态数据
const auxData = {
  customer: [
    { name: '客户A' }, { name: '客户B' }, { name: '客户C' }
  ],
  project: [
    { name: '项目X' }, { name: '项目Y' }, { name: '项目Z' }
  ],
  department: [
    { name: '财务部' }, { name: '销售部' }, { name: '研发部' }
  ]
}
const auxDialog = ref({
  visible: false,
  rowIdx: 0,
  type: '',
  title: '',
  keyword: '',
  page: 1,
  pageSize: 5,
  total: 0
})
const filteredAuxList = computed(() => {
  let list = auxData[auxDialog.value.type] || []
  if (auxDialog.value.keyword) {
    const kw = auxDialog.value.keyword.trim()
    list = list.filter(a => a.name.includes(kw))
  }
  auxDialog.value.total = list.length
  const start = (auxDialog.value.page - 1) * auxDialog.value.pageSize
  return list.slice(start, start + auxDialog.value.pageSize)
})
function onAuxPageChange(page) {
  auxDialog.value.page = page
}
function openAuxDialog(idx, type) {
  auxDialog.value.rowIdx = idx
  auxDialog.value.type = type
  auxDialog.value.title = type === 'customer' ? '客户' : type === 'project' ? '项目' : '部门'
  auxDialog.value.visible = true
  auxDialog.value.keyword = ''
  auxDialog.value.page = 1
}
function selectAux(row) {
  details.value[auxDialog.value.rowIdx][auxDialog.value.type] = row.name
  auxDialog.value.visible = false
}
function onAuxInput(row, type) {
  const val = row[type]?.trim()
  if (!val) return
  const found = (auxData[type] || []).find(a => a.name === val)
  if (found) {
    row[type] = found.name
  } else {
    row[type] = ''
    window.$message?.error?.('未找到' + (type === 'customer' ? '客户' : type === 'project' ? '项目' : '部门')) || alert('未找到')
  }
}
</script>

<style scoped>
.voucher-edit-page {
  width: 100%;
  max-width: none;
  margin: 0;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  box-sizing: border-box;
}
.header {
  margin-bottom: 18px;
  text-align: left;
  padding: 24px 24px 0 24px;
}
.base-info-area {
  padding: 0 24px;
  margin-bottom: 8px;
}
.detail-area {
  padding: 0 24px;
  margin-bottom: 8px;
}
.detail-table-wrapper {
  overflow-x: auto;
  padding-bottom: 8px;
}
.table-actions {
  margin-top: 10px;
}
.remark-area {
  padding: 0 24px;
  margin-bottom: 8px;
}
.toolbar-area {
  padding: 0 24px;
  text-align: right;
}
.remark {
  margin-top: 0;
}
.balance-warning {
  color: #ff4d4f;
  font-weight: bold;
  margin-top: 8px;
}
</style> 