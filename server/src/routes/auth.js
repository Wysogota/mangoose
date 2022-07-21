const { Router } = require('express');
const Controller = require('../controllers/auth.controller');

const router = Router();

router.get('/signin', Controller.signIn);
router.post('/signup', Controller.signUp);
router.get('/refresh', Controller.refresh);

module.exports = router;