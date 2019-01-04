import * as React from "react"
import "./loading.sass"

const Loading: React.FunctionComponent<any> = (props) => {
  return (
    <div>
      <div className="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  )
}

export default Loading
