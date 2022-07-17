
# Deploy Steps
    # Get AWS credentials for CLI
    # Run deploy script
    # Input Deployment queue name
    # List all Deployments by name
    # Prompt for new Deployment name 
    # Prompt for new Deployment Assets queue name 
    # save Deployment name in environment variable
    # Run CLI parallel provisioning commands














# Command line Deploy Script

export deploymentname=gameday20adrian
export deploymentqueuename=mydeploymentqueue

# AWS CLI parallel provisioning commands:

node create_deployment.js &

node deploy_cloudwatch_scheduled_event.js &

node deploy_data_generator.js &

node deploy_input_kinesis_stream.js &

node deploy_kinesis_firehose_for_s3.js &

node deploy_kinesis_firehose_for_redshift.js &

node deploy_kinesis_firehose_for_opensearch.js &

node deploy_custom_analytics_ec2_instance.js &

node deploy_metric_processing_lambda.js &

node deploy_cloudwatch_dashboard.js &

node deploy_opensearch.js &


