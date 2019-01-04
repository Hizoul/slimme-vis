import { getLPercent } from "../util/eval"
import isValidTable from "../util/isValidTable"
import { codeLengthIncludingStandard } from "./codeLength"
import gainOrder, { createPairCandidates } from "./gainOrder"
import postAcceptancePruning from "./postAcceptancePruning"
import { Database } from "./processDatabaseAsString"
import standardCodeTable, { SortedCodeTable, supportOfItem, updateFrequencies } from "./standardCodeTable"

// The function should do the following
// CT ← Standard Code Table(D)
// forF∈{X∪Y:X,Y∈CT}in GainOrder do
//   CTc ← (CT ⊕ F ) in Standard Cover Order
//   if L(D,CTc) < L(D,CT) then
//     CT ← post-prune(CTc) end if
// end for return
const slim = (dataset: Database, tableToExplore?: SortedCodeTable, sortType?: number) => {
  // CT ← Standard Code Table(D)
  const ST = standardCodeTable(dataset)
  let improved = true
  let CT = tableToExplore ? tableToExplore : ST
  let i = 0
  const start = Date.now()
  while (improved) {
    console.log(`in iteration ${i} of slim current |L%|=${getLPercent(dataset, CT)} elapsed time ${Date.now() - start}ms`)
    i++
    improved = false
    const candidates = createPairCandidates(CT)
    const sortedCandidates = gainOrder(dataset, CT, ST, candidates, sortType)

    // for F∈{X∪Y:X,Y∈CT} in GainOrder do
    PROV: for (const candidate of sortedCandidates) {
      // CTc ← (CT ⊕ F ) in Standard Cover Order
      let CTc = JSON.parse(JSON.stringify(CT))
      CTc.unshift([candidate[2], [0], [supportOfItem(candidate[2], dataset)]])
      CTc = updateFrequencies(dataset, CTc)
      // if L(D,CTc) < L(D,CT) then
      if (codeLengthIncludingStandard(dataset, CTc, ST) < codeLengthIncludingStandard(dataset, CT, ST)) {
        // CT ← post-prune(CTc)
        CTc = postAcceptancePruning(dataset, CT, CTc, ST)
        CT = CTc
        improved = true
        break PROV
      }
    }
  }
  console.log("DONE WITH SLIM")
  return CT
}

export default slim
