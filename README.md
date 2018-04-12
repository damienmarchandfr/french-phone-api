![logo](frenchPhone.jpg)

# FRENCH PHONE API
This small JavaScript lib returns informations of a french phone number from this [website](https://www.recherche-inverse.com/) in a json format.

It works with FRENCH phone numbers ONLY.

## Installation

    yarn add https://github.com/damienmarchandfr/french-phone-api
    or with npm
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

UNDER [WTFPL](http://www.wtfpl.net/) LICENCE

![licence](http://www.wtfpl.net/wp-content/uploads/2012/12/logo-220x1601.png)


