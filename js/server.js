// const fetch = require("node-fetch");

const fs = require("fs");
const http = require("http");
const url = require("url");
const hostname = "127.0.0.1";
const port = 8000;
const querystring = require("querystring");
// const figlet = require("figlet");

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  console.log(page);
  const params = querystring.parse(url.parse(req.url).query);

  function flipCheck(flipRequest, flipResult) {
    return flipRequest === flipResult
      ? `${flipResult} You Win!`
      : `${flipResult} You Lose!`;
  }

  // Option to load the basic index.html file - working
  if (page == "/") {
    fs.readFile("./../index.html", "utf-8", function (err, data) {
      if (err) {
        console.log(data, typeof data);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }
  // Option to handle the button push server request to flip a coin
  else if (page == "/api") {
    const flipR = params["flipRequest"];
    if ("flipRequest" in params) {
      let flipResult = Math.random() <= 0.5 ? "heads" : "tails";
      let result = flipCheck(flipR, flipResult);
      let message = flipResult === "heads" ? "img/heads.png" : "img/tails.png";

      if (params["flipRequest"]) {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          result: result,
          message: message,
        };
        res.end(JSON.stringify(objToJson));
      }
    }
  }
  // Option to load the basic css file - working
  else if (page == "/css/style.css") {
    fs.readFile("./../css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
    // Option to load the basic js file - working
  } else if (page == "/js/main.js") {
    fs.readFile("./../js/main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else {
    // Throw an error if an invalid request file

    console.log("Something went wrong...");
    return;
  }
});

// const server = http.createServer((req, res) => {
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   const flipR = params["flipRequest"];

//   function flipCheck(flipRequest, flipResult) {
//     return flipRequest === flipResult
//       ? `Correct! it was ${flipResult}`
//       : `Wrong! it was ${flipResult}`;
//   }
//   console.log(page);
//   if (page == "/") {
//     fs.readFile("index.html", function (err, data) {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       res.end();
//     });
//   } else if (page == "/api") {
//     if ("flipRequest" in params) {
//       let flipResult = Math.random() <= 0.5 ? "heads" : "tails";
//       let result = flipCheck(flipR, flipResult);
//       let message = figlet(`${flipResult}`);
//       if (params["flipRequest"]) {
//         res.writeHead(200, { "Content-Type": "application/json" });
//         const objToJson = {
//           result: result,
//           message: message,
//         };
//         res.end(JSON.stringify(objToJson));
//       }
//     } else {
//       figlet("404!!", function (err, data) {
//         if (err) {
//           console.log("Something went wrong...");
//           console.dir(err);
//           return;
//         }
//         res.write(data);
//         res.end();
//       });
//     }
//   }
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
