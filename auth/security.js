require('dotenv').config();

const jwt = require('jsonwebtoken');
// const security = require('crypto').randomBytes(64).toString('hex');
// console.log(security);


authenticationToken = (data) => {
    const userID = `${data.customer_id}`;
    return jwt.sign(userID, process.env.SECRETE_TOKEN);
}


authorizationToken = (req, res, next) => {
    // console.log(req.headers);
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1];
        const decode = jwt.verify(token, process.env.SECRETE_TOKEN);
        req.USER_ID = decode;
        next();
    }
    else {
        next(res.status(403).json({
            message: 'Not yet Logged In!!'
        }))
    }
}




module.exports = {authenticationToken, authorizationToken};
