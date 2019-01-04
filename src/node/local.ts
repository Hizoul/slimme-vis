import { readFileSync } from "fs";
import processDatabaseAsString from '../slim/processDatabaseAsString';

const processLocalDb = (filePath: string) => {
  return processDatabaseAsString(readFileSync(filePath, "UTF-8"))
}

export default processLocalDb