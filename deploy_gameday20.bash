#############################################
# AWS CLI Deploy Script provisioning commands:
#############################################

# node create_deployment_asset_queue.js &

node deploy_input_kinesis_stream.js &

node deploy_cloudwatch_scheduled_event.js &

node deploy_data_generator.js &

node deploy_kinesis_firehose_for_s3.js &

node deploy_kinesis_firehose_for_redshift.js &

node deploy_kinesis_firehose_for_opensearch.js &

node deploy_custom_analytics_ec2_instance.js &

node deploy_metric_processing_lambda.js &

node deploy_cloudwatch_dashboard.js &

node deploy_opensearch.js &


