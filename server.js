const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const PORT = process.env.PORT || 8000;

//Initialize middleware
// we use to  have to install body parser but now it is a buil in middle ware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

//MongoConfig
const uri = "mongodb+srv://app_user:Shivam2121@testcluster.tftdlv7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


async function getArticleInfo(name){
    var info="";
  try{
    console.log("Connecting to DB...");
    await client.connect();
    console.log("Connected :)");
    const db= client.db('mernblog');
    const articles=db.collection('articles');

    info = await articles.findOne({"name":name})
    console.log(info)
  }
  finally{
    await client.close();
  }

}




app.get("/api/articles/:name", async (req, res) =>{ 
    
    var info="";
  try{
    console.log("Connecting to DB...");
    await client.connect();
    console.log("Connected :)");
    const db= client.db('mernblog');
    const articles=db.collection('articles');

    info = await articles.findOne({"name":req.params.name})
    console.log(info)
    res.status(200).json(info)
  }
  catch(error){
    res.status(500,"Unable to connect to db"+error)
  }
  finally{
    await client.close();
  }
  
   
});

app.get("/api/articles", async (req, res) =>{ 
    
    var info="";
  try{
    console.log("Connecting to DB...");
    await client.connect();
    console.log("Connected :)");
    const db= client.db('mernblog');
    const articles=db.collection('articles');

    info = await articles.find()
    console.log(info)
    res.status(200).json(info)
  }
  catch(error){
    res.status(500,"Unable to connect to db"+error)
  }
  finally{
    await client.close();
  }
  
   
});



app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
