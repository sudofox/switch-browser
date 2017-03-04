window.devTool = (function () {

  function exec(input) {
    var code;
    switch (typeof input) {
      case "function":
        code = "var TEMP_FN = " + input.toString();
        break;
      default:
        code = input;
        break;
    }
    socket.send("EXECUTE_CODE", code);
  };

  var messageHandlers = {
    "CONSOLE_LOG": function (message) {
      console.log.apply(console, message.content);
    },
    "CONSOLE_WARN": function (message) {
      console.warn.apply(console, message.content);
    },
    "CONSOLE_INFO": function (message) {
      console.info.apply(console, message.content);
    },
    "CONSOLE_ERROR": function (message) {
      console.error.apply(console, message.content);
    },
    "CONSOLE_DEBUG": function (message) {
      console.debug.apply(console, message.content);
    }
  }

  socket.onMessage(function (message) {
    var handler = messageHandlers[message.type];
    handler(message);
  });

  return {
    socket: socket,
    exec: exec,
  }

})();
