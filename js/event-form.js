var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to display the input form to specify event name and description
 */
var EventForm = function (_React$Component) {
  _inherits(EventForm, _React$Component);

  function EventForm(props) {
    _classCallCheck(this, EventForm);

    var _this = _possibleConstructorReturn(this, (EventForm.__proto__ || Object.getPrototypeOf(EventForm)).call(this, props));

    _this.state = {
      eventName: 'Pomodoro',
      eventDetail: '',
      editState: false
    };
    _this.setDetails = _this.setDetails.bind(_this);
    _this.editDetails = _this.editDetails.bind(_this);
    _this.cancel = _this.cancel.bind(_this);
    return _this;
  }

  _createClass(EventForm, [{
    key: 'setDetails',


    /**
     * Store user input to this.state and close input fields
     */
    value: function setDetails() {
      this.setState({
        eventName: document.getElementById("event-name").value,
        eventDetail: document.getElementById("event-detail").value,
        editState: false
      });
    }

    /**
     * Show input fields
     */

  }, {
    key: 'editDetails',
    value: function editDetails() {
      this.setState({
        editState: true
      });
    }

    /**
     * Close input fields without saving
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      this.setState({
        editState: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'form-area' },
        React.createElement(
          'div',
          { className: 'current-value text-left' },
          React.createElement(
            'strong',
            null,
            'Task: '
          ),
          React.createElement(
            'span',
            { id: 'current-event-name' },
            this.state.eventName
          ),
          React.createElement('br', null),
          React.createElement(
            'strong',
            null,
            'Description: '
          ),
          React.createElement(
            'span',
            { id: 'current-event-desc' },
            this.state.eventDetail
          ),
          React.createElement('br', null)
        ),
        this.state.editState ? React.createElement(EditForm, { onSubmit: this.setDetails, onCancel: this.cancel }) : React.createElement(
          'button',
          { className: 'btn btn-light', onClick: this.editDetails },
          'Edit Task'
        )
      );
    }
  }]);

  return EventForm;
}(React.Component);

/**
 * Input fields to be displayed when this.state.editState is true
 */


var EditForm = function (_React$Component2) {
  _inherits(EditForm, _React$Component2);

  function EditForm(props) {
    _classCallCheck(this, EditForm);

    return _possibleConstructorReturn(this, (EditForm.__proto__ || Object.getPrototypeOf(EditForm)).call(this, props));
  }

  _createClass(EditForm, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            'Edit Task'
          )
        ),
        React.createElement(
          'div',
          { className: 'form-group row' },
          React.createElement(
            'label',
            { 'for': 'event-name', 'class': 'col-sm-2 col-form-label text-left' },
            'Task '
          ),
          React.createElement('input', { id: 'event-name', className: 'form-control col-sm-10', type: 'text', placeholder: 'Event title' }),
          React.createElement('br', null)
        ),
        React.createElement(
          'div',
          { className: 'form-group row' },
          React.createElement(
            'label',
            { 'for': 'event-detail', 'class': 'col-sm-2 col-form-label text-left' },
            'Description '
          ),
          React.createElement('input', { id: 'event-detail', className: 'form-control col-sm-10', type: 'text', placeholder: 'Event description' }),
          React.createElement('br', null)
        ),
        React.createElement(
          'button',
          { id: 'submit', className: 'btn btn-light', onClick: this.props.onSubmit },
          'Set Task'
        ),
        React.createElement(
          'button',
          { id: 'cancel', className: 'btn btn-secondary', onClick: this.props.onCancel },
          'Cancel'
        )
      );
    }
  }]);

  return EditForm;
}(React.Component);

ReactDOM.render(React.createElement(EventForm, null), document.getElementById('event-form'));