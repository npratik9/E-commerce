const bcrypt = require('bcryptjs');
const { Status } = require('../../config/constants');
const randomStringGenerate = require('../../utilities/helpers');

class AuthController {
   registerUser = (req, res, next) =>{
    //data
    const data = req.body
    //encryption of pwd
    data.password = bcrypt.hashSync(data.password, 12);

    //access control
    data.status = Status.INACTIVE;
    data.activationToken = randomStringGenerate();

    res.status(200).json({
        data: {data},
        message:"user registered successfully",
        status:"ok"
    })

   };

   activateUser= (req, res, next) =>{
      const params = req.params;
        res.status(200).json({
          data: { params },
          message: "This is activation key "+ params.token,
          status: "ok",
        });
   };

   resendToken = (req, res, next) =>{
    res.json({
      data: null,
      message:"resending token",
      status:"ok"
    })

   };

   loginUser= (req, res, next) =>{

   };

   getLoggedInUser= (req, res, next) =>{

   };

   logOut= (req, res, next) =>{

   };

   updateUserProfile= (req, res, next) =>{

   };

}

const authCtrl = new AuthController;

module.exports = authCtrl;
