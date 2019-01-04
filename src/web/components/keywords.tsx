import * as React from "react"
import { FaAlignLeft, FaClipboardList, FaDatabase, FaSortAlphaDown, FaStore, FaTable } from "react-icons/fa"
import { MdRepeat } from "react-icons/md"
import { iconClasses, mainIcon } from "../chapter/globals"

const colors = {
  database: "#acff92",
  items: "#ff79a1",
  transaction: "#00e8ff",
  pattern: "#004400",
  st: "#a16c21",
  ct: "#dc9f53"
}

const KeywordDatabase: React.FunctionComponent<any> = (props) => {
  return (
    <span>
      <FaDatabase className={mainIcon} style={{color: colors.database}} />Database
      &nbsp;<i style={{color: colors.database}}>D</i>
    </span>
  )
}
const KeywordItems: React.FunctionComponent<any> = (props) => {
  return (
    <span>
      <FaSortAlphaDown className={mainIcon} style={{color: colors.items}} />Items
      &nbsp;<i style={{color: colors.items}}>I</i>
    </span>
  )
}
const KeywordStore: React.FunctionComponent<any> = (props) => {
  return (
    <span><FaStore className={iconClasses} />grocery store</span>
  )
}
const KeywordTransaction: React.FunctionComponent<any> = (props) => {
  return (
    <span>
      <FaClipboardList className={mainIcon} style={{color: colors.transaction}} />transaction
      &nbsp;<i style={{color: colors.transaction}}>t</i>
    </span>
  )
}

const KeywordPattern: React.FunctionComponent<any> = (props) => {
  return (
    <span><MdRepeat className={mainIcon} style={{color: colors.pattern}} />patterns</span>
  )
}

const KeywordCover: React.FunctionComponent<any> = (props) => {
  return (
    <span><FaAlignLeft className={mainIcon} style={{color: colors.pattern}} />Cover</span>
  )
}

const KeywordCodeTable: React.FunctionComponent<{
  isStandard?: boolean
}> = (props) => {
  const color = props.isStandard ? colors.st : colors.ct
  return (
    <span>
      <FaTable className={mainIcon} style={{color}} />
      {props.isStandard ? "Standard" : ""} Code Table <i style={{color}}>{props.isStandard ? "ST" : "CT"}</i>
    </span>
  )
}

export {
  KeywordDatabase, KeywordItems, KeywordCodeTable, KeywordStore, KeywordTransaction,
  KeywordPattern, colors, KeywordCover
}
