import { FrenchPhoneInfoGetter } from "./index";

new FrenchPhoneInfoGetter("0782301615")
  .getInformation()
  .then(info => {
    console.log(info);
  })
  .catch(err => {
    console.error(err);
  });
