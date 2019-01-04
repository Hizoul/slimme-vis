import * as React from "react"
import { KeywordCodeTable, KeywordDatabase } from "../../components/keywords"

const SLIMChapter: React.FunctionComponent<any> = (props) => {
  return (
    <div className="c2 center">
      <h1>Slim</h1>
      <div className="line">
        In this chapter the SLIM algorithm will be explained step by step.
      </div>
      <div className="line">
        As input SLIM receives a <KeywordDatabase />
      </div>
      <div className="line">
        The output is a <KeywordCodeTable /> that tries to minimize the required amount of bits (MDL)
      </div>
    </div>
  )
}

export default SLIMChapter
