<?php

require('config.php');


if (empty($argv[1]) || !in_array($argv[1], array('start', 'stop', 'restart'))) {
    die("Usage: php " . __FILE__ . " (start|stop|restart)\r\n");
}

$config = array(
	'class' => "SwitchBrowserDebugDaemonHandler",
	'eventDriver' => 'socket_select', //'event',
	'pid' => __DIR__ . '/websocket_server.pid',
	'websocket' => 'tcp://' . $websocket_config['host'] . ':' . $websocket_config['port'],
);

$vendor = require('vendor/autoload.php');
$vendor->add("SwitchBrowserDebugDaemonHandler",__DIR__);
$server = new morozovsk\websocket\Server($config);
echo "Starting server on " . $config["websocket"] . "\n";
call_user_func(array($server, $argv[1]));

