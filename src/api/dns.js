import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/dns',
    method: 'post',
    data
  })
}
