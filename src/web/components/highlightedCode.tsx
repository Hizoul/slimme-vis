import * as React from "react"
import { colors } from "./keywords"

class HighlightedCode extends React.Component<{line?: number}, any> {
  public render() {
    return (
      <div className="flex1 column code">
        <div className={`line${this.props.line === 1 ? " highlighted" : ""}`}>
          1.&nbsp;<span style={{color: colors.ct}}>CT</span> ←
          &nbsp;<span style={{color: colors.st}}>Standard Code Table</span>
          (<span style={{color: colors.database}}>D</span>)
        </div>
        <div className={`line${this.props.line === 2 ? " highlighted" : ""}`}>
          2.&nbsp;{"for F ∈ {X ∪ Y : X, Y ∈"} <span style={{color: colors.ct}}>CT</span> {"} in Gain Order do"}
        </div>
        <div className={`line${this.props.line === 3 ? " highlighted" : ""}`}>
          3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: colors.ct}}>CTc</span> ←
          &nbsp;(<span style={{color: colors.ct}}>CT</span> ⊕ F ) in Standard Cover Order
        </div>
        <div className={`line${this.props.line === 4 ? " highlighted" : ""}`}>
          4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if L(<span style={{color: colors.database}}>D</span>, <span style={{color: colors.ct}}>CTc</span>) {"<"}
          &nbsp;L(<span style={{color: colors.database}}>D</span>, <span style={{color: colors.ct}}>CT</span>) then
        </div>
        <div className={`line${this.props.line === 5 ? " highlighted" : ""}`}>
          5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: colors.ct}}>CT</span> ←
          &nbsp;post-prune(<span style={{color: colors.ct}}>CTc</span>)
        </div>
        <div className={`line${this.props.line === -1 ? " highlighted" : ""}`}>
          6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end if
        </div>
        <div className={`line${this.props.line === -1 ? " highlighted" : ""}`}>
          7.&nbsp;end for
        </div>
        <div className={`line${this.props.line === 8 ? " highlighted" : ""}`}>
          8.&nbsp;return <span style={{color: colors.ct}}>CT</span>
        </div>
      </div>
    )
  }
}

export default HighlightedCode
