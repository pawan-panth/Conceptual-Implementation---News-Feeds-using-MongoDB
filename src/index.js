const express = require('express');
const { ReplSet } = require('mongodb');
const app = express()
const port = 8080
const {newsArticleModel} = require("./connector")
const onePageArticleCount = 10;


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/newsFeeds", async (req,res)=>{
    if(req.query.limit && req.query.offset){
        let docs = await newsArticleModel.aggregate([
            {
                $skip: Number(req.query.offset)
            },
            {
                $limit:  Number(req.query.limit)
            },
            {
                $project:{
                    _id: 0
                }
            }

        ]);
        res.status(200).send(docs);
    }
    else if(req.query.limit){
        let docs = await newsArticleModel.aggregate([
            {
                $skip: 10
            },
            {
                $limit: Number(req.query.limit)
            },
            {
                $project:{
                    _id: 0
                }
            }
        ]);
        res.status(200).send(docs);
    }
    else if(req.query.offset){
        let docs =  await newsArticleModel.aggregate([
            {
                $skip: number(req.query.offset)
            },
            {
                $limit: 10
            },
            {
                $project:{
                    _id: 0
                }
            }

        ]);
        res.status(200).send(docs);
    }
    else{
        let docs =  await newsArticleModel.aggregate([
            {
                $limit: 10
            },
            {
                $project:{
                    _id: 0
                }
            }
        ]);
        res.status(200).send(docs);
   }
   res.send();
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;