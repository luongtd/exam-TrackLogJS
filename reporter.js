const reportUrl = 'ws://localhost:3099'; // Url to the WebSocket server "wss://[host]:[port]" 

// The reporter object encapsulating the WebSocket
const reporter = {
  socket: null,
 
  init: function() {
    this.socket = new WebSocket(reportUrl);
  },
 
  event: function(eventCode, message) {
    const isReady = this.socket && this.socket.readyState === WebSocket.OPEN;

    // Messages triggered before the WebSocket is ready are ignored
    if (isReady) {
      this.socket.send(JSON.stringify({eventCode: eventCode, message: message}));
    }
  }
};

// Start reporter immediately
reporter.init();

// Collect unhandled JavaScript errors and send them to the server
window.addEventListener('error', function(e) {
  console.log(e);
  reporter.event('JAVASCRIPT_ERROR', e.message + ', ' + e.filename + ', ' + e.lineno + ':' + e.colno);

  let stacktrace = e.stack;
  if (!stacktrace && e.error) {
    stacktrace = e.error.stack;
  }
  if (stacktrace) {
    reporter.event('JAVASCRIPT_ERROR_STACKTRACE', stacktrace);
  }
});

$(document).ready(function () {

});

function buttonSubmit(e) {
  console.log(abc123);

  return false;
}