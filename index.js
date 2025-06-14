const simpleGit = require('simple-git');
const path = require('path');
const chalk = require('chalk');
const { modifyRealFile } = require('./utils/fileModifier');

const git = simpleGit();
const commitMessages = [
  'Fix typo in documentation',
  'Update README with latest info',
  'Refactor: improve readability',
  'Docs: update comments in utils',
  'Style: format code with Prettier',
  'Enhance error handling in core',
  'Optimize function performance',
  'Add log output for debug mode',
  'Fix broken link in markdown',
  'Update dependencies for security',
  'Add missing return statement',
  'Refactor variable naming',
  'Remove unused imports',
  'Simplify conditional logic',
  'Patch issue with async calls',
  'Add TODO comments for review',
  'Clean up whitespace',
  'Convert var to const/let',
  'Add fallback for undefined props',
  'Improve user feedback on error'
];

function getRandomMessage() {
  return commitMessages[Math.floor(Math.random() * commitMessages.length)];
}

async function simulateCommits(count = 50) {
  console.log(chalk.green(`🌱 Starting to generate ${count} synthetic commits...\n`));

  for (let i = 1; i <= count; i++) {
    try {
      const filePath = modifyRealFile();

      await git.add(filePath);
      const message = getRandomMessage();
      await git.commit(message);

      console.log(chalk.blue(`✅ Commit #${i}: "${message}"`));
    } catch (err) {
      console.error(chalk.red(`❌ Error: ${err.message}`));
      break;
    }

    // Optional delay to simulate real activity (200-800ms)
    await new Promise(res => setTimeout(res, Math.random() * 600 + 200));
  }

  try {
    await git.push();
    console.log(chalk.green(`\n🚀 All ${count} commits pushed successfully!`));
  } catch (pushErr) {
    console.error(chalk.red(`❌ Push failed: ${pushErr.message}`));
  }
}

// Parse CLI arg for commit count
const args = process.argv.slice(2);
const commitCount = parseInt(args[0], 10) || 50;

simulateCommits(commitCount);

// We need to input the open-source UDP hard drive!