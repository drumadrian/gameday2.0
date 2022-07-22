
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});



// Steps: 
// 1. Create a deployment SQS queue using the deployment URL in the environment variable
// 2. Create AWS Assets by adding a new SQS message to the queue using the created asset response message




// Set Deployment Asset Queue URL from environment variable
if(process.env.DEPLOYMENT_ASSET_QUEUE_URL){
  console.log('Deployment Asset Queue URL Environment Variable set to: \n', DEPLOYMENT_ASSET_QUEUE_URL + '\n'); 
  createNewQueue = false
}
else
{
  console.warn('\n\n Deployment Asset Queue URL Environment Variable NOT set!\n\n'); 
  createNewQueue = true
}

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var params = {
  // MaxResults: 'NUMBER_VALUE',
  // NextToken: 'STRING_VALUE',
  // QueueNamePrefix: 'STRING_VALUE'
};




sqs.listQueues(params, function(err, data) {
  if (err) {
    console.warn("Error calling listQueues()\n", err);
  } else {
    console.log("Success calling listQueues()\n", data.QueueUrls);
  }
});









function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}









