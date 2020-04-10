/**
 * 延迟函数
 *
 * @param ms 毫秒数
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
