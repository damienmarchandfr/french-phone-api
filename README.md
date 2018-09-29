# FRENCH PHONE API
This small JavaScript lib returns informations of a french phone number from this [website](https://www.recherche-inverse.com/) in a json format.

It works with FRENCH phone numbers ONLY.

## Installation

    yarn add https://github.com/damienmarchandfr/french-phone-api
    
or
  
    npm i https://github.com/damienmarchandfr/french-phone-api

##  Use

**With JavaScript**

    var F = require('./node_modules/french-phone-api/dist/index')
	new F.FrenchPhoneInfoGetter('0782301616')
		.getInformations()
		.then((r)=>{
			console.log(result)
		})
		.catch(err=>{
			console.log(err)
		})

**Or with TypeScript**

	import {FrenchPhoneInfoGetter} from  'french-phone-api'

	try {
		const  result  =  await  new  FrenchPhoneInfoGetter('0782301615').getInformations()
	} catch (error) {
		console.log(error)
	}

## Response

	{ 
		input: '0778453625',
	   	formated: '+33778453625',
   		isMobile: true,
   		danger: 0,
  		operator: 'free' 
	}


## Test

To run tests

	yarn run test

or

	npm run test


