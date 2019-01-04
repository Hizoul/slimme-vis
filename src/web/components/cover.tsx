import * as React from "react"
import { lengthForSet } from "../../slim/codeLength"
import coverCode from "../../slim/coverCode"
import { SortedCodeTable } from "../../slim/standardCodeTable"
import translate, { ITranslation } from "../../util/translation"
import Database from "./database"

const CodeCover: React.FunctionComponent<{
  codeTable: SortedCodeTable
  transaction: number[]
  translation: ITranslation
}> = (props) => {
  const cover = coverCode(props.codeTable, props.transaction)
  return (
    <div>
      Transaction: {props.transaction.map((val) => <span>[{translate([val], props.translation)}]</span>)}
      Cover: {cover.map((val) => <span>{JSON.stringify(translate(val, props.translation))}</span>)}
    </div>
  )
}

export default CodeCover
