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
