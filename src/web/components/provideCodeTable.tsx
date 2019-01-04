import { get, isNil } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"
import { SortedCodeTable } from "../../slim/standardCodeTable";
import { ITranslation } from "../../util/translation";
import { Database } from "../../slim/processDatabaseAsString";
import CodeTableStore from "../codeTableStore";

export interface ISharedTableProvider extends React.Props<any> {

}

export interface ISharedTableProviderState {
  standardTable: SortedCodeTable
  improvedTable: SortedCodeTable
  translation: ITranslation
  translationString: string
  data: string
  database: Database
  showEditor: boolean
}

export interface ITableProviderProps extends ISharedTableProvider, ISharedTableProviderState {
}

function SharedTableProvider<T>(Component: React.ComponentType<ITableProviderProps & T>):
React.ComponentType<ISharedTableProvider & T> {
  return class extends ComponentBase<ISharedTableProvider & T, ISharedTableProviderState> {
    public render() {
      return (
        <Component
          {...this.props}
          {...this.state}
        />
      )
    }
    protected _buildState(props: ISharedTableProvider, initialBuild: boolean): ISharedTableProviderState {
      return {
        improvedTable: CodeTableStore.getImprovedTable(),
        standardTable: CodeTableStore.getStandardTable(),
        translation: CodeTableStore.getTranslation(),
        data: CodeTableStore.getData(),
        translationString: CodeTableStore.getTranslationString(),
        showEditor: CodeTableStore.getShowEditor(),
        database: CodeTableStore.getDatabase()
      }
    }
  }
}

export default SharedTableProvider
