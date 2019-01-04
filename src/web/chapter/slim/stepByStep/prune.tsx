import * as React from "react"
import { FaArrowRight } from "react-icons/fa"
import { codeLengthIncludingStandard } from "../../../../slim/codeLength"
import { createPairCandidates } from "../../../../slim/gainOrder"
import gainOrder from "../../../../slim/gainOrder"
import postAcceptancePruning from "../../../../slim/postAcceptancePruning"
import { SortedCodeTable, supportOfItem, updateFrequencies } from "../../../../slim/standardCodeTable"
import CodeTable from "../../../components/codeTable"
import { KeywordCodeTable } from "../../../components/keywords"
import SharedTableProvider, { ITableProviderProps } from "../../../components/provideCodeTable"
import { bigIconClasses } from "../../globals"

const SLIMPrune: React.FunctionComponent<ITableProviderProps> = (props) => {
  const candidates = createPairCandidates(props.standardTable)
  const sortedCandidates = gainOrder(props.database, props.standardTable, props.standardTable, candidates)
  let updated: SortedCodeTable = JSON.parse(JSON.stringify(props.standardTable))
  updated.unshift([sortedCandidates[0][2], [0], [supportOfItem(sortedCandidates[0][2], props.database)]])
  updated = updateFrequencies(props.database, updated)
  let pruned = JSON.parse(JSON.stringify(updated))
  pruned = postAcceptancePruning(props.database, props.standardTable, pruned, props.standardTable)
  return (
    <div className="c2">
      <div className="line">
        For entries that decreased in frequency it is checked whether removing them can further improve compression.
      </div>
      <div className="inline">
        <CodeTable codeTable={updated} translation={props.translation} />
        <div className="center">
          Prune code table (might stay unchanged)
          <br />
          <FaArrowRight className={bigIconClasses} />
        </div>
        <CodeTable codeTable={pruned} translation={props.translation} />
      </div>
    </div>
  )
}

export default SharedTableProvider<{}>(SLIMPrune)
