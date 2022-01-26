<div align="center">
    <img src="cove-logo-512x512.png" width="200px"/>
</div>

<h1 align="center">Welcome to Cove 👋</h1>
    

[![License](https://img.shields.io/github/license/rails/rails)](https://github.com/jonathanloos/cove)
![GitHub pull requests](https://img.shields.io/github/issues-pr/jonathanloos/cove)
![GitHub issues](https://img.shields.io/github/issues/jonathanloos/cove)
![Issues Closed](https://img.shields.io/github/issues-closed/jonathanloos/cove.svg)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
    
## 🏝 About the initiative
We're a team of recent University of Waterloo graduates who found a passion for helping others who may be struggling with mental health. With cove, users can build their personalized, digital safety plan and access it anytime, anywhere, on any platform and uner any network conditions. 

> To learn more about our venture, reach out to us at [trycove.ca](https://trycove.ca).

## 🏔 First, a note on mental health
First and foremost, we recognize mental health affects us all in different ways. We encourage anyone who feels like they are struggling or have a friend who is struggling to reach out, seek help and support others whenever possible.

## 🤖 About the project
Cove is an Angular app built using Ionic UI components and tooling. The app's serverless backend is built using AWS Amplify including storage, auth, api, offline(datastore) and database(dynamo) resources. The app was originally meant to be a hybrid app for ios/android but was eventually converted to a PWA.

## 🚀 Setup
### 1. Clone the repository and install all dependencies
```sh
git clone https://github.com/jonathanloos/cove.git

cd cove

yarn install
```
### 2. Initialize Amplify Project
1.  Create an [AWS Account](https://signin.aws.amazon.com/signin)
2.  Configure the Amplify Cli as outlined [here](https://docs.amplify.aws/cli/start/install/#configure-the-amplify-cli).
3. Deploy the project

Setup Amplify
```sh
amplify init

? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y
```

Create the api
> We already have the GraphQL code generated for this project, so generating it here is not necessary.
```sh
amplify add api

? Please select from one of the below mentioned services: GraphQL
? Provide API name: $API_NAME
? Choose the default authorization type for the API API key
? Enter a description for the API key: $API_KEY_DESCRIPTION
? After how many days from now the API key should expire (1-365): $CUSTOM_DAYS_HERE
? Do you want to configure advanced settings for the GraphQL API Yes, I want to make some additional changes.
? Configure additional auth types? No
? Configure conflict detection? No
? Do you have an annotated GraphQL schema? Yes
? Provide your schema file path: schema.graphql

amplify add codegen
```
Add Auth
```sh
amplify add auth

Using service: Cognito, provided by: awscloudformation
 
The current configured provider is Amazon Cognito. 
 
Do you want to use the default authentication and security configuration? Default configuration
Warning: you will not be able to edit these selections. 
How do you want users to be able to sign in? $SELECT_METHOD (we use email)
Do you want to configure advanced settings? No, I am done.
Successfully added auth resource locally
```

Add Storage
```sh
amplify add storage

? Please select from one of the below mentioned services: Content (Images, audio, video, etc.)
? Please provide a friendly name for your resource that will be used to label this category in the project: $FRIENDLY_NAME
? Please provide bucket name: $BUCKET_NAME
? Who should have access: $CUSTOM
? What kind of access do you want for Authenticated users? $CUSTOM
? Do you want to add a Lambda Trigger for your S3 Bucket? $CUSTOM
Successfully added resource locally
```

Status Check: Running `amplify status` should return the following table
```sh
amplify status

Current Environment: dev

| Category | Resource name   | Operation | Provider plugin   |
| -------- | --------------- | --------- | ----------------- |
| Api      | $API_NAME       | Create    | awscloudformation |
| Auth     | $AUTH_NAME      | Create    | awscloudformation |
| Storage  | $STORAGE_NAME   | Create    | awscloudformation |
```

Add hosting
```sh
amplify add hosting

? Select the plugin module to execute Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type Manual deployment
```
🚀 Deploy!
```sh
amplify publish       
✔ Successfully pulled backend environment dev from the cloud.

Current Environment: dev

| Category | Resource name   | Operation | Provider plugin   |
| -------- | --------------- | --------- | ----------------- |
| Api      | coveapp         | Create    | awscloudformation |
| Auth     | coveapp70e2d7ed | Create    | awscloudformation |
| Storage  | coveAppStorage  | Create    | awscloudformation |
| Hosting  | amplifyhosting  | Create    | awscloudformation |
? Are you sure you want to continue? Yes
```

### 3. Configure GCP Key
Cove uses Google Maps to search and display location data. To enable it, follow these steps:
1. Create a GCP API Key as seen [here](https://cloud.google.com/docs/authentication/api-keys#creating_an_api_key)
2. Ensure the following APIs are enabled for the API key: Geocoding API, Maps Javascript API, Maps Static API and Places API.
3. Create a `.env` file in the root directory with: `GCP_MAPS_API_KEY=INSERT_GCP_KEY_HERE` and replace `INSERT_GCP_KEY_HERE` with the newly generated key.
4. Create the `GCP_MAPS_API_KEY` environment variable in the AWS Amplify Console

### 4. Start the App (Once backend is finished deploying)
```sh
ng start
```
> **Note**: npm start will first set the environment vairables in `.env` then start the app.
## 🎉 Usage
### Create Help Resources
1. Sign up in the app after following the previous steps

2. Open the AppSync console:

```sh
amplify console api
```

3. Click on __Queries__ to open the GraphiQL Editor. Login with your username and use the `aws_user_pools_web_client_id` located in __aws-exports.js__ for the ClientId.

4. Create help resources manually to be able to select them within the app. This list is universal and will be accessible to all users. Make sure to provide resources that you or others using the app have access to.

```graphql
mutation createHelpResource {
    createHelpResource(input: {
        description: "", 
        live_chat: false, 
        phone: {
            hoursOfOperation: "", 
            number: ""
        }, 
        sms: {
            hoursOfOperation: "", 
            number: ""
        }, 
        title: "", 
        url: ""
    }) {
        id title description live_chat phone { number hoursOfOperation } sms { number hoursOfOperation } url
    }
}
```

## We need your help
Cove is looking for contributors / maintainers! Think you could support the platform? Maybe contribute something awesome and meaningful to the mental health community? This is your chance! Drop us a lin on our website [trycove.ca](trycove.ca) or create an issue/PR.


