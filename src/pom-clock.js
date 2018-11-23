// Variable to store the intervalID of setInterval
// Used to stop the setInterval function by clearInterval
var intervalId;

const BREAK = 'Break';
const SESSION = 'Session';

const SOUND_SESSION = document.getElementById('sound-session');
const SOUND_BREAK = document.getElementById('sound-break');

var beep = SOUND_SESSION;

function playSound(soundSetting) {
  // Play the sound if sound settings is ON
  if (soundSetting) {
    beep.play();
  }
}

function mmss(m, s) {
  var m0 = ('00' + m).slice(-2);
  var s0 = ('00' + s).slice(-2);
  return m0 + ':' + s0;
}

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
      sound: true
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
    this.toggleSound = this.toggleSound.bind(this);
  }
  
  reset() {
    this.setState({
      timerLabel: SESSION,
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25,
      isRunning: false
    })
    clearInterval(intervalId);
    beep.pause();
    beep.currentTime = 0;
    beep = SOUND_SESSION;
    document.getElementById('body').style.backgroundColor = "var(--main-red)";
  }
  
  decrementBreak() {
    if (this.state.breakLength > 1) {
      this.setState((state) => ({
        breakLength: state.breakLength - 1
      }))
      this.updateTimeLeft(BREAK);
    }
  }
  
  incrementBreak() {
    if (this.state.breakLength < 60) {
      this.setState((state) => ({
        breakLength: state.breakLength + 1
      }))
      this.updateTimeLeft(BREAK);
    }
  }
  
  decrementSession() {
    if (this.state.sessionLength > 1) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1
      }))
      this.updateTimeLeft(SESSION);
    }
  }
  
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
  
  countDown() {
      if (this.state.timeLeft > 0) {
        this.setState((state)=>({
          timeLeft: state.timeLeft - 1
        }))
      } else {
        this.toggleTimer();
        playSound(this.state.sound);
      }
    }
  
  toggleTimer() {
    if (this.state.timerLabel == SESSION) {
      // Insert event to calendar
      createEvent(this.state.sessionLength);
      // document.getElementById('create_button').click();
      this.setState({
        timerLabel: BREAK,
        timeLeft: this.state.breakLength * 60
      })
      document.getElementById('body').style.backgroundColor = "var(--main-green)";
      beep = SOUND_BREAK;
    } else {
      this.setState({
        timerLabel: SESSION,
        timeLeft: this.state.sessionLength * 60
      })
      document.getElementById('body').style.backgroundColor = "var(--main-red)";
      beep = SOUND_SESSION;
    }
  }
  
  startStop() {
    if (!this.state.isRunning) {
      // Start the timer
      this.setState({
        isRunning: true
      })
      intervalId = setInterval(this.countDown, 1000);
      playSound(this.state.sound);
    } else {
      // Stop the timer
      this.setState({
        isRunning: false
      })
      clearInterval(intervalId);
    }
  }
  
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

  toggleSound() {
    this.setState((state)=>({
      sound: !state.sound
    }))
  }
  
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

        <SoundSwitch soundSetting={this.state.sound} onClick={this.toggleSound} />
      </div>
    );
  }
}

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
