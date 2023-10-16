import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { GraphQLTimestamp } from './scalars/timestamp.js'
import { GraphQLISODateTime } from './scalars/isodate.js'
import { listWithDates, listWithTimestamps } from './data.js'
import { create, readDecimals, readDoubles } from './postgres.js'

await create()

const typeDefs = `#graphql
  scalar DateTime
  scalar Timestamp

  type ItemWithTimestamps {
    name: String
    amount1: Float
    amount2: Float
    amount3: Float
    createdAt: Timestamp
    updatedAt: Timestamp
    deletedAt: Timestamp
  }

  type ItemWithDates {
    name: String
    amount1: Float
    amount2: Float
    amount3: Float
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime
  }

  type Query {
    withTimestampsFromRAM: [ItemWithTimestamps]
    withDatesFromRAM: [ItemWithDates]
    withDecimalsFromDB: [ItemWithDates]
    withDoublesFromDB: [ItemWithDates]
  }
`

const resolvers = {
  Timestamp: GraphQLTimestamp,
  DateTime: GraphQLISODateTime,
  Query: {
    withTimestampsFromRAM: () => listWithTimestamps,
    withDatesFromRAM: () => listWithDates,
    withDecimalsFromDB: async () => await readDecimals(),
    withDoublesFromDB: async () => await readDoubles(),
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`🚀  Server ready at: ${url}`)
