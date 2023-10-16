faire du svg en dur, avec les positions calculées. Exemple
https://codepen.io/krutie/pen/eoRXWP

# Fastify

## Serveur initial (hello world)

```
node_modules/.bin/autocannon http://localhost:3000
```

avg latency: 0.01 ms
avg req/s: 75936
avg bytes/s: 14.3 MB

## GET liste de 20 petits objets avec timestamps

```
node_modules/.bin/autocannon http://localhost:3000/ts
```

avg latency: 0.01 ms
avg req/s: 30886
avg bytes/s: 103 MB

## GET liste de 20 petits objets avec Dates

```
node_modules/.bin/autocannon http://localhost:3000/dates
```

avg latency: 0.05 ms
avg req/s: 17615
avg bytes/s: 72.2 MB

## GET liste de 20 petits objets en DB avec doubles

```
node_modules/.bin/autocannon http://localhost:3000/pgdoubles
```

avg latency: 0.84 ms
avg req/s: 8000
avg bytes/s: 33.9 MB

## GET liste de 20 petits objets en DB avec décimaux

```
node_modules/.bin/autocannon http://localhost:3000/pgdecimals
```

avg latency: 0.92 ms
avg req/s: 7572
avg bytes/s: 31.7 MB

# GraphQL (Apollo + Express)

## liste de 20 petits objets avec 3 timestamps

curl "http://localhost:4000/?query=query%20Query%20%7B%20withTimestampsFromRAM%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query" -H 'Content-Type: application/json'

```
node_modules/.bin/autocannon -H 'Content-Type':'application/json' "http://localhost:4000/?query=query%20Query%20%7B%20withTimestampsFromRAM%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query"
```

avg latency: 1.48 ms
avg req/s: 4765
avg bytes/s: 16.6 MB

## liste de 20 petits objets avec 3 Dates (RAM)

curl "http://localhost:4000/?query=query%20Query%20%7B%20withDatesFromRAM%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query" -H 'Content-Type: application/json'

```
node_modules/.bin/autocannon -H 'Content-Type':'application/json' 'http://localhost:4000/?query=query%20Query%20%7B%20withDatesFromRAM%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query'
```

avg latency: 1.55 ms
avg req/s: 4514
avg bytes/s: 19.2 MB

## liste de 20 petits objets avec 3 Décimaux (DB)

curl "http://localhost:4000/?query=query%20Query%20%7B%20withDecimalsFromDB%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query" -H 'Content-Type: application/json'

```
node_modules/.bin/autocannon -H 'Content-Type':'application/json' 'http://localhost:4000/?query=query%20Query%20%7B%20withDecimalsFromDB%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query'
```

avg latency: 1.1 ms
avg req/s: 2910
avg bytes/s: 12.4 MB

## liste de 20 petits objets avec 3 Doubles (DB)

curl "http://localhost:4000/?query=query%20Query%20%7B%20withDoublesFromDB%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query" -H 'Content-Type: application/json'

```
node_modules/.bin/autocannon -H 'Content-Type':'application/json' 'http://localhost:4000/?query=query%20Query%20%7B%20withDoublesFromDB%20%7B%20name%20amount1%20amount2%20amount3%20createdAt%20updatedAt%20deletedAt%20%7D%7D&variables=%7B%7D&operationName=Query'
```

avg latency: 1.2 ms
avg req/s: 2840
avg bytes/s: 12.1 MB
