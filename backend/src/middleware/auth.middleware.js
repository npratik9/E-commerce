const auth = (data) =>{
    return (req, res, next) => {


        next();
    };

};

module.exports= auth;