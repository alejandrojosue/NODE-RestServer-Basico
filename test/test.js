const test = require('node:test')
const assert = require('node:assert')

test('try Array.findLastIndet', () => {
  const numbers = [2, 4, 6]
  const lastEven = numbers.findLast(n => n % 2 === 0)
  // assert.equal(valorObtenido, valorEsperado)
  assert.equal(lastEven, 8)
})
