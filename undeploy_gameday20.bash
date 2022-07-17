
# Undeploy Steps
    # Get AWS credentials for CLI
    # Run undeploy script
    # Input Deployment queue name
    # List all Deployments by name
    # Prompt for Deployment name to undeploy
    # save Deployment name in environment variable
    # Run CLI parallel destroy commands














# Command line Undeploy Script

export deploymentname=gameday20adrian
export deploymentqueuename=mydeploymentqueue

# AWS CLI parallel provisioning commands:

node undeploy_cloudwatch_scheduled_event.js&

node undeploy_data_generator.js&

node undeploy_input_kinesis_stream.js&

node undeploy_kinesis_firehose_for_s3.js&

node undeploy_kinesis_firehose_for_redshift.js&

node undeploy_kinesis_firehose_for_opensearch.js&

node undeploy_custom_analytics_ec2_instance.js&

node undeploy_metric_processing_lambda.js&

node undeploy_cloudwatch_dashboard.js&

node undeploy_opensearch.js&

node delete_deployment.js &
