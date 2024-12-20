#!/usr/bin/env bash
# Use this script to test if a given TCP host/port are available

TIMEOUT=15
QUIET=0
HOST=$1
PORT=$2

if [[ $3 == "-q" ]]; then
  QUIET=1
fi

wait_for() {
  for i in $(seq $TIMEOUT); do
    nc -z $HOST $PORT > /dev/null 2>&1
    result=$?
    if [[ $result -eq 0 ]]; then
      if [[ $QUIET -ne 1 ]]; then
        echo "Success"
      fi
      return 0
    fi
    sleep 1
  done
  if [[ $QUIET -ne 1 ]]; then
    echo "Timeout"
  fi
  return 1
}

wait_for

