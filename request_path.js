let http=require('http');

let route={
    "GET":{
        "/":()=>console.log("Method is Get with url is /."),
        "/about":()=>console.log("Method is Get with url is /about.")
    },
    "POST":{
        "/":()=>console.log("Method is Post with url is /."),
        "/about":()=>console.log("Method is Post with url is /about.")
    }
}

let server=http.createServer(function(req,res){
    let methodname=req.method;
    let url=req.url;
    route[methodname][url]();
});

server.listen(3000,function(){
    console.log("Server is running.....");
})