import * as React from "react"
import { FaArrowRight } from "react-icons/fa"
import gainOrder, { createPairCandidates, ICandidatePair } from "../../../../slim/gainOrder"
import { exampleDataset, exampleStandardCodeTable, exampleTranslation } from "../../../../util/exampleData"
import translate from "../../../../util/translation"
import CodeTable from "../../../components/codeTable"
import { KeywordCodeTable } from "../../../components/keywords"
import { bigIconClasses } from "../../globals"

const PairDisplay: React.FunctionComponent<{
  candidates: ICandidatePair[], showGain?: boolean
}> = (props) => {
  return (
    <div>
      {props.candidates.map((set) =>
        <div key={JSON.stringify(set[2])}>
        {props.showGain ? <span>Gain: {set[3][0].toFixed(2)};&nbsp;</span> : null}
          {translate(set[2], exampleTranslation)}
        </div>
      )}
    </div>
  )
}

const SLIMGainOrder: React.FunctionComponent<any> = (props) => {
  const orderedByGain = gainOrder(exampleDataset, exampleStandardCodeTable,
    exampleStandardCodeTable, createPairCandidates(exampleStandardCodeTable))
  return (
    <div className="c2">
      <div className="line">
        The second step, is, where SLIM improves upon KRIMP. Instead of a predefined list of candidates <i>F</i>, it builds them on the fly, based on the current <KeywordCodeTable />.
      </div>
      <div className="inline">
        <CodeTable codeTable={exampleStandardCodeTable} translation={exampleTranslation} />
        <div className="center">
          <span>Build all pairwise combinations from the sets of <i>CT</i></span>
          <br />
          <FaArrowRight className={bigIconClasses} />
        </div>
        <div style={{minWidth: "15%", textAlign: "center"}}>
          <div className="limitHeight">
            <PairDisplay candidates={createPairCandidates(exampleStandardCodeTable)} />
          </div>
        </div>
          <div className="center">
            Calculate estimated gain and sort by it
            <br />
            <FaArrowRight className={bigIconClasses} />
          </div>
        <div>
          <div className="limitHeight">
            <PairDisplay candidates={orderedByGain} showGain={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SLIMGainOrder
