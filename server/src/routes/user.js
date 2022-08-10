const { Router } = require('express');
const multer = require('multer');
const Controller = require('../controllers/user.controller');
const tokenChecker = require('../middlewares/tokenChecker.mw');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/me', tokenChecker, Controller.getMe);
router.post('/avatar', upload.single('avatar'), tokenChecker, Controller.saveAvatar);
router.get('/:userId', Controller.getUser);

module.exports = router;