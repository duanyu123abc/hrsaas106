import request from '@/utils/request'

// 获取组织架构的数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 删除组织架构的部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
    // put修改业务
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data // axios的body参数 data
  })
}

// 获取某个部门的详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`

  })
}
