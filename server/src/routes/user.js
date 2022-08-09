const { Router } = require('express');
const multer = require('multer');
const Controller = require('../controllers/user.controller');
const tokenChecker = require('../middlewares/tokenChecker.mw');

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/me', tokenChecker, Controller.getMe);
router.post('/avatar', upload.single('avatar'), Controller.saveAvatar);
router.get('/:userId', Controller.getUser);

module.exports = router;