module.exports.consumeFunction = msg => {
  const numbers = msg.content.toString()
  const { number1, number2 } = JSON.parse(numbers)

  const results = formatCalcs(number1,number2)

  console.log('[X] Received', results.toString())
  
}


function formatCalcs (number1, number2) {
  return `Do some calcs...
    ${+number1} + ${+number2} = ${+number1 + +number2}

    ${+number1} - ${+number2} = ${+number1 - +number2}

    ${+number1} * ${+number2} = ${+number1 * +number2}

    ${+number1} / ${+number2} = ${+number1 / +number2}
  `
}