const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const TARGET_DIR = './temp';

function modifyOrCreateFile() {
  const fileName = `file_${faker.string.alphanumeric(5)}.txt`;
  const filePath = path.join(TARGET_DIR, fileName);

  const shouldModify = Math.random() > 0.4 && fs.existsSync(filePath);

  if (shouldModify) {
    fs.appendFileSync(filePath, `\n// ${faker.hacker.phrase()}`);
  } else {
    fs.writeFileSync(filePath, `// ${faker.hacker.phrase()}`);
  }

  return filePath;
}

module.exports = { modifyOrCreateFile };
