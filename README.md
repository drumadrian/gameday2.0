# Game Day 2.0
Game Day 2.0 - The ultimate live dashboard


## Summary

The goal of this project is to quickly populate real-time dashboards
This project used OpenSearch Dashboards and Amazon CloudWatch Dashboards


![diagram](gameday20.gif)


## Usage Instructions: 

These steps are guidance and can be executed out of order by an experienced operator:

* Install the resouces for Game Day 2.0 into your AWS Account using the Deployment script
* Create CloudWatch Event to trigger the Gameday 2.0 Data Generator App (the AWS Lambda function provided) 
* Edit the frequency of the Amazon CloudWatch event (defaulted to 1 per day)
* (Optional) Send data manually to the Amazon Kinesis stream using the Gameday 2.0 Data Generator App (the AWS Lambda function provided) 
* Populate the CloudWatch Dashboard using the Game Day 2.0 data stored in Amazon CloudWatch
* Create and Populate the Open Dashboard using the Game Day 2.0 data stored in the Amazon OpenSearch domain
* (Optional) View the provisioned assets for the deployment by tag using Resource Groups in your AWS Console
* Delete the resouces for Game Day 2.0 into your AWS Account using the Undeploy Script




</br>

###  Run Deployment (the AWS Installer) script: 
###### (to be run using the AWS CloudShell or AWS Cloud9):
```
git clone https://github.com/drumadrian/gameday2.0.git
cd gameday2.0
bash deploy_gameday20.bash
cd ..
```




</br>

### Run Un-deployment (the AWS Installer) script: 
###### (to be run using the AWS CloudShell or AWS Cloud9):
```
git clone https://github.com/drumadrian/gameday2.0.git
cd gameday2.0
undeploy_gameday20.bash
cd ..
```

</br>

### How to Manually send Data using AWS Lambda: 
###### (Use the provided AWS Lambda function to send a metric ):

1) Copy the provided AWS Lambda function Input Data


```
TBS 
AWS Lambda input data TBS 
TBS 

```
2) Invoke the `data_generator` AWS Lambda function using the data you copied

3) Look for your data on the Dashboards


</br>

## Cloudcraft Architecture Diagrams

![Cloudcraft Diagram](diagram.png)

[Live Cloudcraft Diagram](https://app.cloudcraft.co/view/ac0dc498-4432-434d-902d-c94c69ef7cb9?key=3m40jn0enpfd2t90)


</br>

## Tutorial Video on YouTube

View on [YouTube](https://youtu.be/PtRwOCQ1zf8):   TBS






</br>

### References:

https://docs.aws.amazon.com/kinesisanalytics/latest/dev/lambda-preprocessing.html

https://aws.amazon.com/cloudshell/

https://docs.aws.amazon.com/ARG/latest/APIReference/Welcome.html




