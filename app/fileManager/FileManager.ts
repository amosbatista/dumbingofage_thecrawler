const fs = require("fs");

const saveJson = (path: string, content: any) => {
  fs.promises.appendFile(path, JSON.stringify(content));
}

export default saveJson
