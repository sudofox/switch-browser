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
        message.content = JSON.stringify(content, function(key, value) {
          // if the value is a function, we want to serialize it
          if (typeof value === "function") {
            return value.toString();
          } else {
            // if the value is an object, there's a chance it may reference itself, so we need to check that
            if (typeof value === "object" && value !== null) {
              // if the value has already been read, ignore it
              if (cache.indexOf(value) !== -1) return;
              // else push it to the cache so we don't read it again
              cache.push(value);
            }
            return value;
          }
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
        content = eval(message.content);
        break;
    }

    message.content = content;

    messageCallbacks.forEach(function (callback) {
      callback(message);
    });
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
