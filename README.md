# Cove

## 🏝 About the initiative
We're a team of recent University of Waterloo graduates who found a passion for helping others who may be struggling with mental health. With cove, users can build their personalized, digital safety plan and access it anytime, anywhere, on any platform and uner any network conditions. 

> To learn more about our venture, drop us a line at [trycove.ca](https://trycove.ca).

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
```sh
amplify init

? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y

amplify push

? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? N
```
> We already have the GraphQL code generated for this project, so generating it here is not necessary.

### 3. Start the App (Once backend is finished deploying)
```sh
ng serve
```

## 🎉 Usage
### Create Help Resources
1. Sign up in the app after following the previous steps

2. Open the AppSync console:

```sh
amplify console api
```

3. Click on __Queries__ to open the GraphiQL Editor. Login with your username and use the `aws_user_pools_web_client_id` located in __aws-exports.js__ for the ClientId.

4. Create help resources manually to be able to select them within the app. This list is universal and will be accessible to all users.

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






