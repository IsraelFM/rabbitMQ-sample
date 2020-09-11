/**
 * @param {object|Buffer} msg
 * recebe a mensagem da fila e coloca no formato de string,
 * após isso fazemos um JSON.parse para recolocarmos os nossos dados no 
 * formato de objeto javascript, após isso chamamos nossa função que realizará alguns 
 * calculos e exibimos o resultado das operações na tela.
 */
module.exports.consumeFunction = msg => {
  const numbers = msg.content.toString()
  const { number1, number2 } = JSON.parse(numbers)

  const results = formatCalcs(number1,number2)

  console.log('[X] Received', results.toString())
  
}

/**
 * Apenas realiza alguns calculos básicos como somar, subtrair, multiplicar e dividir.
 * Serve para mostrar que nossa função Consumer pode ser usada para qualquer coisa 
 * se abstrairmos da maneira correta.
 * 
 * @param {string} number1
 * @param {string} number2
 */
function formatCalcs (number1, number2) {
  return `Do some calcs...
    ${+number1} + ${+number2} = ${+number1 + +number2}

    ${+number1} - ${+number2} = ${+number1 - +number2}

    ${+number1} * ${+number2} = ${+number1 * +number2}

    ${+number1} / ${+number2} = ${+number1 / +number2}
  `
}