const { Router } = require('express');
const Controller = require('../controllers/user.controller');
const privateAccess = require('../middlewares/tokenChecker.mw');

const router = Router();

router.get('/me', privateAccess, Controller.getMe);
router.get('/:userId', Controller.getUser);

module.exports = router;