const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://priya1234:1234@vuemongo.xlr83a0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
};
connectDB();
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  //res.write("Welcome to Hospitals Management");
  const url = req.url;
  if (url === "/") {
    fs.readFile(
      path.join(__dirname, "public", "portfolio.html"),
      (error, portfolioData) => {
        //if (error) throw error;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(portfolioData);
      }
    );
  } else if (url == "/api") {
    const conn = client.db("vuemongo").collection("hospitals").find({});
    const apiResult = await conn.toArray();
    const jsonData = JSON.stringify(apiResult);
    //res.writeHead(200, headers);
    res.end(jsonData);
  } else {
    res.end("Url not found");
  }
});

const PORT = process.env.PORT || 5959;
server.listen(PORT, () => console.log(`server is running on ${PORT}`));
