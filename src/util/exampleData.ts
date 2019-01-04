import processDatabaseAsString, { Database } from "../slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable, supportOfItem, updateFrequencies } from "../slim/standardCodeTable"

const exampleTranslation = {
  1: "🥚",
  2: "🥓",
  3: "🍌",
  4: "🥨",
  5: "🍕",
  6: "☕",
  7: "🍩",
  8: "🥩",
  9: "🌽"
}

const exampleTranslationString = `1 🥚
2 🥓
3 🍌
4 🥨
5 🍕
6 ☕
7 🍩
8 🥩
9 🌽`

const endlessLoopBase = `0 1 2 6 4
0 3 4 5 6
0 5 1 2 8
0 9 7 6 4
0 1 4 2 6
0 5 3 4 6
0 1 6 8 9
0 2 4 5 3`

const transactionDatabase = `0 1 2 3 4
0 5 6 7 8
0 9 2 4 6
0 8 1 3 6
0 9 4 8 2
0 3 4 5 6
0 7 8 9 4
0 2 4 5 3`

const exampleDataset: Database = processDatabaseAsString(transactionDatabase)
const exampleStandardCodeTable: SortedCodeTable = sortedStandardCodeTable(exampleDataset)
let improvedCodeTable = JSON.parse(JSON.stringify(exampleStandardCodeTable))
improvedCodeTable.unshift([[1, 2], [0], [supportOfItem([1, 2], exampleDataset)]])
improvedCodeTable.unshift([[4, 6], [0], [supportOfItem([4, 6], exampleDataset)]])
improvedCodeTable = updateFrequencies(exampleDataset, improvedCodeTable)

export {
  transactionDatabase, exampleDataset, exampleStandardCodeTable, exampleTranslation, improvedCodeTable, endlessLoopBase, exampleTranslationString
}
