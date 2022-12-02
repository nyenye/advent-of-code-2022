import * as fs from 'node:fs/promises';

const SHAPES = {
  ROCK: 'ROCK',
  PAPER: 'PAPER',
  SCISSORS: 'SCISSORS',
}

const INPUT_TO_SHAPE = {
  A: SHAPES.ROCK,
  B: SHAPES.PAPER,
  C: SHAPES.SCISSORS,
  X: SHAPES.ROCK,
  Y: SHAPES.PAPER,
  Z: SHAPES.SCISSORS
}

const SHAPE_TO_POINTS = {
  [SHAPES.ROCK]: 1,
  [SHAPES.PAPER]: 2,
  [SHAPES.SCISSORS]: 3,
}

const PLAYS = {
  WIN: 'WIN',
  DRAW: 'DRAW',
  LOOSE: 'LOOSE'
}

const PLAY_TO_POINTS = {
  [PLAYS.WIN]: 6,
  [PLAYS.DRAW]: 3,
  [PLAYS.LOOSE]: 0
}

const ROCK_PLAYS = {
  [SHAPES.ROCK]: PLAYS.DRAW,
  [SHAPES.PAPER]: PLAYS.LOOSE,
  [SHAPES.SCISSORS]: PLAYS.WIN,
}

const PAPER_PLAYS = {
  [SHAPES.ROCK]: PLAYS.WIN,
  [SHAPES.PAPER]: PLAYS.DRAW,
  [SHAPES.SCISSORS]: PLAYS.LOOSE,
}

const SCISSOR_PLAYS = {
  [SHAPES.ROCK]: PLAYS.LOOSE,
  [SHAPES.PAPER]: PLAYS.WIN,
  [SHAPES.SCISSORS]: PLAYS.DRAW,
}

const PLAY_ROUND = {
  [SHAPES.ROCK]: ROCK_PLAYS,
  [SHAPES.PAPER]: PAPER_PLAYS,
  [SHAPES.SCISSORS]: SCISSOR_PLAYS
}

function getShapes (hands) {
  const [handA, handB] = hands.split(" ")
  return [INPUT_TO_SHAPE[handA], INPUT_TO_SHAPE[handB]]
} 

async function run () {
  const file = fs.open('./input.txt');

  let score = 0

  for await (const line of (await file).readLines()) {
    const [oponentShape, myShape] = getShapes(line)
    const myPlay = PLAY_ROUND[myShape][oponentShape]

    const roundScore = SHAPE_TO_POINTS[myShape] + PLAY_TO_POINTS[myPlay]
    score += roundScore
  }

  console.log(`My score: ${score}`)
}

run()
