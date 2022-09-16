const fs = require('fs/promises');
const path = require('path');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  getById(id) {
    this.filePath = path.join(this.dirPath, `${id}.json`);
    return fs
      .readFile(this.filePath)
      .then((file) => JSON.parse(file))
      .catch((error) => {
        if (error.code === 'ENOENT') {
          throw new Error(`Bad file: ${this.filePath}`);
        }
        throw error;
      });

  }

}

module.exports = SimpleDb;
