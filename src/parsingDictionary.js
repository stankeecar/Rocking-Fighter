const dict = {
  attack: [
    'hit',
    'harm',
    'damage',
    'hurt'
  ],
  punch: [
    'fisthit',
    'fist',
    'fisticuffs',
    'give knucklesandwich'
  ]
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
  give: [
    'hand'
  ]
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
  ],
  equip: [
    'wear'
  ],
  unequip: [
    'takeoff'
  ]
}

function parsingDictionary(verb){
  for (let key in dict) {
    if ((dict[key].includes(verb)) || (key === verb)) return key
  }
  return 'error'
}

export default parsingDictionary
