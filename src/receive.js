/**
 *  carregando as dependencias necessárias para a aplicação
 *  amqplib/callback_api é uma lib que irá nos dar uma api para estabelecermos
 *  utilizarmos uma conexão com o protocolo AMQP.
 *
 *  ConsumeFunction, essa função fará o consumo dos dados da api, essa função pode
 *  ser e é 100% desacoplada da nossa fila, nessa função podemos realizar qualquer
 *  operação, neste exemplo estamos apenas fazendo alguns calculos com os dados fornecidos
 *  porém na vida real você poderá utilizar o que for de sua necessidade
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
    /**
     *  Recebemos duas variáveis neste momento, um error1 que será nulo caso tudo
     *  ocorra como esperado, e uma interface channel que representa nosso canal de 
     *  comunicação api com o servidor do RabbitMQ
     */
    if (error1) {
      throw error1
    }


    // Declarando que o nome da nossa fila é 'hello'
    const queue = 'hello'

    /**
     *  após darmos o start na nossa comunicação, vamos estabalecer nossa fila,
     *  utilizando a api da amqplib assertQueue
     */
    channel.assertQueue(queue, {
      durable: false
    })

    // Apenas para dizermos que estamos escutando por mensagens a serem enviadas
    console.log('[X] Waiting for messages.')

    /**
     *  Consumer.
     *  Aqui iremos utilizar a api consume da amqplib, nesse momento estamos dizendo
     *  para nossa aplicação consumir os dados da fila, aqui mandamos 2 parâmetros,
     *  o nome da nossa fila e uma função que será executada no momento que o nosso
     *  consumer estiver pronto para executa-la
     */
    channel.consume(queue, consumeFunction)
  })
})
