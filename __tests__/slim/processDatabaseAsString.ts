import { sha512 } from "js-sha512"
import { resolve } from "path"
import processLocalDb from "../../src/node/local"
import processDatabaseAsString from "../../src/slim/processDatabaseAsString"

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
    expect(
      processDatabaseAsString(database)
    ).toMatchSnapshot("processed mushroomset")
  })
})
