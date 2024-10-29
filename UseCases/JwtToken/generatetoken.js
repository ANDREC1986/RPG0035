const jwt = require('jsonwebtoken');
const User = require("../../Models/User")
const SECRET_KEY = process.env.SECRET_KEY || 'test_key';

function generateToken(user) {
    const payload = {
        id: user.username,
        role: user.perfil
    }  
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1m'});
    return token
}

module.exports = generateToken