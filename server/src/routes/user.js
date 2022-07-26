const { Router } = require('express');
const Controller = require('../controllers/user.controller');
const tokenChecker = require('../middlewares/tokenChecker.mw');

const router = Router();

router.post('/me', tokenChecker, Controller.getMe);
router.get('/:userId', Controller.getUser);

module.exports = router;