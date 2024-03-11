const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken


    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204); // No Content
    const refreshToken = cookies.jwt;

    //Is refreshToken in DB?

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }
    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save()
    console.log(result);
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serve on https
    res.sendStatus(204);
}
module.exports = { handleLogout };