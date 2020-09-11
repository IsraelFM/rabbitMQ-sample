/**
 * Declaração de uma biblioteca de funções nativa do NodeJs
 * que nos possibilitará fazer a conexão com o console e o input do usuário
 * para que ele possa digitar os numeros que serão enviados para o calculo.
 */
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
/**
 * Apenas montando as perguntas que queremos através da nossa abstração de 
 * pegar um input do usuário e enviando no formato de um objeto javascript
 */
const getMessages = async () => {
  const number1 = await askQuestion('Digite um numero:  ')
  const number2 = await askQuestion('Digite um segundo numero:  ')
  return { number1, number2 }
}

// exportando para ser acessado de outros arquivos
module.exports = { getMessages }
