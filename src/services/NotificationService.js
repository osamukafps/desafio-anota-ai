var AWS = require('aws-sdk');
var topicArn = 'arn:aws:sns:us-east-2:654654410432:catalog-emit'
require('dotenv').config();

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sns = new AWS.SNS();

async function sendMessageToTopic(message) {
    const params = {
        Message: message.toString(),
        TopicArn: topicArn
    };

    try {
        const response = await sns.publish(params).promise();
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + response.MessageId);
        return response.MessageId;
    }
    catch(err) {
        throw err;
    }
}

module.exports = {
    sendMessageToTopic
};