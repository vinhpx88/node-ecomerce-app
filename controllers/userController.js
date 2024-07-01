const handleError = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserController {
  constructor(userService) {
      this.userService = userService;
  }

  async register(req, res) {
      try {
          const user = await this.userService.registerUser(req.body);
          res.status(201).json({ message: 'User registered successfully', user });
      } catch (error) {
          handleError(error, res);
      }
  }

  async login(req, res) {
      try {
          const { username, password } = req.body;
          const user = await this.userService.findUserByUsername(username);
          if (!user || !await bcrypt.compare(password, user.password)) {
              return res.status(401).json({ message: 'Invalid credentials' });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.status(200).json({ message: 'Login successful', token });
      } catch (error) {
          handleError(error, res);
      }
  }
}

module.exports = UserController;
