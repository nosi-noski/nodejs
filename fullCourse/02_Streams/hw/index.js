const url = require('url')
const fs = require('fs')
const path = require('path')
const http = require('http')

const server = new http.Server();

server.on( 'request', (req, res) => {
    const pathname = decodeURI(url.parse(req.url).pathname)
    console.log(req)
    switch(req.method){
        case 'GET':
            if( pathname === '/' ){
                const filePath = path.join(__dirname, 'public', 'index.html');
                const fileStream = fs.createReadStream(filePath);
                fileStream.pipe(res);
            }else{
                res.statusCode = 404;
                res.end('Not found');
            }
        break;
        case 'POST':
            const fileStream = fs.createReadStream
        default: 
            res.statusCode = 501
            res.end('Not implement')
    }
});

server.on('data', (data)=>{
    console.log(data)
})
server.listen(3000)
