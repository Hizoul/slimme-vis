import * as React from "react"
import { FaFish, FaLightbulb, FaQuestion } from "react-icons/fa"

const Header: React.FunctionComponent<any> = (props) => {
  return (
    <div className="header c3 center">
      <h1>
        <div  style={{position: "relative"}}>
        <FaQuestion
          style={{
            fontSize: "2.5rem",
            position: "absolute",
            left: "35pt",
            top: "-15pt",
            transform: "scale(-1, 1) rotate(30deg)",
            color: "yellow"
          }}
        />
        <FaFish style={{fontSize: "4rem"}} />
        <FaLightbulb
          style={{
            animation: "growing 2s",
            animationIterationCount: "infinite",
            fontSize: "2.5rem",
            position: "absolute",
            left: "90pt",
            top: "-15pt",
            transform: "rotate(30deg)",
            color: "yellow"
          }}
        />
        </div>
        SLIM(me) vis
      </h1>
      <div className="line">
          An interactive visual journey into SLIM
      </div>
    </div >
  )
}

export default Header
