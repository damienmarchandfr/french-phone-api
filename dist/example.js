"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
new index_1.FrenchPhoneInfoGetter("0782301615")
    .getInformation()
    .then(info => {
    console.log(info);
})
    .catch(err => {
    console.error(err);
});
