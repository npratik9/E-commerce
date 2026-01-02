const bcrypt = require('bcryptjs');
const { Status } = require('../../config/constants');
const {randomStringGenerate, dateCreate} = require('../../utilities/helpers');
const UserModel = require('./user.model');
const cloudinarySvc = require('../../service/cloudinary.service');

class UserService {
    async transformToUserData (req) {
      try{
        //data
        const data = req.body;
        //encryption of pwd
        data.password = bcrypt.hashSync(data.password, 12);
        
        if(!req.file){
          throw {code:400, detail:{image: "image is required"}, message:"Validation Failed", status:"VALIDATION_ERR"}
        }

        data.image = await cloudinarySvc.singleFileUpload(req.file.path,"users");
        //access control
        data.status = Status.INACTIVE;
        data.activationToken = randomStringGenerate();
        data.expiry = dateCreate(new Date() , 1)

        return data;
      } catch(exception) {
        throw exception
      }
    }

    async registerUser(data) {
      try{
        const userObj = new UserModel(data);
        return await userObj.save();
      }catch (exception){
        // console.log(exception)
        //throw{code:400, message:"User Cannot Be Register", status:"USER_REGISTER_ERR"}
        throw exception
      }
    }

    getUserProfile (userObj) {
      return {
        _id: userObj._id ?? "",
        name: userObj.name ?? "",
        email: userObj.email ?? "",
        phone: userObj.phone ?? "",
        name: userObj.name ?? "",
        role: userObj.role ?? "",
        image: userObj.image ?? "",
        address: userObj.address ?? "",
        gender: userObj.gender ?? "",
        status: userObj.status ?? ""
      };
    }

}

const userSvc= new UserService();

module.exports = userSvc;
