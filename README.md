1. Express typescript server creation. Run it moving in express-server folder and executes "npm start" command.
2. Angular client creation. Run it moving in angular-client folder and executes "npm start" command.
3. Dockerize Angular app.
    Build: docker build -t angular-client .
    Run: docker run --rm -d --name angular-client-container -p 4200:4200  angular-client
4. Dockerize Express server.
    Build: docker build -t express-server .
    Run: docker run --rm -d --name express-server-container -p 3000:3000 express-server

TODO - Add binding between client and server.