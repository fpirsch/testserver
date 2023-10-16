const { floor, random } = Math
const randomAscii = () => 97 + floor(random() * 26)
const randomAmountInEuros = () => floor((random() - 0.2) * 10000) / 100 // between -20.00 and +80.00
const randomLetters = (length) =>
  Buffer.from(Array.from({ length }, randomAscii)).toString()
const randomPastTimestamp = (from = Date.now()) =>
  from - floor(random() * 24 * 3600 * 1000)

export const listWithTimestamps = Array.from({ length: 20 }, () => ({
  name: randomLetters(20),
  amount1: randomAmountInEuros(),
  amount2: randomAmountInEuros(),
  amount3: randomAmountInEuros(),
  createdAt: randomPastTimestamp(),
  updatedAt: randomPastTimestamp(),
  deletedAt: randomPastTimestamp(),
}))

export const listWithDates = listWithTimestamps.map((item) => ({
  ...item,
  createdAt: new Date(item.createdAt),
  updatedAt: new Date(item.updatedAt),
  deletedAt: new Date(item.deletedAt),
}))
