import * as React from "react"
import { lengthForSet } from "../../slim/codeLength"
import { SortedCodeTable } from "../../slim/standardCodeTable"
import translate, { ITranslation } from "../../util/translation"
import Database from "./database"
import codeTableStore from "../codeTableStore";

const CodeTable: React.FunctionComponent<{
  codeTable: SortedCodeTable,
  showLength?: boolean
  editable?: boolean
  translation?: ITranslation
}> = (props) => {
  return (
    <div className="codeTable">
      {props.editable ? <div onClick={() => {
        codeTableStore.setShowEditor(true)
      }}>Edit table</div> : null}
      <div className="codeTableEntry tableHeader">
        <div>Code / Subset</div>
        <div>Frequency</div>
        {props.showLength ? <div>Code length</div> : null}
      </div>
      {props.codeTable.map((entry) => {
        const setString = translate(entry[0], props.translation)
        return (
          <div key={JSON.stringify(setString)} className="codeTableEntry">
            <div>{setString}</div>
            <div>{entry[1][0]}</div>
            {props.showLength ? <div>{lengthForSet(props.codeTable, entry[0]).toFixed(2)}</div> : null}
          </div>
        )
      })}
    </div>
  )
}

export default CodeTable
