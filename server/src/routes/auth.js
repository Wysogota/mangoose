const { Router } = require('express');
const Controller = require('../controllers/auth.controller');

const router = Router();

router.post('/signin', Controller.signIn);
router.delete('/signout', Controller.signOut);
router.post('/signup', Controller.signUp);
router.get('/refresh', Controller.refresh);

module.exports = router;