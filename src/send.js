/**
 *  carregando as dependencias necessárias para a aplicação
 *  amqplib/callback_api é uma lib que irá nos dar uma api para estabelecermos
 *  utilizarmos uma conexão com o protocolo AMQP.
 *
 *  getMessages é uma função que irá fazer 2 perguntas ao usuario para capturarmos
 *  estes numeros e depois enviarmos para fila
 *
 *  NUMBERS é uma variável que receberá os numeros enviados pelo console
 */

const amqp = require('amqplib/callback_api')
const { getMessages } = require('./helpers/askQuestions')
let NUMBERS

// apenas uma abstração da nossa conexão para ser usada mais abaixo
function connectToRabbit () {
  /**
   *  inicializando a conexão, aqui dizemos a lib aonde vamos nos connectar,
   *  neste caso ele irá pegar os valores padrões da conexão com a AMQP como
   *  por exemplo 5672.
   */
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0
    }
    /**
     *  Caso a conexão seja bem sucedida vamos iniciar nosso canal de comunicação
     *  entre nossa aplicação e o servidor do rabbitMQ
     */
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }

      // Declarando o nome da nossa exchange

      const exchange = 'direct_logs'

      /**
       *  Declarando qual será nossa mensagem a ser enviada para nossa exchange
       *  neste caso um buffer do nosso objeto NUMBERS que contem os 2 numeros
       *  digitado pelo usuário
       */
      const message = Buffer.from(JSON.stringify(NUMBERS).toString())

      /**
       *  após darmos o start na nossa comunicação, vamos estabalecer nossa exchange,
       *  utilizando a api da amqplib assertExchange
       */
      channel.assertExchange(exchange, 'direct', { durable: false })

      /**
       *  Publisher.
       *  neste momento iremos enviar efetivamente nossa mensagem para a exchange,
       *  através da api publish, ela recebe 3 parâmetros, o nome da exchange
       *  um 'pattern' para identificar a mensagem e nossa mensagem previamente declarada como
       *  um buffer
       */
      channel.publish(exchange, 'info', message)

      // Serve apenas para nos mostrar o buffer que foi enviado.
      console.log('[X] Sent ', message)
    })
    /**
     *  Esta função serve apenas para que nossa aplicação espere alguns momentos
     *  antes de encerrar nossa conexão atraves do connection.close()
     *  e o encerramento do nosso processo utilizando o proccess.exit(0)
     */
    setTimeout(function () {
      connection.close()
      process.exit(0)
    }, 500)
  })
}

async function handle () {
  // Chamada da função que faz as perguntas para o usuário e coloca na variável NUMBERS
  NUMBERS = await getMessages()
  // Chamada da nossa abstração da conexão com o rabbitMQ
  connectToRabbit()
}
// Utilizado para chamar nossas funções em conjunto.
handle()
