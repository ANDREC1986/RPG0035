const Users = require('../Repositories/InMemoryUsersData')
const User = require('../Models/User')
class UserController{
    constructor() {
        this.data = Users
    }

    findUserByUsername(username) {
        let userData
        for (u in this.data)  {
            if (this.data[u].username == username) {
                userData = this.data[u]
            }}
        if (userData != null) {
            return userData
        }
    }

    getAll() {
        let userData = new Array
        for (u in this.data) {
            userData.push(this.data[u].username)
        }
        return userData
    }

    // Outos métodos poderiam ter sido desenvolvidos aqui, como addUser, deleteUser, updateUser, porém o exercicio não fez a implementação necessária.

}
module.exports = UserController