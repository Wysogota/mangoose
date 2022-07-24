const { Router } = require('express');
const Controller = require('../controllers/user.controller');

const router = Router();

router.get('/me', Controller.getMe);
router.get('/:userId', Controller.getUser);

module.exports = router;