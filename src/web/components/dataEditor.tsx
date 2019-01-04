import * as React from "react"
import SharedTableProvider, { ITableProviderProps } from "../components/provideCodeTable";
import CodeTableStore from "../codeTableStore";
import { get } from "lodash"

const DataEditor: React.FunctionComponent<ITableProviderProps> = (props) => {
  if (!props.showEditor) return <div />
  return (
    <div className="popup">
    <a
      onClick={() => {
        CodeTableStore.setShowEditor(!props.showEditor)
      }}
    >
      Close
    </a>
     Data editor
     The following data is not validated. Invalid data will break functionality on page.
     The transaction database may only consist of numbers delimited by spaces.
     The translation must always start with a number followed by its name which is delimited by a single space.
     <div className="inline">
      <textarea value={props.data} onChange={(event) => {
        CodeTableStore.setData(get(event, "nativeEvent.target.value"))
      }} />
      <textarea value={props.translationString} onChange={(event) => {
        CodeTableStore.setTranslation(get(event, "nativeEvent.target.value"))
      }} />
     </div>
    </div>
  )
}
export default SharedTableProvider<{}>(DataEditor)
