const express = require('express');
const MongoUtil = require('./MongoUtil');
const mongoUrl = process.env.MONGO_URL;
// Add in the missing requires for the API to work
const cors = require('cors');

// create an instance of express app
let app = express();

// Add in the missing express.use() for the API to work
app.use(express.json());
app.use(cors());

async function main() {
  const DBNAME = 'msw_toolbox';
  let db = await MongoUtil.connect(mongoUrl, DBNAME);

  try {
    app.get('/referrals', async (req, res) => {
      let result = await db.collection('referrals').find({}).toArray();
      res.send(result);
    });
  } catch (e) {
    res.send(
      `Apologies. API was not consumed successfully. Please contact the administrator at Github`
    );
    console.log(e);
  }

  try {
    app.post('/referrals', async (req, res) => {
      let referTo = req.body.referTo;
      let referrerName = req.body.referrerName;
      let referrerOrg = req.body.referrerOrg;
      let referrerEmail = req.body.referrerEmail;
      let patientName = req.body.patientName;
      let patientIdent = req.body.patientIdent;
      let patientContact = req.body.patientContact;
      let patientSR = req.body.patientSR;

      let result = await db.collection('referrals').insertOne({
        referTo: referTo,
        referrerName: referrerName,
        referrerOrg: referrerOrg,
        referrerEmail: referrerEmail,
        patientName: patientName,
        patientIdent: patientIdent,
        patientContact: patientContact,
        patientSR: patientSR,
      });
      res.send(result);
    });
  } catch (e) {
    res.send(
      `Apologies. API was not consumed successfully. Please contact the administrator at Github`
    );
    console.log(e);
  }
}

main();

app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
