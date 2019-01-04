import isEqual from "../util/isEqual"
import log2 from "../util/log"
import coverCode from "./coverCode"
import { Database } from "./processDatabaseAsString"
import { CodeTable, SortedCodeTable } from "./standardCodeTable"

const itemProbability = (codeTable: SortedCodeTable, set: number[]) => {
  let top = 0
  let fittingEntry: any
  let frequencySum = 0
  codeTable.forEach((entry) => {
    frequencySum += entry[1][0]
    if (isEqual(entry[0], set)) {
      fittingEntry = entry
    }
  })
  if (fittingEntry != null) {
    top = fittingEntry[1][0]
  }
  return top / frequencySum
}

const lengthForSet = (codeTable: SortedCodeTable, set: number[]) => {
  return -log2(itemProbability(codeTable, set))
}

const lengthForSetInStandard = (codeTable: SortedCodeTable, set: number[]) => {
  const cover = coverCode(codeTable, set)
  let coverSum = 0
  for (const code of cover) {
    coverSum += lengthForSet(codeTable, code)
  }
  return coverSum
}

const codeLength = (dataset: Database, codeTable: SortedCodeTable) => {
  let sum = 0
  for (const classKey of Object.keys(dataset)) {
    for (const itemSet of dataset[classKey]) {
      const cover = coverCode(codeTable, itemSet)
      let coverSum = 0
      for (const code of cover) {
        coverSum += lengthForSet(codeTable, code)
      }
      sum += coverSum
    }
  }
  return sum
}
function isNumber(n: number) {
  return typeof n === "number" && !isNaN(n) && isFinite(n)
}
const lengthWithStandard = (dataset: Database, codeTable: SortedCodeTable, standardTable: SortedCodeTable) => {
  let sum = 0
  for (const entry of codeTable) {
    const a = lengthForSet(codeTable, entry[0])
    const b = lengthForSet(standardTable, entry[0])
    if (isNumber(a)) {
      sum += a
    }
    if (isNumber(b)) {
      sum += b
    }
  }
  return sum
}

const codeLengthIncludingStandard = (dataset: Database, codeTable: SortedCodeTable, standardTable: SortedCodeTable) => {
  return lengthWithStandard(dataset, codeTable, standardTable) + codeLength(dataset, codeTable)
}

export default codeLength
export {
  codeLengthIncludingStandard, lengthForSet, lengthForSetInStandard
}
