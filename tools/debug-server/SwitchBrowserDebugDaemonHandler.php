<?php

class SwitchBrowserDebugDaemonHandler extends \morozovsk\websocket\Daemon
{

var $clientRoles = array();
var $debuggee = null;
var $debuggers = array();

    protected function onOpen($connectionID, $info) {
        //call when new client connect to server
	$this->clientRoles[$connectionID] = "new"; // Not registered as a debugger or debuggee
	echo "{$connectionID} opened, total connections: ".count($this->clientRoles) ."\n";
    }

    protected function onClose($connectionID) {
        //call when existing client close connection
	switch ($this->clientRoles[$connectionID]) {

		case "new":
			unset($this->clientRoles[$connectionID]);
			echo "Connection (ID: {$connectionID}) closed before handshake received\n";
			break;

		case "debuggee":
			$this->debuggee = null;
			unset($this->clientRoles[$connectionID]);
			foreach ($this->debuggers as $debugger) {
				$this->sendToClient($debugger, json_encode(array("type" => "STATUS", "contentType" => "string", "content" => "DEBUGGEE_DISCONNECTED")));
				}
			echo "Connection with debuggee (ID: {$connectionID}) closed\n";
			break;

		case "debugger":
			unset($this->debuggers[$connectionID]);
			unset($this->clientRoles[$connectionID]);
			echo "Connection with debugger (ID: {$connectionID}) closed\n";
			break;
		default:
                        echo "Connection (ID: {$connectionID}) closed\n";
                        break;
	}

    }

    protected function onMessage($connectionID, $data, $type) {
        //call when new message from existing client
        $message = $data; //"user #{$connectionId}: $data";
	echo "$connectionID: $message\n";
	if ($this->clientRoles[$connectionID] == "new") {
		// TODO: Test to see if lock is needed
		switch ($message) {

			case "REGISTER_DEBUGGEE":

				if (!is_null($this->debuggee)) {
					// Deny attempt to register debuggee.
					$this->sendToClient($connectionID, json_encode(array("type" => "STATUS", "contentType" => "string", "content" => "ERROR_DEBUGGEE_EXISTS")));
					echo "ERROR_DEBUGGEE_EXISTS: Connection $connectionID attempted to register as the debuggee but failed\n";
				} else {
					$this->debuggee = $connectionID;
					$this->clientRoles[$connectionID] = "debuggee";
                                        $this->sendToClient($connectionID, json_encode(array("type" => "STATUS", "contentType" => "string", "content" => "SUCCESS_DEBUGGEE_REGISTERED")));
					echo "SUCCESS_DEBUGGEE_REGISTERED: Connection $connectionID registered as the debuggee\n";

				}
				return;
				break;

			case "REGISTER_DEBUGGER":

				$this->clientRoles[$connectionID] = "debugger";
				$this->debuggers[$connectionID] = $connectionID;
                                $this->sendToClient($connectionID, json_encode(array("type" => "STATUS", "contentType" => "string", "content" => "SUCCESS_DEBUGGER_REGISTERED")));
				echo "SUCCESS_DEBUGGER_REGISTERED: Connection $connectionID registered as a debugger\n";

				return;
				break;

			default:

                                $this->sendToClient($connectionID, json_encode(array("type" => "STATUS", "contentType" => "string", "content" => "ERROR_INVALID_COMMAND")));
				echo "ERROR_INVALID_COMMAND: Connection $connectionID issued an invalid command.\n";

				return;
				break;
			}
	} elseif ($this->clientRoles[$connectionID] == "debuggee") {

		foreach($this->debuggers as $debuggerID) {
			$this->sendToClient($debuggerID, $message); // TODO: Prefix to indicate message source?
		}
	} elseif ($this->clientRoles[$connectionID] == "debugger") {

		$this->sendToClient($this->debuggee, $message);
		foreach($this->debuggers as $debuggerID) {
			if ($debuggerID != $connectionID) {
//				$this->sendToClient($debuggerID, "Debugger $connectionID: $message");
			}
		}
	}

    }
}

