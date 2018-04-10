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

  onEnterInput(e) {
    e.preventDefault()
    const mainTerminal = document.getElementsByClassName('main-terminal')[0]
    const newLine = document.createElement('p')
    newLine.innerHTML = '><span class="user-text-printed">' + this.state.input +'</span>'
    mainTerminal.append(newLine)
    mainTerminal.scrollTop = mainTerminal.scrollHeight
    this.setState({input: ''})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rocking Fighter</h1>
        </header>
        <div className="main-terminal"></div>
        <form onSubmit={this.onEnterInput}>
          <input className="main-input" type="text" value={this.state.input} onChange={this.changeInput}/>
        </form>
      </div>
    );
  }
}

export default App;
