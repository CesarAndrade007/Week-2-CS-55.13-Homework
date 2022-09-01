// load the core node http module
const http = require("http");

// load the core node filesystem (fs) modules, suing js promises instead of callbacks
const fs = require("fs").promises;

//create a function to respond to http requests
const requestListener = function(req, res){
  // output request URL
  console.log(req.url);
  if (req.url === "/"){
    //check request url, if root, return html file
    // special variable __dirname has absolute path of where node code is running
    fs.readFile(__dirname + '/page.html' ).then(
      contents => {
        // set hhtp response header entry
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        
        //return 200 OK HTTP status code
        res.writeHead(200);

        //send back file contents + close response
        res.end(contents);
      }
    );
  }else{
    fs.readFile(__dirname + "/data.json")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        res.end(contents);
      })
  }
  
}

// Create http server instance
const server = http.createServer(requestListener);

// Define the TCP port and IP address to tell our http server to listen to
const host = "0.0.0.0"; // replit is going to override this from localhost to your workspace webview hostname URL

const port = "8080"; // replit is going to override this to use port 443 (SSL https)
server.listen(port, host, () => {
  console.log('Server is running')
});

