const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user, expiresIn) => {
    const config = {};
    if (expiresIn) config.expiresIn = expiresIn;
    return JWT.sign({ id: user.id, email: user.email, userType : user.userType }, process.env.JWT_SECRET, config);
};

const verifyToken = (token) => {
    return JWT.verify(token, process.env.JWT_SECRET);
}

const encrypt = async (string) => {
    const salt = bcrypt.genSaltSync(10)
    const encrypted = await bcrypt.hash(string, salt)
    return encrypted
}

const isMatch = async (password, hashedPw) => {
    return await bcrypt.compare(password, hashedPw)
}

module.exports = {
    generateToken,
    verifyToken,
    encrypt,
    isMatch
}