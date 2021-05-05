import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/rtmp',
    method: 'post',
    data
  })
}
