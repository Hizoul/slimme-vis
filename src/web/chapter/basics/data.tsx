import * as React from "react"
import Database from "../../components/database"
import { KeywordDatabase, KeywordPattern, KeywordStore, KeywordTransaction } from "../../components/keywords"
import SharedTableProvider, { ITableProviderProps } from "../../components/provideCodeTable"

const BasicsData: React.FunctionComponent<ITableProviderProps> = (props) => {
  return (
    <div className="paddingContainer c3">
      <h1 className="center noMargin">Type of Data</h1>
      <div className="inline">
        <div className="flex1 column">
          <div className="line">
            Imagine a <KeywordStore /> that logs a <KeywordTransaction />:
          </div>
          <div className="line marginLeft">
            [🥚, 🥓, 🧀, 🍪] (or [42, 10, 33, 420] if translated to product ids)
          </div>
          <div className="line">
            All
            &nbsp;<KeywordTransaction />
            &nbsp; are stored within a <KeywordDatabase />
          </div>
          <div className="line">
            Information Theory will try to find frequent <KeywordPattern /> within
            &nbsp;<KeywordTransaction /> of the
            &nbsp;<KeywordDatabase />
          </div>
          <div className="line">
            A <KeywordPattern /> or subset of a transaction could look like this:<br />
          </div>
          <div className="line marginLeft">
            [🥚, 🥓] or [42, 10]
          </div>
          <div className="line">
            From these <KeywordPattern /> an analyst might conclude that people like to eat Bacon &amp; Eggs for breakfast.
          </div>
        </div>
        <div className="marginRight">
          <Database dataset={props.database} translation={props.translation} />
        </div>
      </div>
    </div>
  )
}

export default  SharedTableProvider<{}>(BasicsData)
