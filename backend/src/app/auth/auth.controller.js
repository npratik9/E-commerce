const bcrypt = require("bcryptjs");
const { Status } = require("../../config/constants");
const { randomStringGenerate, dateCreate } = require("../../utilities/helpers");
const userSvc = require("../user/user.service");
const authMailSvc = require("./auth.mail");
const jwt = require("jsonwebtoken");
const { AppConfig } = require("../../config/config");
const authService = require("./auth.service");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await userSvc.transformToUserData(req);
      const user = await userSvc.registerUser(data);
      
      await authMailSvc.activateYourAccount(user)

      res.status(200).json({
        data: userSvc.getUserProfile(user),
        message: "user registered successfully",
        status: "ok",
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
    try{
      const token= req.params.token;
      let userDetail= await userSvc.getSingleRowByFilter({
        activationToken: token,
      })

      if(!userDetail){
        throw{ code:404, message:"Token not found or broken", status:"TOKEN_NOT_FOUND"}
      }

      const today = Date.now()
      const expiry = userDetail.expiry.getTime()
      if(today > expiry){
        throw {code:400, message:"your token or link has expired", status:"TOKEN_EXPIRED"}
      }

      userDetail= await userSvc.upadteSingleRowByFilter(
        {
          _id: userDetail._id,
        },
        {
          status: Status.ACTIVE,
          activationToken: null,
          expiry: null
        }
      );

      await authMailSvc.welcomeMessageToUser(userDetail)

      res.json({
        data: userDetail,
        message:"Your account has been registered successfully",
        status:"ACTIVATION_SUCCESSFUL"
      })
    } catch(exception){
      throw exception
    }
  };

  resendToken = async(req, res, next) => {
    try{
      const token= req.params.token;
      let userDetail= await userSvc.getSingleRowByFilter({
        activationToken: token,
      })

      if(!userDetail){
        throw{ code:404, message:"Token not found or broken", status:"TOKEN_NOT_FOUND"}
      }

      const today = Date.now()
      const expiry = userDetail.expiry.getTime()
      if(today <= expiry){
        throw {code:400, message:"your token or link has not expired", status:"TOKEN_NOT_EXPIRED"}
      }

      const updateData = {
        activationToken: randomStringGenerate(),
        expiry: dateCreate(new Date(), 1),
      };

      userDetail= await userSvc.upadteSingleRowByFilter(
        {
          _id: userDetail._id,
        }, updateData
        
      );

      userDetail.activationToken = updateData.activationToken

      await authMailSvc.resendTokenNotification(userDetail)
      res.json({
        data: userDetail,
        message: "token-resent",
        status: "ok"
      })
    } catch(exception){
      throw exception
    }
  };

  loginUser = async(req, res, next) => {
    try{
      const {email, password} = req.body;

      const userDetail= await userSvc.getSingleRowByFilter({
        email: email
      })

      if(!userDetail){
        throw {code:422, message:"Email not registered", status:"EMAIL_NOT_FOUND"}
      }

      if(userDetail.status !== Status.ACTIVE){
        throw {code: 422, message: "Email not activated", status: "EMAIL_NOT_ACTIVATED",};
      }

      if(!bcrypt.compareSync(password, userDetail.password)){
        throw {code:422, message:"Credentials not matched", status:"INVALID_CREDENTIALS"}
      }

      //token
      const accessToken= jwt.sign({sub: userDetail._id, typ: "Bearer"}, AppConfig.jwtSecret, {
        expiresIn: "1d"
      })

      //session
      await authService.storeSession(userDetail._id, accessToken)

      res.json({
        data: accessToken,
        message: 'login successful',
        status: "LOGIN"
      })

    } catch (exception){
      next(exception)
    }
  };

  getLoggedInUser = (req, res, next) => {
    res.json({
      data: req.loggedInUser,
      message: "my-profile",
      status: "ok",
    });
  };

  logOut = async (req, res, next) => {
    try{
      //logout current device
      let filter = {
        accessToken: req.headers['authorization'].replace("Bearer ", "")
      }

      //logout all devices
      if(req.query.devices === "all"){
        filter= {
          user: req.loggedInUser._id
        }
      }

      // console.log(filter)
      await authService.deleteManyByFilter(filter);
      res.json({
        data: null,
        message:"you have been logged out",
        status:"ok"
      })

    }catch(exception){
      next(exception)
    }
  };

  updateUserProfile = async(req, res, next) => {
    try{

    }catch(exception){
      next(exception)
    }
  };
}

const authCtrl = new AuthController();

module.exports = authCtrl;
