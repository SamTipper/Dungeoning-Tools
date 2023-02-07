const firebase = require('firebase');
const express = require('express');
const constants = require('./constants');

const app = express();
firebase.initializeApp(constants.firebaseConfig);
const db = firebase.firestore();
const port = 15212;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/set_campaign', async (req, res) => {
    try {
        db.collection('campaigns').doc(constants.docId).update({
            "Arcane King Campaign": {
                players: []
            }
        });
        return res.status(200).send("Success"); 
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.get('/get_campaign', async (req, res) => {
    try {
        db.collection('campaigns').get().then(
            querysnapshot => {
            for (let doc of querysnapshot.docs){
                console.log(doc.data());
            }
            return res.status(200).send("Success");
        });
    } catch (error) {
        return res.status(500).send(error);
    }
});
