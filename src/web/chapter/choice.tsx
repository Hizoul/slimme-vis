import * as React from "react"

const Choice: React.FunctionComponent<any> = (props) => {
  return (
    <div className="c5 center">
      <h2>How much do you already know?</h2>
      <div className="center inline">
        <a className="button marginRight">Nothing</a>
        <a className="button marginRight">Basics</a>
        <a className="button">Everything</a>
      </div>
    </div>
  )
}

export default Choice
