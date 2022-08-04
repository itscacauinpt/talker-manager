const router = require('express').Router();
const crypto = require('crypto');
const validateUser = require('../middleware/loginValidation');

router.post('/', validateUser, (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');

  return response.status(200).json({ token });
});

module.exports = router;