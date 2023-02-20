const firebase = require('firebase');
const express = require('express');
const bodyParser = require('body-parser')
const constants = require('./constants');
const cors = require('cors')

const app = express();
firebase.initializeApp(constants.firebaseConfig);
const db = firebase.firestore();
const jsonParser = bodyParser.json();
const port = 15212;

app.use(cors());

// END OF API CONFIG

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('', async (req, res, next) => {
    return res.status(200).send("Success");
})

app.post('/set_campaign', jsonParser, async (req, res) => {
    try {
        console.log(req.body);
        let campaign = {};
        campaign[req.body.campaignName] = {
            players: JSON.parse(req.body.players)
        }
        db.collection('campaigns').doc(constants.docId).update(campaign);
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
