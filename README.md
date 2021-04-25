# Dentist Reservation App
It is based on 3 main services:
- An Angular client running on port 4200.
- An Express server (.ts) running on port 3000.
- A Mongodb running on port 27017.

## Executions modes:
1. Run each component indipendently:
    - Run angular application from angular-client folder with command: "npm start"
    - Run mongodb (locally or in a docker container exposing communication port)
    - Run express server from express-server folder with command: "npm start" (nb. set mongodb url in api-routes.ts)

2. Run all together:
    - In the root folder run "docker-compose build" and after "docker-compose up"

### Project creation steps
- Create an Express typescript server in an express-server folder. Move it in selected folder and executes "npm start" command.
- Create an Angular client application in an angular-client folder. Move it in selected folder and executes "npm start" command.
- Dockerize Angular app.
    Build: docker build -t angular-client .
    Run: docker run --rm -d --name angular-client-container -p 4200:4200  angular-client
- Dockerize Express server (to debug locally run "npm start" and add an "Attack by process ID" in VS).
    Build: docker build -t express-server .
    Run: docker run --rm -d --name express-server-container -p 3000:3000 express-server
- Dockerize Mongodb:
    Run: docker run --rm -d --name mongodb -p 27017:27017 mongo
- Docker compose application. Run together angular client, express server and mongodb.



