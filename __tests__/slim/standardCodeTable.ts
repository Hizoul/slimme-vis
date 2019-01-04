import { sha512 } from "js-sha512"
import { resolve } from "path"
import processLocalDb from "../../src/node/local"
import processDatabaseAsString from "../../src/slim/processDatabaseAsString"
import standardCodeTable, { standardCoverOrder } from "../../src/slim/standardCodeTable"

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
describe("ProcessDB", () => {
  it("should process local file", () => {
    const dataset = processDatabaseAsString(database)
    expect(
      standardCodeTable(dataset)
    ).toMatchSnapshot("standard code table of mushroomset")
    expect(
      sha512(JSON.stringify(dataset))
    ).toMatchSnapshot("before sort")
  })
  it("cover sort algo", () => {
    expect(standardCoverOrder([
      [[100, 102], [100]],
      [[100], [100]]
    ])).toMatchSnapshot("result of sort")
    expect(standardCoverOrder([
      [[100], [100]],
      [[100, 102], [100]]
    ])).toMatchSnapshot("result of sort")
  })
})
