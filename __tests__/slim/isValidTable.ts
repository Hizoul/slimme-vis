import { sha512 } from "js-sha512"
import { resolve } from "path"
import processLocalDb from "../../src/node/local"
import coverCode from "../../src/slim/coverCode"
import { SortedCodeTable } from "../../src/slim/standardCodeTable"
import { exampleDataset, exampleStandardCodeTable, improvedCodeTable } from "../../src/util/exampleData"
import isValidTable from "../../src/util/isValidTable"

describe("is valid table", () => {
  it("should work correctly", () => {
    expect(isValidTable(exampleDataset, exampleStandardCodeTable)).toBeTruthy()
    expect(isValidTable(exampleDataset, improvedCodeTable)).toBeTruthy()
    const invalid = improvedCodeTable.splice(0, 4)
    expect(isValidTable(exampleDataset, invalid)).toBeFalsy()
  })
})
