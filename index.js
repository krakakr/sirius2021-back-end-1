const express = require("express");
const f = require("fs");
const server = express();
const jsonParser = express.json();
var randtoken = require('rand-token');
const urlencodedParser = express.urlencoded({extended: false});
const path = "data.json";

server.get("/:url/views", function(request,response){
    const token = request.params.url;
    const jsonfile = f.readFileSync(path, "utf8");
    const links = JSON.parse(jsonfile);
    let redrict = null;
    for(var i=0; i<links.length; i++){
        if(links[i].token == token){
            redrict = links[i];
            break;
        }
    }
    if(redrict){   
        response.status(200).send({"viewCount": redrict.views});
    }
  else{
        response.status(404).send("Not Found(404)");
    }

})

server.get("/:url", function(request,response){
    const token = request.params.url;
    const jsonfile = f.readFileSync(path, "utf8");
    const links = JSON.parse(jsonfile);
    let redrict = null;

    for(var i=0; i<links.length; i++){
        if(links[i].token == token){
            redrict = links[i];
            break;
        }}

    if(redrict){
        redrict.views = redrict.views + 1;
        data = JSON.stringify(links);
        f.writeFileSync(path, data);
        response.redirect(redrict.link);}

    else{}});

server.post("/shorten", urlencodedParser, function (request, response){
    if(!request.body.urlToShorten) return response.status(400);
    const linkaf = request.body.urlToShorten;
    const token = randtoken.generate(8).toLocaleLowerCase();
    if (!linkaf.includes("https://")) {
        link1 = "https://" + postlink;
        let link = {
        "token": token, 
        "link": link1, 
        "views": 0};
        let data = f.readFileSync(path, "utf8");
         let links = JSON.parse(data);
        links.push(link);
        data = JSON.stringify(links);
        f.writeFileSync("data.json", data);
        response.status(201).send({"status": "Created", "shortenedUrl": `${request.get('host')}/${token}`});
    }
    else {
        let link = {"token": token, "link": postlink, "views": 0};
        let data = f.readFileSync(path, "utf8");
        let links = JSON.parse(data);
        links.push(link);
        data = JSON.stringify(links);
        f.writeFileSync("data.json", data);
        response.status(201).send({"status": "Created", "shortenedUrl": `${request.get('host')}/${token}`});
    }})


server.listen(3004);
