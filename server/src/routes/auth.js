const { Router } = require('express');
const Controller = require('../controllers/auth.controller');
const privateAccess = require('../middlewares/tokenChecker.mw');

const router = Router();

router.post('/signin', Controller.signIn);
router.delete('/signout', privateAccess, Controller.signOut);
router.post('/signup', Controller.signUp);
router.get('/refresh', privateAccess, Controller.refresh);

module.exports = router;