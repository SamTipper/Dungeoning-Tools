const express = require('express');
const app = express();


const port = 15212;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('', (req, res) => {
    res.send("Sup dood");
})

app.get()