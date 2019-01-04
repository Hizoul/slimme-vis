import * as React from "react"
import BasicsCover from "../chapter/basics/cover"
import BasicsData from "../chapter/basics/data"
import BasicsEncoding from "../chapter/basics/encoding"
import Basics from "../chapter/basics/index"
import Choice from "../chapter/choice"
import Header from "../chapter/header"
import SLIMChapter from "../chapter/slim"
import SLIMExplorer from "../chapter/slim/explorer"
import SLIMStepByStep from "../chapter/slim/stepByStep"

export interface IChapter {
  title: string
  content: any
  subchapters?: IChapter[]
}

const chapters: IChapter[] = [
  {title: "Header", content: <Header />},
  {title: "Basics", content: <Basics />, subchapters: [
    {title: "Data", content: <BasicsData />},
    {title: "Encoding", content: <BasicsEncoding />},
    {title: "Cover", content: <BasicsCover />}
  ]},
  {title: "SLIM", content: <SLIMChapter />, subchapters: [
    {title: "Step by Step", content: <SLIMStepByStep />},
    {title: "Candidate Explorer", content: <SLIMExplorer />}
  ]}
]

const mapChapter = (chapter: IChapter) => {
  return (
    <div key={chapter.title}>
      {chapter.content}
      {chapter.subchapters ? chapter.subchapters.map(mapChapter) : null}
    </div>
  )
}

const Book: React.FunctionComponent<any> = (props) => {
  return (
    <div>
      {chapters.map(mapChapter)}
    </div>
  )
}

export default Book
