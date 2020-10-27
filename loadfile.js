var fs = require('fs');

function load(name,res){
    name = String(name);

    fs.readFile(name,function(error, html){
        if(error){
            res.writeHead(400);
            res.write(`Error reading from ${name}`);
        } else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            console.log(`Written ${name}`);
            
        }
        res.end();
    })
}