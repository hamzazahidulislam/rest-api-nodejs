const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'vgjVUPdu+2!j!%$GvpL+p*#4*CQhvf29y89hyjKRGY$dc')

        req.user = decode
        next()
    } catch (error) {
        res.json({
            message: "Authenticate Failed"
        })
    }
}

module.exports = authenticate