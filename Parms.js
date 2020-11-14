let http=require('http');
let url=require('url');
//require('dotenv').config();


let route={
    "GET":{
        "/":(req,res,parms)=>{
            res.writeHead(200,{'Content-Type':'text/html'}),
            res.end(`Method is get with url is / and parms name is ${parms.query.name} and age is ${parms.query.age}`)
        },
        "/about":(req,res,parms)=>{
            res.writeHead(200,{'Content-Type':'text/html'}),
            res.end(`Method is get with url is /about and parms name is ${parms.query.name} and age is ${parms.query.age}.`)
        }
    },
    "POST":{
        "/":(req,res,parms)=>{
            res.writeHead(200,{'Content-Type':'text/html'}),
            res.end(`Method is post with url is / and parms name is ${parms.query.name} and age is ${parms.query.age}.`)
        },
        "/about":(req,res,parms)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(`Method is post with url is /about and parms name is ${parms.query.name} and age is ${parms.query.age}.`);
        }
    },
    "NA":(req,res,parms)=>{
        res.writeHead(404);
        res.end("Page not found the error!");
    }
};

let server=http.createServer(function(req,res){
    let methodname=req.method;
    let parms=url.parse(req.url,true);
    //route[methodname][parms.pathname](req,res);
    //let name=parms.query.name;                        ////take name and age from query in parms
    //let age=parms.query.age;
    //let path=parms.pathname;                         ////take path from parms
    //console.log(name,age,path);

    let resolve=route[methodname][parms.pathname];
    if(resolve != null && resolve != undefined){
        resolve(req,res,parms);
    }else{
        route["NA"](req,res);
    }
});

server.listen(3000,function(){
    console.log(`Server is running.....`);
})