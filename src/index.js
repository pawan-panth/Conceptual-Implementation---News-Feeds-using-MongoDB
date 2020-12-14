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

app.get("/newsFeeds", async (req,res)=>{
    if(!isInvalid(req.query.offset) &&  !isInvalid(req.query.limit)){
    let found = await newsArticleModel.find({},{_id:0,__v:0}).skip(req.query.offset).limit(req.query.limit);
        res.send(found);
    }
    else if(!isInvalid(req.query.offset)){
        let found = await newsArticleModel.find({},{_id:0,__v:0}).skip(req.query.offset).limit(10);
        res.send(found);
    }
    else if(!isInvalid(req.query.limit)){
        let found = await newsArticleModel.find({},{_id:0,__v:0}).skip(0).limit(req.query.limit);
        res.send(found);
    }else{
        let found = await newsArticleModel.find({},{_id:0,__v:0}).skip(0).limit(10);
        res.send(found);

    }

    
  
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;