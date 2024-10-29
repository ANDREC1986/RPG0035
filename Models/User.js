class User {
    username;
    password;
    id ;
    email;
    perfil;
    
    constructor(username, password, id, email, perfil) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.email = email;
        this.perfil = perfil;
    }
}

module.exports = User