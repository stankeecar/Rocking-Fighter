function PrintTerminal(message, classForMessage = 'cpu-response-printed') {
  const mainTerminal = document.getElementById('main-terminal')
  for (let i = 0; i < message.length; i++) {
    const newLine = document.createElement('p')
    if (classForMessage === "user-text-printed") {
      newLine.innerHTML = `> <span class="${classForMessage}">${message[i]}</span>`
    } else {
      newLine.innerHTML = `${message[i]}`
      newLine.className = classForMessage
    }
    mainTerminal.append(newLine)
  }
  mainTerminal.scrollTop = mainTerminal.scrollHeight
}

export default PrintTerminal
