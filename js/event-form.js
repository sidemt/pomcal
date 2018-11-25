var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var eventName;
// var eventDetail;

// function setEventDetail() {
//   eventName = document.getElementById("event-name").value;
//   eventDetail = document.getElementById("event-detail").value;
//   console.log("eventName= " + eventName);
//   console.log("eventDetail= " + eventDetail);
// }

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
    value: function setDetails() {
      this.setState({
        eventName: document.getElementById("event-name").value,
        eventDetail: document.getElementById("event-detail").value,
        editState: false
      });
    }
  }, {
    key: 'editDetails',
    value: function editDetails() {
      this.setState({
        editState: true
      });
    }
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
        null,
        'Current Task: ',
        React.createElement(
          'span',
          { id: 'current-event-name' },
          this.state.eventName
        ),
        React.createElement('br', null),
        'Description: ',
        React.createElement(
          'span',
          { id: 'current-event-desc' },
          this.state.eventDetail
        ),
        React.createElement('br', null),
        this.state.editState ? React.createElement(EditForm, { onSubmit: this.setDetails, onCancel: this.cancel }) : React.createElement(
          'button',
          { className: 'btn btn-light', onClick: this.editDetails },
          'Edit Event Details'
        )
      );
    }
  }]);

  return EventForm;
}(React.Component);

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
        'Task: ',
        React.createElement('input', { id: 'event-name', type: 'text', placeholder: 'Event title on your calendar' }),
        React.createElement('br', null),
        'Description: ',
        React.createElement('input', { id: 'event-detail', type: 'text', placeholder: 'Event description on your calendar' }),
        React.createElement('br', null),
        React.createElement(
          'button',
          { id: 'submit', className: 'btn btn-light', onClick: this.props.onSubmit },
          'Set task details'
        ),
        React.createElement(
          'button',
          { id: 'cancel', className: 'btn btn-dark', onClick: this.props.onCancel },
          'Cancel'
        )
      );
    }
  }]);

  return EditForm;
}(React.Component);

ReactDOM.render(React.createElement(EventForm, null), document.getElementById('event-form'));