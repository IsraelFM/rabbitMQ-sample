const amqp = require('amqplib/callback_api')
const { getMessages } = require('./helpers/askQuestions')
let NUMBERS

function connectToRabbit () {
  amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
      throw error0
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }

      const exchange = 'direct_logs'

      const message = Buffer.from(JSON.stringify(NUMBERS).toString())

      channel.assertExchange(exchange, 'direct', { durable: false })

      channel.publish(exchange,'info', message)

      console.log('[X] Sent ', message)
    })
    setTimeout(function () {
      connection.close()
      process.exit(0)
    }, 500)
  })
}

async function handle () {
  NUMBERS = await getMessages()
  connectToRabbit()
}

handle()
