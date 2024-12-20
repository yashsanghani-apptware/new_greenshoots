# Create the following Directories and files from $REDIS_HOME directory

$REDIS_HOME directory where you would install the redis.
In our case it is defined `/home/ubuntu/redis`

<img width="481" alt="Screenshot 2024-05-28 at 11 39 27 PM" src="https://github.com/coretical/greenshoots/assets/954883/cd102e73-5bf3-434b-a936-75f448ef0236">

## Create the docker-compose.yml file with the following contents

```
version: '3.9'
networks:
  ee-net:
    driver: bridge
services:
  redis:
    image: 'redis:latest'
    container_name: redis
    command: ["redis-server", "/etc/redis/redis.conf"]
    hostname: redis
    networks:
      - ee-net
    ports:
      - '6379:6379'
    volumes:
      - ./data:/data
      - ./config/redis.conf:/etc/redis/redis.conf
```

## Create the Redis Config file `config/redis.conf` with the following contents

```
requirepass w3lc0m31
```

## Install the Redis Client tools

```
sudo apt install redis-tools
```
## Launch the Redis Server

`docker compose up -d`
Please make sure that you start this from $REDIS_HOME directory
