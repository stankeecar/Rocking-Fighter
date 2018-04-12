// import React, { Component } from 'react';

function Attack ({character, enemy}) {
  console.log(character)
  const attackDamage = character.level * character.attack
  let healthAfterDamage = enemy.health - attackDamage
  if (healthAfterDamage < 0) healthAfterDamage = 0

  const message = [`You hit the ${enemy.name} and did ${(enemy.health - healthAfterDamage)} damage.`]

  enemy.health = healthAfterDamage
  if (enemy.health === 0) {
    message.push(`You defeated the ${enemy.name}!!`)
    const audio = new Audio("https://ia801306.us.archive.org/32/items/FF7ACVictoryFanfareRingtoneperfectedMp3/FF7%20AC%20Victory%20Fanfare%20Ringtone%20(perfected%20mp3).mp3")
    audio.play()
  }
  return ({ enemy, message })
}

export default Attack;
