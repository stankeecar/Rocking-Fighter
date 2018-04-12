import React, { Component } from 'react';
import './App.css';
import Attack from './Attack'
import Help from './Help'
import Welcome from './Welcome'
import PrintTerminal from './PrintTerminal'
import parsingDictionary from './parsingDictionary'

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

  parseInput(text) {
    const textArray = text.split(' ')
    const verbActual = textArray[0]
    const verbTechnical = parsingDictionary(verbActual)
    const noun = textArray[1]
    switch(verbTechnical) {
      case 'help':
        const helpArray = Help(noun)
        PrintTerminal(helpArray)
        break
      case 'attack':
        const attackInstance = Attack({
          character: this.state.character,
          enemy: this.state.enemy
        })
        this.setState({
          enemy: attackInstance.enemy
        })
        PrintTerminal(attackInstance.message)
        break
      case 'error':
        PrintTerminal([`Do not understand "${verbActual}"`])
        break
      default:
        PrintTerminal([`Cannot "${text}" right now.`])
    }
  }

  onEnterInput(e) {
    e.preventDefault()
    const userInput = this.state.input.toLowerCase().replace(/[^\w\s?!]/gi, '').trim().replace(/[' ']+/gi, ' ')
    if (!this.inputIsValid(userInput)) {
      this.setState({input: ''})
      return
    }
    const newInputHistory = this.state.inputHistory.slice()
    newInputHistory.splice(this.state.inputHistory.length - 1,0,userInput)
    this.setState({
      inputHistory: newInputHistory,
      inputHistoryStep: newInputHistory.length - 1,
    })
    PrintTerminal([userInput], "user-text-printed")
    this.parseInput(userInput)
    this.setState({input: ''})
  }

  componentDidMount() {
    this.mainInput.focus()
    PrintTerminal(Welcome({
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
