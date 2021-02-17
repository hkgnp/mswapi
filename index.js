const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require("express");
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;


// Add in the missing requires for the API to work
const cors = require('cors')

// create an instance of express app
let app = express();

// Add in the missing express.use() for the API to work
app.use(express.json());
app.use(cors());

async function main() {
  const DBNAME = "msw_toolbox";
  let db = await MongoUtil.connect(mongoUrl, DBNAME);

  app.get('/referrals', async (req, res) => {
    // add in the code to retrieve all
    // documents from the `books` collection
    let result = await db.collection('books').find({}).toArray()
    res.send(result)
  })

  app.post('/referrals', async (req, res) => {
    // add in the code to add a new
    // document to the `books` collection.
    // Each book has a title, ISBN and 
    // an author.
	
	let referTo = req.body.referTo
	let referrerName = req.body.referrerName
    let referrerOrg = req.body.referrerOrg
    let referrerEmail = req.body.referrerEmail
    let patientName = req.body.patientName
    let patientIdent = req.body.patientIdent
    let patientContact = req.body.patientContact
    let patientSR = req.body.patientSR

    let result = await db.collection('books').insertOne({
      "referTo": referTo,
      "referrerName": referrerName,
      "referrerOrg": referrerOrg,
		"referrerEmail": referrerEmail,
		"patientName": patientName,
		"patientIdent": patientIdent,
		"patientContact": patientContact,
		"patientSR": patientSR
    })
    res.send(result)
  })

}

main();

const httpServer = http.createServer(app)
httpServer.listen(3000)