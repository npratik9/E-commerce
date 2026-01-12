const SessionModel = require("./session.model")

class AuthService {
    async storeSession(userId, token){
        try{
            const sessionObj= new SessionModel({
                user: userId,
                accessToken: token,
                device: "web",
                data: JSON.stringify({})
            })

            return await sessionObj.save()

        } catch(exception){
            throw exception
        }
    }

    async getSingleRowByFilter(filter){
        try{
            return await SessionModel.findOne(filter)
                .populate("user", ['_id','name','email','role','image','address','phone','gender','status'])
        } catch(exception){
            throw exception
        }
    }

    async deleteManyByFilter(filter){
        try{
            return await SessionModel.deleteMany(filter)
        } catch(exception){
            throw exception
        }
    }

   
}

module.exports = new AuthService();