const firebase = require('firebase');
const express = require('express');
const constants = require('./constants');
const cors = require('cors')

const app = express();
firebase.initializeApp(constants.firebaseConfig);
const db = firebase.firestore();
const port = 15212;

app.use(cors);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.post('/set_campaign', async (req, res) => {
    console.log(JSON.stringify(req), JSON.stringify(res));
    return res.status(200).send("Success");
    // try {
    //     db.collection('campaigns').doc(constants.docId).update({
    //         "Arcane King Campaign": {
    //             players: []
    //         }
    //     });
    //     return res.status(200).send("Success"); 
    // } catch (error) {
    //     return res.status(500).send(error);
    // }
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
