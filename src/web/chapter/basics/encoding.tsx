import * as React from "react"
import codeLength from "../../../slim/codeLength"
import CodeTable from "../../components/codeTable"
import { KeywordCodeTable, KeywordDatabase, KeywordItems, KeywordStore } from "../../components/keywords"
import SharedTableProvider, { ITableProviderProps } from "../../components/provideCodeTable"

const BasicsEncoding: React.FunctionComponent<ITableProviderProps> = (props) => {
  return (
    <div className="paddingContainer c4">
      <h1 className="center noMargin"><KeywordCodeTable /></h1>
      <div className="inline">
        <div className="flex1 column">
          <div className="line">
            All products the <KeywordStore /> has to offer are his <KeywordItems />.
          </div>
          <div className="line">
            A <KeywordCodeTable /> consists of sets of these <KeywordItems /> on the left, paired by their usage on the right (see Cover below on how to calculate the usage).
          </div>
          <div className="line">
            Here the <KeywordCodeTable /> only consists of singletons which makes it the <KeywordCodeTable isStandard={true} />.
          </div>
          <div className="line">
            Thanks to Shannons Entropy principle, one can convert the usage count into the probablity for the occurrence of a set. The most frequent longest set gets the shortest code and the most unusued shortest set gets the longest code. The result of this can be seen in the "Code Length" column of the table.
          </div>
          <div className="line">
            This also allows us to calculate the required amount of bits to encode a <KeywordDatabase /> via a <KeywordCodeTable />: {codeLength(props.database, props.standardTable).toFixed(2)} Bits
          </div>
          <div className="line">
            Now the goal is, to find a code table that uses the least amount of bits to describe the data. This principle is expressed through the Minimum Description Length (MDL).
          </div>
          <div className="line">
            A code table aiming for more compression could look like this. This one only needs: {codeLength(props.database, props.improvedTable).toFixed(2)} Bits.
          </div>
        </div>
        <div className="flex1 marginRight column">
          <CodeTable codeTable={props.standardTable} translation={props.translation} showLength={true} editable={true}/>
          <CodeTable codeTable={props.improvedTable} translation={props.translation} showLength={true} />
        </div>
      </div>
    </div>
  )
}

export default SharedTableProvider<{}>(BasicsEncoding)
