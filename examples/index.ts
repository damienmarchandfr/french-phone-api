// Test a french phone number in type script
import {FrenchPhoneInfoGetter} from '../index'

const fg = new FrenchPhoneInfoGetter('0778453625')

fg.getInformation()
    .then((info) => {
        console.log(info)
    })
    .catch((err) => {
        console.error(err)
    })

// OUPUT
// { input: '0778453625',
//   formatted: '+33778453625',
//   isMobile: true,
//   danger: 0,
//   operator: '' }
