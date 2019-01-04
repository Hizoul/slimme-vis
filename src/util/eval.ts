import { codeLengthIncludingStandard } from "../slim/codeLength"
import { Database } from "../slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable } from "../slim/standardCodeTable"

const getLPercent = (dataset: Database, codeTable: SortedCodeTable) => {
  const ST = sortedStandardCodeTable(dataset)
  return (codeLengthIncludingStandard(dataset, codeTable, ST) / codeLengthIncludingStandard(dataset, ST, ST)) * 100
}
// L%= L(D,CT)×100, L(D, ST )
export {
  getLPercent
}
