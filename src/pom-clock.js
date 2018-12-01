// Variable to store the intervalID of setInterval
// Used to stop the setInterval function by clearInterval
var intervalId;

// Break/Session labels
const BREAK = 'Break';
const SESSION = 'Session';

// Audio elements on the html file
const SOUND_SESSION = document.getElementById('sound-session');
const SOUND_BREAK = document.getElementById('sound-break');

// Which sound to be played
var beep = SOUND_SESSION;

/**
 * Checks the sound setting and plays the sound currently set in variable `beep`
 * @param {Boolean} soundSetting 
 */
function playSound(soundSetting) {
  // Play the sound if sound settings is ON (true)
  if (soundSetting) {
    beep.play();
  }
}

/**
 * Returns given minutes and seconds in "dd:dd" format
 * @param {Number} m 
 * @param {Number} s 
 */
function mmss(m, s) {
  var m0 = ('00' + m).slice(-2);
  var s0 = ('00' + s).slice(-2);
  return m0 + ':' + s0;
}

/**
 * Returns given seconds in "dd:dd" format
 * @param {Number} timeLeft 
 */
function calcTimeLeft(timeLeft) {
  var minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  var seconds = Math.floor(timeLeft % (60));

  return mmss(minutes, seconds);
}

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerLabel: SESSION,
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25,
      isRunning: false,
      soundSetting: true
    };
    this.reset = this.reset.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.countDown = this.countDown.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.startStop = this.startStop.bind(this);
    this.updateTimeLeft = this.updateTimeLeft.bind(this);
    this.toggleSoundSetting = this.toggleSoundSetting.bind(this);
  }
  
  /**
   * Resets the timer to default state
   */
  reset() {
    // Reset timer
    this.setState({
      timerLabel: SESSION,
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25,
      isRunning: false
    })
    clearInterval(intervalId);
    // Reset sound
    beep.pause();
    beep.currentTime = 0;
    beep = SOUND_SESSION;
    // Reset background color
    document.getElementById('body').style.backgroundColor = "var(--main-red)";
  }
  
  /**
   * Decrements Break length by 1 min
   */
  decrementBreak() {
    if (this.state.breakLength > 1) {
      this.setState((state) => ({
        breakLength: state.breakLength - 1
      }))
      this.updateTimeLeft(BREAK);
    }
  }
  
  /**
   * Increments Break length by 1 min
   */
  incrementBreak() {
    if (this.state.breakLength < 60) {
      this.setState((state) => ({
        breakLength: state.breakLength + 1
      }))
      this.updateTimeLeft(BREAK);
    }
  }
  
  /**
   * Decrements Session length by 1 min
   */
  decrementSession() {
    if (this.state.sessionLength > 1) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1
      }))
      this.updateTimeLeft(SESSION);
    }
  }
  
  /**
   * Increments Session length by 1 min
   */
  incrementSession() {
    let currentLength = this.state.sessionLength;
    let newLength = currentLength + 1;
    if (this.state.sessionLength < 60) {
      this.setState((state)=>({
        sessionLength: state.sessionLength + 1
      }))
      this.updateTimeLeft(SESSION);
    }
  }
  
  /**
   * Counts down the time
   * If the time reaches 0, toggle session/break and play the timer sound
   */
  countDown() {
      if (this.state.timeLeft > 1) {
        this.setState((state)=>({
          timeLeft: state.timeLeft - 1
        }))
      } else {
        this.toggleTimer();
      }
    }
  
    /**
     * Toggle session/break
     */
  toggleTimer() {
    if (this.state.timerLabel == SESSION) {
      // Insert an event to the calendar
      let name = document.getElementById('current-event-name').innerText;
      let desc = document.getElementById('current-event-desc').innerText;
      let calendarId = document.getElementById('calendar-select').value;
      createEvent(this.state.sessionLength, name, desc, calendarId);
      this.setState({
        timerLabel: BREAK,
        timeLeft: this.state.breakLength * 60
      })
      // Change the background color
      document.getElementById('body').style.backgroundColor = "var(--main-green)";
      // Change the sound to be played
      beep = SOUND_BREAK;
      // Play the sound
      playSound(this.state.soundSetting);
    } else {
      this.setState({
        timerLabel: SESSION,
        timeLeft: this.state.sessionLength * 60
      })
      // Change the background color
      document.getElementById('body').style.backgroundColor = "var(--main-red)";
      // Change the sound to be played
      beep = SOUND_SESSION;
      // Play the sound
      playSound(this.state.soundSetting);
    }
  }
  
  /**
   * Starts/stops the timer according to the current state
   */
  startStop() {
    if (!this.state.isRunning) {
      // Start the timer
      this.setState({
        isRunning: true
      })
      intervalId = setInterval(this.countDown, 1000);
      // Play the sound
      playSound(this.state.soundSetting);
    } else {
      // Stop the timer
      this.setState({
        isRunning: false
      })
      clearInterval(intervalId);
      // Stop the sound
      beep.pause();
      beep.currentTime = 0;
    }
  }
  
  /**
   * Update timeLeft value according to the current sessionLength
   * @param {String} label 
   */
  updateTimeLeft(label) {
    if (label == SESSION && this.state.timerLabel == SESSION) {
      this.setState((state)=>({
        timeLeft: state.sessionLength * 60
      }))
    } else if (label == BREAK && this.state.timerLabel == BREAK) {
      this.setState((state)=>({
        timeLeft: state.breakLength * 60
      }))
    } else {
      return;
    }
  }

  /**
   * Toggles ON/OFF of the sound setting
   */
  toggleSoundSetting() {
    this.setState((state)=>({
      soundSetting: !state.soundSetting
    }))
  }
  
  /**
   * Render the pomodoro timer
   */
  render(){
    document.title = calcTimeLeft(this.state.timeLeft) + " [" + this.state.timerLabel + "] - Pom-Cal";
    return (
      <div id="pomodoro-clock-inside">
        <div className="btn-set timer">
          <div>
            <div id="timer-label" className="label">{this.state.timerLabel}</div>
            <TimeLeft timeLeft={this.state.timeLeft} />
          </div>

          <div>
            <button id="start_stop" className="btn btn-light" onClick={this.startStop}>Start/Stop</button>
            <button id="reset" className="btn btn-light" onClick={this.reset}>Reset</button>
          </div>
        </div>

        <div className="btn-set session-length">
          <div id="session-label" className="label">Session Length</div>
          <div id="session-length" className="time">{this.state.sessionLength}</div>
          <div>
            <button id="session-decrement" className="btn btn-light fixed-width" onClick={this.decrementSession}>-</button>
            <button id="session-increment" className="btn btn-light fixed-width" onClick={this.incrementSession}>+</button>
          </div>
        </div>
        
        <div className="btn-set break-length">
          <div id="break-label" className="label">Break Length</div>
          <div id="break-length" className="time">{this.state.breakLength}</div>
          <div>
            <button id="break-decrement" className="btn btn-light fixed-width" onClick={this.decrementBreak}>-</button>
            <button id="break-increment" className="btn btn-light fixed-width" onClick={this.incrementBreak}>+</button>
          </div>
        </div>

        <SoundSwitch soundSetting={this.state.soundSetting} onClick={this.toggleSoundSetting} />
      </div>
    );
  }
}

/**
 * Component to show the remaining time
 */
class TimeLeft extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var timeLeft = this.props.timeLeft;
    return(
        <div id="time-left" className="time">{calcTimeLeft(timeLeft)}</div>
    );
  }
}

/**
 * Component for toggle switch of sound ON/OFF setting
 */
class SoundSwitch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var soundSetting = this.props.soundSetting;
    return(
        <div id="sound-setting">
          <span id="switch-label">Sound </span>
          <label className="switch">
            {soundSetting ? <input type="checkbox" checked /> : <input type="checkbox" />}
            <span className="slider round" onClick={this.props.onClick}></span>
          </label>
        </div>
    );
  }
}

ReactDOM.render(<PomodoroClock />, document.getElementById('pomodoro-clock'));
