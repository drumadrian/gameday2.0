# Game Day 2.0
Game Day 2.0 - The ultimate live dashboard


## Summary

The goal of this project is to quickly populate real-time dashboards
This project used OpenSearch Dashboards and Amazon CloudWatch Dashboards


![diagram](gameday20.gif)


## Usage Instructions: 

These steps are guidance and can be executed out of order by an experienced operator:

* Install the resouces for Game Day 2.0 into your AWS Account using the Installer Script
* Send data to the Amazon Kinesis stream using the Gameday 2.0 Data Generator App (the AWS Lambda function provided) 
* Edit the frequency of the Amazon CloudWatch event (defaulted to 1 per day)
* Create an Amazon Managed Grafana instance
* Uninstall the resouces for Game Day 2.0 into your AWS Account using the UnInstaller Script
	* The AWS Installer and AWS 




</br>

###  Deployment (the AWS Installer) code: 
###### (to be uploaed to ECR for Fargate):
```
cd getcontainer
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $GET_REPOSITORY_URI
docker build \
-t $GET_REPOSITORY_NAME:latest .
docker tag $GET_REPOSITORY_NAME:latest $GET_REPOSITORY_URI:latest
docker push $GET_REPOSITORY_URI:latest
cd ..
```




</br>

### Gameday 2.0 Un-Deployment code(the AWS Uninstaller): 
###### (to be uploaed to ECR for Fargate):
```
cd getcontainer
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $GET_REPOSITORY_URI
docker build \
-t $GET_REPOSITORY_NAME:latest .
docker tag $GET_REPOSITORY_NAME:latest $GET_REPOSITORY_URI:latest
docker push $GET_REPOSITORY_URI:latest
cd ..
```

</br>

### How to Manually adding Data using AWS Lambda: 
###### (Use the provided AWS Lambda function Input Data to send a metric ):

1) Copy the provided AWS Lambda function Input Data


```
TBS 
AWS Lambda input data TBS 
TBS 

```
2) Invoke the `gameday20manualinputdata` AWS Lambda function

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




