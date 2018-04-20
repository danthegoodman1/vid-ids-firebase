'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')({origin: true});
const app = express();
const gcsw = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
const fileUpload = require('express-fileupload');
var gcloud = require('google-cloud');
// Here is a tesat bucket: storage.danthegoodman.com


app.use(bodyparser.json())
app.use(fileUpload());

app.get('/tcpdump', (req, res) => {

    // Enable Storage
    var gcs = gcloud.storage({
      projectId: 'prime-pod-200918',
      keyFilename: './keyfile.json'
    });

    // Reference an existing bucket.
    var bucket = gcs.bucket('storage.danthegoodman.com');

    // Upload a local file to a new file to be created in your bucket.
    bucket.upload('./testfile.txt', function(err, file) {
      if (!err) {
        res.send("done?");
      }
    });
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
