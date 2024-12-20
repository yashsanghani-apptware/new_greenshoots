
# Programmatic Access to DocumentDB via local machine

### Setup SSH Tunnel
Setup the SSH tunnel with the DocumentDB using your EC2 as an intermediary. In this case, I am using my labs machine

```
ssh  -L 27017:quantumflow.cluster-c38aqya2orrr.us-east-1.docdb.amazonaws.com:27017 -o ServerAliveCountMax=3 -o ExitOnForwardFailure=yes -o ServerAliveInterval=15 -p 22 labs.4fiveone.com -N -f
```

### Verify SSH Tunnel

Use the following command to check SSH tunnel is working

`lsof -P | grep -i "listen" | grep 27017 ` (Linux/MacOS)

`netstat -abn | findstr "LISTEN" | findstr 27017` (Windows)

### Confirm Localhost connected to DocumentDB

Run the following command to confirm that the localhost listens on the local port 27017

`nc -zv 127.0.0.1 27017 `


### Setting the connect string

Use the following connect string parameters to connect from the node.js programatically

```
const uri = "mongodb://agsiridb:W3lc0m3$2024@127.0.0.1:27017/?tls=true&directConnection=true";

 const client = new MongoClient(uri, {
     tlsCAFile: path.resolve(__dirname, 'global-bundle.pem'),
     tlsAllowInvalidHostnames: true
 });
```

## Agsiri Document Service
```
/app
├── src
│   ├── config
│   │   └── config.ts
│   ├── routes
│   │   └── storage.routes.ts
│   ├── services
│   │   └── documentdb.service.ts
│   └── app.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
└── tsconfig.json
```

