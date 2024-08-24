import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    timeElapsedInSeconds: 0,
  }

  // FIX 1: The spelling of this lifecycle method should be componentWillUnmount
  componentWillUnmount() {
    // FIX2: When the setInterval method is used, it is best practice to use clearInterval method to clear the scheduler
    clearInterval(this.timeInterval)
  }

  onResetTimer = () => {
    // FIX3: The timer should be reset to 0 when "Reset" button is clicked
    this.setState({timeElapsedInSeconds: 0})
    // FIX4: class variables should be accessed with this
    clearInterval(this.timeInterval)
  }

  onStopTimer = () => {
    clearInterval(this.timeInterval)
  }

  updateTime = () => {
    this.setState(prevState => ({
      // FIX5: the key timeElapsedInSeconds in prevState should be used to updated the state
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onStartTimer = () => {
    // FIX6: Here to update the timeElapsedInSeconds value for every 1000 milliseconds setInterval method should be used
    // FIX7: the id returned by setInterval should be stored in class variable to access it across other methods in the class
    this.timeInterval = setInterval(this.updateTime, 1000)
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state
    const seconds = Math.floor(timeElapsedInSeconds % 60)

    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)

    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  render() {
    // FIX8: class methods should be accessed using the keyword this
    const time = `${this.renderMinutes()}:${this.renderSeconds()}`

    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="stopwatch">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                className="timer-image"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="timer"
              />
              <p className="heading">Timer</p>
            </div>
            <h1 testid="timer" className="stopwatch-timer">
              {time}
            </h1>
            <div className="timer-buttons">
              <button
                type="button"
                className="start-button button"
                onClick={this.onStartTimer}
              >
                Start
              </button>
              <button
                type="button"
                className="stop-button button"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-button button"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// FIX9: The syntax for default export should be written like this
export default Stopwatch
