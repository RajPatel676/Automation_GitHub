// index.js
const simpleGit = require('simple-git');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const git = simpleGit();
const { modifyOrCreateFile } = require('./utils/fileModifier');
const messages = require('./utils/commitMessages');
const { delay, randomInterval } = require('./utils/helpers');

const commitCount = parseInt(process.argv[2], 10) || 50;

async function ensureTempDir() {
  const dir = path.resolve('./temp');
  await fs.ensureDir(dir);
}

async function generateCommits(count) {
  console.log(chalk.cyan(`\n🌱 Starting to generate ${count} synthetic commits...\n`));

  for (let i = 0; i < count; i++) {
    const file = modifyOrCreateFile();
    const message = messages[Math.floor(Math.random() * messages.length)];

    await git.add(file);
    await git.commit(message);

    console.log(chalk.green(`✅ Commit #${i + 1}: "${message}"`));

    await delay(randomInterval());
  }

  console.log(chalk.yellow(`\n🚀 All ${count} commits generated.`));
}

async function pushToRemote() {
  console.log(chalk.cyan('\n🔄 Pushing changes to origin...'));
  await git.push();
  console.log(chalk.green('✅ Pushed to remote repository successfully.'));
}

(async () => {
  try {
    await ensureTempDir();
    await generateCommits(commitCount);
    await pushToRemote();
  } catch (err) {
    console.error(chalk.red(`❌ Error: ${err.message}`));
  }
})();
