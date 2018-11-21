// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeDesc = document.getElementById('authorize_desc');
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var createButton = document.getElementById('create_button');
var signedInOnly = document.getElementById('signed-in-only');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
    createButton.onclick = handleCreateClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeDesc.style.display = 'none';
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'inline';
    signedInOnly.style.display = 'block';
    // listUpcomingEvents();
    // listAvailableCalendars();
  } else {
    authorizeDesc.style.display = 'block';
    authorizeButton.style.display = 'inline';
    signoutButton.style.display = 'none';
    signedInOnly.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function handleCreateClick(event) {
  createEvent(parseInt(document.getElementById('session-length').innerText), 10);
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function appendOl(message) {
  var ol = document.getElementById('event-list');
  var newItem = "<li>" + message + "</li>";
  ol.insertAdjacentHTML("beforeEnd", newItem);
}

/**
 * Retrieve the list of available calendars
 */
function listAvailableCalendars() {
  gapi.client.calendar.calendarList.list({
    'minAccessRole': 'writer'
  }).then(function(response) {
    var calendars = response.result.items;
    appendPre('Available Calendars:');

    if (calendars.length > 0) {
      for (i = 0; i < calendars.length; i++) {
        var calendar = calendars[i];
        var calendarId = calendar.id;
        var calendarSummary = calendar.summary;
        var isPrimary = calendar.primary;
        appendPre(calendarId + ': ' + calendarSummary +' '+ isPrimary);
      } 
    } else {
      appendPre('No calendar available.');
    }
  });
}


/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}

/**
 * Convert JavaScript Date object into RFC 3339 format
 */
function rfc3339(d) {
  
  function pad(n) {
      return n < 10 ? "0" + n : n;
  }

  function timezoneOffset(offset) {
      var sign;
      if (offset === 0) {
          return "Z";
      }
      sign = (offset > 0) ? "-" : "+";
      offset = Math.abs(offset);
      return sign + pad(Math.floor(offset / 60)) + ":" + pad(offset % 60);
  }

  return d.getFullYear() + "-" +
      pad(d.getMonth() + 1) + "-" +
      pad(d.getDate()) + "T" +
      pad(d.getHours()) + ":" +
      pad(d.getMinutes()) + ":" +
      pad(d.getSeconds()) + 
      timezoneOffset(d.getTimezoneOffset());
}

/**
 * Add and event to the calendar when create button is clicked
 */
function createEvent(duration) {
  if (gapi.auth2.getAuthInstance().isSignedIn.get()){
    var startTime = new Date();
    var endTime = new Date();
    startTime.setMinutes(startTime.getMinutes() - duration);
    // Convert date to RFC3339 format
    startTime = rfc3339(startTime);
    endTime = rfc3339(endTime);
  
    var event = {
      'summary': 'Pomodoro',
      'start': {
        'dateTime': startTime
      },
      'end': {
        'dateTime': endTime
      },
      'description': 
        'Pomodoro log created from Pom-Cal https://toolsiwant.net/pom-cal/'
    };
  
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
  
    request.execute(function(event) {
      console.log(event);
      var newText = 'Pomodoro Done: ' + '<a href=\"' + event.htmlLink + '\" target=\"_blank\">View in Calendar</a>';
      appendOl(newText);
    });  
  } else {
    console.log("Not signed in");
  }
}
