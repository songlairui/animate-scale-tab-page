/* eslint-disable no-console */
/**
 * this 自动指向 vm
 */
export const LogFn = function(type) {
  return function(target, name, descriptor) {
    if (type === 'prod') {
      return
    }
    let t = (str) => str || ''
    if (type === 'stamp') {
      t = (str) => `${str || ''} ${+new Date()}`
    }
    const method = descriptor.value
    descriptor.value = function(...args) {
      console.groupCollapsed(`[fn] ${name}:`, t())
      console.info('(', args, ') =>')
      let result
      try {
        result = method.apply(this, args)
        console.info(`成功:`, result, t())
      } catch (error) {
        console.error(`失败`, error, t())
      }
      console.groupEnd()
      return result
    }
  }
}
