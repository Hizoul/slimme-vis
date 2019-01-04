import { Rect } from "@potion/element"
import { Partition } from "@potion/layout"
import * as React from "react"
import { lengthForSet } from "../../slim/codeLength"
import { SortedCodeTable } from "../../slim/standardCodeTable"
import translate, { ITranslation } from "../../util/translation"

const CodeTablePartition: React.FunctionComponent<{
  codeTable: SortedCodeTable,
  translation?: ITranslation
}> = (props) => {
  const layoutData = []
  for (const entry of props.codeTable) {
    layoutData.push({
      value: entry[1][0],
      key: JSON.stringify(entry[0])
    })
  }
  return (
    <svg width={400} height={400}>
      <Partition
        size={[400, 400]}
        nodeEnter={(d: any) => ({ ...d, r: 0 })}
        data={{key: "bla", children: layoutData}}
      >
        {(nodes: any) => nodes.map(({ key, x0, y0, x1, y1 }: any) => (
          <Rect
            key={key}
            x={x0}
            y={y0}
            width={x1 - x0}
            height={y1 - y0}
            fill="black"
            stroke="white"
          />
        ))}
      </Partition>
    </svg>
  )
}

export default CodeTablePartition
