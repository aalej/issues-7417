const { Datastore } = require('@google-cloud/datastore');

function getRandomFeedback() {
    const feedback = ["Looks good!", "Clear & concise", "Needs revision", "Well done!", "Interesting!", "On the right track"]
    return feedback[Math.floor(Math.random() * feedback.length)]
}

process.env.DATASTORE_EMULATOR_HOST = "127.0.0.1:7079"

const datastore = new Datastore({
    projectId: "demo-project",
});

async function addReview() {
    const name = "Alice";
    const review = getRandomFeedback();
    const taskKey = datastore.key('Review');
    const entity = {
        key: taskKey,
        data: [
            {
                name: 'submittedAt',
                value: new Date(),
            },
            {
                name: 'submitter',
                value: name,
            },
            {
                name: 'review',
                value: review,
            },
        ],
    };

    try {
        await datastore.save(entity);
        console.log(`Task ${taskKey.id} created successfully.`);
    } catch (err) {
        console.error('ERROR:', err);
    }
}

addReview()