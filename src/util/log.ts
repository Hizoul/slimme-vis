
const getBaseLog = (x: number, y: number) => {
  return Math.log(y) / Math.log(x)
}

const log2 = (y: number) => getBaseLog(2, y)

export default log2
export {
  getBaseLog
}
