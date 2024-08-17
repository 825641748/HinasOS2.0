const jwt = require('jsonwebtoken');
const {
	JWT
} = require("../config.json");
const {
	SECRET_KEY,
	expiresIn
} = JWT;
// JWT 验证中间件
const verifyJWT = (req, res, next) => {
	const token = req.headers['authorization']?.split(' '); // 假设令牌在 Authorization 头部的 Bearer 中

	if (!token) {
		return res.status(403).json({
			message: 'No token provided'
		});
	}

	jwt.verify(token, SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				message: 'Token is invalid'
			});
		}
		req.user = decoded;
		next();
	});
};

const createJWT = (data, secretKey = SECRET_KEY, options = {
	expiresIn
}) => {
	return jwt.sign(data, secretKey, options);
}
module.exports = {
	verifyJWT,
	createJWT
};