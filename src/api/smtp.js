import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/smtp',
    method: 'post',
    data
  })
}
