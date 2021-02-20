# Introduction

This API was created for the purposes of the assignment ([msw.toolbox](https://hkgnp.github.io/msw-toolbox)). It is being deployed on [Heroku](https://www.heroku.com) and connects to [MongoDB](https://www.mongodb.com/cloud/atlas).

Note: As this is not a secure database, please do not post any real or sensitive information to it.

# Endpoints

### Retrieve referrals made using `msw.toolbox`

`GET https://polar-retreat-01092.herokuapp.com/referrals`

### Store referrals to the database

`POST https://polar-retreat-01092.herokuapp.com/referrals`

### Process referrals (this deletes the referral from the database)

`DELETE https://polar-retreat-01092.herokuapp.com/referrals`

The following parameters are required:

```
{
    "referTo": "",
    "referrerName": "",
    "referrerOrg": "",
    "referrerEmail": "",
    "patientName": "",
    "patientIdent": "",
    "patientContact": "",
    "patientSR": "",
}
```
