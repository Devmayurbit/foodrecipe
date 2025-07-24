const moongoose = require('mongoose');
const connectToDb = async () => {

  await moongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("connection has stablished"))


}
module.exports = connectToDb