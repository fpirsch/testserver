import Fastify from 'fastify'

import { listWithDates, listWithTimestamps } from './data.js'
import { create, readDecimals, readDoubles } from './postgres.js'

await create()

const fastify = Fastify({ logger: false })

// Routes
fastify.get('/', (req, reply) => reply.send({ hello: 'world' }))
fastify.get('/ts', (req, reply) => reply.send(listWithTimestamps))
fastify.get('/dates', (req, reply) => reply.send(listWithDates))
fastify.get('/pgdoubles', async (req, reply) => reply.send(await readDoubles()))
fastify.get('/pgdecimals', async (req, reply) => {
  // PG returns decimals as strings, but the API exposes numbers.
  const dec = await readDecimals()
  reply.send(
    dec.map((item) => ({
      ...item,
      amount1: +item.amout1,
      amount2: +item.amout2,
      amount3: +item.amout3,
    }))
  )
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
