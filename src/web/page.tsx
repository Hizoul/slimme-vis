import * as React from "react"
import Book from "./book/index"
import "./style.sass"
import DataEditor from "./components/dataEditor";

const Page: React.FunctionComponent<any> = (props) => {
  return (
    <div>
      <Book />
      <DataEditor />
    </div>
  )
}

export default Page
