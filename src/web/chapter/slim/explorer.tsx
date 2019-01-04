import { get } from "lodash"
import * as React from "react"
import { FaCross, FaMinus, FaTable, FaTimes, FaWpexplorer } from "react-icons/fa"
import { ComponentBase } from "resub"
import { Database } from "../../../slim/processDatabaseAsString"
import { SortedCodeTable } from "../../../slim/standardCodeTable"
import translate from "../../../util/translation"
import CodeTable from "../../components/codeTable"
import Loading from "../../components/loading"
import InteractiveStore from "./interactiveStore"
import { IPairChoice } from "./workerConstants"

export interface ISLIMExplorerState {
  dataset: Database
  standardCodeTable: SortedCodeTable
  exploredPairs: IPairChoice[]
  loading?: boolean
  translation: any
  path: any[]
  popupPath: any[]
  sortType: number
}

const PairDisplayer: React.FunctionComponent<{
  exploredPairs: IPairChoice[], translation: any, path: number[]
}> = (props) => {
  return (
    <div className="inline">
      {props.exploredPairs.map((entry) => {
        const translation = translate(entry.set, props.translation)
        let isActive = entry.path.length > 0
        for (let i = 0; i < entry.path.length; i++) {
          if (entry.path[i] !== props.path[i]) {
            isActive = false
          }
        }
        return (
          <div className={`candidate${isActive ? " active" : ""}`} key={JSON.stringify(entry.set)}>
            <div className="candidateInfo">
              <div>{translation}</div>
              {entry.loading ? <Loading /> : (
                <div>|L%| = {entry.compression.toFixed(2)}</div>
              )}
            </div>
            {entry.loading ? null : (
              <div className="candidateButtons">
                <a
                  onClick={() => {
                    InteractiveStore.explore(entry.path)
                  }}
                >
                  <FaWpexplorer />
                </a>
                <a
                  onClick={() => {
                    InteractiveStore.setPopupPath(entry.path)
                  }}
                >
                  <FaTable />
                </a>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const CandidateInfo: React.FunctionComponent<{
  candidate: IPairChoice
}> = (props) => {
  return (
    <div className="popup">
      <a
        className="inline center"
        onClick={() => {
          InteractiveStore.setPopupPath([])
        }}
      >
        <FaTimes /> Close PopUp
      </a><br />
      Achieved relative compression |L%| = {props.candidate.compression}<br />
      Final Code Table:
      <CodeTable {...props} codeTable={props.candidate.finalCodeTable} />
      Code Table into which the pair {translate(props.candidate.set, InteractiveStore.getTranslation())} is inserted:
      <CodeTable {...props} codeTable={props.candidate.codeTableToExplore} />
    </div>
  )
}

class SLIMExplorer extends ComponentBase<any, ISLIMExplorerState> {
  public render() {
    const pairs = [<PairDisplayer {...this.state} key={"initial"} />]
    let getFrom = this.state.exploredPairs
    let i = 0
    for (const num of this.state.path) {
      if (num !== "children") {
        i++
        getFrom = getFrom[num].children
        pairs.push(
          <PairDisplayer {...this.state} key={i} exploredPairs={getFrom} />
        )
      }
    }
    let popup = null
    if (this.state.popupPath.length > 0) {
      popup = <CandidateInfo {...this.state} candidate={get(this.state.exploredPairs, this.state.popupPath)} />
    }
    return (
      <div className="c2">
        <div className="c2 paddingContainer">
          <h1>Candidate Explorer</h1>
          <div className="line">
            This part is the main contribution of this work. It allows to see (up to) 10 of the top candidates available at the current iteration and displays resulting relative compression if it were used.
          </div>
          <div className="line">
            Change the sort order to see its effect on the achievable relative compression:
          </div>
          <select
            value={this.state.sortType}
            onChange={(a) => {
              const b: any = a.target.value
              InteractiveStore.setSortType(b)
            }}
          >
            <option value={0}>Gain Descending</option>
            <option value={1}>Gain Ascending</option>
            <option value={2}>Random</option>
          </select>
        </div>
        {this.state.loading ? (<div>Calculating Candidates</div>) :
          pairs
        }
        {popup}
      </div>
    )
  }
  protected _buildState(props: any, initialBuild: boolean): ISLIMExplorerState {
    return {
      dataset: InteractiveStore.getParsedDataset(),
      translation: InteractiveStore.getTranslation(),
      standardCodeTable: InteractiveStore.getStandardCodeTable(),
      exploredPairs: InteractiveStore.getExploredPairs(),
      loading: InteractiveStore.getLoading(),
      path: InteractiveStore.getPath(),
      popupPath: InteractiveStore.getPopupPath(),
      sortType: InteractiveStore.getSortType()
    }
  }
}

export default SLIMExplorer
