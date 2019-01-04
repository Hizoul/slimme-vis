import * as React from "react"
import translate from "../../../util/translation"
import CodeTable from "../../components/codeTable"
import CodeCover from "../../components/cover"
import Database from "../../components/database"
import { KeywordCover, KeywordTransaction } from "../../components/keywords"
import SharedTableProvider, { ITableProviderProps } from "../../components/provideCodeTable"

const BasicsCover: React.FunctionComponent<ITableProviderProps> = (props) => {
  return (
    <div className="paddingContainer c4">
      <h1 className="center noMargin"><KeywordCover /></h1>
      <div className="flex1 column">
        <div className="line">
          Take the sorted number of sub sets from the code table with which one will encode a <KeywordTransaction />.
        </div>
        <div className="line">
          {props.improvedTable.map((e: any) => (
            <span>[{e[0].map((v: any) => translate([v], props.translation))}]</span>
          ))}
        </div>
        <div className="line">
          A cover uses a sorted list of subsets (the code table), and tries to replace the contents of the transaction with those subsets.
        </div>
        <CodeCover transaction={props.database[0][0]} translation={props.translation} codeTable={props.improvedTable} />
        <div className="line">
          Using the cover to encode, we were able to replace the singletons of bacon and eggs through a subset that summarizes the two.
        </div>
        <div className="line">
            The usage of a set is the amount of times a set was used to encode <KeywordTransaction />.
        </div>
      </div>
    </div>
  )
}

export default  SharedTableProvider<{}>(BasicsCover)
