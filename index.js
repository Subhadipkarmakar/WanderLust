require('dotenv/config');

const express = require("express");
const app = express();

const mongoose = require('mongoose');
const listing = require("./models/listing");

const initdb = require("./init/mongo");

initdb();

const port = 8080;

app.get("/", (req, res) => {
    res.send("hiii i am root")
})

app.get("/testlisting", async (req, res) => {
    let samplelisting = new listing({
        title: "my new villa",
        description: "by the sea",
        country: "china",
        price: 1200
    });
    const dbResponse = await samplelisting.save();
    console.log(dbResponse);
    res.send("succesfully testing")
})


app.listen(port, () => {
    console.log(`app is lisening ${port}`);
})
