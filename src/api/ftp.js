import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/ftp',
    method: 'post',
    data
  })
}
