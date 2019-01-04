import { Database } from "../slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable, subset } from "../slim/standardCodeTable"

const isValidTable = (dataset: Database, codeTable: SortedCodeTable) => {
  for (const c of Object.keys(dataset)) {
    for (const transaction of dataset[c]) {
      const set = transaction.slice(0)
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
      if (set.length !== 0) {
        return false
      }
    }
  }
  return true
}

export default isValidTable
