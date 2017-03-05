<?php
require_once('../config.php');


?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Switch Debug Client</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <script src="../common/js/socket.js" charset="utf-8"></script>
    <script src="./js/devtool.js" charset="utf-8"></script>
  </head>
  <body>
    <script type="text/javascript">

      socket.start({
        host: "ws://<?php echo $config["switch_ws_host"]; ?>",
        port: <?php echo $config["switch_ws_port"]; ?>,
        mode: "debuggee"
      });

    </script>
  </body>
</html>
