import { clear, close } from './postgres.js'
await clear()
await close()
console.log('cleared')
