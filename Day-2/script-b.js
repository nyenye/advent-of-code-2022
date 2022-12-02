import * as fs from 'node:fs/promises';

const SHAPES = {
  ROCK: 'ROCK',
  PAPER: 'PAPER',
  SCISSORS: 'SCISSORS',
}

const PLAYS = {
  WIN: 'WIN',
  DRAW: 'DRAW',
  LOOSE: 'LOOSE'
}

const INPUT_TO_ITEM = {
  A: SHAPES.ROCK,
  B: SHAPES.PAPER,
  C: SHAPES.SCISSORS,
  X: PLAYS.LOOSE,
  Y: PLAYS.DRAW,
  Z: PLAYS.WIN
}

const SHAPE_TO_POINTS = {
  [SHAPES.ROCK]: 1,
  [SHAPES.PAPER]: 2,
  [SHAPES.SCISSORS]: 3,
}

const PLAY_TO_POINTS = {
  [PLAYS.WIN]: 6,
  [PLAYS.DRAW]: 3,
  [PLAYS.LOOSE]: 0
}

const ROCK_PLAYS = {
  [PLAYS.DRAW]: SHAPES.ROCK,
  [PLAYS.LOOSE]: SHAPES.SCISSORS,
  [PLAYS.WIN]: SHAPES.PAPER,
}

const PAPER_PLAYS = {
  [PLAYS.WIN]: SHAPES.SCISSORS,
  [PLAYS.DRAW]: SHAPES.PAPER,
  [PLAYS.LOOSE]: SHAPES.ROCK,
}

const SCISSOR_PLAYS = {
  [PLAYS.LOOSE]: SHAPES.PAPER,
  [PLAYS.WIN]: SHAPES.ROCK,
  [PLAYS.DRAW]: SHAPES.SCISSORS,
}

const PLAY_ROUND = {
  [SHAPES.ROCK]: ROCK_PLAYS,
  [SHAPES.PAPER]: PAPER_PLAYS,
  [SHAPES.SCISSORS]: SCISSOR_PLAYS
}

function getShapeAndPlay (inputs) {
  const [inputA, inputB] = inputs.split(" ")
  return [INPUT_TO_ITEM[inputA], INPUT_TO_ITEM[inputB]]
} 

async function run () {
  const file = fs.open('./input.txt');

  let score = 0

  for await (const line of (await file).readLines()) {
    const [oponentShape, myPlay] = getShapeAndPlay(line)
    const myShape = PLAY_ROUND[oponentShape][myPlay]

    const roundScore = SHAPE_TO_POINTS[myShape] + PLAY_TO_POINTS[myPlay]
    score += roundScore
  }

  console.log(`My score: ${score}`)
}

run()
