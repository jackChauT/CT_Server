const router = require('express').Router();

router.use('/user', require('./api/user'));
router.use('/consultation', require('./api/consultation'));

module.exports = router;