const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('frontend'));

app.post('/save-lap', (req, res) => {
    const { lapTime } = req.body;
    console.log('Lap time received:', lapTime);
    res.json({ status: 'success', lapTime });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
