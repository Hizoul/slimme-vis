import * as React from "react"
import { FaArrowRight } from "react-icons/fa"
import { codeLengthIncludingStandard } from "../../../../slim/codeLength"
import { createPairCandidates } from "../../../../slim/gainOrder"
import gainOrder from "../../../../slim/gainOrder"
import { SortedCodeTable, supportOfItem, updateFrequencies } from "../../../../slim/standardCodeTable"
import { exampleDataset, exampleStandardCodeTable, exampleTranslation } from "../../../../util/exampleData"
import translate from "../../../../util/translation"
import CodeTable from "../../../components/codeTable"
import Database from "../../../components/database"
import { KeywordCodeTable, KeywordDatabase } from "../../../components/keywords"
import SharedTableProvider, { ITableProviderProps } from "../../../components/provideCodeTable"
import { bigIconClasses } from "../../globals"

const SLIMCompareLength: React.FunctionComponent<ITableProviderProps> = (props) => {
  const candidates = createPairCandidates(props.standardTable)
  const sortedCandidates = gainOrder(props.database, props.standardTable, props.standardTable, candidates)
  let updated: SortedCodeTable = JSON.parse(JSON.stringify(props.standardTable))
  updated.unshift([sortedCandidates[0][2], [0], [supportOfItem(sortedCandidates[0][2], props.database)]])
  updated = updateFrequencies(props.database, updated)
  return (
    <div className="c2">
      <div className="line">
        Now it is checked whether the addition of the pair actually improves encoding.
      </div>
      <div className="inline">
        <CodeTable codeTable={props.standardTable} translation={props.translation} />
        <div className="center">
          If {codeLengthIncludingStandard(props.database, updated, props.standardTable).toFixed(2)} is smaller than {codeLengthIncludingStandard(props.database, props.standardTable, props.standardTable).toFixed(2)} we keep the new <KeywordCodeTable /> <br />
          <FaArrowRight className={bigIconClasses} />
        </div>
        <CodeTable codeTable={updated} translation={props.translation} />
      </div>
    </div>
  )
}

export default SharedTableProvider<{}>(SLIMCompareLength)
