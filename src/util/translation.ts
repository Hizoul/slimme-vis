
export interface ITranslation {[index: string]: string}

const translate = (values: number[], translation: ITranslation) => {
  const translated: string[] = []
  for (const value of values) {
    translated.push(
      translation[value] ? translation[value] : String(value)
    )
  }
  return translated
}

export default translate
