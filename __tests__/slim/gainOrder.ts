import gainOrder, { createPairCandidates } from "../../src/slim/gainOrder"
import processDatabaseAsString from "../../src/slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable, updateFrequencies } from "../../src/slim/standardCodeTable"
import { exampleDataset, exampleStandardCodeTable } from "../../src/util/exampleData"

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
    const SC = sortedStandardCodeTable(dataset)
    const pairs = createPairCandidates(SC)
    expect(pairs).toMatchSnapshot("all candidate pairs")
    expect(gainOrder(dataset, SC, SC, pairs)).toMatchSnapshot("first round of pairs sorted by gain")
    expect(gainOrder(exampleDataset, exampleStandardCodeTable,
      exampleStandardCodeTable, createPairCandidates(exampleStandardCodeTable)))
    .toMatchSnapshot("first round of pairs sorted by gain")
  })
})
