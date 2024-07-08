const { Datastore } = require('@google-cloud/datastore');
const { Router } = require("express");
const express = require('express')
const app = express()
const router = Router()

process.env.DATASTORE_EMULATOR_HOST = "127.0.0.1:7079"
const APP_PORT = "8081"

// Creates a client
const datastore = new Datastore({
    projectId: "demo-project",
});

router.get("/", (_, res) => {
    res.send("API Endpoint")
});

router.get('/reviews', async (req, res) => {
    try {
        const query = datastore
            .createQuery('Review')
            .filter('submitter', '=', 'Alice')
            .order('submittedAt', { descending: true });

        const [reviews] = await datastore.runQuery(query);

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use("/api", router);
app.listen(APP_PORT, (error) => {
    console.log(`Application running on http://localhost:${APP_PORT}`)
    console.log(`Open http://localhost:${APP_PORT}/api/reviews`)
});