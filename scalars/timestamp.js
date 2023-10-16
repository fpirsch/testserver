// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
// https://github.com/Urigo/graphql-scalars/blob/master/src/scalars/Timestamp.ts

import { GraphQLScalarType, Kind } from 'graphql'

console.log('creation')
export const GraphQLTimestamp = new GraphQLScalarType({
  name: 'Timestamp',
  description:
    'The javascript `Date` as integer. Type represents date and time ' +
    'as number of milliseconds from start of UNIX epoch.',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime() // Convert outgoing Date to integer for JSON
    } else if (typeof value === 'number') {
      return Math.trunc(value)
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object')
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value) // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`')
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10))
    }
    // Invalid hard-coded value (not an integer)
    return null
  },
})
