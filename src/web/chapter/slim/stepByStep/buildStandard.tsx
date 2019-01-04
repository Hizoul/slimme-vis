import * as React from "react"
import { FaArrowRight } from "react-icons/fa"
import { exampleDataset, exampleStandardCodeTable, exampleTranslation } from "../../../../util/exampleData"
import CodeTable from "../../../components/codeTable"
import Database from "../../../components/database"
import { KeywordCodeTable, KeywordDatabase } from "../../../components/keywords"
import SharedTableProvider, { ITableProviderProps } from "../../../components/provideCodeTable"
import { bigIconClasses } from "../../globals"

const SLIMBuildStandard: React.FunctionComponent<ITableProviderProps> = (props) => {
  return (
    <div className="c2">
      <div className="line">
        In the first step the <KeywordCodeTable isStandard={true} /> is built from the <KeywordDatabase /> and assigned to <i>CT</i>.
      </div>
      <div className="inline">
        <Database dataset={props.database} translation={props.translation} />
        <div className="center">
          Take Singletons and count frequency
          <br />
          <FaArrowRight className={bigIconClasses} />
        </div>
        <CodeTable codeTable={props.standardTable} translation={props.translation} />
      </div>
    </div>
  )
}

export default SharedTableProvider<{}>(SLIMBuildStandard)
