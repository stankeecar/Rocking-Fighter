import React, { Component } from 'react';
import './App.css';
import Attack from './Attack'
import Help from './Help'
import Welcome from './Welcome'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      inputHistory: [''],
      inputHistoryStep: 0,
      character: {
        name: 'bootyrock',
        level: 1,
        health: 20,
        attack: 5
      },
      enemy: {
        name: 'rock',
        level: 1,
        health: 10,
        attack: 0,
        description: `It's a rock. You don't trust it...`
      },
      playStatus: 'STOPPED'
    }
    this.changeInput = this.changeInput.bind(this)
    this.onEnterInput = this.onEnterInput.bind(this)
    this.checkKey = this.checkKey.bind(this)
  }

  changeInput(e) {
    this.setState({
      input: e.target.value,
    })
  }

  inputIsValid(text) {
    // later iterations will consider/reject more options
    // 'every' prototype function through array of invalid things? valid things?
    return !(text.trim() === '')
  }

  addNewLine(message, classForMessage){
    classForMessage = classForMessage || ''
    const mainTerminal = document.getElementById('main-terminal')
    const inLineClass = classForMessage ?  ` class="${classForMessage}"` : ''

    if (typeof message === 'string') {
      const newLine = document.createElement('p')
      newLine.innerHTML = `<span${inLineClass}>${message}</span>`
      if (classForMessage === "user-text-printed") {
        newLine.innerHTML = '> ' + newLine.innerHTML
      }
      mainTerminal.append(newLine)
    } else {
      for (let i = 0; i < message.length; i++) {
        const newLine = document.createElement('p')
        newLine.innerHTML = `<span${inLineClass}>${message[i]}</span>`
        mainTerminal.append(newLine)
      }
    }
    mainTerminal.scrollTop = mainTerminal.scrollHeight
  }

  parseInput(text) {
    const textArray = text.split(' ')
    const verb = textArray[0]
    const noun = textArray[1]
    switch(verb) {
      case 'help':
        const helpArray = Help(noun)
        this.addNewLine(helpArray,'cpu-response-printed')
        break
      case 'attack':
        const attackInstance = Attack({
          character: this.state.character,
          enemy: this.state.enemy
        })
        this.setState({
          enemy: attackInstance.enemy
        })
        if (attackInstance.enemy.health === 0) {
          this.setState({playStatus: 'PLAYING'})
          setTimeout(() =>{
            this.setState({playStatus: 'STOPPED'})
          }, 5000)
        }
        this.addNewLine(attackInstance.message, 'cpu-response-printed')
        break
      default:
        this.addNewLine(`Do not understand "${text}"`, 'cpu-response-printed')
    }
  }

  onEnterInput(e) {
    e.preventDefault()
    if (!this.inputIsValid(this.state.input)) {
      this.setState({input: ''})
      return
    }
    const userInput = this.state.input.toLowerCase().replace(/[^\w\s]/gi, '')
    const newInputHistory = this.state.inputHistory.slice()
    newInputHistory.splice(this.state.inputHistory.length - 1,0,userInput)
    this.setState({
      inputHistory: newInputHistory,
      inputHistoryStep: newInputHistory.length - 1,
    })
    this.addNewLine(userInput, "user-text-printed")
    this.parseInput(userInput)
    this.setState({input: ''})
  }

  componentDidMount() {
    this.mainInput.focus()
    this.addNewLine(Welcome({
      character: this.state.character,
      enemy: this.state.enemy
    }))
  }

  checkKey(e) {
    e = e || window.event
    let newInputHistoryStep = this.state.inputHistoryStep
    if (e.keyCode == '38') { // up arrow
      if (newInputHistoryStep === this.state.inputHistory.length - 1) {
        const newInputHistory = this.state.inputHistory.slice()
        newInputHistory[newInputHistory.length - 1] = this.state.input
        this.setState({ inputHistory: newInputHistory })
      }
      newInputHistoryStep > 0 ?
        newInputHistoryStep-- :
        newInputHistoryStep = 0;

      const replacementInput = this.state.inputHistory[newInputHistoryStep]
      this.setState({
        inputHistoryStep: newInputHistoryStep,
        input: replacementInput,
      })
    }
    else if (e.keyCode == '40') { // down arrow
      newInputHistoryStep < this.state.inputHistory.length - 1 ?
        newInputHistoryStep++ :
        newInputHistoryStep = this.state.inputHistory.length - 1;

      const replacementInput = this.state.inputHistory[newInputHistoryStep]
      this.setState({
        inputHistoryStep: newInputHistoryStep,
        input: replacementInput,
      })
    }
  }

  render() {
    document.onkeydown = this.checkKey
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rocking Fighter</h1>
        </header>
        <div className="main-terminal" id="main-terminal" ref={(terminal)=>{this.mainTerminal = terminal}}></div>
        <form onSubmit={this.onEnterInput}>
          <input className="main-input"  id="main-input" type="text" value={this.state.input} onChange={this.changeInput} ref={(input)=>{this.mainInput = input}} autoComplete="off"/>
        </form>
      </div>
    );
  }
}

export default App;
