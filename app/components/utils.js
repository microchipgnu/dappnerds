export const fetcher = (library) => (...args) => {
  const [method, ...params] = args
  console.log(method, params)
  return library[method](...params)
}

