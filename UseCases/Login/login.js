const UserController = require('../../Controller/UserController')
const User = require("../../Models/User");
const generateToken = require('../JwtToken/generatetoken');

function login(username, password){
    let userController = new UserController();
    let user = userController.findUserByUsername(username)
    if(user) {
        if(user.password == password) {
            let token = generateToken(user)
            return token
        } else {
            console.log("Usuario e/ou Senha Incorretos")
        }
    } else {
        console.log("Usuario não existe")
    }
}

module.exports = login