# SF-custom-fields
Create custom fields using node js and jsforce.

Since many times, especially at the beginning of projects, we need to create custom fields for business requirements, automating this task will save time for important more meaningful tasks like cooking tacos or sleeping siestas.

# Create the authentication file
Create a folder called config in the root of the project

Create a json file called `default`

Add the following information

```
{
	"salesForce": {
		"User" : "your Salesforce username",
		"Password" : "your password",
		"SecurityToken" : "your security token",
		"LoginUrl" : "https://login.salesforce.com"
	}
}
```

# Installing dependencies

Download node js from [Node JS](https://nodejs.org/es/download/). 

Install the following libraries if you haven't before
```
npm install config
```
```
npm install jsforce
```
```
npm install-excel-file
```
```
npm install exceljs
```

# Creating an excel file
Create an excel file in the root of the project with extension `.xlsx`.

You can use the template that is in the repository.

# Running the script
Open your command console, navigate to the folder where you clone the project and run the script

```
node index.js
```

You will be prompting to introduce the API name of the custom objects for which you want to create fields (make sure to include __c at the end) and the name of the excel file you want to use for metadata source.

# Supported fields
The fields in the excel are the ones supported. Fields like Lookups/MasterDetails are not (yet) supported nor formula fields (won't, most likely, ever be supported)