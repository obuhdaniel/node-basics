const http = require('http');

const url = require('url');

const fs = require('fs');

const noPage = fs.readFileSync("404.html", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
  });

http.createServer((req,res)=>{

    const q = url.parse(req.url, true);

    let filename = ""

    

    switch (q.pathname) {
        case "/":
            filename = "." + "/index.html";
            break;
    
        case "/index":
            filename = "." + "/index.html";
            break;
        case "/about":
            filename = "." + "/about.html";
            break;
        case "/contact":
            filename = "." + "/contact.html";
            break;
        default:
            filename = "." + q.pathname;
            break;
    }
    

    fs.readFile(filename, (err, data)=>{
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(noPage);
            res.end();
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();

    });



}).listen(8081)