/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Create an Kinesis service object
const kinesis = new AWS.Kinesis();
const firehose = new AWS.Firehose({ region: 'us-west-2' });  // Todo: VS KinesisClient
const cloudwatch = new AWS.CloudWatch({ region: 'us-west-2' });

const DeliveryStreamName = 'gameday2.0'
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create sinusoidal CPU load data for the CPU load chart in my CloudWatch Dashboard

// callback_function = logger;
// setTimeout(callback_function, 0);
for(var i = 0; i < 500; i++){
    logger('i = ' + i);
    let cpu_promise = get_cpu_usage();
    let memory_promise = get_memory_usage();
    
    let promises = [cpu_promise, memory_promise];
    Promise.all(promises)
        .then( (result) => { 
            send_to_kinesis(result[0]);  
            send_to_kinesis(result[1]);  
            send_to_cloudwatch(result[0]);
            send_to_cloudwatch(result[1]);
        }
        );
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function logger(logstring){
    const date = new Date();
    today = date.toTimeString();
    now = date.toISOString()
    console.timeStamp(now + ': ' + logstring);
    console.log('\n');
    console.log('*********************************************** LOG START ***********************************************************');
    console.log('*************************************************************************************************************************');
    console.log('*************************************************************************************************************************');
    console.log('*************************************************************************************************************************');
    console.log('>>>>>>>>>>>>>>>>>>' + today + '<<<<<<<<<<<<<<<<<<<<<<');
    console.log('Date: ' + now);
    console.log('table formatted:');
    console.table(logstring);
    console.log('*************************************************************************************************************************');
    console.log('  >>>>>>>>>>>>>>>>>>' + today + '<<<<<<<<<<<<<<<<<<<<<<');
    console.log('*************************************************************************************************************************');
    console.log('Date: ' + now);
    console.log('Standard log formatted:');
    console.log(logstring);
    console.log('*************************************************************************************************************************');
    console.log('*********************************************** LOG END ***********************************************************');
    console.log('*************************************************************************************************************************');
}// end logger();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function get_cpu_usage() {
    get_cpu_usage_promise = new Promise(function(resolve, reject) {
        const date = new Date();
        now = date.toISOString();
        cpu_usage = Math.random() * 100;
        metric_data = {
            "time": now, 
            "cpu_usage": cpu_usage
        };

        // logger(metric_data);
        resolve(metric_data);
    });
    return get_cpu_usage_promise;

};// end get_cpu_usage();


function get_memory_usage() {
    get_memory_usage_promise = new Promise(function(resolve, reject) {
        const date = new Date();
        now = date.toISOString();
        memory_usage = Math.random() * 100;
        metric_data = {
            "time": now, 
            "memory_usage": memory_usage
        };

        // logger(metric_data);
        resolve(metric_data);
    });
    return get_memory_usage_promise;

}; // end get_memory_usage();


function send_to_kinesis(input_metric_data){
    metric_data_string = JSON.stringify(input_metric_data);
    var params = {
        DeliveryStreamName: DeliveryStreamName, /* required */
        Record: { /* required */
            "Data": metric_data_string /* Strings will be Base-64 encoded on your behalf */ /* required */
        }
    };    
    // logger(params);
    firehose.putRecord(params, aws_callback);   
};

  
function send_to_cloudwatch(input_metric_data){
    metric_data = null;
    params = null;
    if (input_metric_data.cpu_usage){
        var params = {
            MetricData: [{
                MetricName: 'cpu_usage',
                Value: input_metric_data.cpu_usage,
                Unit: 'Percent'
            }],
            Namespace: 'gameday'
        };
    };
    if (input_metric_data.memory_usage){
        var params = {
            MetricData: [{
                MetricName: 'memory_usage',
                Value: input_metric_data.memory_usage,
                Unit: 'Percent'
            }],
            Namespace: 'gameday'
        };
    };

    cloudwatch.putMetricData(params, aws_callback);
}; // end send_to_cloudwatch()


function aws_callback(err, callback_Data) {
    if (err) 
      {
        console.log(err, err.stack); // an error occurred
      } 
    else 
      {
        logger(callback_Data);           // successful response
      }
  }; //END successCallback
  
  