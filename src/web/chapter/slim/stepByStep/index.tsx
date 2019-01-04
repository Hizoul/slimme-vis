import * as React from "react"
import { ComponentBase } from "resub"
import HighlightedCode from "../../../components/highlightedCode"
import InteractiveStore from "../interactiveStore"
import SLIMAddToCt from "./addToCt"
import SLIMBuildStandard from "./buildStandard"
import SLIMCompareLength from "./compareLength"
import SLIMGainOrder from "./gainOrder"
import SLIMPrune from "./prune"

export interface ISLIMStepByStepState {
  line: number
}

const steps = [
  null,
  <SLIMBuildStandard key={1} />,
  <SLIMGainOrder key={2} />,
  <SLIMAddToCt key={3} />,
  <SLIMCompareLength key={4} />,
  <SLIMPrune key={5} />
]

class SLIMStepByStep extends ComponentBase<any, ISLIMStepByStepState> {
  public render() {
    return (
      <div className="paddingContainer c2">
        <h1>Pseudo Code</h1>
        <div className="inline">
          <HighlightedCode line={this.state.line} />
        </div>
        <div className="flex1">
          <a
            className="button flex1"
            onClick={() => {
              InteractiveStore.moveLine(true)
            }}
          >
            Previous Step
          </a>
          <a
            className="button flex1"
            onClick={() => {
              InteractiveStore.moveLine(false)
            }}
          >
            Next Step
          </a>
        </div>
        {steps[this.state.line]}
      </div>
    )
  }
  protected _buildState(props: any, initialBuild: boolean): ISLIMStepByStepState {
    return {
      line: InteractiveStore.getCodeLine()
    }
  }
}

export default SLIMStepByStep
