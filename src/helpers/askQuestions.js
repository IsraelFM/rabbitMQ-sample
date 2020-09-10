const readline = require('readline')


function askQuestion (query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close()
      resolve(ans)
    })
  )
}

const getMessages = async () => {
  const number1 = await askQuestion('Digite um numero:  ')
  const number2 = await askQuestion('Digite um segundo numero:  ')
  return { number1, number2 }
}

module.exports = { getMessages }
