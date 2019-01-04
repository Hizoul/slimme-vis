import { Database } from "./processDatabaseAsString"
import { SortedCodeTable, subset } from "./standardCodeTable"

const coverCode = (codeTable: SortedCodeTable, setToUse: number[]) => {
  const set = setToUse.slice(0)
  const cover = []
  COVER: for (const code of codeTable) {
    if (subset(code[0], set).length === code[0].length) {
      cover.push(code[0])
      for (const value of code[0]) {
        set.splice(set.indexOf(value), 1)
      }
      if (set.length === 0) {
        break COVER
      }
    }
  }
  return cover
}

export default coverCode
