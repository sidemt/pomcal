var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Variable to store the intervalID of setInterval
// Used to stop the setInterval function by clearInterval
var intervalId;

var BREAK = 'Break';
var SESSION = 'Session';

var SOUND_SESSION = document.getElementById('sound-session');
var SOUND_BREAK = document.getElementById('sound-break');

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
  var minutes = Math.floor(timeLeft % (60 * 60) / 60);
  var seconds = Math.floor(timeLeft % 60);

  return mmss(minutes, seconds);
}

var PomodoroClock = function (_React$Component) {
  _inherits(PomodoroClock, _React$Component);

  function PomodoroClock(props) {
    _classCallCheck(this, PomodoroClock);

    var _this = _possibleConstructorReturn(this, (PomodoroClock.__proto__ || Object.getPrototypeOf(PomodoroClock)).call(this, props));

    _this.state = {
      timerLabel: SESSION,
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25,
      isRunning: false,
      sound: true
    };
    _this.reset = _this.reset.bind(_this);
    _this.decrementBreak = _this.decrementBreak.bind(_this);
    _this.incrementBreak = _this.incrementBreak.bind(_this);
    _this.decrementSession = _this.decrementSession.bind(_this);
    _this.incrementSession = _this.incrementSession.bind(_this);
    _this.countDown = _this.countDown.bind(_this);
    _this.toggleTimer = _this.toggleTimer.bind(_this);
    _this.startStop = _this.startStop.bind(_this);
    _this.updateTimeLeft = _this.updateTimeLeft.bind(_this);
    _this.toggleSound = _this.toggleSound.bind(_this);
    return _this;
  }

  _createClass(PomodoroClock, [{
    key: 'reset',
    value: function reset() {
      this.setState({
        timerLabel: SESSION,
        timeLeft: 1500,
        breakLength: 5,
        sessionLength: 25,
        isRunning: false
      });
      clearInterval(intervalId);
      beep.pause();
      beep.currentTime = 0;
      beep = SOUND_SESSION;
      document.getElementById('body').style.backgroundColor = "var(--main-red)";
    }
  }, {
    key: 'decrementBreak',
    value: function decrementBreak() {
      if (this.state.breakLength > 1) {
        this.setState(function (state) {
          return {
            breakLength: state.breakLength - 1
          };
        });
        this.updateTimeLeft(BREAK);
      }
    }
  }, {
    key: 'incrementBreak',
    value: function incrementBreak() {
      if (this.state.breakLength < 60) {
        this.setState(function (state) {
          return {
            breakLength: state.breakLength + 1
          };
        });
        this.updateTimeLeft(BREAK);
      }
    }
  }, {
    key: 'decrementSession',
    value: function decrementSession() {
      if (this.state.sessionLength > 1) {
        this.setState(function (state) {
          return {
            sessionLength: state.sessionLength - 1
          };
        });
        this.updateTimeLeft(SESSION);
      }
    }
  }, {
    key: 'incrementSession',
    value: function incrementSession() {
      var currentLength = this.state.sessionLength;
      var newLength = currentLength + 1;
      if (this.state.sessionLength < 60) {
        this.setState(function (state) {
          return {
            sessionLength: state.sessionLength + 1
          };
        });
        this.updateTimeLeft(SESSION);
      }
    }
  }, {
    key: 'countDown',
    value: function countDown() {
      if (this.state.timeLeft > 0) {
        this.setState(function (state) {
          return {
            timeLeft: state.timeLeft - 1
          };
        });
      } else {
        this.toggleTimer();
        playSound(this.state.sound);
      }
    }
  }, {
    key: 'toggleTimer',
    value: function toggleTimer() {
      if (this.state.timerLabel == SESSION) {
        // Insert event to calendar
        createEvent(this.state.sessionLength);
        // document.getElementById('create_button').click();
        this.setState({
          timerLabel: BREAK,
          timeLeft: this.state.breakLength * 60
        });
        document.getElementById('body').style.backgroundColor = "var(--main-green)";
        beep = SOUND_BREAK;
      } else {
        this.setState({
          timerLabel: SESSION,
          timeLeft: this.state.sessionLength * 60
        });
        document.getElementById('body').style.backgroundColor = "var(--main-red)";
        beep = SOUND_SESSION;
      }
    }
  }, {
    key: 'startStop',
    value: function startStop() {
      if (!this.state.isRunning) {
        // Start the timer
        this.setState({
          isRunning: true
        });
        intervalId = setInterval(this.countDown, 1000);
        playSound(this.state.sound);
      } else {
        // Stop the timer
        this.setState({
          isRunning: false
        });
        clearInterval(intervalId);
      }
    }
  }, {
    key: 'updateTimeLeft',
    value: function updateTimeLeft(label) {
      if (label == SESSION && this.state.timerLabel == SESSION) {
        this.setState(function (state) {
          return {
            timeLeft: state.sessionLength * 60
          };
        });
      } else if (label == BREAK && this.state.timerLabel == BREAK) {
        this.setState(function (state) {
          return {
            timeLeft: state.breakLength * 60
          };
        });
      } else {
        return;
      }
    }
  }, {
    key: 'toggleSound',
    value: function toggleSound() {
      this.setState(function (state) {
        return {
          sound: !state.sound
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      document.title = calcTimeLeft(this.state.timeLeft) + " [" + this.state.timerLabel + "] - Pom-Cal";
      return React.createElement(
        'div',
        { id: 'pomodoro-clock-inside' },
        React.createElement(
          'div',
          { className: 'btn-set timer' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { id: 'timer-label', className: 'label' },
              this.state.timerLabel
            ),
            React.createElement(TimeLeft, { timeLeft: this.state.timeLeft })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              { id: 'start_stop', className: 'btn btn-light', onClick: this.startStop },
              'Start/Stop'
            ),
            React.createElement(
              'button',
              { id: 'reset', className: 'btn btn-light', onClick: this.reset },
              'Reset'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'btn-set session-length' },
          React.createElement(
            'div',
            { id: 'session-label', className: 'label' },
            'Session Length'
          ),
          React.createElement(
            'div',
            { id: 'session-length', className: 'time' },
            this.state.sessionLength
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              { id: 'session-decrement', className: 'btn btn-light fixed-width', onClick: this.decrementSession },
              '-'
            ),
            React.createElement(
              'button',
              { id: 'session-increment', className: 'btn btn-light fixed-width', onClick: this.incrementSession },
              '+'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'btn-set break-length' },
          React.createElement(
            'div',
            { id: 'break-label', className: 'label' },
            'Break Length'
          ),
          React.createElement(
            'div',
            { id: 'break-length', className: 'time' },
            this.state.breakLength
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              { id: 'break-decrement', className: 'btn btn-light fixed-width', onClick: this.decrementBreak },
              '-'
            ),
            React.createElement(
              'button',
              { id: 'break-increment', className: 'btn btn-light fixed-width', onClick: this.incrementBreak },
              '+'
            )
          )
        ),
        React.createElement(SoundSwitch, { soundSetting: this.state.sound, onClick: this.toggleSound })
      );
    }
  }]);

  return PomodoroClock;
}(React.Component);

var TimeLeft = function (_React$Component2) {
  _inherits(TimeLeft, _React$Component2);

  function TimeLeft(props) {
    _classCallCheck(this, TimeLeft);

    return _possibleConstructorReturn(this, (TimeLeft.__proto__ || Object.getPrototypeOf(TimeLeft)).call(this, props));
  }

  _createClass(TimeLeft, [{
    key: 'render',
    value: function render() {
      var timeLeft = this.props.timeLeft;
      return React.createElement(
        'div',
        { id: 'time-left', className: 'time' },
        calcTimeLeft(timeLeft)
      );
    }
  }]);

  return TimeLeft;
}(React.Component);

var SoundSwitch = function (_React$Component3) {
  _inherits(SoundSwitch, _React$Component3);

  function SoundSwitch(props) {
    _classCallCheck(this, SoundSwitch);

    return _possibleConstructorReturn(this, (SoundSwitch.__proto__ || Object.getPrototypeOf(SoundSwitch)).call(this, props));
  }

  _createClass(SoundSwitch, [{
    key: 'render',
    value: function render() {
      var soundSetting = this.props.soundSetting;
      return React.createElement(
        'div',
        { id: 'sound-setting' },
        React.createElement(
          'span',
          { id: 'switch-label' },
          'Sound '
        ),
        React.createElement(
          'label',
          { className: 'switch' },
          soundSetting ? React.createElement('input', { type: 'checkbox', checked: true }) : React.createElement('input', { type: 'checkbox' }),
          React.createElement('span', { className: 'slider round', onClick: this.props.onClick })
        )
      );
    }
  }]);

  return SoundSwitch;
}(React.Component);

ReactDOM.render(React.createElement(PomodoroClock, null), document.getElementById('pomodoro-clock'));