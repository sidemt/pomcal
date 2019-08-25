var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Variable to store the intervalID of setInterval
// Used to stop the setInterval function by clearInterval
var intervalId;

// Break/Session labels
var BREAK = 'Break';
var SESSION = 'Session';
var LONG_BREAK = 'Long Break';

// Audio elements on the html file
var SOUND_SESSION = document.getElementById('sound-session');
var SOUND_BREAK = document.getElementById('sound-break');
var SOUND_LONG_BREAK = document.getElementById('sound-long-break');

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
      currentCount: 1,
      sessionCycle: 4,
      longBreakLength: 15,
      isRunning: false,
      soundSetting: true
    };
    _this.reset = _this.reset.bind(_this);
    _this.decrementBreak = _this.decrementBreak.bind(_this);
    _this.incrementBreak = _this.incrementBreak.bind(_this);
    _this.decrementSession = _this.decrementSession.bind(_this);
    _this.incrementSession = _this.incrementSession.bind(_this);
    _this.decrementCycle = _this.decrementCycle.bind(_this);
    _this.incrementCycle = _this.incrementCycle.bind(_this);
    _this.decrementLongBreak = _this.decrementLongBreak.bind(_this);
    _this.incrementLongBreak = _this.incrementLongBreak.bind(_this);
    _this.countDown = _this.countDown.bind(_this);
    _this.toggleTimer = _this.toggleTimer.bind(_this);
    _this.startStop = _this.startStop.bind(_this);
    _this.updateTimeLeft = _this.updateTimeLeft.bind(_this);
    _this.toggleSoundSetting = _this.toggleSoundSetting.bind(_this);
    return _this;
  }

  /**
   * Resets the timer to default state
   */


  _createClass(PomodoroClock, [{
    key: 'reset',
    value: function reset() {
      // Reset timer
      this.setState({
        timerLabel: SESSION,
        timeLeft: 1500,
        breakLength: 5,
        sessionLength: 25,
        currentCount: 1,
        sessionCycle: 4,
        longBreakLength: 15,
        isRunning: false
      });
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

    /**
     * Increments Break length by 1 min
     */

  }, {
    key: 'incrementBreak',
    value: function incrementBreak() {
      if (this.state.breakLength < 120) {
        this.setState(function (state) {
          return {
            breakLength: state.breakLength + 1
          };
        });
        this.updateTimeLeft(BREAK);
      }
    }

    /**
     * Decrements Session length by 1 min
     */

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

    /**
     * Increments Session length by 1 min
     */

  }, {
    key: 'incrementSession',
    value: function incrementSession() {
      if (this.state.sessionLength < 120) {
        this.setState(function (state) {
          return {
            sessionLength: state.sessionLength + 1
          };
        });
        this.updateTimeLeft(SESSION);
      }
    }

    /**
    * Decrements sessionCycle count by 1
    */

  }, {
    key: 'decrementCycle',
    value: function decrementCycle() {
      if (this.state.sessionCycle > 1) {
        this.setState(function (state) {
          return {
            sessionCycle: state.sessionCycle - 1
          };
        });
      }
    }

    /**
     * Increments sessionCycle count by 1
     */

  }, {
    key: 'incrementCycle',
    value: function incrementCycle() {
      if (this.state.sessionCycle < 99) {
        this.setState(function (state) {
          return {
            sessionCycle: state.sessionCycle + 1
          };
        });
      }
    }

    /**
    * Decrements long break length by 1 min
    */

  }, {
    key: 'decrementLongBreak',
    value: function decrementLongBreak() {
      if (this.state.longBreakLength > 1) {
        this.setState(function (state) {
          return {
            longBreakLength: state.longBreakLength - 1
          };
        });
        this.updateTimeLeft(LONG_BREAK);
      }
    }

    /**
     * Increments long break length by 1 min
     */

  }, {
    key: 'incrementLongBreak',
    value: function incrementLongBreak() {
      if (this.state.longBreakLength < 120) {
        this.setState(function (state) {
          return {
            longBreakLength: state.longBreakLength + 1
          };
        });
        this.updateTimeLeft(LONG_BREAK);
      }
    }

    /**
     * Counts down the time
     * If the time reaches 0, toggle session/break and play the timer sound
     */

  }, {
    key: 'countDown',
    value: function countDown() {
      if (this.state.timeLeft > 1) {
        this.setState(function (state) {
          return {
            timeLeft: state.timeLeft - 1
          };
        });
      } else {
        // When the time reaches 0
        this.toggleTimer();
      }
    }

    /**
     * Toggle session/break
     */

  }, {
    key: 'toggleTimer',
    value: function toggleTimer() {
      if (this.state.timerLabel == SESSION) {
        // When a session ends
        // Insert an event to the calendar
        var name = document.getElementById('current-event-name').innerText;
        var desc = document.getElementById('current-event-desc').innerText;
        var calendarId = document.getElementById('calendar-select').value;
        createEvent(this.state.sessionLength, name, desc, calendarId);
        // Check which break to start
        if (this.state.currentCount < this.state.sessionCycle) {
          // Start a short break
          this.setState({
            timerLabel: BREAK,
            timeLeft: this.state.breakLength * 60
          });
          // Change the background color
          document.getElementById('body').style.backgroundColor = "var(--main-green)";
          // Change the sound to be played
          beep = SOUND_BREAK;
          // Increase sessions count
          this.setState(function (state) {
            return {
              currentCount: state.currentCount + 1
            };
          });
        } else {
          // Start a long break
          this.setState({
            timerLabel: LONG_BREAK,
            timeLeft: this.state.longBreakLength * 60
          });
          // Change the background color
          document.getElementById('body').style.backgroundColor = "var(--main-blue)";
          // Change the sound to be played
          beep = SOUND_LONG_BREAK;
          // Reset sessions count
          this.setState(function (state) {
            return {
              currentCount: 1
            };
          });
        }
        // Play the start sound
        playSound(this.state.soundSetting);
      } else {
        // When a break or long break ends
        // Start a session
        this.setState({
          timerLabel: SESSION,
          timeLeft: this.state.sessionLength * 60
        });
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

  }, {
    key: 'startStop',
    value: function startStop() {
      if (!this.state.isRunning) {
        // Start the timer
        this.setState({
          isRunning: true
        });
        intervalId = setInterval(this.countDown, 1000);
        // Play the sound
        playSound(this.state.soundSetting);
      } else {
        // Stop the timer
        this.setState({
          isRunning: false
        });
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
      } else if (label == LONG_BREAK && this.state.timerLabel == LONG_BREAK) {
        this.setState(function (state) {
          return {
            timeLeft: state.longBreakLength * 60
          };
        });
      } else {
        return;
      }
    }

    /**
     * Toggles ON/OFF of the sound setting
     */

  }, {
    key: 'toggleSoundSetting',
    value: function toggleSoundSetting() {
      this.setState(function (state) {
        return {
          soundSetting: !state.soundSetting
        };
      });
    }

    /**
     * Render the pomodoro timer
     */

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
            React.createElement(TimeLeft, { timeLeft: this.state.timeLeft }),
            React.createElement(
              'div',
              null,
              'Completed Sessions: ',
              this.state.currentCount - 1,
              '/',
              this.state.sessionCycle
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              { id: 'start_stop', className: 'btn btn-light', onClick: this.startStop },
              'Start/Pause'
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
        React.createElement(
          'div',
          { className: 'btn-set long-break-length' },
          React.createElement(
            'div',
            { id: 'long-break-label', className: 'label' },
            'Long Break Length'
          ),
          React.createElement(
            'div',
            { id: 'long-break-length', className: 'time' },
            this.state.longBreakLength
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              { id: 'long-break-decrement', className: 'btn btn-light fixed-width', onClick: this.decrementLongBreak },
              '-'
            ),
            React.createElement(
              'button',
              { id: 'long-break-increment', className: 'btn btn-light fixed-width', onClick: this.incrementLongBreak },
              '+'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'btn-set cycle-count' },
          React.createElement(
            'div',
            { id: 'cycle-label', className: 'label' },
            'Long break after'
          ),
          React.createElement(
            'div',
            { id: 'cycle-count', className: 'time' },
            this.state.sessionCycle,
            ' sessions'
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'button',
              { id: 'cycle-decrement', className: 'btn btn-light fixed-width', onClick: this.decrementCycle },
              '-'
            ),
            React.createElement(
              'button',
              { id: 'cycle-increment', className: 'btn btn-light fixed-width', onClick: this.incrementCycle },
              '+'
            )
          )
        ),
        React.createElement(SoundSwitch, { soundSetting: this.state.soundSetting, onClick: this.toggleSoundSetting })
      );
    }
  }]);

  return PomodoroClock;
}(React.Component);

/**
 * Component to show the remaining time
 */


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

/**
 * Component for toggle switch of sound ON/OFF setting
 */


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