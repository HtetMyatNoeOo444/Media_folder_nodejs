
let http=require('http');
let url=require('url');
let qs=require('querystring');
//require('dotenv').config();

let responder=(req,res,parms)=>{
    res.writeHead(200,{'Content-Type':'text/html'}),
    res.end()
}


let route={
    "GET":{
        "/":(req,res)=>{
            responder(req,res,`Method is get with url is / .`);
        },
        "/home":(req,res)=>{
            responder(req,res,`Method is get with url is /about .`);
        }
    },
    "POST":{
        "/":(req,res)=>{
            responder(req,res,`Method is post with url is / .`);
        },
        "/api/login":(req,res)=>{
            let body='';
            req.on('data',data=>{
                body+=data;
            });
            res.end('end',()=>{
                let query=qs.parse(body);
                console.log(query);
                res.end();
            })
        }
    },
    "NA":(req,res)=>{
        responder(req,res,`Page is not found the error.`)
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
        resolve(req,res);
    }else{
        route["NA"](req,res);
    }
});

server.listen(3000,function(){
    console.log(`Server is running.....`);
})