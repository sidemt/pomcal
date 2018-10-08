var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var PomodoroClock = function (_React$Component) {_inherits(PomodoroClock, _React$Component);
  function PomodoroClock(props) {_classCallCheck(this, PomodoroClock);var _this = _possibleConstructorReturn(this, (PomodoroClock.__proto__ || Object.getPrototypeOf(PomodoroClock)).call(this,
    props));
    _this.state = {
      timeLeft: 1500,
      breakLength: 5,
      sessionLength: 25 };

    _this.decrementBreak = _this.decrementBreak.bind(_this);return _this;
  }_createClass(PomodoroClock, [{ key: "decrementBreak", value: function decrementBreak()
    {
      var currentLength = this.state.breakLength;
      if (currentLength > 1) {
        this.setState({
          breakLength: currentLength - 1 });

      }
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("div", null,
          React.createElement("div", { id: "break-label" }, "Break Length"),
          React.createElement("div", { id: "break-length" }, this.state.breakLength),
          React.createElement("button", { id: "break-decrement", onClick: this.decrementBreak }, "-"),
          React.createElement("button", { id: "break-increment" }, "+"),

          React.createElement("div", { id: "session-label" }, "Session Length"),
          React.createElement("div", { id: "session-length" }, "25"),
          React.createElement("button", { id: "session-decrement" }, "-"),
          React.createElement("button", { id: "session-increment" }, "+"),

          React.createElement(TimeLeft, { timeLeft: this.state.timeLeft }),

          React.createElement("button", { id: "start_stop" }, "Start/Stop"),
          React.createElement("button", { id: "reset" }, "Reset")));


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