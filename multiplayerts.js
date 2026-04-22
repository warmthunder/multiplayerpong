const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const path = require('path');




const server = http.createServer((req,res)=>{
    let filepath = './public' + req.url;

     if (req.url === '/') {
        filepath = './public/index.html';
    }

    let ext = path.extname(filepath);

        let contentType = 'text/html';

        if(ext === '.js'){
            contentType = 'text/javascript';
        }

        if(ext ==='.css'){
            contentType = 'text/css';
        }

    fs.readFile(filepath, (err,data)=>{
        if(err){
            console.log("cannot find file")
        }
        else{
            res.setHeader('Content-Type',contentType);
            res.end(data);
        }

    })

});

const wss = new WebSocket.Server({server});


wss.on('connection', (ws) => {
    console.log("Client connected");

    ws.on('message', (msg) => {
        console.log("Received:", msg.toString());
    });

    ws.send("Hello from server");
})

server.listen(3000);