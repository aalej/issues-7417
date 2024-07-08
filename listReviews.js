const { Datastore } = require('@google-cloud/datastore');

process.env.DATASTORE_EMULATOR_HOST = "127.0.0.1:7079"

// Creates a client
const datastore = new Datastore({
    projectId: "demo-project",
});

async function listTasks() {
    try {
        const query = datastore
            .createQuery('Review')
            .filter('submitter', '=', 'Alice')
            .order('submittedAt', { descending: true });

        const [reviews] = await datastore.runQuery(query);
        console.log(reviews)
    } catch (error) {
        console.error('Error fetching user reviews:', error);
    }
}

listTasks()