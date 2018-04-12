const general = [
  `Really thought you'd get this on your own, but...`,
  `Type 'help name' to find out more about the function name.`
]

const attack = [
  `You can attack stuff!`,
  `Try it! Type "attack"!`
]

const look = [
  `You can look at stuff!`,
  `It's AMAZING!!`
]

function Help(query){
  query = query || 'general'

  const helpList = {
    general: general,
    attack: attack,
    look: look,
  }
  const response = helpList[query] ?
    helpList[query].slice() :
    [`Can't help with "${query}"`]
  if (query === 'general') {
    const keyList = Object.keys(helpList)
    // concat isn't working. We tried.
    // response.concat(keyList)
    response.push(keyList)
  }

  return response
}

export default Help;
