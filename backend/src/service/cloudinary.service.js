const { CloudinaryConfig } = require("../config/config");
const { fileDelete } = require("../utilities/helpers");
const cloudinary = require("cloudinary").v2

class CloudinaryService{
    constructor(){
       cloudinary.config({
         cloud_name: CloudinaryConfig.cloudName,
         api_key: CloudinaryConfig.apiKey,
         api_secret: CloudinaryConfig.apiSecret,
       });
    }

    async singleFileUpload(filepath, dir=null){
        try{
            const {public_id, secure_url} = await cloudinary.uploader.upload(filepath, {
                unique_filename: true,
                // format: "auto",
                folder: dir ? '/hotel-booking'+ dir :"/hotel-booking"
            })

            const thumbUrl = cloudinary.url(public_id, {
                transformation: [
                    {width:1024, height: 1024, aspect_ratio:"1.0", crop: "fill"}
             ]
            })

            fileDelete(filepath)
            
            return {
              id: public_id,
              optimizedUrl: thumbUrl,
              originalUrl: secure_url
            };
        } catch (exception){
            console.log(exception)
            throw{code:400, message:"Error Uploading File", status: "ERR_FILE_UPLOAD"}
        }
    }
}



const cloudinarySvc = new CloudinaryService;
module.exports = cloudinarySvc;