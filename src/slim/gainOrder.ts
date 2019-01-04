import isEqual from "../util/isEqual"
import log2 from "../util/log"
import { lengthForSet, lengthForSetInStandard } from "./codeLength"
import { Database } from "./processDatabaseAsString"
import { ICodeTableEntry, SortedCodeTable, subset, updateFrequencies } from "./standardCodeTable"

export type ICandidatePair = number[][]

export type CandidatePairs = ICandidatePair[]

const createPairCandidates = (codeTable: SortedCodeTable) => {
  const pairs: ICandidatePair[] = []
  for (let i = 0; i < codeTable.length; i++) {
    for (let b = i; b < codeTable.length; b++) {
      const setA = codeTable[i][0]
      const setB = codeTable[b][0]
      if (i !== b && subset(setA, setB).length === 0) {
        const newCodeEntry: ICandidatePair = [setA, setB, [].concat(setA).concat(setB), [0]]
        pairs.unshift(newCodeEntry)
      }
    }
  }
  pairs.sort(sortPairsByLength)
  return pairs
}

const sortPairsByLength = (itemA: ICandidatePair, itemB: ICandidatePair) => {
  if (itemA[2].length < itemB[2].length) {
    return 1
  }
  if (itemA[2].length > itemB[2].length) {
    return -1
  }
  return -1 * JSON.stringify(itemA[2]).localeCompare(JSON.stringify(itemB[2]))
}

const getFrequencySum = (table: SortedCodeTable) => {
  let sum = 0
  for (const entry of table) {
    sum += entry[1][0]
  }
  return sum
}

const sortPairsByGain = (itemA: ICandidatePair, itemB: ICandidatePair) => {
  if (isNaN(itemA[3][0])) {
    return 1
  }
  if (isNaN(itemB[3][0])) {
    return -1
  }
  if (itemA[3][0] < itemB[3][0]) {
    return 1
  }
  if (itemA[3][0] > itemB[3][0]) {
    return -1
  }
  return -1 * JSON.stringify(itemA[3][0]).localeCompare(JSON.stringify(itemB[3][0]))
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const gainOrder = (dataset: Database, currentTable: SortedCodeTable, standardCodeTable: SortedCodeTable, candidatePairs: CandidatePairs, sortOrder: number = 0) => {
  const s = getFrequencySum(currentTable)
  let i = 0
  let start = new Date().getTime()
  const xTidHolder: any = []
  const yTidHolder: any = []
  const tidHolder: any = []
  const clonedDb: Database = JSON.parse(JSON.stringify(dataset))
  for (const entry of currentTable) {
    entry[1][0] = 0
    for (const classKey of Object.keys(clonedDb)) {
      for (const transactionIndex in clonedDb[classKey]) {
        const transaction = clonedDb[classKey][transactionIndex]
        if (subset(entry[0], transaction).length === entry[0].length) {
          entry[1][0]++
          const key = JSON.stringify(entry[0])
          if (tidHolder[key] == null) {
            tidHolder[key] = []
          }
          tidHolder[key].push(Number(transactionIndex))
          clonedDb[classKey][transactionIndex] = transaction.filter((value) => entry[0].indexOf(value) === -1)
        }
      }
    }
  }
  const possiblePairs = []
  for (const pair of candidatePairs) {
    start = new Date().getTime()
    let xTids = tidHolder[JSON.stringify(pair[0])]
    if (xTids == null) {
      xTids = []
    }
    let yTids = tidHolder[JSON.stringify(pair[1])]
    if (yTids == null) {
      yTids = []
    }
    const xyn = subset(xTids, yTids).length
    if (xyn === 0) {

    } else {
      const xn = xTids.length - xyn
      const yn = yTids.length - xyn
      const sn = s - xyn
      // gain = L(D|CT) + L(CT, D)
      // L(D|CT) = encoding bit difference
      // clogcres == sum(c * log c- c'* log c')
      let clogcres = 0
      // cdiff == sum log c'-log c
      let cdiff = 0
      // sum log c' - l(C|ST)
      let cnst = 0
      // sum log c - l(C|ST)
      let cst = 0
      for (let i = 0; i < currentTable.length; i++) {
        const C = currentTable[i][0]
        const c = currentTable[i][1][0]
        let cn = currentTable[i][1][0]
        if (isEqual(currentTable[i][0], pair[0])) {
          cn = xn
        } else if (isEqual(currentTable[i][0], pair[1])) {
          cn = yn
        }
        if (cn !== c) {
          if (c !== 0 && cn !== 0) {
            clogcres += c * log2(c) - cn * log2(cn)
            cdiff += log2(cn) - log2(c)
          }
          const lengthInStandard = lengthForSetInStandard(standardCodeTable, C)
          if (c === 0) {
            cnst += log2(cn) - lengthInStandard
          }
          if (cn === 0) {
            cst += lengthInStandard - log2(c)
          }
        }
      }
      const bitDifference = (s * log2(s) - sn * log2(sn)) + (xyn * log2(xyn)) - clogcres
      const complexityDifference = log2(xyn) - lengthForSetInStandard(standardCodeTable, pair[2])
      + currentTable.length * log2(s) - (currentTable.length + 1) * log2(sn) + cdiff + cnst + cst
      pair[3][0] = bitDifference + complexityDifference
      possiblePairs.push(pair)
    }
    i++
  }
  console.log("GOT SORT ORDER", sortOrder)
  switch (sortOrder) {
    case 0: {
      possiblePairs.sort(sortPairsByGain).reverse()
      break
    }
    case 1: {
      possiblePairs.sort(sortPairsByGain)
      break
    }
    case 2: {
      shuffleArray(possiblePairs)
      break
    }
  }
  return possiblePairs
}

export default gainOrder
export {
  createPairCandidates
}
