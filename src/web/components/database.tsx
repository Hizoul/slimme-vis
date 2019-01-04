import * as React from "react"
import { Database } from "../../slim/processDatabaseAsString"
import translate, { ITranslation } from "../../util/translation"
import { KeywordDatabase } from "./keywords"

const Database: React.FunctionComponent<{dataset: Database, translation?: ITranslation}> = (props) => {
  const toShow = []
  for (const classKey of Object.keys(props.dataset)) {
    for (const entry of props.dataset[classKey]) {
      toShow.push(
        <div key={JSON.stringify(entry)}>
          {translate(entry, props.translation).map((val) => <span key={val} className="setItem">{val}</span>)}
        </div>
      )
    }
  }
  return (
    <div className="database center">
      <div className="marginBottom"><KeywordDatabase /></div>
      {toShow}
    </div>
  )
}

export default Database
