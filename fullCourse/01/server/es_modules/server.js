const http = require('http');
const handler = require ('./handler');

/*
    Search Route for modules:
    
    core modules => 
    node_modules => ../node_modules => ../../node_modules
    NODE_PATH=.
*/

const server = http.createServer();
const emit = server.emit;
server.emit = function(...args){
    console.log(args[0]);
    return emit.apply(server, args)
}

server.on('request', handler)

server.listen(3000);