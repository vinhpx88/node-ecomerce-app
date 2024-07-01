const User = require('../models/user');

class UserService {
    constructor() {
        // Any other dependencies can be injected here
    }

    async registerUser(userData) {
        const user = new User(userData);
        await user.save();
        return user;
    }

    async findUserByUsername(username) {
        return await User.findOne({ username });
    }
}

module.exports = UserService;
