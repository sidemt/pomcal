// var eventName;
// var eventDetail;

// function setEventDetail() {
//   eventName = document.getElementById("event-name").value;
//   eventDetail = document.getElementById("event-detail").value;
//   console.log("eventName= " + eventName);
//   console.log("eventDetail= " + eventDetail);
// }

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: 'Pomodoro',
      eventDetail: '',
      editState: false
    }
    this.setDetails = this.setDetails.bind(this);
    this.editDetails = this.editDetails.bind(this);
    this.cancel = this.cancel.bind(this);
  };

  setDetails() {
    this.setState({
      eventName: document.getElementById("event-name").value,
      eventDetail: document.getElementById("event-detail").value,
      editState: false
    })
  }

  editDetails() {
    this.setState({
      editState: true
    })
  }

  cancel() {
    this.setState({
      editState: false
    })
  }

  render(){
    return (
      <div>
        Current Task: <span id="current-event-name">{this.state.eventName}</span><br />
        Description: <span id="current-event-desc">{this.state.eventDetail}</span><br />
        {this.state.editState ? <EditForm onSubmit={this.setDetails} onCancel={this.cancel} /> : <button className="btn btn-light" onClick={this.editDetails}>Edit Event Details</button>}
      </div>

    );
  }
}

class EditForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        Task: <input id="event-name" type="text" placeholder="Event title on your calendar" /><br />
        Description: <input id="event-detail" type="text" placeholder="Event description on your calendar" /><br />
        <button id="submit" className="btn btn-light"  onClick={this.props.onSubmit}>Set task details</button>
        <button id="cancel" className="btn btn-dark"  onClick={this.props.onCancel}>Cancel</button>
      </div>
    )
  }
}

ReactDOM.render(<EventForm />, document.getElementById('event-form'));
