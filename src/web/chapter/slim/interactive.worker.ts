import slim from "../../../slim"
import { codeLengthIncludingStandard } from "../../../slim/codeLength"
import gainOrder, { createPairCandidates } from "../../../slim/gainOrder"
import postAcceptancePruning from "../../../slim/postAcceptancePruning"
import { Database } from "../../../slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable, supportOfItem, updateFrequencies } from "../../../slim/standardCodeTable"
import { getLPercent } from "../../../util/eval"
import msgType from "./workerConstants"
import { IPairChoice } from "./workerConstants"
const context: Worker = self as any

const getExplorableCandidates = (dataset: Database, codeTable: SortedCodeTable, sortType: number) => {
  const ST = sortedStandardCodeTable(dataset)
  const sortedCandidates = gainOrder(dataset,
    codeTable, ST,
    createPairCandidates(codeTable), sortType
  )
  const pairs: IPairChoice[] = []
  let i = 0
  while (pairs.length < 10 && i < sortedCandidates.length) {
    const pair = sortedCandidates[i]
    let CTc = JSON.parse(JSON.stringify(codeTable))
    CTc.unshift([pair[2], [0], [supportOfItem(pair[2], dataset)]])
    CTc = updateFrequencies(dataset, CTc)
    if (codeLengthIncludingStandard(dataset, CTc, ST) < codeLengthIncludingStandard(dataset, codeTable, ST)) {
      pairs.push({
        compression: -1, loading: true,
        set: pair[2], gain: pair[3][0],
        finalCodeTable: [], path: [],
        codeTableToExplore: codeTable, children: []
      })
    }
    i++
  }
  return pairs
}

context.addEventListener("message", (event) => {
  if (event.data.type === msgType.first10Pairs) {
    const pairs: IPairChoice[] = getExplorableCandidates(event.data.dataset, event.data.codeTable, event.data.sortType)
    context.postMessage({type: msgType.pairResult, pairs})
  } else if (event.data.type === msgType.exploreTable) {
    console.log(`BG: Explore Table for`, event.data)
    const { pair, dataset, path } = event.data
    let CTc: SortedCodeTable = JSON.parse(JSON.stringify(pair.codeTableToExplore))
    CTc.unshift([pair.set, [0], [supportOfItem(pair.set, dataset)]])
    CTc = updateFrequencies(dataset, CTc)
    CTc = postAcceptancePruning(dataset, pair.codeTableToExplore, CTc, sortedStandardCodeTable(dataset))
    const newTable = slim(dataset, CTc, event.data.sortType)
    pair.finalCodeTable = newTable
    pair.compression = getLPercent(dataset, newTable)
    pair.loading = false
    pair.children = getExplorableCandidates(dataset, CTc, event.data.sortType)
    pair.path = path
    console.log(`BG: Done Exploring Table for`, event.data)
    context.postMessage({type: msgType.exploreTableResult, pair, path})
  }
})

context.postMessage({type: msgType.booted})

export default self
