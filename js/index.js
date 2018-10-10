var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // Variable to store the intervalID of setInterval
// Used to stop the setInterval function by clearInterval
var intervalId;var

PomodoroClock = function (_React$Component) {_inherits(PomodoroClock, _React$Component);
  function PomodoroClock(props) {_classCallCheck(this, PomodoroClock);var _this = _possibleConstructorReturn(this, (PomodoroClock.__proto__ || Object.getPrototypeOf(PomodoroClock)).call(this,
    props));
    _this.state = {
      timeLeft: 5,
      breakLength: 5,
      sessionLength: 25 };

    _this.reset = _this.reset.bind(_this);
    _this.decrementBreak = _this.decrementBreak.bind(_this);
    _this.incrementBreak = _this.incrementBreak.bind(_this);
    _this.decrementSession = _this.decrementSession.bind(_this);
    _this.incrementSession = _this.incrementSession.bind(_this);
    _this.countDown = _this.countDown.bind(_this);
    _this.startCountDown = _this.startCountDown.bind(_this);return _this;
  }_createClass(PomodoroClock, [{ key: "reset", value: function reset()

    {
      this.setState({
        timeLeft: 1500,
        breakLength: 5,
        sessionLength: 25 });

    } }, { key: "decrementBreak", value: function decrementBreak()

    {
      var currentLength = this.state.breakLength;
      var newLength = currentLength - 1;
      if (newLength > 0) {
        this.setState({
          breakLength: newLength });

      }
    } }, { key: "incrementBreak", value: function incrementBreak()

    {
      var currentLength = this.state.breakLength;
      var newLength = currentLength + 1;
      if (newLength <= 60) {
        this.setState({
          breakLength: newLength });

      }
    } }, { key: "decrementSession", value: function decrementSession()

    {
      var currentLength = this.state.sessionLength;
      var newLength = currentLength - 1;
      if (newLength > 0) {
        this.setState({
          sessionLength: newLength });

      }
    } }, { key: "incrementSession", value: function incrementSession()

    {
      var currentLength = this.state.sessionLength;
      var newLength = currentLength + 1;
      if (newLength <= 60) {
        this.setState({
          sessionLength: newLength });

      }
    } }, { key: "countDown", value: function countDown()

    {
      var timeLeft = this.state.timeLeft;
      console.log(timeLeft);
      var newTimeLeft = timeLeft - 1;
      this.setState({
        timeLeft: newTimeLeft });

      console.log("here");
      if (this.state.timeLeft <= 0) {
        clearInterval(intervalId);
      }
    } }, { key: "startCountDown", value: function startCountDown()

    {
      intervalId = setInterval(this.countDown, 1000);
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("div", null,
          React.createElement("div", { id: "break-label" }, "Break Length"),
          React.createElement("div", { id: "break-length" }, this.state.breakLength),
          React.createElement("button", { id: "break-decrement", onClick: this.decrementBreak }, "-"),
          React.createElement("button", { id: "break-increment", onClick: this.incrementBreak }, "+"),

          React.createElement("div", { id: "session-label" }, "Session Length"),
          React.createElement("div", { id: "session-length" }, this.state.sessionLength),
          React.createElement("button", { id: "session-decrement", onClick: this.decrementSession }, "-"),
          React.createElement("button", { id: "session-increment", onClick: this.incrementSession }, "+"),

          React.createElement(TimeLeft, { timeLeft: this.state.timeLeft }),

          React.createElement("button", { id: "start_stop", onClick: this.startCountDown }, "Start/Stop"),
          React.createElement("button", { id: "reset", onClick: this.reset }, "Reset")));


    } }]);return PomodoroClock;}(React.Component);var


TimeLeft = function (_React$Component2) {_inherits(TimeLeft, _React$Component2);
  function TimeLeft(props) {_classCallCheck(this, TimeLeft);return _possibleConstructorReturn(this, (TimeLeft.__proto__ || Object.getPrototypeOf(TimeLeft)).call(this,
    props));
  }_createClass(TimeLeft, [{ key: "render", value: function render()
    {
      var timeLeft = this.props.timeLeft;
      var minutes = Math.floor(timeLeft % (60 * 60) / 60);
      var seconds = Math.floor(timeLeft % 60);
      function mmss(m, s) {
        var m0 = ('00' + m).slice(-2);
        var s0 = ('00' + s).slice(-2);
        return m0 + ':' + s0;
      }
      return (
        React.createElement("div", null,
          React.createElement("div", { id: "timer-label" }, "Session"),
          React.createElement("div", { id: "time-left" }, mmss(minutes, seconds))));


    } }]);return TimeLeft;}(React.Component);


ReactDOM.render(React.createElement(PomodoroClock, null), document.getElementById('pomodoro-clock'));