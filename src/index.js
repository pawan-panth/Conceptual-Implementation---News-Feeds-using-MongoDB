const express = require('express');
const { ReplSet } = require('mongodb');
const app = express()
const port = 8080
const {newsArticleModel} = require("./connector")
const onePageArticleCount = 10;


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const isInvalid = (val) =>{
    return val === null || val === undefined|| isNaN(Number(val));
};

app.get("/newFeeds", async (req,res)=>{
    const { limit, offset } = req.query;

  const lim = limit == undefined ? 10 : isNaN(limit) ? 10 : Number(limit);
  const off = offset == undefined ? 0 : isNaN(offset) ? 0 : Number(offset);
  const result = await newsArticleModel.find().skip(off).limit(lim);
  res.send(result);

    
  
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;