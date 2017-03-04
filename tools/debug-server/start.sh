#!/bin/bash
# requires `yum install libevent-devel` and `pecl install event`,

# just run it with php as long as libevent is installed
php56='/opt/cpanel/ea-php56/root/usr/bin/php'
$php56 DebugServer.php start
