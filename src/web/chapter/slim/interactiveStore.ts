import { get, set } from "lodash"
import { autoSubscribe, AutoSubscribeStore, autoSubscribeWithKey, key, StoreBase } from "resub"
import { IPersistableStore } from "resub-persist"
import processDatabaseAsString, { Database } from "../../../slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable } from "../../../slim/standardCodeTable"
import {
  exampleDataset, exampleStandardCodeTable,
  exampleTranslation, transactionDatabase
} from "../../../util/exampleData"
import msgType, { IPairChoice } from "./workerConstants"

const SUBKEYS = {
  line: "codeLin",
  dataset: "dataset",
  translation: "translation",
  pairs: "pairs",
  loading: "loading",
  path: "path"
}

const InteractiveWorker = require("./interactive.worker.ts")

const BackgroundWorker = new InteractiveWorker()

@AutoSubscribeStore
export class InteractiveStore extends StoreBase implements IPersistableStore {
    public name = "formErrors"
    private codeLine = 1
    private dataset: string = transactionDatabase
    private standardCodeTable: SortedCodeTable = exampleStandardCodeTable
    private translation: any = exampleTranslation
    private parsedSet: Database = exampleDataset
    private exploredPairs: IPairChoice[] = []
    private path: number[] = []
    private loading: boolean = false
    private popupPath: number[] = []
    private sortType: number = 0

    public getPropKeys() { return ["line", "dataset"] }

    public setCodeLine(newLine: number) {
      this.codeLine = newLine
      this.trigger(SUBKEYS.line)
    }
    public setSortType(newSort: number) {
      this.sortType = Number(newSort)
      this.setDataset(this.dataset)
    }

    @autoSubscribeWithKey(SUBKEYS.line)
    public getSortType() {
      return this.sortType
    }

    @autoSubscribeWithKey(SUBKEYS.line)
    public getCodeLine() {
      return this.codeLine
    }

    public setPath(newPath: number[]) {
      this.path = newPath
      this.trigger(SUBKEYS.path)
    }

    @autoSubscribeWithKey(SUBKEYS.path)
    public getPath() {
      return this.path
    }

    public setPopupPath(newPath: number[]) {
      this.popupPath = newPath
      this.trigger(SUBKEYS.path)
    }

    @autoSubscribeWithKey(SUBKEYS.path)
    public getPopupPath() {
      return this.popupPath
    }

    public setLoading(newLoading: boolean) {
      this.loading = newLoading
      this.trigger(SUBKEYS.loading)
    }

    @autoSubscribeWithKey(SUBKEYS.loading)
    public getLoading() {
      return this.loading
    }

    public moveLine(back?: boolean) {
      this.setCodeLine(
        back ? Math.max(this.codeLine - 1, 1) : Math.min(this.codeLine + 1, 5)
      )
    }

    public setDataset(newSet: string) {
      this.dataset = newSet
      this.parsedSet = processDatabaseAsString(newSet)
      this.standardCodeTable = sortedStandardCodeTable(this.parsedSet)
      this.trigger(SUBKEYS.dataset)
      InteractiveStoreInstance.setLoading(true)
      BackgroundWorker.postMessage({
        type: msgType.first10Pairs,
        codeTable: this.getStandardCodeTable(),
        dataset: this.getParsedDataset(),
        sortType: this.getSortType(),
        path: []
      })
    }

    @autoSubscribeWithKey(SUBKEYS.dataset)
    public getDataset() {
      return this.dataset
    }

    @autoSubscribeWithKey(SUBKEYS.dataset)
    public getStandardCodeTable() {
      return this.standardCodeTable
    }

    @autoSubscribeWithKey(SUBKEYS.dataset)
    public getParsedDataset() {
      return this.parsedSet
    }
    public setTranslation(newTranslation: any) {
      this.translation = newTranslation
      this.trigger(SUBKEYS.translation)
    }
    @autoSubscribeWithKey(SUBKEYS.translation)
    public getTranslation() {
      return this.translation
    }
    public setExploredPairs(newPairs: IPairChoice[]) {
      this.exploredPairs = newPairs
      this.trigger(SUBKEYS.pairs)
    }

    @autoSubscribeWithKey(SUBKEYS.pairs)
    public getExploredPairs() {
      return this.exploredPairs
    }

    public explore(path: number[]) {
      this.setPath(path)
      const pair = get(this.exploredPairs, path)
      backgroundExplore(pair.children, path)
    }
}

const InteractiveStoreInstance = new InteractiveStore()

const backgroundExplore = (pairs: IPairChoice[], path: number[]) => {
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const nextPath = [].concat(path)
    if (nextPath.length > 0) {
      nextPath.push("children")
    }
    nextPath.push(i)
    if (pair.loading) {
      BackgroundWorker.postMessage({
        type: msgType.exploreTable,
        pair, path: nextPath,
        sortType: InteractiveStoreInstance.getSortType(),
        dataset: InteractiveStoreInstance.getParsedDataset()
      })
    }
    backgroundExplore(pair.children, nextPath)
  }
}

BackgroundWorker.addEventListener("message", (event: any) => {
  if (event.data.type === msgType.pairResult) {
    InteractiveStoreInstance.setExploredPairs(event.data.pairs)
    InteractiveStoreInstance.setLoading(false)
    backgroundExplore(event.data.pairs, [])
  } else if (event.data.type === msgType.exploreTableResult) {
    const { pair,  path } = event.data
    const toInspect = JSON.parse(JSON.stringify(InteractiveStoreInstance.getExploredPairs()))
    set(toInspect, path, pair)
    InteractiveStoreInstance.setExploredPairs(toInspect)
    console.log("PAIRS NOW ARE", toInspect)
  }
})
InteractiveStoreInstance.setLoading(true)
BackgroundWorker.postMessage({
  type: msgType.first10Pairs,
  codeTable: InteractiveStoreInstance.getStandardCodeTable(),
  dataset: InteractiveStoreInstance.getParsedDataset(),
  sortType: InteractiveStoreInstance.getSortType(),
  path: []
})
export default InteractiveStoreInstance
