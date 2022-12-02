import * as fs from 'node:fs/promises';

async function run () {
  const file = fs.open('./input.txt');

  const elves = [{ items: [], calories: 0}]

  for await (const line of (await file).readLines()) {
    if (line.length === 0) {
      elves.push({ items: [], calories: 0})
      continue
    }

    const elve = elves.at(-1)
    const item = Number.parseInt(line, 10)

    elve.items.push(item)
    elve.calories += item
  }

  elves.sort((a, b) => b.calories - a.calories);

  console.log(`Best: ${elves[0].calories}`)
  console.log(`Top 3: ${elves[0].calories + elves[1].calories + elves[2].calories}`)
}

run()
