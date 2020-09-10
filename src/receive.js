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

    const queue = 'hello'

    channel.assertQueue(queue, {
      durable: false
    })

    console.log('[X] Waiting for messages.')

    channel.consume(queue, consumeFunction)
  })
})
