'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')({origin: true});
const app = express();
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
const fileUpload = require('express-fileupload');




app.use(bodyparser.json())
app.use(fileUpload());

app.post('/tcpdump', (req, res) => {
  // res.send("This this is the tcp dump!");
  // All the if statements to make sure we have everything:
  // if(!req.body) return res.status(400).send("I need a body!") // If there is no body respond with error and tell them that we need a body
  // if(!req.body.company) return res.status(400).send("Specify an organization please!");
  // if(!req.body.cuid) return  res.status(400).send("I still need the CUID please!"); // Company unique id
  // if(!req.body.deviceID) return res.status(400).send("You need to specify the device please!"); // The computer that is hitting it
  // if(req.body.device)

  // let company = req.body.company;
  // let cuid = req.body.cuid;
  //let companyDbRef = admin.database().ref(`/${company}`);
  // const ref = functions.storage.ref();
  // const bucket = admin.storage().bucket();
  var bucket = gcs.bucket('vip-ids.appspot.com');
  // let deviceID = req.body.deviceID
  if (!req.files){
    return res.status(400).send('No files were uploaded.');
  }

  bucket.upload(req.files.sampleFile);
  res.send("File uploaded?");
});
exports.gettcpdata = functions.https.onRequest(app);




// onDrop(photos){
//   const ref = firebase.storage().ref()
//   photos.forEach((photo) => {
//     let photoRef = ref.child("Resource/" + this.state.category + "/" + photo.name);
//     photoRef.put(photo)
//     .then((snap) => {
//       this.setState(prevState => ({
//         content : prevState.content + `\n\n<img alt="${photo.name}" src="${snap.downloadURL}" width="50%">`
//       }))
//     })
//   })
// }

exports.upload = functions.https.onRequest((req, res) => {
  if(req.method === 'POST') {

    // Perform any authorization checks here to assert
    // that the end user is authorized to upload.

    // const myBucket = storage.bucket('my-bucket');
    // const myFile = myBucket.file(req.body.filename);
    console.log(JSON.stringify(req.body));
    // const myFile = req.body.filename;
    // const contentType = req.body.contentType;
    // res.send(`Got the file: ${myFile}`);

    // This link should only last 5 minutes
    // const expiresAtMs = Date.now() + 300000;
    // const config = {
    //     action: 'write',
    //     expires: expiresAtMs,
    //     contentType: contentType
    // };
    res.send("FEK")
    // myFile.getSignedUrl(config, function(err, url) {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).end();
    //         return;
    //     }
    //     res.send(url);
    // });
  } else {
      res.status(405).end();
  }
});
