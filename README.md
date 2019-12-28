# FRENCH PHONE API

This small JavaScript library returns information about any French phone numbers from this [website](https://www.recherche-inverse.com/) in a JSON format.

[![Build Status](https://travis-ci.com/damienmarchandfr/french-phone-api.svg?branch=master)](https://travis-ci.com/damienmarchandfr/french-phone-api)

**It works with FRENCH phone numbers ONLY.**

## Installation

    yarn add french-phone-api

or

    npm i french-phone-api --save

## Use

**With JavaScript**

    var F = require('french-phone-api')
    new F.FrenchPhoneInfoGetter('0782301616')
    	.getInformation()
    	.then((result)=>{
    		console.log(result)
    	})
    	.catch(err=>{
    		console.log(err)
    	})

**Or with TypeScript**

    import {FrenchPhoneInfoGetter} from  'french-phone-api'

    try {
    	const  result  =  await  new  FrenchPhoneInfoGetter('0782301615').getInformation()
    	console.log(result)
    } catch (error) {
    	console.log(error)
    }

## Response

    {
    	input: '0778453625',
       	formatted: '+33778453625',
    	isMobile: true,
    	danger: 0,
    	operator: 'free'
    }

## Test

To run tests

    yarn run test

or

    npm run test
