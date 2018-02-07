#!/bin/bash

while :
  do
    vol=$(amixer get Master | cut -f2 -d'[' | cut -f1 -d']' | sed '$!d')
    spot=$(spotify-cli --status)
    root_space=$(df -h / | sed -n "2p" | cut -f13 -d' ')
    ip_address=$(hostname -i)
    time=$(date '+%a %d-%m-%y %H:%M')
    echo -e " $spot ~  $vol ~  $root_space ~   $ip_address ~   $time"
    sleep 0
  done
