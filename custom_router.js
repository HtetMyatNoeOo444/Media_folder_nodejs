let http=require('http');
let url=require('url');

let route={
    "GET":{
        "/":(req,res)=>{
            res.writeHead(200,{'Content-Type':'text/html'}),
            res.end("Method is get with url is /.")
        },
        "/about":(req,res)=>{
            res.writeHead(200,{'Content-Type':'text/html'}),
            res.end("Method is get with url is /about.")
        }
    },
    "POST":{
        "/":(req,res)=>{
            res.writeHead(200,{'Content-Type':'text/html'}),
            res.end("Method is post with url is /.")
        },
        "/about":(req,res)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end("Method is post with url is /about.");
        }
    },
    "NA":(req,res)=>{
        res.writeHead(404);
        res.end("Page not found the error!");
    }
};

let server=http.createServer(function(req,res){
    let methodname=req.method;
    let url_name=url.parse(req.url,true);
    //route[methodname][url_name.pathname](req,res);
    let resolve=route[methodname][url_name.pathname];
    if(resolve != null && resolve != undefined){
        resolve(req,res);
    }else{
        route["NA"](req,res);
    }
});

server.listen(3000,function(){
    console.log("Server is running.....");
})