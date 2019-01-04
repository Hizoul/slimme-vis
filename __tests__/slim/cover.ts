import processLocalDb from '../../src/node/local';
import { resolve } from 'path';
import { sha512 } from "js-sha512"
import { SortedCodeTable } from '../../src/slim/standardCodeTable';
import coverCode from '../../src/slim/coverCode';

describe("ProcessDB", () => {
  it("should process local file", () =>{
    const codeTable: SortedCodeTable = [
      [[2, 4], [2]],
      [[3], [1]],
      [[1], [1]]
    ]
    const set = [1, 2, 3, 4]
    expect(coverCode(codeTable, set)).toMatchSnapshot("cover of set over codetable")
  })
})