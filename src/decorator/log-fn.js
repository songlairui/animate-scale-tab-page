/* eslint-disable no-console */
export const LogFn = (type) => {
  return (target, name, descriptor) => {
    if (type === 'prod') {
      return
    }
    let t = (str) => str || ''
    if (type === 'stamp') {
      t = (str) => `${str || ''} ${+new Date()}`
    }
    const method = descriptor.value
    descriptor.value = (...args) => {
      console.groupCollapsed(`[fn] ${name}:`, t())
      console.info('(', args, ') =>')
      let result
      try {
        result = method.apply(target, args)
        console.info(`成功:`, result, t())
      } catch (error) {
        console.error(`失败`, error, t())
      }
      console.groupEnd()
      return result
    }
  }
}
