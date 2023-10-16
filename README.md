# testserver

A test project to benchmark various backend design options with [autocannon](https://github.com/mcollina/autocannon).

- REST/Fastify vs GraphQL/Apollo
- Date format: GraphQLISODateTime vs GraphQLTimestamp
- storage: RAM vs Postgres
- Postgres: `decimal` vs `double`

# installation

```
yarn
```

For tests involving the database, you need to have a Postgres instance running, and set the connection URL in `.env`

# running the tests

## REST

```
node fastify

yarn autocannon:rest:ram:ts
yarn autocannon:rest:ram:dates
yarn autocannon:rest:db:decimals
yarn autocannon:rest:db:doubles

node clear-postgres
```

## GraphQL

```
node apollo

yarn autocannon:gql:ram:ts
yarn autocannon:gql:ram:dates
yarn autocannon:gql:db:decimals
yarn autocannon:gql:db:doubles

node clear-postgres
```
