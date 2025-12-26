//mongobd server

const { default: mongoose } = require("mongoose")
const { DBConfig } = require("./config")

const connectMongodb = async() =>{
    try{
        await mongoose.connect(DBConfig.mongodbUrl, {
            dbName: DBConfig.mongodbName,
            autoCreate: true,
            autoIndex: true,
            // autoEncryption: true,
        })
        console.log("*****MONGDB CONNECTED SUCCESSFULLY*****")
    } catch(exception) {
        console.log(exception)
        process.exit(1)
        throw {code:404, message:"Error DB server connection", status:"MONGODB_SERVER_CONNECTION_ERR"}

    }
}

module.exports = {
    connectMongodb
}