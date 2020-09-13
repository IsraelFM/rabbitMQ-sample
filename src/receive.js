const amqp = require('amqplib/callback_api')
const { consumeFunction } = require('./helpers/consume')

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }

    const exchange = 'direct_logs'

    channel.assertExchange(exchange, 'direct', {
      durable: false
    })

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
