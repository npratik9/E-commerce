const bcrypt = require('bcryptjs');
const { Status } = require('../../config/constants');
const randomStringGenerate = require('../../utilities/helpers');
const UserModel = require('./user.model');

class UserService {
    transformToUserData (req) {
      //data
      const data = req.body;
      //encryption of pwd
      data.password = bcrypt.hashSync(data.password, 12);

      //access control
      data.status = Status.INACTIVE;
      data.activationToken = randomStringGenerate();

      return data;
    }

    async registerUser(data) {
      try{
        const userObj = new UserModel(data);
        return await userObj.save();
      }catch (exception){
        console.log(exception)
        throw{code:400, message:"User Cannot Be Register", status:"USER_REGISTER_ERR"}
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
