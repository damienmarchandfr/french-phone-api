//How to test a FRENCH phone number
var F = require('./dist/index')

new F.FrenchPhoneInfoGetter('0782301616').getInformations().then((informations)=>{
    console.log(informations)
})
.catch(err=>{
    console.log(err)
})

//OUPUT
// { input: '0782301616',
//   formated: '+33782301616',
//   isMobile: true,
//   danger: 0,
//   operator: 'free mobile' }