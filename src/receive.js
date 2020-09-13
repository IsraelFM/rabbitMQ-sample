/**
 *  carregando as dependencias necessárias para a aplicação
 *  amqplib/callback_api é uma lib que irá nos dar uma api para estabelecermos
 *  utilizarmos uma conexão com o protocolo AMQP.
 *
 *  ConsumeFunction, essa função fará o consumo dos dados da api, essa função pode
 *  ser e é 100% desacoplada da nossa fila, nessa função podemos realizar qualquer
 *  operação, neste exemplo estamos apenas fazendo alguns calculos com os dados fornecidos
 */
const amqp = require('amqplib/callback_api')
const { consumeFunction } = require('./helpers/consume')

/**
 *  inicializando a conexão, aqui dizemos a lib aonde vamos nos connectar,
 *  neste caso ele irá pegar os valores padrões da conexão com a AMQP como
 *  por exemplo 5672.
 */
amqp.connect('amqp://localhost', function (error0, connection) {
  /**
   *  Recebemos duas variáveis neste momento, um error0 que será nulo caso tudo
   *  ocorra como esperado, e uma interface connection que representa nossa api
   *  de comunicação com o servidor do RabbitMQ
   */
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
    /**
     *  Recebemos duas variáveis neste momento, um error1 que será nulo caso tudo
     *  ocorra como esperado, e uma interface channel que representa nosso canal de
     *  comunicação api com o servidor do RabbitMQ
     */

    // Declarando o nome da nossa exchange
    const exchange = 'direct_logs'

    /**
     *  após darmos o start na nossa comunicação, vamos estabalecer nossa exchange,
     *  utilizando a api da amqplib assertExchange
     */
    channel.assertExchange(exchange, 'direct', {
      durable: false
    })

    /**
     *  após darmos o start na nossa comunicação, vamos estabalecer nossa fila,
     *  utilizando a api da amqplib assertQueue
     */
    /**
     *  Consumer.
     *  Aqui iremos utilizar a api consume da amqplib, nesse momento estamos dizendo
     *  para nossa aplicação consumir os dados da fila, aqui mandamos 2 parâmetros,
     *  o nome da nossa fila e uma função que será executada no momento que o nosso
     *  consumer estiver pronto para executa-la
     */
    channel.assertQueue(
      '',
      {
        exclusive: true
      },
      (err, ok) => {
        console.log('[X] Waiting for messages.')

        channel.bindQueue(ok.queue, exchange, 'info')
        channel.consume(ok.queue, consumeFunction)
      }
    )
  })
})
