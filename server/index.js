const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const hospitals = require('./routes/api/hospitals');

app.use('/api',hospitals);

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/portfolio.html'));

if(process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname+'/public/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/portfolio.html'));
}

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port ${port}`));
