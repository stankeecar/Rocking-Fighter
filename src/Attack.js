// import React, { Component } from 'react';

function Attack ({character, enemy}) {
  console.log(character)
  const attackDamage = character.level * character.attack
  let healthAfterDamage = enemy.health - attackDamage
  if (healthAfterDamage < 0) healthAfterDamage = 0

  const message = `You hit the ${enemy.name} and did ${(enemy.health - healthAfterDamage)} damage.`

  enemy.health = healthAfterDamage
  return ({ enemy, message })
}

export default Attack;
