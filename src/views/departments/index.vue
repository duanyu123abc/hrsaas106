<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构的内容- 头部-->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 放置一个el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 有多少节点就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 data 每个节点的数据对象-->
          <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <add-dept :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: { }, // 就是头部的数据结构
      departs: [],
      defaultProps: {
        label: 'name' // 表示从这个属性显示内容
        // children: 'children' // 从这个属性找子节点
      },
      showDialog: false, // 默认不显示弹出层
      node: null // 记录当前点击的node节点
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
    },
    // 监听tree-tools中触发的点击添加子部门的事件
    // node 是我们点击的部门
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
