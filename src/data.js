export function compactObj(obj, fn) {
  for (var i in obj) {
    if (typeof obj[i] === 'object') {
      compactObj(obj[i], fn)
    }
    if (fn(obj[i])) {
      delete obj[i]
    }
  }
}

// 删除空对象 删除'', null, undefined
export function isEmpty(foo) {
  if (typeof foo === 'object') {
    for (var i in foo) {
      return false
    }
    return true
  } else {
    return foo === '' || foo === null || foo === undefined
  }
}

export function getBarColor(link) {
  // 获取最后一个.的位置
  var photo = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
  var css = ['css']
  // var html = ['html']
  var js = ['js']

  var index = link.lastIndexOf('.')
  // 获取后缀
  var ext = link.substr(index + 1)
  if (photo.includes(ext)) {
    return 'rgba(103,194,58,0.8)' // green
  } else if (css.includes(ext)) { // red
    return 'rgba(245,108,108,0.8)'// brown
  } else if (js.includes(ext)) {
    return 'rgba(230,162,60,0.8)'
  }
  return 'rgba(64,158,255,0.8)'
}
