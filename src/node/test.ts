import slim from "../slim"
import { exampleDataset } from "../util/exampleData"
import processLocalDb from "./local"
import { getLPercent } from "../util/eval";

const start = new Date().getTime()
console.log("Doing SLIM for exampleDataSet", new Date(), start)
const dataset = processLocalDb("datasets/mushroom.dat")
const resultTable = slim(dataset)

const end = new Date().getTime()
console.log("done with slim for example dataset", new Date(), end, end - start, getLPercent(dataset, resultTable))
