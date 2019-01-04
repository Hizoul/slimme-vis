import { SortedCodeTable } from "../../../slim/standardCodeTable"
const msgType = {
  booted: 1,
  first10Pairs: 2,
  pairResult: 3,
  exploreTable: 4,
  exploreTableResult: 5
}

export interface IPairChoice {
  set: number[]
  codeTableToExplore: SortedCodeTable
  finalCodeTable: SortedCodeTable
  compression: number
  gain: number
  loading?: boolean
  children: IPairChoice[]
  path: number[]
}

export default msgType
