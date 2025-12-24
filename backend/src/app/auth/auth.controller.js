class AuthController {
   registerUser = (req, res, next) =>{
    res.status(200).json({
        data: "register user",
        message:"This is registerUser function",
        status:"ok"
    })

   };

   activateUser= (req, res, next) =>{
      const params = req.params;
        res.status(200).json({
          data: { params },
          message: "This is activateUser function "+ params.token,
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
