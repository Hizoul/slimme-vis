import * as React from "react"
import { FaArrowRight } from "react-icons/fa"
import gainOrder from "../../../../slim/gainOrder"
import { createPairCandidates } from "../../../../slim/gainOrder"
import { SortedCodeTable, supportOfItem, updateFrequencies } from "../../../../slim/standardCodeTable"
import { exampleDataset, exampleStandardCodeTable, exampleTranslation } from "../../../../util/exampleData"
import translate from "../../../../util/translation"
import CodeTable from "../../../components/codeTable"
import Database from "../../../components/database"
import { KeywordCodeTable, KeywordDatabase } from "../../../components/keywords"
import SharedTableProvider, { ITableProviderProps } from "../../../components/provideCodeTable"
import { bigIconClasses } from "../../globals"

const SLIMAddToCt: React.FunctionComponent<ITableProviderProps> = (props) => {
  const candidates = createPairCandidates(props.standardTable)
  const sortedCandidates = gainOrder(props.database, props.standardTable, props.standardTable, candidates)
  const added: SortedCodeTable = JSON.parse(JSON.stringify(props.standardTable))
  added.unshift([sortedCandidates[0][2], [0], [supportOfItem(sortedCandidates[0][2], props.database)]])
  let updated: SortedCodeTable = JSON.parse(JSON.stringify(added))
  updated = updateFrequencies(props.database, updated)
  return (
    <div className="c2">
      <div className="line">
        Now the first Pair is added to the current <KeywordCodeTable isStandard={true} /> and the frequencies are updated.
      </div>
      <div className="inline">
        <CodeTable codeTable={props.standardTable} translation={props.translation} />
        <div className="center">
          Add best pair
          <br />
          {translate(sortedCandidates[0][2], props.translation)}
          &nbsp;to
          <br /><KeywordCodeTable />
          <br />
          <FaArrowRight className={bigIconClasses} />
        </div>
        <CodeTable codeTable={added} translation={props.translation} />
        <div className="center">
          Update Frequencies
          <br />
          <FaArrowRight className={bigIconClasses} />
        </div>
        <CodeTable codeTable={updated} translation={props.translation} />
      </div>
    </div>
  )
}

export default SharedTableProvider<{}>(SLIMAddToCt)
