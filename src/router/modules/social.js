// 导出社保的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/social', // 路由地址
  name: 'social', // 给模块的一级路由加一个name属性
  component: Layout,
  children: [{
    path: '', // 这里什么都不写表示不仅有布局layout 也有员工主页
    component: () => import('@/views/social'),
    // 路由元信息 其实就是一个存储数据的地方 可以放任何内容
    meta: {
      title: '社保', // 这里为什么要用title属性  因为左侧导航读取了这里的title属性
      icon: 'table'
    }
  }]

}
