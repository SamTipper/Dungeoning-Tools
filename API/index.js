const firebase = require('firebase');
const express = require('express');
const bodyParser = require('body-parser')
const constants = require('./constants');
const crypto = require('crypto');
const cors = require('cors')

const app = express();
firebase.initializeApp(constants.firebaseConfig);
const db = firebase.firestore();
const jsonParser = bodyParser.json();
const port = 15212;

app.use(cors());

// END OF API CONFIG

// HELPER FUNCTIONS

function generateCampaignCode(){
    let campaignCode = crypto.randomBytes(4).toString('hex');
    return campaignCode;
}

function findCampaign(campaignCode, campaignData){
    return campaignCode = campaignData['campaignCode'];
}

// END OF HELPER FUNCTIONS

// ENDPOINTS

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('', async (req, res, next) => {
    return res.status(200).send("Success");
})

app.post('/set_campaign', jsonParser, async (req, res) => {
    try {
        let campaign = {};
        let campaignCode = generateCampaignCode();

        campaign[campaignCode] = {
            name: req.body.campaignName,
            players: JSON.parse(req.body.players)
        }
        db.collection('campaigns').doc(constants.docId).update(campaign);
        return res.status(201).send({ campaignCode: campaignCode }); 
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.get('/get_campaign', async (req, res) => {
    try {
        db.collection('campaigns').get().then(
            querysnapshot => {
                let found = false;
                const campaignCode = req.headers['campaigncode'];
                let campaign = {}
                for (campaign of querysnapshot.docs){
                    for (key of Object.keys(campaign.data())){
                        if (key == campaignCode){
                            found = true;
                            campaign = campaign.data();
                            break;
                        }
                    }
                }
                if (found){
                    console.log(campaign);
                    return res.status(200).send(JSON.stringify(campaign));
                } else {
                    return res.status(404).send("Campaign Not Found")
                }
            }
        );
    } catch (error) {
        return res.status(500).send(error);
    }
});
