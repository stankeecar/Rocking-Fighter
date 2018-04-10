import React, { Component } from 'react';
import './App.css';
import Attack from './Attack'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
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
          attack: 0
      },
    }
    this.changeInput = this.changeInput.bind(this)
    this.onEnterInput = this.onEnterInput.bind(this)
  }

  changeInput(e) {
    this.setState({
      input: e.target.value
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
    const newLine = document.createElement('p')
    const inLineClass = classForMessage ?  ` class="${classForMessage}"` : ''
    newLine.innerHTML = `<span${inLineClass}>${message}</span>`
    if (classForMessage === "user-text-printed") {
      newLine.innerHTML = '> ' + newLine.innerHTML
    }
    mainTerminal.append(newLine)
    mainTerminal.scrollTop = mainTerminal.scrollHeight
  }

  parseInput(text) {
    text = text.toLowerCase().replace(/[^\w\s]/gi, '')
    const mainTerminal = document.getElementById('main-terminal')
    const newLine = document.createElement('p')
    newLine.className = 'cpu-response-printed'
    switch(text) {
      case 'help':
        newLine.innerHTML = 'test message for help'
        mainTerminal.append(newLine)
        break
      case 'attack':
        console.log('health before attack:', this.state.enemy.health)
        const attackInstance = Attack({
          character: this.state.character,
          enemy: this.state.enemy
        })
        this.setState({
          enemy: attackInstance.enemy
        })
        console.log('health after attack:', this.state.enemy.health)
        newLine.innerHTML = attackInstance.message
        mainTerminal.append(newLine)
        break
      default:
        newLine.innerHTML = `Do not understand "${text}"`
        mainTerminal.append(newLine)
    }
  }

  onEnterInput(e) {
    e.preventDefault()
    if (!this.inputIsValid(this.state.input)) {
      this.setState({input: ''})
      return
    }
    const userInput = this.state.input.replace(/[^\w\s]/gi, '')
    this.addNewLine(userInput, "user-text-printed")
    this.parseInput(this.state.input)
    this.setState({input: ''})
  }

  componentDidMount() {
    this.mainInput.focus()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rocking Fighter</h1>
        </header>
        <div className="main-terminal" id="main-terminal"></div>
        <form onSubmit={this.onEnterInput}>
          <input className="main-input"  id="main-input" type="text" value={this.state.input} onChange={this.changeInput} ref={(input)=>{this.mainInput = input}} autocomplete="off"/>
        </form>
      </div>
    );
  }
}

export default App;
