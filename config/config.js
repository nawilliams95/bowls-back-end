require("dotenv").config();

module.exports = {
    jwtSecret: process.env.SECRET  ,//you seacret sig that signs and verifyies each token and verifies user 
    jwtSession: {
        session: false
    }
}