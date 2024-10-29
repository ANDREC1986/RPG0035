const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'test_key';

class jwtAuth {
    constructor(role) {
        this.role = role;
    }

    run(req, res, next) {
        let authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                message: 'No Authorization Header'
            })
        }
        try {
            let token = authorization.split('Bearer ')[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Invalid Token Format'
                })
            }
            let decode = jwt.verify(token, SECRET_KEY);
            if (decode.role == this.role) {
                return next()
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({
                    message: 'Session Expired',
                    error: error.message,
                })
            }
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({
                    message: 'Invalid Token',
                    error: error.message,
                })
            }
            res.status(500).json({
                message: 'Internal server Error',
                error: error.message,
                stack: error.stack
            });
        }
    }
}

module.exports = jwtAuth