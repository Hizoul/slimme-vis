import postAcceptancePruning from "../../src/slim/postAcceptancePruning"
import processDatabaseAsString from "../../src/slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable } from "../../src/slim/standardCodeTable"
import isEqual from "../../src/util/isEqual"
const database = `
0 1 2 3
0 1 2 3
0 1 2 3
0 1 2 3
0 1 2 3
0 1 2
0 1
0 2
`

const codeTable: SortedCodeTable = [
  [[1, 2, 3], [5]],
  [[1, 2], [1]],
  [[1], [1]],
  [[2], [1]],
  [[3], [0]]
]
const previousTable: SortedCodeTable = [
  [[1, 2], [6]],
  [[3], [5]],
  [[1], [1]],
  [[2], [1]]
]

describe("Post Acceptance Pruning", () => {
  it("should reduce codelength", () => {
    const db = processDatabaseAsString(database)
    const standardTable = sortedStandardCodeTable(db)
    const prunedTable = postAcceptancePruning(db, previousTable, codeTable, standardTable)
    expect(isEqual(prunedTable, codeTable)).toBe(false)
    expect(isEqual(prunedTable, previousTable)).toBe(false)
    expect(prunedTable).toMatchSnapshot("pruned table")
  })
})
