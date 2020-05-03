import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.colorCodes = { red: '#DC143C', green: '#00CC00', blue: '#234567' };
    this.state = {
      backgroundColor: this.colorCodes.red,
      testRange: { start: 2, end: 4 },
      testProgress: 'notStarted',
      testTimer: null,
      testTimerStart: null,
      testResult: null,
      marginError: -60,
    }

    this.testManager = this.testManager.bind(this);
    this.resetTest = this.resetTest.bind(this);
  }

  resetTest() {
    clearTimeout(this.state.testTimer);
    this.setState({
      testProgress: 'notStarted',
      backgroundColor: this.colorCodes.red,
      testTimerStart: null,
      testResult: null
    });
  }

  testManager() {
    switch (this.state.testProgress) {
      case 'notStarted':
        const randomNumber = (Math.random() * this.state.testRange.end) + this.state.testRange.start;
        this.setState({ 
          testProgress: 'started',
          testTimer: setTimeout(() => {
            this.setState({
              backgroundColor: this.colorCodes.green,
              testTimerStart: new Date()
            });
          }, randomNumber*1000)
        });
        break;
      case 'started':
        // If user clicks before it turns green
        if (!this.state.testTimerStart) {
          this.resetTest();
          return;
        }

        this.setState({
          testResult: new Date() - this.state.testTimerStart.getTime() + this.state.marginError,
          testProgress: 'ended',
          backgroundColor: this.colorCodes.blue
        });
        break;
      case 'ended':
        this.resetTest();
        break;
      default:
        break;
    }
    
  }

  endTest() {

  }

  render() {
    return (
      <div className="App">
        <div className="reactionTestContainer" onClick={this.testManager} style={{ backgroundColor: this.state.backgroundColor }}>
          <div className="instructions">
            <h1 className="instructions--text">
              {this.state.testProgress === 'notStarted' ? 'Click to start reaction test' : null}
              {this.state.testProgress === 'started' ? 'Click when screen turns green' : null}
              {this.state.testProgress === 'ended' ? `Reaction Time: ${this.state.testResult}ms` : null}
            </h1>
          </div>
        </div>
        <div className="reactionSettings">
          Use these settings to help you give a more accurate reading ->
          <label> Margin of Error </label><input type="number" value={this.state.marginError} onChange={(event) => { this.setState({ marginError: parseInt(event.target.value) }) }}></input>
        </div>
      </div>
    );
  }
}

export default App;
