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
}

module.exports = new AuthService();