const User = require("../Models/User")
let Users = [
    {"username" : "user", "password" : "123456", "id" : 123, "email" : "user@dominio.com", "perfil": "user"},
    {"username" : "admin", "password" : "123456789", "id" : 124, "email" : "admin@dominio.com", "perfil": "admin"},
    {"username" : "colab", "password" : "123", "id" : 125, "email" : "colab@dominio.com", "perfil": "user"},
  ]

let InMemoryUsersData = new Array(User)
for (u in Users) {
    InMemoryUsersData.push(new User(Users[u].username, Users[u].password, Users[u].id, u.email, Users[u].perfil))
}

module.exports = InMemoryUsersData