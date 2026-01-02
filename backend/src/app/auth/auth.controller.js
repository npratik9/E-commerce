const userSvc = require("../user/user.service");
const authMailSvc = require("./auth.mail");

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

  activateUser = (req, res, next) => {
    const params = req.params;
    res.status(200).json({
      data: { params },
      message: "This is activation key " + params.token,
      status: "ok",
    });
  };

  resendToken = (req, res, next) => {
    res.json({
      data: null,
      message: "resending token",
      status: "ok",
    });
  };

  loginUser = (req, res, next) => {};

  getLoggedInUser = (req, res, next) => {};

  logOut = (req, res, next) => {};

  updateUserProfile = (req, res, next) => {};
}

const authCtrl = new AuthController();

module.exports = authCtrl;
