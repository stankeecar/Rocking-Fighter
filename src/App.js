import React, { Component } from 'react';
import './App.css';

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
      enemies: [
        {
          name: 'rock',
          level: 1,
          health: 10,
          attack: 0
        }
      ]
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
        newLine.innerHTML = 'test message for attack'
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
    const mainTerminal = document.getElementById('main-terminal')
    const newLine = document.createElement('p')
    newLine.innerHTML = '> <span class="user-text-printed">' + this.state.input.replace(/[^\w\s]/gi, '') +'</span>'
    mainTerminal.append(newLine)
    this.parseInput(this.state.input)
    mainTerminal.scrollTop = mainTerminal.scrollHeight
    this.setState({input: ''})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rocking Fighter</h1>
        </header>
        <div className="main-terminal" id="main-terminal"></div>
        <form onSubmit={this.onEnterInput}>
          <input className="main-input" type="text" value={this.state.input} onChange={this.changeInput}/>
        </form>
      </div>
    );
  }
}

export default App;
