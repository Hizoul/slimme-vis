import { sha512 } from "js-sha512"
import { resolve } from "path"
import processLocalDb from "../../src/node/local"
import codeLength, { codeLengthIncludingStandard } from "../../src/slim/codeLength"
import standardCodeTable, { ICodeTableEntry, standardCoverOrder } from "../../src/slim/standardCodeTable"
import sortedStandardCodeTable from "../../src/slim/standardCodeTable"

describe("ProcessDB", () => {
  it("code length", () => {
    const dataset = processLocalDb(resolve("__tests__/test.dat"))
    const sorted = sortedStandardCodeTable(dataset)
    const diff: ICodeTableEntry[] = [
      [[ 6, 7 ], [3]],
      [[ 5 ], [3 ]],
      [[ 8 ], [2 ]],
      [[ 3 ], [2 ]],
      [[ 13 ], [2 ]],
      [[ 12 ], [2 ]],
      [[ 10 ], [2 ]],
      [[ 4 ], [1 ]],
      [[ 6 ], [1]],
      [[ 7 ], [1]],
      [[ 14 ], [1 ]],
      [[ 11 ], [1 ]]
    ]
    expect(codeLength(dataset, sorted)).toMatchSnapshot("result of initialLength")
    expect(codeLength(dataset, diff)).toMatchSnapshot("result of diffLength")
    expect(codeLengthIncludingStandard(dataset, diff, sorted)).toMatchSnapshot("result of difftable")
  })
})
