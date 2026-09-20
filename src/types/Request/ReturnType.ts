export type ReturnType<T> = {
  data: T
  error: null | string
  success: boolean
}
