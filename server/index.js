const http= require('http');
const fs= require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://priya1234:1234@vuemongo.xlr83a0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const connectDB=async()=>{
    try{
        await client.connect();
        console.log("mongo db is connected")
    }
    catch(e){
        console.log(e)
    }
}
connectDB();
const server = http.createServer(async(req,res) => {
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",  
  };
console.log(req.url)
if(req.url === '/'){
    fs.readFile( path.join(__dirname,'public','portfolio.html'),(err,data)=>{

    if (err) throw err;
    res.writeHead(200,{ 'Content-Type' : 'text/html'});
    res.end(data);
    }
 )
 
}
else if(req.url=='/api')
{
    const cursor = client.db("vuemongo").collection("hospitals").find({});
    const results = await cursor.toArray();
    //console.log(results);
    const js= (JSON.stringify(results));
    res.writeHead(200,headers)
    console.log(js);
    res.end(js);

}
else{
    res.end("Eror 404")
}

});

const PORT = process.env.PORT || 5050;
server.listen(PORT,() => console.log(`server is running on ${PORT}`));
