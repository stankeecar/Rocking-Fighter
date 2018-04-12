const dict = {
  attack: [
    'hit'
  ],
  help: [
    '?',
    'h'
  ],
  look: [
    'inspect',
    'examine'
  ],
  get: [
    'pickup',
    'grab',
    'acquire'
  ],
  use: [
    'utilize'
  ],
  eat: [
    'consume'
  ],
  inventory: [
    'inv',
    'i'
  ],
  north: [
    'n'
  ],
  move: [
    'go',
    'travel',
    'direction',
    'walk'
  ],
  crouch: [
    'kneel'
  ],
  hide: [
    'conceal'
  ]
}

function parsingDictionary(verb){
  for (let key in dict) {
    if ((dict[key].includes(verb)) || (key === verb)) return key
  }
  return 'error'
}

export default parsingDictionary
