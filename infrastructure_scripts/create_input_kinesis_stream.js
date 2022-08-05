// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Steps: 
// 1. Check Environment Variables
// 2. Create a Kinesis Stream 
// 2. Create AWS Assets then add a new message to the SQS queue
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function main() {
  // Set the region explicitly to avoid ambiguity during the resolution of the endpoint
  let awsConfigRegion = 'us-west-2';
  AWS.config.update({region: awsConfigRegion});

  const ASSET_QUEUE_URL = await get_assetqueueUrl();
  const AWSACCOUNTNUMBER = await get_awsAccountNumber();
      
  let assetId = await makeid(4);
  
  console.log('\n\nassetId=', assetId);

  let asset = await createKinesisStream(awsConfigRegion, AWSACCOUNTNUMBER, 'input kinesis stream', assetId, ASSET_QUEUE_URL);
  await tagKinesisStream(asset);
  await addAssetToQueue(asset);

};
main();

async function get_assetqueueUrl() {
  // Set Deployment Asset Queue URL from environment variable
  if(process.env.ASSET_QUEUE_URL)
  {
    ASSET_QUEUE_URL = process.env.ASSET_QUEUE_URL;
    console.log('\n\n Deployment Asset Queue URL Environment Variable set to: \n\n', ASSET_QUEUE_URL + '\n'); 
    return(ASSET_QUEUE_URL);
  }
  else
  {
      console.error('\n\n Deployment Asset Queue URL Environment Variable NOT set!\n\n'); 
      process.exit(1);
  };

  // return myPromise;
};

async function createKinesisStream(awsConfigRegion, AWSACCOUNTNUMBER, assetName, assetId, ASSET_QUEUE_URL) {
  let asset = {};
  return createStreamPromise = new Promise((resolve, reject) => {

    var createStreamParams = {
      StreamName: assetId, /* required */
      ShardCount: 1,
      StreamModeDetails: {
          StreamMode: 'PROVISIONED' /* required */
      }
    };

    // Create an Kinesis service object
    var kinesis = new AWS.Kinesis();
    // var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});
    console.log('\n\ncreateStreamParams=', createStreamParams);

    kinesis.createStream(createStreamParams, function(err, data) {
      if (err) {
        console.error('\n\n An error occurred while calling kinesis.createStream()');
        console.log(err, err.stack); // an error occurred
        process.exit(1);
        reject(err);
      }
      else{
        console.log('successful response data=', data);           // successful response, new Asset created
        asset.Id = assetId;
        asset.Arn = 'arn:aws:kinesis:' + awsConfigRegion + ':' + AWSACCOUNTNUMBER + ':stream/' + assetId;
        asset.Name = assetName;
        asset.QueueUrl = ASSET_QUEUE_URL;
        console.log('\n\nNew Asset=', asset);
        if(
          data   // 👈 null and undefined check
          && Object.keys(data).length === 0
          && Object.getPrototypeOf(data) === Object.prototype) {
            console.log('\n\nNo data returned from call to kinesis.createStream()\n\n');
            resolve(asset);
        }
        else{
            console.log(err, err.stack); // an error occurred because an unexpected response was received from the AWS Kinesis API
            reject(err );
        }
      } 
    });
    // resolve(asset);
  });// END of promise
  // return createStreamPromise;  
};//END createKinesisStream


async function tagKinesisStream(asset) {
  let promise = new Promise(resolve => {
    console.log('\n\ntagKinesisStream asset=', asset);
    let addTagsToStreamparams = {
    StreamName: asset.Id, /* required */
    Tags: {
        'tagger': 'adrianformation',
        "Asset": 'protect your assets'
        // "Asset": JSON.stringify(asset)
    }
    };
    console.log('\n\naddTagsToStreamparams=', addTagsToStreamparams);
    // Create an Kinesis service object
    var kinesis = new AWS.Kinesis();
    kinesis.addTagsToStream(addTagsToStreamparams, function(err, data) {
      if (err){
        console.log(err, err.stack); // an error occurred
      } 
      else{
        console.log("addTagsToStream() success!  Response data=", data);           // successful response
      }
      });
    resolve(asset);
    });// END of promise
  return promise;
}; //END tagKinesisStream

async function get_awsAccountNumber() {
  let promise = new Promise(resolve => {
    let accountNumber = 1;
    let sts = new AWS.STS();
    sts.getCallerIdentity({}, function(err, data) {
      if (err) 
        {
            console.log("Error", err);
        } 
      else 
        {
          console.log('\n\ndata.Account=', data.Account);
          resolve(data.Account);
        }
    });
  });
  return promise;
};

async function addAssetToQueue(Asset) {
  let promise = new Promise(resolve => {
  let sendMessageParams = {
    MessageBody: JSON.stringify(Asset), /* required */
    QueueUrl: Asset.QueueUrl /* required */
  };
  console.log('\n\nsendMessageParams=', sendMessageParams);  
  // Create an SQS service object
  var sqs = new AWS.SQS();
  try
    {
        sqs.sendMessage(sendMessageParams, successCallback);
        resolve();
    }
  catch(err) 
    {
        console.log('\n\nError calling: sqs.sendMessage()\n\n');
        console.log(err); 
    };
  });
return promise;
};

function successCallback(err, sendMessageCallbackData) {
  if (err) 
    {
      console.log(err, err.stack); // an error occurred
    } 
  else 
    {
      console.log(sendMessageCallbackData);           // successful response
    }
};

async function makeid(length) {
  let promise = new Promise(resolve => {
    let result = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };
    resolve(result);
  });// END of promise
  return promise;
};




