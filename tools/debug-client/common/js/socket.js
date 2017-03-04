var socket = (function () {
  var connection;
  var messageCallbacks = [];
  var config = {};

  function sendMessage(type, content) {
    var message = {
      type: type,
      contentType: Array.isArray(content) ? "array" : typeof content,
    };
    // convert the message content to a string
    switch (message.contentType) {
      case "object":
      case "array":
        // objects and arrays can contain self references, which choke JSON.stringify
        // so we build up a cashe of referenced objects, and disallow multiple instances
        var cache = [];
        message.content = JSON.stringify(content, function(k, v) {
          if (typeof v === "object" && v !== null) {
            if (cache.indexOf(v) !== -1) return;
            cache.push(v);
          }
          return v;
        });
        cache = null;
        break;
      default:
        message.content = content + "";
        break;
    }
    // send the message as a string
    if (connection) connection.send(JSON.stringify(message));
  };

  function receiveMessage(message) {
    var messageData = message.data;
    else {
      // convert the message string back into an object
      var message = JSON.parse(messageData);
      // convert message content back into whatever type it was
      var content;
      switch (message.contentType) {
        case "object":
        case "array":
          content = JSON.parse(message.content);
          break;
        case "string":
          content = message.content;
          break;
        default:
          content = eval(message.content)
          break;
      }

      message.content = content;

      messageCallbacks.forEach(function (callback) {
        callback(message);
      });
    }
  };

  return {
    start: function(opts) {
      connection = new WebSocket(opts.host + ":" + opts.port);

      config = opts;

      connection.addEventListener("open", function (event) {
        connection.send("REGISTER_" + opts.mode.toUpperCase());
      });

      connection.addEventListener("message", receiveMessage);
    },
    onMessage: function (callback) {
      messageCallbacks.push(callback);
    },
    send: sendMessage
  }

})();
