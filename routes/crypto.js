// this code is used for testing the crypto and uuid libraries only its not used in the route
// and doesn't have anything to do with the server functionality
// you can delete this file if you wish it won't effect the program.
const crypto = require("crypto");

function sha256(txt) {
  const secret = "abcdefg";
  const hash = crypto.createHmac("sha256", secret).update(txt).digest("hex");
  return hash;
}
let string = "abda2050";
let uuid = "f113cfcd-c0a6-43ab-b13c-0ce977dacbfc";
console.log(sha256(string + uuid));
