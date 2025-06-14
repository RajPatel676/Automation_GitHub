function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInterval(min = 300, max = 1200) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { delay, randomInterval };
