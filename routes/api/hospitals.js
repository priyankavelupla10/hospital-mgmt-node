const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Hospital
router.get('/', async (req, res) => {
    const hospitals = await loadHospitalsCollection();
    res.send(await hospitals.find({}).toArray());
});


//Add Hospital
router.post('/', async (req, res) => {
    const hospitals = await loadHospitalsCollection();
    await hospitals.insertOne({
        title: req.body.title,
        dean: req.body.dean,
        doctors: req.body.doctors,
        patients: req.body.patients,
        startDate: req.body.startDate,
        revenue: req.body.revenue
    });
    res.status(201).send();
});

//Delete Hospital



async function loadHospitalsCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://priya1234:1234@vuemongo.xlr83a0.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true
    });

    return client.db('vuemongo').collection('hospitals');


}


module.exports = router;