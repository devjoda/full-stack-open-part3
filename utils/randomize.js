const generateRandomId = () => Math.trunc(Math.random() * 1000000000000000)

const randomize = {
  generateRandomId,
}

module.exports = { randomize }
