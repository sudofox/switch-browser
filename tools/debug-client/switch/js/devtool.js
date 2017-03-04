window.devTool = (function () {

  // execute a string as javascript code, pass the result to callback
  function exec(str) {
    var result = eval(str);
    if (window.TEMP_FN) {
      result = TEMP_FN();
      window.TEMP_FN = null;
    }
    console.log("result", result);
  };

  // get the object at a given path, ie "window.navigator"
  function get(path) {
    return path.split(".").reduce(function(prev, curr) {
      return prev ? prev[curr] : undefined
    }, window);
  };

  // util to override a function while still maintaining the default bevahiour
  function overrideFn(nativeCtx, native, override) {
    return function() {
      override.call(arguments);
      native.apply(nativeCtx, arguments);
    }
  };

  /* OVERRIDE DEFAULT DEV TOOLS */

  function argListToArray (argList) {
    return Array.prototype.slice.call(argList);
  };

  var consoleOverrides = {
    log: function (args) {
      socket.send("CONSOLE_LOG", args);
    },
    warn: function () {
      socket.send("CONSOLE_WARN", argListToArray(arguments));
    },
    info: function () {
      socket.send("CONSOLE_INFO", argListToArray(arguments));
    },
    error: function () {
      socket.send("CONSOLE_ERROR", argListToArray(arguments));
    },
  };

  console.log = (function() {
    var log = console.log;
    return function() {
      log.apply(console, arguments);
      consoleOverrides.log(argListToArray(arguments));
    }
  })();

  console.warn = (function() {
    var warn = console.warn;
    return function() {
      warn.apply(console, arguments);
      consoleOverrides.warn(argListToArray(arguments));
    }
  })();

  console.info = (function() {
    var info = console.info;
    return function() {
      info.apply(console, arguments);
      consoleOverrides.info(argListToArray(arguments));
    }
  })();

  console.error = (function() {
    var error = console.error;
    return function() {
      error.apply(console, arguments);
      consoleOverrides.error(argListToArray(arguments));
    }
  })();

  var messageHandlers = {
    "EXECUTE_CODE": function (message) {
      exec(message.content);
    },
  }

  socket.onMessage(function (message) {
    if (messageHandlers.hasOwnProperty(message.type)) {
      var handler = messageHandlers[message.type];
      handler(message);
    }
  });

  return {
    console: consoleOverrides,
    exec: exec,
    get: get
  };

})();
