#!/bin/bash
scp start.sh package*.json crutland@192.168.29.24:~/ws/node/led-server/
#scp src/server/*.js crutland@192.168.29.24:~/ws/node/led-server/
#scp -r src/client crutland@192.168.29.24:~/ws/node/led-server/
scp -r src/server src/client crutland@192.168.29.24:~/ws/node/led-server/