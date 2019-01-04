import { debug } from "util"
import isEqual from "../util/isEqual"
import isValidTable from "../util/isValidTable"
import { codeLengthIncludingStandard } from "./codeLength"
import { Database } from "./processDatabaseAsString"
import { SortedCodeTable, updateFrequencies } from "./standardCodeTable"

const findDecreasingEntries = (oldTable: SortedCodeTable, newTable: SortedCodeTable) => {
  const toReconsider: SortedCodeTable = []
  for (const entry of newTable) {
    SEARCH: for (const oldEntry of oldTable) {
      if (entry[0].length > 1 && isEqual(entry[0], oldEntry[0])) {
        if (entry[1][0] < oldEntry[1][0]) {
          toReconsider.push(entry)
        }
        break SEARCH
      }
    }
  }
  toReconsider.sort((a, b) => {
    // if (a.frequency === 0) {
    //   return 1
    // }
    // if (b.frequency === 0) {
    //   return -1
    // }
    return a[1][0] - b[1][0]
  })
  return toReconsider
}

const postAcceptancePruning =
(dataset: Database, oldTable: SortedCodeTable, newTable: SortedCodeTable, standardTable: SortedCodeTable) => {
  const toReconsider = findDecreasingEntries(oldTable, newTable)
  let tableToReturn: SortedCodeTable = newTable
  let previousTable: SortedCodeTable = newTable
  while (toReconsider.length > 0) {
    const ele = toReconsider.shift()
    let tmpTable = tableToReturn.filter((entry) => !isEqual(ele[0], entry[0]))
    tmpTable = updateFrequencies(dataset, tmpTable)
    if (codeLengthIncludingStandard(dataset, tmpTable, standardTable) <
      codeLengthIncludingStandard(dataset, tableToReturn, standardTable) && isValidTable(dataset, tmpTable)) {
        previousTable = tableToReturn
        tableToReturn = tmpTable
        const newlyConsidred = findDecreasingEntries(previousTable, tableToReturn)
        for (const item of newlyConsidred) {
          if (toReconsider.filter((e) => isEqual(e[0], item[0])).length === 0) {
            toReconsider.push(item)
          }
        }
    }
  }
  tableToReturn = tableToReturn.filter((entry) => {
    return entry[1][0] > 0
  })
  return tableToReturn
}

export default postAcceptancePruning
