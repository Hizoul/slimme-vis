
export interface IClass {
  label: string
  values: number
}

export interface Database {[index: string]: number[][] | undefined}

const processDatabaseAsString = (databaseContent: string) => {
  const classes: Database = {}
  for (const line of databaseContent.split("\n")) {
    const values = line.split(" ").map((value) => {
      if (value.length > 0) {
        return Number(value)
      }
    }).filter((val) => val != null)
    const classKey = String(values[0])
    if (classes[classKey] == null) {
      classes[classKey] = []
    }
    classes[classKey].push(values.splice(1))
  }
  return classes
}

export default processDatabaseAsString
