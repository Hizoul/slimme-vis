import slim from "../../src/slim"
import gainOrder, { createPairCandidates } from "../../src/slim/gainOrder"
import processDatabaseAsString from "../../src/slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable, updateFrequencies } from "../../src/slim/standardCodeTable"
import { getLPercent } from "../../src/util/eval"

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
describe("GainOrder", () => {
  it("should sort correctly", () => {
    const dataset = processDatabaseAsString(database)
    const slimTable = slim(dataset)
    expect(slimTable).toMatchSnapshot("optimized table")
    expect(getLPercent(dataset, slimTable)).toMatchSnapshot("encoindg size new")
    expect(getLPercent(dataset, slimTable) < getLPercent(dataset, sortedStandardCodeTable(dataset))).toBeTruthy()
  })
})
