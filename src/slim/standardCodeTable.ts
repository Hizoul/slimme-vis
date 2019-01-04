import isEqual from "../util/isEqual"
import { Database } from "./processDatabaseAsString"

export interface ICodeTable {
  left: any
  right: any
}

export interface CodeTable {[index: string]: number}
export type ICodeTableEntry = number[][]
export type SortedCodeTable = ICodeTableEntry[]

const standardCodeTable = (dataset: Database) => {
  const itemSets: CodeTable = {}
  for (const key of Object.keys(dataset)) {
    for (const itemSet of dataset[key]) {
      for (const value of itemSet) {
        const itemKey = String(value)
        if (itemSets[itemKey] == null) {
          itemSets[itemKey] = 0
        }
        itemSets[itemKey]++
      }
    }
  }
  return itemSets
}

const updateFrequencies = (dataset: Database, codeTable: SortedCodeTable) => {
  const clonedDb: Database = JSON.parse(JSON.stringify(dataset))
  for (const entry of codeTable) {
    entry[1][0] = 0
    for (const classKey of Object.keys(clonedDb)) {
      for (const transactionIndex in clonedDb[classKey]) {
        const transaction = clonedDb[classKey][transactionIndex]
        if (subset(entry[0], transaction).length === entry[0].length) {
          entry[1][0]++
          clonedDb[classKey][transactionIndex] = transaction.filter((value) => entry[0].indexOf(value) === -1)
        }
      }
    }
  }
  return standardCoverOrder(codeTable)
}

const supportOfItem = (itemSet: number[], dataset: Database) => {
  let support = 0
  for (const key of Object.keys(dataset)) {
    for (const set of dataset[key]) {
      if (subset(itemSet, set).length === itemSet.length) {
        support++
      }
    }
  }
  return support
}

const sortedStandardCodeTable = (dataset: Database) => {
  const itemSets: CodeTable = standardCodeTable(dataset)
  const sortedCodeTable: SortedCodeTable = []
  for (const key of Object.keys(itemSets)) {
    sortedCodeTable.push([[Number(key)], [itemSets[key]], [supportOfItem([itemSets[key]], dataset)]])
  }
  return standardCoverOrder(sortedCodeTable)
}

// first descending on cardinality (amount of values), second descending on support (here called frequency), and third lexicographically
const standardCoverOrder = (codeTable: SortedCodeTable) => {
  codeTable.sort((itemA, itemB) => {
    if (itemA[0].length < itemB[0].length) {
      return 1
    }
    if (itemA[0].length > itemB[0].length) {
      return -1
    }
    if (itemA[2][0] < itemB[2][0]) {
      return 1
    }
    if (itemA[2][0] > itemB[2][0]) {
      return -1
    }
    return -1 * JSON.stringify(itemA[0]).localeCompare(JSON.stringify(itemB[0]))
  })
  return codeTable
}

const subset = (arrA: any[], arrB: any[]) => {
  const arrToUse = arrA.length > arrB.length ? arrB : arrA
  const arrToCompare = arrA.length > arrB.length ? arrA : arrB
  const result: any[] = []
  arrToUse.map((value) => {
    if (arrToCompare.indexOf(value) !== -1) {
      result.push(value)
    }
  })
  return result
}

export default sortedStandardCodeTable
export {
  standardCoverOrder, subset, updateFrequencies, supportOfItem
}
