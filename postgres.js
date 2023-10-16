import postgres from 'postgres'
import 'dotenv/config'

import { listWithDates } from './data.js'

// https://github.com/porsager/postgres
const sql = postgres(process.env.POSTGRES)

const check = (log = true) =>
  process.env.POSTGRES ??
  (log && console.log('No postgres connection provided in .env, skipping.'))

export async function create() {
  if (!check()) return
  await sql`create table if not exists "testserver_items_decimal" ("name" varchar(255), "amount1" decimal(7, 2), "amount2" decimal(7, 2), "amount3" decimal(7, 2), "createdAt" timestamptz(3), "updatedAt" timestamptz(3), "deletedAt" timestamptz(3));`
  await sql`create table if not exists "testserver_items_double" ("name" varchar(255), "amount1" double precision, "amount2" double precision, "amount3" double precision, "createdAt" timestamptz(3), "updatedAt" timestamptz(3), "deletedAt" timestamptz(3));`

  await sql`insert into testserver_items_decimal ${sql(listWithDates)}`
  await sql`insert into testserver_items_double ${sql(listWithDates)}`
}

export async function readDecimals() {
  if (!check()) return []
  return sql`select * from testserver_items_decimal limit ${listWithDates.length}`
}

export async function readDoubles() {
  if (!check()) return []
  return sql`select * from testserver_items_double limit ${listWithDates.length}`
}

export async function clear() {
  if (!check()) return
  await sql`drop table if exists "testserver_items_decimal"`
  await sql`drop table if exists "testserver_items_double"`
}

export async function close() {
  if (!check(false)) return
  await sql.end({ timeout: 5 })
}
