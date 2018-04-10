function Welcome({character, enemy}) {
  const welcomeMessage = [
    `Welcome to Rocking Fighter (patent pending)!!`,
    `Type "help" at any time for.... well, for help.`,
    `You are in a cave.`,
    `You see a ${enemy.name}. It is a suspicious ${enemy.name}.`,
    `You are now battling the ${enemy.name}!`,
    `What do you do?`
  ]

  return welcomeMessage
}

export default Welcome;
