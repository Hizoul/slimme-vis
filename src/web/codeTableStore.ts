import { get, set } from "lodash"
import { autoSubscribe, AutoSubscribeStore, key, StoreBase } from "resub"
import gainOrder, { createPairCandidates } from "../slim/gainOrder"
import processDatabaseAsString, { Database } from "../slim/processDatabaseAsString"
import sortedStandardCodeTable, { SortedCodeTable, supportOfItem, updateFrequencies } from "../slim/standardCodeTable"
import { exampleDataset, exampleStandardCodeTable, exampleTranslation, exampleTranslationString, improvedCodeTable, transactionDatabase } from "../util/exampleData"
import { ITranslation } from "../util/translation"
import InteractiveStore from "./chapter/slim/interactiveStore"

@AutoSubscribeStore
export class CodeTableStore extends StoreBase {
  public name = "formErrors"
  private standardTable: SortedCodeTable = exampleStandardCodeTable
  private improvedTable: SortedCodeTable = improvedCodeTable
  private translation: ITranslation = exampleTranslation
  private translationString: string = exampleTranslationString
  private data: string = transactionDatabase
  private database: Database = exampleDataset
  private showEditor: boolean = false

  public setData(value: any) {
    this.data = value
    this.database = processDatabaseAsString(this.data)
    this.standardTable = sortedStandardCodeTable(this.database)
    this.improvedTable = JSON.parse(JSON.stringify(this.standardTable))
    const candidates = createPairCandidates(this.standardTable)
    const sortedCandidates = gainOrder(this.database, this.standardTable, this.standardTable, candidates)
    this.improvedTable.unshift([sortedCandidates[0][2], [0], [supportOfItem(sortedCandidates[0][2], this.database)]])
    this.improvedTable = updateFrequencies(this.database, this.improvedTable)
    this.trigger()
    InteractiveStore.setDataset(value)
  }

  public setShowEditor(newValue: boolean) {
    this.showEditor = newValue
    this.trigger()
  }

  public setTranslation(newValue: string) {
    this.translationString = newValue
    const newTranslation: any = {}
    for (const line of newValue.split("\n")) {
      const entries = line.split(" ")
      newTranslation[Number(entries[0])] = entries[1]
    }
    this.translation = newTranslation
    this.trigger()
    InteractiveStore.setTranslation(newTranslation)
  }

  @autoSubscribe
  public getData() {
    return this.data
  }

  @autoSubscribe
  public getShowEditor() {
    return this.showEditor
  }

  @autoSubscribe
  public getDatabase() {
    return this.database
  }

  @autoSubscribe
  public getTranslation() {
    return this.translation
  }
  @autoSubscribe
  public getStandardTable() {
    return this.standardTable
  }
  @autoSubscribe
  public getImprovedTable() {
    return this.improvedTable
  }
  @autoSubscribe
  public getTranslationString() {
    return this.translationString
  }
}

export default new CodeTableStore()
